import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get subscription by Clerk user ID (not from a User table)
    const prisma = (await import("@/lib/prisma")).default;
    const subscription = await (prisma as any).subscription.findUnique({
      where: { clerkUserId: userId },
    });

    if (!subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found. Please subscribe to a plan first." },
        { status: 404 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
