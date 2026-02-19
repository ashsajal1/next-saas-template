import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});

export const getOrCreateCustomer = async (userId: string, email: string) => {
  const prisma = (await import("@/lib/prisma")).default;

  // Check if user already has a Stripe customer ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Type assertion for stripeCustomerId
  const userRecord = user as typeof user & { stripeCustomerId?: string | null };
  
  if (userRecord.stripeCustomerId) {
    return userRecord.stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  // Save customer ID to database
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id } as any,
  });

  return customer.id;
};
