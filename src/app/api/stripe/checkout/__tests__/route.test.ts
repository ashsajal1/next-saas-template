import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock auth and clerkClient
const mockAuth = vi.fn()
const mockClerkClient = vi.fn()
const mockUsersGetUser = vi.fn()

vi.mock('@clerk/nextjs/server', () => ({
  auth: mockAuth,
  clerkClient: mockClerkClient,
}))

// Mock Stripe
const mockStripeCheckoutCreate = vi.fn()

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: mockStripeCheckoutCreate,
      }
    }
  },
  getOrCreateCustomer: vi.fn().mockResolvedValue('cus_test123'),
}))

// Mock plans
vi.mock('@/lib/plans', () => ({
  getPlanPriceId: vi.fn().mockReturnValue('price_test123'),
  PLANS: {
    professional: {
      prices: {
        month: { priceId: 'price_prof_month' },
        year: { priceId: 'price_prof_year' },
      }
    }
  }
}))

import { POST } from '@/app/api/stripe/checkout/route'

describe('POST /api/stripe/checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 when user is not authenticated', async () => {
    mockAuth.mockResolvedValue({ userId: null })

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'professional', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return 400 for invalid plan', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_123' })

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'starter', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid plan')
  })

  it('should return 400 when price ID is not configured', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_123' })
    const { getPlanPriceId } = await import('@/lib/plans')
    vi.mocked(getPlanPriceId).mockReturnValue('')

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'professional', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Price ID not configured for this plan')
  })

  it('should return 400 when user email is not found', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_123' })
    mockClerkClient.mockResolvedValue({
      users: {
        getUser: vi.fn().mockResolvedValue({
          emailAddresses: []
        })
      }
    })

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'professional', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('User email not found')
  })

  it('should create checkout session successfully', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_123' })
    mockClerkClient.mockResolvedValue({
      users: {
        getUser: vi.fn().mockResolvedValue({
          emailAddresses: [{ emailAddress: 'test@example.com' }]
        })
      }
    })
    mockStripeCheckoutCreate.mockResolvedValue({
      id: 'sess_test123',
      url: 'https://checkout.stripe.com/test',
    })

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'professional', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.sessionId).toBe('sess_test123')
    expect(data.url).toBe('https://checkout.stripe.com/test')
    expect(mockStripeCheckoutCreate).toHaveBeenCalledWith(expect.objectContaining({
      mode: 'subscription',
      metadata: expect.objectContaining({
        clerkUserId: 'user_123',
        plan: 'professional',
      }),
    }))
  })

  it('should return 500 on internal error', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_123' })
    mockClerkClient.mockRejectedValue(new Error('Database error'))

    const request = new Request('http://localhost/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'professional', interval: 'month' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })
})
