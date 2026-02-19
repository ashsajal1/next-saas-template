"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
    missingFeatures: [
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "SSO Integration",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Best for growing teams",
    price: { monthly: 29, yearly: 290 },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom domain",
      "Team collaboration",
    ],
    missingFeatures: ["SSO Integration", "Dedicated account manager"],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large scale organizations",
    price: { monthly: 99, yearly: 990 },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24/7 Priority support",
      "Unlimited storage",
      "Custom domain",
      "SSO Integration",
      "Dedicated account manager",
      "SLA",
    ],
    missingFeatures: [],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container py-20 px-4 md:px-6">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground text-xl max-w-[600px] mx-auto">
          Choose the plan that&apos;s right for you. All plans include a 14-day free
          trial.
        </p>

        <div className="flex items-center justify-center space-x-4 mt-8">
          <span
            className={cn("text-sm font-medium", !isYearly && "text-primary")}
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle yearly billing"
          />
          <span
            className={cn("text-sm font-medium", isYearly && "text-primary")}
          >
            Yearly{" "}
            <Badge variant="secondary" className="ml-1 text-xs">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col relative",
              plan.popular && "border-primary shadow-lg scale-105 z-10",
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -mr-2 -mt-2">
                <Badge className="px-3 py-1">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-muted-foreground ml-2">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}

                {plan.missingFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-muted-foreground/50"
                  >
                    <X className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mt-8">
          <div>
            <h4 className="font-semibold mb-2">Can I switch plans later?</h4>
            <p className="text-muted-foreground text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be applied to your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              What payment methods do you accept?
            </h4>
            <p className="text-muted-foreground text-sm">
              We accept all major credit cards, PayPal, and bank transfers for
              annual enterprise plans.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-muted-foreground text-sm">
              Yes, all paid plans come with a 14-day free trial. No credit card
              required to sign up.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              Do you offer discounts for non-profits?
            </h4>
            <p className="text-muted-foreground text-sm">
              Yes, we offer a 50% discount for registered non-profit
              organizations. Contact sales for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
