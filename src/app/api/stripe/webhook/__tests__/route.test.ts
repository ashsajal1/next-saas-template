import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock headers
const mockHeadersGet = vi.fn()

vi.mock('next/headers', () => ({
  headers: vi.fn().mockReturnValue({
    get: mockHeadersGet,
  }),
}))

// Mock Prisma
const mockPrisma = {
  subscription: {
    upsert: vi.fn(),
    updateMany: vi.fn(),
  }
}

vi.mock('@/lib/prisma', () => ({
  default: mockPrisma
}))

// Mock Stripe
const mockStripeWebhooksConstructEvent = vi.fn()
const mockStripeSubscriptionsRetrieve = vi.fn()

vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: mockStripeWebhooksConstructEvent,
    },
    subscriptions: {
      retrieve: mockStripeSubscriptionsRetrieve,
    },
  },
}))

import { POST } from '@/app/api/stripe/webhook/route'

describe('POST /api/stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test123'
  })

  it('should return 400 when signature verification fails', async () => {
    mockHeadersGet.mockReturnValue('invalid_sig')
    mockStripeWebhooksConstructEvent.mockImplementation(() => {
      throw new Error('Invalid signature')
    })

    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: 'test_payload',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid signature')
  })

  it('should handle checkout.session.completed event', async () => {
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          mode: 'subscription',
          subscription: 'sub_test123',
          customer: 'cus_test123',
          metadata: {
            clerkUserId: 'user_123',
            plan: 'professional',
          },
        },
      },
    }

    mockHeadersGet.mockReturnValue('valid_sig')
    mockStripeWebhooksConstructEvent.mockReturnValue(mockEvent)
    mockStripeSubscriptionsRetrieve.mockResolvedValue({
      status: 'active',
      items: {
        data: [{
          price: { id: 'price_test123', recurring: { interval: 'month' } },
          current_period_end: 1704067200,
        }],
      },
    })
    mockPrisma.subscription.upsert.mockResolvedValue({ id: 'sub_db_123' })

    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: 'test_payload',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
    expect(mockPrisma.subscription.upsert).toHaveBeenCalledWith({
      where: { clerkUserId: 'user_123' },
      create: expect.objectContaining({
        clerkUserId: 'user_123',
        stripeCustomerId: 'cus_test123',
        stripeSubscriptionId: 'sub_test123',
        plan: 'professional',
      }),
      update: expect.any(Object),
    })
  })

  it('should handle invoice.payment_succeeded event', async () => {
    const mockEvent = {
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          subscription: 'sub_test123',
        },
      },
    }

    mockHeadersGet.mockReturnValue('valid_sig')
    mockStripeWebhooksConstructEvent.mockReturnValue(mockEvent)
    mockStripeSubscriptionsRetrieve.mockResolvedValue({
      status: 'active',
      metadata: { clerkUserId: 'user_123' },
      items: {
        data: [{
          current_period_end: 1704067200,
        }],
      },
    })
    mockPrisma.subscription.updateMany.mockResolvedValue({ count: 1 })

    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: 'test_payload',
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockPrisma.subscription.updateMany).toHaveBeenCalledWith({
      where: { clerkUserId: 'user_123' },
      data: expect.any(Object),
    })
  })

  it('should handle customer.subscription.deleted event', async () => {
    const mockEvent = {
      type: 'customer.subscription.deleted',
      data: {
        object: {
          metadata: { clerkUserId: 'user_123' },
        },
      },
    }

    mockHeadersGet.mockReturnValue('valid_sig')
    mockStripeWebhooksConstructEvent.mockReturnValue(mockEvent)
    mockPrisma.subscription.updateMany.mockResolvedValue({ count: 1 })

    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: 'test_payload',
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockPrisma.subscription.updateMany).toHaveBeenCalledWith({
      where: { clerkUserId: 'user_123' },
      data: { status: 'canceled' },
    })
  })

  it('should return 500 on database error', async () => {
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          mode: 'subscription',
          subscription: 'sub_test123',
          customer: 'cus_test123',
          metadata: {
            clerkUserId: 'user_123',
            plan: 'professional',
          },
        },
      },
    }

    mockHeadersGet.mockReturnValue('valid_sig')
    mockStripeWebhooksConstructEvent.mockReturnValue(mockEvent)
    mockStripeSubscriptionsRetrieve.mockResolvedValue({
      status: 'active',
      items: {
        data: [{
          price: { id: 'price_test123', recurring: { interval: 'month' } },
          current_period_end: 1704067200,
        }],
      },
    })
    mockPrisma.subscription.upsert.mockRejectedValue(new Error('Database error'))

    const request = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: 'test_payload',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Webhook handler failed')
  })
})
