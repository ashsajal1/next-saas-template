import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  const prisma = (await import("@/lib/prisma")).default;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === "subscription") {
          const subscriptionId = session.subscription as string;
          const clerkUserId = session.metadata?.clerkUserId;
          const plan = session.metadata?.plan;
          
          if (!clerkUserId || !plan) {
            console.error("Missing metadata in checkout session");
            break;
          }

          // Retrieve subscription details from Stripe
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
          const firstItem = stripeSubscription.items.data[0];
          
          if (!firstItem) {
            console.error("No subscription items found");
            break;
          }
          
          const priceId = firstItem.price.id;
          
          // Get interval from price
          const interval = (firstItem.price.recurring?.interval as "month" | "year") || "month";

          // Get current period end from the subscription item
          const currentPeriodEnd = firstItem.current_period_end;
          const periodEndDate = new Date(currentPeriodEnd * 1000);

          // Get customer ID
          const customerId = session.customer as string;

          // Create or update subscription in database
          // Note: We don't store user data - Clerk handles that
          // We only store the clerkUserId reference and subscription details
          await prisma.subscription.upsert({
            where: { clerkUserId },
            create: {
              clerkUserId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: periodEndDate,
              status: stripeSubscription.status,
              plan: plan as "starter" | "professional" | "business" | "enterprise",
              interval: interval,
            },
            update: {
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: periodEndDate,
              status: stripeSubscription.status,
              plan: plan as "starter" | "professional" | "business" | "enterprise",
              interval: interval,
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
        
        if (invoice.subscription) {
          const stripeSubscription = await stripe.subscriptions.retrieve(invoice.subscription);
          
          // Try to get clerkUserId from subscription metadata, or fallback to customer lookup
          let clerkUserId = stripeSubscription.metadata?.clerkUserId;
          
          // If no metadata, try to find subscription by stripeCustomerId
          if (!clerkUserId && invoice.customer) {
            const subscriptionByCustomer = await prisma.subscription.findFirst({
              where: { stripeCustomerId: invoice.customer as string },
            });
            if (subscriptionByCustomer) {
              clerkUserId = subscriptionByCustomer.clerkUserId;
            }
          }

          if (clerkUserId) {
            const firstItem = stripeSubscription.items.data[0];
            
            if (firstItem) {
              const currentPeriodEnd = firstItem.current_period_end;
              const periodEndDate = new Date(currentPeriodEnd * 1000);

              // Update subscription
              await prisma.subscription.updateMany({
                where: { clerkUserId },
                data: {
                  stripeCurrentPeriodEnd: periodEndDate,
                  status: stripeSubscription.status,
                },
              });

              // Create invoice record for payment history
              const subscription = await prisma.subscription.findFirst({
                where: { clerkUserId },
              });

              if (subscription) {
                await prisma.invoice.create({
                  data: {
                    subscriptionId: subscription.id,
                    stripeInvoiceId: invoice.id,
                    amount: invoice.amount_paid,
                    currency: invoice.currency,
                    status: invoice.status || "unknown",
                  },
                });
              }
            }
          } else {
            console.error(`Could not find user for subscription ${invoice.subscription}`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscriptionData = event.data.object as Stripe.Subscription;
        const clerkUserId = subscriptionData.metadata?.clerkUserId;

        if (clerkUserId) {
          const firstItem = subscriptionData.items.data[0];
          
          if (!firstItem) {
            console.error("No subscription items found");
            break;
          }
          
          const priceId = firstItem.price.id;
          const interval = (firstItem.price.recurring?.interval as "month" | "year") || "month";
          const currentPeriodEnd = firstItem.current_period_end;
          const periodEndDate = new Date(currentPeriodEnd * 1000);

          await prisma.subscription.updateMany({
            where: { clerkUserId },
            data: {
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: periodEndDate,
              status: subscriptionData.status,
              interval: interval,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const deletedSubscription = event.data.object as Stripe.Subscription;
        const clerkUserId = deletedSubscription.metadata?.clerkUserId;

        if (clerkUserId) {
          await prisma.subscription.updateMany({
            where: { clerkUserId },
            data: {
              status: "canceled",
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
