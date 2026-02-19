import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe, getOrCreateCustomer } from "@/lib/stripe";
import { getPlanPriceId } from "@/lib/plans";
import type { PlanType, BillingIntervalType } from "@/lib/plans";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { plan, interval }: { plan: PlanType; interval: BillingIntervalType } = body;

    // Validate plan
    if (!plan || (plan !== "professional" && plan !== "business")) {
      return NextResponse.json(
        { error: "Invalid plan. Only professional and business plans support checkout." },
        { status: 400 }
      );
    }

    const priceId = getPlanPriceId(plan, interval);
    
    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID not configured for this plan" },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const prisma = (await import("@/lib/prisma")).default;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const customerId = await getOrCreateCustomer(userId, user.email);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        interval,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      subscription_data: {
        metadata: {
          userId,
          plan,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
