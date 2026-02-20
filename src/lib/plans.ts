export type PlanType = "starter" | "professional" | "business" | "enterprise";
export type BillingIntervalType = "month" | "year";

// Validate required environment variables for paid plans
const requiredEnvVars = [
  "STRIPE_PRICE_PROFESSIONAL_MONTHLY",
  "STRIPE_PRICE_PROFESSIONAL_YEARLY",
  "STRIPE_PRICE_BUSINESS_MONTHLY",
  "STRIPE_PRICE_BUSINESS_YEARLY",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is required`);
  }
}

export const PLANS = {
  starter: {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    prices: {
      month: { amount: 0, priceId: "" },
      year: { amount: 0, priceId: "" },
    },
    features: [
      "Up to 3 projects",
      "Basic analytics dashboard",
      "Community support",
      "1GB storage",
      "API access (100 calls/day)",
      "Email notifications",
    ],
  },
  professional: {
    name: "Professional",
    description: "Best for growing teams and businesses",
    prices: {
      month: { amount: 29, priceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || "" },
      year: { amount: 24, priceId: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY || "" },
    },
    features: [
      "Unlimited projects",
      "Advanced analytics & reports",
      "Priority email support",
      "50GB storage",
      "Custom domain & branding",
      "Up to 10 team members",
      "API access (10,000 calls/day)",
      "Workflow automation",
      "Integrations (500+)",
    ],
  },
  business: {
    name: "Business",
    description: "For scaling teams with advanced needs",
    prices: {
      month: { amount: 79, priceId: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || "" },
      year: { amount: 66, priceId: process.env.STRIPE_PRICE_BUSINESS_YEARLY || "" },
    },
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "500GB storage",
      "SSO & SAML authentication",
      "Advanced permissions",
      "API access (unlimited)",
      "Custom integrations",
      "Audit logs",
      "Dedicated support",
    ],
  },
};

export const getPlanPriceId = (plan: PlanType, interval: BillingIntervalType): string => {
  if (plan === "enterprise") return "";
  const planConfig = PLANS[plan as keyof typeof PLANS];
  if (!planConfig) return "";
  return planConfig.prices[interval].priceId;
};

export const getPlanAmount = (plan: PlanType, interval: BillingIntervalType): number => {
  if (plan === "enterprise") return 0;
  const planConfig = PLANS[plan as keyof typeof PLANS];
  if (!planConfig) return 0;
  return planConfig.prices[interval].amount;
};
