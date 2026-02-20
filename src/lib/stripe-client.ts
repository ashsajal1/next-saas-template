import { loadStripe, Stripe as StripeJS } from "@stripe/stripe-js";

// Validate required environment variable
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required");
}

let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
