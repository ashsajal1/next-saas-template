# Stripe Payment Integration

This project includes a complete Stripe payment integration for subscription management.

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_******
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_******
STRIPE_WEBHOOK_SECRET=whsec_******

# Stripe Price IDs (Create these in your Stripe Dashboard)
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_******
STRIPE_PRICE_PROFESSIONAL_YEARLY=price_******
STRIPE_PRICE_BUSINESS_MONTHLY=price_******
STRIPE_PRICE_BUSINESS_YEARLY=price_******

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Migration

Run the Prisma migration to add subscription tables:

```bash
npx prisma migrate dev --name add_stripe_subscriptions
```

### 3. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Create products and prices in Stripe Dashboard:
   - Professional Plan (Monthly & Yearly)
   - Business Plan (Monthly & Yearly)
4. Copy the price IDs to your environment variables

### 4. Webhook Setup

For local development, use Stripe CLI:

```bash
# Install Stripe CLI (https://stripe.com/docs/stripe-cli)
# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret and add it to `STRIPE_WEBHOOK_SECRET`.

For production, set up a webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/stripe/webhook`.

## Features

- **Checkout Sessions**: Users can subscribe to Professional or Business plans
- **Customer Portal**: Users can manage their subscriptions and billing
- **Webhook Handling**: Automatic subscription status updates
- **Database Integration**: Subscription data synced with Prisma/PostgreSQL
- **Role-Based Access**: Check subscription status for feature gating

## API Routes

- `POST /api/stripe/checkout` - Create a Stripe Checkout session
- `POST /api/stripe/portal` - Create a Customer Portal session
- `POST /api/stripe/webhook` - Handle Stripe webhook events

## Components

- `SubscribeButton` - Button to start subscription checkout
- `ManageSubscriptionButton` - Button to open billing portal

## Usage Example

```tsx
import { SubscribeButton } from "@/components/subscribe-button";

// In your pricing page
<SubscribeButton plan="professional" interval="month">
  Subscribe Now
</SubscribeButton>
```

Check subscription status:

```tsx
import { getUserSubscription } from "@/lib/subscription";

const subscription = await getUserSubscription(userId);
if (subscription.isPro) {
  // Show pro features
}
```

## Webhook Events Handled

- `checkout.session.completed` - New subscription created
- `invoice.payment_succeeded` - Payment renewed
- `customer.subscription.updated` - Subscription updated
- `customer.subscription.deleted` - Subscription canceled

## Testing

Use Stripe test cards:
- `4242 4242 4242 4242` - Successful payment
- `4000 0000 0000 0002` - Card declined
