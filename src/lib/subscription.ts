import prisma from "@/lib/prisma";

export type PlanType = "starter" | "professional" | "business" | "enterprise";
export type SubscriptionStatusType = 
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

export async function getUserSubscription(userId: string) {
  const subscription = await (prisma as any).subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return {
      plan: "starter" as PlanType,
      status: null,
      isPro: false,
      isBusiness: false,
    };
  }

  return {
    plan: subscription.plan as PlanType,
    status: subscription.status as SubscriptionStatusType,
    isPro: subscription.plan === "professional" && subscription.status === "active",
    isBusiness: subscription.plan === "business" && subscription.status === "active",
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
  };
}

export function checkSubscriptionAccess(
  currentPlan: PlanType,
  requiredPlan: PlanType
): boolean {
  const planHierarchy: Record<PlanType, number> = {
    starter: 0,
    professional: 1,
    business: 2,
    enterprise: 3,
  };

  return planHierarchy[currentPlan] >= planHierarchy[requiredPlan];
}

export function isSubscriptionActive(status: SubscriptionStatusType | null): boolean {
  if (!status) return false;
  return ["trialing", "active"].includes(status);
}
