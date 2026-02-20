import Stripe from "stripe";

// Validate required environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});

// Get or create Stripe customer for a Clerk user
// Since we don't store users in Prisma (Clerk handles that),
// we check if there's an existing subscription with a stripeCustomerId
export const getOrCreateCustomer = async (clerkUserId: string, email: string) => {
  const prisma = (await import("@/lib/prisma")).default;

  // Check if user already has a subscription with Stripe customer ID
  const existingSubscription = await prisma.subscription.findUnique({
    where: { clerkUserId },
  });

  if (existingSubscription?.stripeCustomerId) {
    return existingSubscription.stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      clerkUserId,
    },
  });

  return customer.id;
};
