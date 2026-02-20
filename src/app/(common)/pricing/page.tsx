"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Sparkles, Shield, Zap, Star, HelpCircle } from "lucide-react";
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
import Link from "next/link";
import { SubscribeButton } from "@/components/subscribe-button";
import type { PlanType, BillingIntervalType } from "@/lib/plans";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Up to 3 projects",
      "Basic analytics dashboard",
      "Community support",
      "1GB storage",
      "API access (100 calls/day)",
      "Email notifications",
    ],
    missingFeatures: [
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "SSO Integration",
      "Team collaboration",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
    ctaLink: "/sign-up",
    planId: null as PlanType | null,
  },
  {
    name: "Professional",
    description: "Best for growing teams and businesses",
    price: { monthly: 29, yearly: 24 },
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
    missingFeatures: [
      "SSO Integration",
      "Dedicated account manager",
      "Custom SLA",
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    popular: true,
    ctaLink: "/sign-up",
    badge: "Most Popular",
    savings: "Save $60/year",
    planId: "professional" as PlanType,
  },
  {
    name: "Business",
    description: "For scaling teams with advanced needs",
    price: { monthly: 79, yearly: 66 },
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
    missingFeatures: [
      "Dedicated account manager",
      "Custom SLA",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    ctaLink: "/sign-up",
    savings: "Save $156/year",
    planId: "business" as PlanType,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom requirements",
    price: { monthly: null, yearly: null },
    features: [
      "Everything in Business",
      "Unlimited everything",
      "Dedicated account manager",
      "Custom SLA & security",
      "On-premise deployment option",
      "24/7 phone support",
      "Custom training & onboarding",
      "White-label options",
      "Advanced compliance (HIPAA, SOC 2)",
    ],
    missingFeatures: [],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
    ctaLink: "/contact",
    badge: "Custom",
    planId: null as PlanType | null,
  },
];

const testimonials = [
  {
    quote: "Switched from a competitor and saved $2,000/year. The features are better too!",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechStart",
  },
  {
    quote: "Best ROI on any software we've purchased. Paid for itself in the first month.",
    author: "Michael Ross",
    role: "Operations Director",
    company: "GlobalAgency",
  },
  {
    quote: "The Professional plan has everything we need at a fraction of the cost.",
    author: "Emily Watson",
    role: "VP of Engineering",
    company: "ScaleUp Co",
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any difference in cost.",
  },
  {
    question: "What's included in the 14-day free trial?",
    answer:
      "The free trial gives you full access to all Professional features. No credit card required to start, and you can cancel anytime.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "What happens when I hit my plan limits?",
    answer:
      "We'll notify you when you're approaching limits. You can upgrade instantly, or we'll simply pause the specific feature until you upgrade.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes! Save 17% when you choose annual billing. That's up to $156/year savings on Business plans.",
  },
  {
    question: "Do you offer discounts for non-profits or education?",
    answer:
      "Absolutely! We offer 50% off for verified non-profits and educational institutions. Contact our sales team to apply.",
  },
];

const comparisonFeatures = [
  { feature: "Projects", starter: "3", professional: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team members", starter: "1", professional: "10", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Storage", starter: "1GB", professional: "50GB", business: "500GB", enterprise: "Unlimited" },
  { feature: "API calls/day", starter: "100", professional: "10,000", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Analytics", starter: "Basic", professional: "Advanced", business: "Advanced", enterprise: "Custom" },
  { feature: "Integrations", starter: "10", professional: "500+", business: "500+", enterprise: "Custom" },
  { feature: "Custom domain", starter: false, professional: true, business: true, enterprise: true },
  { feature: "SSO/SAML", starter: false, professional: false, business: true, enterprise: true },
  { feature: "Priority support", starter: false, professional: true, business: true, enterprise: "24/7" },
  { feature: "Dedicated manager", starter: false, professional: false, business: false, enterprise: true },
  { feature: "Custom SLA", starter: false, professional: false, business: false, enterprise: true },
  { feature: "Audit logs", starter: false, professional: false, business: true, enterprise: true },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              Simple, transparent pricing
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Plans for teams of{" "}
              <span className="text-primary">all sizes</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free, upgrade when you&apos;re ready. All plans include a 14-day
              free trial with no credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={cn(
                  "text-sm font-medium",
                  !isYearly && "text-foreground"
                )}
              >
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                aria-label="Toggle yearly billing"
              />
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-2",
                  isYearly && "text-foreground"
                )}
              >
                Yearly
                <Badge variant="secondary" className="text-xs">
                  Save 17%
                </Badge>
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "flex flex-col relative transition-all duration-300",
                  plan.popular
                    ? "border-primary shadow-xl scale-105 z-10 lg:scale-110"
                    : "border-border/50 hover:border-primary/20"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className={cn(
                        "px-3 py-1",
                        plan.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6">
                    {plan.price.monthly !== null ? (
                      <>
                        <span className="text-4xl font-bold">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          /{isYearly ? "month, billed annually" : "month"}
                        </span>
                        {isYearly && plan.savings && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            {plan.savings}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-2xl font-bold">Custom</div>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.missingFeatures.length > 0 && (
                      <div className="pt-2 border-t mt-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          Not included:
                        </p>
                        {plan.missingFeatures.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-muted-foreground/60"
                          >
                            <X className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm line-through">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  {plan.planId ? (
                    <SubscribeButton
                      plan={plan.planId}
                      interval={isYearly ? "year" : "month"}
                      variant={plan.buttonVariant}
                      className="w-full"
                    >
                      {plan.buttonText}
                    </SubscribeButton>
                  ) : (
                    <Link href={plan.ctaLink} className="w-full">
                      <Button
                        className="w-full"
                        variant={plan.buttonVariant}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <Shield className="h-4 w-4" />
              30-Day Money-Back Guarantee • No questions asked
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by thousands of teams
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-2 font-semibold text-lg">4.9/5</span>
            </div>
            <p className="text-muted-foreground">
              Based on 2,000+ reviews on G2, Capterra, and Trustpilot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold text-sm">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Compare all features
            </h2>
            <p className="text-lg text-muted-foreground">
              See exactly what&apos;s included in each plan
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold text-primary">
                    Professional
                  </th>
                  <th className="text-center p-4 font-semibold">Business</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {typeof row.professional === "boolean" ? (
                        row.professional ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-primary">
                          {row.professional}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.business === "boolean" ? (
                        row.business ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        row.business
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about pricing
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground">
                Join 10,000+ teams already using SaaSFlow
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
