import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
  const prismaAny = prisma as any;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === "subscription") {
          const subscriptionId = session.subscription as string;
          const userId = session.metadata?.userId;
          const plan = session.metadata?.plan;
          
          if (!userId || !plan) {
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

          // Create or update subscription in database
          await prismaAny.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: periodEndDate,
              status: stripeSubscription.status,
              plan: plan,
              interval: interval,
            },
            update: {
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: periodEndDate,
              status: stripeSubscription.status,
              plan: plan,
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
          const userId = stripeSubscription.metadata?.userId;

          if (userId) {
            const firstItem = stripeSubscription.items.data[0];
            
            if (firstItem) {
              const currentPeriodEnd = firstItem.current_period_end;
              const periodEndDate = new Date(currentPeriodEnd * 1000);

              await prismaAny.subscription.updateMany({
                where: { userId },
                data: {
                  stripeCurrentPeriodEnd: periodEndDate,
                  status: stripeSubscription.status,
                },
              });
            }
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscriptionData = event.data.object as Stripe.Subscription;
        const userId = subscriptionData.metadata?.userId;

        if (userId) {
          const firstItem = subscriptionData.items.data[0];
          
          if (!firstItem) {
            console.error("No subscription items found");
            break;
          }
          
          const priceId = firstItem.price.id;
          const interval = (firstItem.price.recurring?.interval as "month" | "year") || "month";
          const currentPeriodEnd = firstItem.current_period_end;
          const periodEndDate = new Date(currentPeriodEnd * 1000);

          await prismaAny.subscription.updateMany({
            where: { userId },
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
        const userId = deletedSubscription.metadata?.userId;

        if (userId) {
          await prismaAny.subscription.updateMany({
            where: { userId },
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
