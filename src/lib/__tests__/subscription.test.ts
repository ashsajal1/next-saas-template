import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock Prisma
const mockPrisma = {
  subscription: {
    findUnique: vi.fn(),
  }
}

vi.mock('@/lib/prisma', () => ({
  default: mockPrisma
}))

import {
  getUserSubscription,
  checkSubscriptionAccess,
  isSubscriptionActive,
  type PlanType,
  type SubscriptionStatusType
} from '../subscription'

describe('subscription utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserSubscription', () => {
    it('should return starter plan when no subscription exists', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(null)

      const result = await getUserSubscription('user_123')

      expect(result).toEqual({
        plan: 'starter',
        status: null,
        isPro: false,
        isBusiness: false,
      })
      expect(mockPrisma.subscription.findUnique).toHaveBeenCalledWith({
        where: { clerkUserId: 'user_123' }
      })
    })

    it('should return subscription data when subscription exists', async () => {
      const mockSubscription = {
        plan: 'professional',
        status: 'active',
        stripeCurrentPeriodEnd: new Date('2025-12-31'),
      }
      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription)

      const result = await getUserSubscription('user_123')

      expect(result).toEqual({
        plan: 'professional',
        status: 'active',
        isPro: true,
        isBusiness: false,
        stripeCurrentPeriodEnd: mockSubscription.stripeCurrentPeriodEnd,
      })
    })

    it('should return isBusiness true for active business plan', async () => {
      const mockSubscription = {
        plan: 'business',
        status: 'active',
        stripeCurrentPeriodEnd: new Date('2025-12-31'),
      }
      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription)

      const result = await getUserSubscription('user_123')

      expect(result.isBusiness).toBe(true)
      expect(result.isPro).toBe(false)
    })

    it('should return isPro false for inactive professional plan', async () => {
      const mockSubscription = {
        plan: 'professional',
        status: 'canceled',
        stripeCurrentPeriodEnd: new Date('2025-12-31'),
      }
      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription)

      const result = await getUserSubscription('user_123')

      expect(result.isPro).toBe(false)
    })
  })

  describe('checkSubscriptionAccess', () => {
    const planHierarchy: [PlanType, PlanType, boolean][] = [
      ['starter', 'starter', true],
      ['starter', 'professional', false],
      ['starter', 'business', false],
      ['professional', 'starter', true],
      ['professional', 'professional', true],
      ['professional', 'business', false],
      ['business', 'starter', true],
      ['business', 'professional', true],
      ['business', 'business', true],
      ['enterprise', 'starter', true],
      ['enterprise', 'professional', true],
      ['enterprise', 'business', true],
      ['enterprise', 'enterprise', true],
    ]

    it.each(planHierarchy)(
      'should return %s when current plan is %s and required plan is %s',
      (currentPlan, requiredPlan, expected) => {
        expect(checkSubscriptionAccess(currentPlan, requiredPlan)).toBe(expected)
      }
    )
  })

  describe('isSubscriptionActive', () => {
    const statusCases: [SubscriptionStatusType | null, boolean][] = [
      ['active', true],
      ['trialing', true],
      ['incomplete', false],
      ['incomplete_expired', false],
      ['past_due', false],
      ['canceled', false],
      ['unpaid', false],
      ['paused', false],
      [null, false],
    ]

    it.each(statusCases)(
      'should return %s when status is %s',
      (status, expected) => {
        expect(isSubscriptionActive(status)).toBe(expected)
      }
    )
  })
})
