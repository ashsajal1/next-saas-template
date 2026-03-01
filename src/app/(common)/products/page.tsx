
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Zap,
  BarChart3,
  Users,
  Shield,
  Clock,
  Globe,
  Workflow,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Discover SaaSFlow products designed to automate operations, improve visibility, and help teams scale efficiently.",
};

const features = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks and streamline your processes with intelligent workflows that save hours every week.",
    benefits: [
      "Visual workflow builder",
      "500+ integrations",
      "Custom triggers & actions",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get deep insights into your business performance with real-time dashboards and customizable reports.",
    benefits: [
      "Real-time data visualization",
      "Custom report builder",
      "Predictive analytics",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with your team using shared workspaces, comments, and real-time updates.",
    benefits: [
      "Unlimited team members",
      "Role-based permissions",
      "Activity tracking",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with SOC 2 compliance, encryption, and advanced access controls.",
    benefits: [
      "SOC 2 Type II certified",
      "End-to-end encryption",
      "SSO & 2FA support",
    ],
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track time effortlessly with automatic timers, manual entries, and detailed time reports.",
    benefits: [
      "Automatic time capture",
      "Billable hours tracking",
      "Project time allocation",
    ],
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Access your data from anywhere with our cloud-based platform and mobile apps.",
    benefits: [
      "99.9% uptime SLA",
      "Multi-region servers",
      "iOS & Android apps",
    ],
  },
];

const useCases = [
  {
    title: "For Startups",
    description:
      "Scale your startup efficiently with tools designed for rapid growth and lean teams.",
    stats: "87% faster time-to-market",
  },
  {
    title: "For Enterprises",
    description:
      "Transform enterprise operations with powerful automation and enterprise-grade security.",
    stats: "40% reduction in operational costs",
  },
  {
    title: "For Agencies",
    description:
      "Manage multiple clients and projects effortlessly with centralized dashboards.",
    stats: "3x more clients managed",
  },
];

const testimonials = [
  {
    quote:
      "This platform completely transformed how we work. We've cut our project delivery time by 60%.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    company: "TechStart",
  },
  {
    quote:
      "The automation features alone saved us 20+ hours per week. Best investment we've made.",
    author: "Michael Ross",
    role: "Operations Director",
    company: "GlobalAgency",
  },
  {
    quote:
      "Incredible ROI. We saw productivity gains within the first month of implementation.",
    author: "Emily Watson",
    role: "VP of Engineering",
    company: "ScaleUp Co",
  },
];

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Start your free trial with full access to all features. No credit card required. You can upgrade, downgrade, or cancel anytime.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes! We offer 500+ integrations with popular tools including Slack, Salesforce, HubSpot, Google Workspace, and more.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We're SOC 2 Type II certified with end-to-end encryption, regular security audits, and strict access controls.",
  },
  {
    question: "What support options are available?",
    answer:
      "We offer 24/7 email support, live chat during business hours, extensive documentation, and priority phone support for enterprise plans.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
  },
];

export default function ProductsPage() {
  return (
    <div className="relative">
      {/* Background gradient - matching hero and navbar */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              Everything you need to scale
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Powerful Features for{" "}
              <span className="text-primary">Modern Teams</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to streamline operations, boost productivity,
              and scale your business. All in one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for scale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help your team work smarter, not
              harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Perfect for every team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re a startup, enterprise, or agency, we&apos;ve got you
              covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-8 rounded-2xl bg-card border hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {useCase.description}
                </p>
                <div className="pt-6 border-t">
                  <p className="text-sm font-medium text-primary">
                    {useCase.stats}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.author}
                className="border-border/50"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold text-sm">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                Everything you need to know about our platform
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-3">
                    <span className="text-primary">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-7">{faq.answer}</p>
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
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 10,000+ teams already using SaaSFlow to streamline their
              workflow and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
