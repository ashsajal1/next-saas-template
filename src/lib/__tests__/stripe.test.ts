import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock Stripe
const mockStripeCustomersCreate = vi.fn()
const mockStripeCustomersRetrieve = vi.fn()

vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    customers: {
      create: mockStripeCustomersCreate,
      retrieve: mockStripeCustomersRetrieve,
    }
  }))
}))

// Mock Prisma
const mockPrisma = {
  subscription: {
    findUnique: vi.fn(),
  }
}

vi.mock('@/lib/prisma', () => ({
  default: mockPrisma
}))

import { getOrCreateCustomer, stripe } from '../stripe'

describe('stripe utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getOrCreateCustomer', () => {
    it('should return existing stripe customer ID if subscription exists', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_existing123'
      })

      const result = await getOrCreateCustomer('user_123', 'test@example.com')

      expect(result).toBe('cus_existing123')
      expect(mockStripeCustomersCreate).not.toHaveBeenCalled()
    })

    it('should create new Stripe customer if no subscription exists', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(null)
      mockStripeCustomersCreate.mockResolvedValue({
        id: 'cus_new123'
      })

      const result = await getOrCreateCustomer('user_123', 'test@example.com')

      expect(result).toBe('cus_new123')
      expect(mockStripeCustomersCreate).toHaveBeenCalledWith({
        email: 'test@example.com',
        metadata: {
          clerkUserId: 'user_123',
        },
      })
    })

    it('should create new Stripe customer if subscription exists but has no customer ID', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: null
      })
      mockStripeCustomersCreate.mockResolvedValue({
        id: 'cus_new123'
      })

      const result = await getOrCreateCustomer('user_123', 'test@example.com')

      expect(result).toBe('cus_new123')
      expect(mockStripeCustomersCreate).toHaveBeenCalled()
    })

    it('should handle Stripe API errors', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(null)
      mockStripeCustomersCreate.mockRejectedValue(new Error('Stripe API Error'))

      await expect(getOrCreateCustomer('user_123', 'test@example.com'))
        .rejects.toThrow('Stripe API Error')
    })
  })
})
