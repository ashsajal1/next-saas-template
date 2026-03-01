
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
  Building2,
  Rocket,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  Target,
  BarChart3,
  Globe,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See how startups, enterprises, and agencies use SaaSFlow to automate workflows and improve operational outcomes.",
};

const useCases = [
  {
    id: "startups",
    icon: Rocket,
    title: "For Startups",
    tagline: "Scale fast without the chaos",
    description:
      "Startups need to move fast. Our platform helps you streamline operations, automate repetitive tasks, and focus on what matters most - building your product and growing your business.",
    stats: [
      { value: "87%", label: "Faster time-to-market" },
      { value: "60%", label: "Reduction in overhead" },
      { value: "3x", label: "Team productivity" },
    ],
    benefits: [
      "Rapid deployment with no-code workflows",
      "Scalable infrastructure that grows with you",
      "Cost-effective pricing for early-stage companies",
      "Easy onboarding for new team members",
      "Integrations with startup favorites like Slack, Notion, and Stripe",
    ],
    challenges: [
      {
        challenge: "Limited resources and tight budgets",
        solution: "Automate manual tasks to do more with less",
      },
      {
        challenge: "Need to move fast and iterate quickly",
        solution: "Deploy workflows in minutes, not weeks",
      },
      {
        challenge: "Scaling team and operations",
        solution: "Built-in collaboration tools and permissions",
      },
    ],
    testimonial: {
      quote:
        "We went from idea to MVP in 3 weeks instead of 3 months. This platform was a game-changer for our startup.",
      author: "Alex Rivera",
      role: "Founder & CEO",
      company: "TechStart Inc.",
    },
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "For Enterprises",
    tagline: "Transform at scale",
    description:
      "Large organizations need robust, secure, and scalable solutions. Our enterprise platform delivers powerful automation, advanced security, and seamless integration with your existing tech stack.",
    stats: [
      { value: "40%", label: "Cost reduction" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "10M+", label: "Processes automated" },
    ],
    benefits: [
      "Enterprise-grade security and compliance",
      "SSO, SAML, and advanced access controls",
      "Dedicated account manager and 24/7 support",
      "Custom integrations with legacy systems",
      "Detailed audit logs and compliance reporting",
    ],
    challenges: [
      {
        challenge: "Complex legacy systems and processes",
        solution: "Connect and modernize without disruption",
      },
      {
        challenge: "Security and compliance requirements",
        solution: "SOC 2, GDPR, HIPAA compliant with full audit trails",
      },
      {
        challenge: "Managing thousands of users",
        solution: "Advanced user management and role-based permissions",
      },
    ],
    testimonial: {
      quote:
        "We automated 500+ manual processes across 12 departments. The ROI was visible within the first quarter.",
      author: "Sarah Chen",
      role: "VP of Operations",
      company: "GlobalTech Corp",
    },
  },
  {
    id: "agencies",
    icon: Briefcase,
    title: "For Agencies",
    tagline: "Manage more clients, effortlessly",
    description:
      "Agencies juggle multiple clients, projects, and deadlines. Our platform helps you streamline client management, automate reporting, and deliver better results faster.",
    stats: [
      { value: "3x", label: "More clients managed" },
      { value: "50%", label: "Faster reporting" },
      { value: "95%", label: "Client satisfaction" },
    ],
    benefits: [
      "White-label client dashboards",
      "Automated client reporting and analytics",
      "Project templates for faster kickoffs",
      "Time tracking and billable hours management",
      "Client collaboration workspaces",
    ],
    challenges: [
      {
        challenge: "Managing multiple clients and projects",
        solution: "Centralized workspace with client isolation",
      },
      {
        challenge: "Time-consuming manual reporting",
        solution: "Automated reports delivered to clients automatically",
      },
      {
        challenge: "Tracking billable hours accurately",
        solution: "Built-in time tracking with invoice generation",
      },
    ],
    testimonial: {
      quote:
        "We doubled our client capacity without hiring. The automation tools alone save us 20+ hours per week.",
      author: "Michael Torres",
      role: "Managing Director",
      company: "Creative Agency Pro",
    },
  },
];

const successStories = [
  {
    company: "TechStart Inc.",
    industry: "SaaS",
    metric: "87%",
    metricLabel: "Faster to market",
    description:
      "Reduced product launch time from 6 months to 3 weeks using our automation platform.",
  },
  {
    company: "GlobalTech Corp",
    industry: "Enterprise",
    metric: "$2.4M",
    metricLabel: "Annual savings",
    description:
      "Automated 500+ manual processes across multiple departments, saving millions annually.",
  },
  {
    company: "Creative Agency Pro",
    industry: "Marketing",
    metric: "3x",
    metricLabel: "Client growth",
    description:
      "Tripled client capacity without increasing headcount through workflow automation.",
  },
  {
    company: "Ecommerce Plus",
    industry: "Retail",
    metric: "60%",
    metricLabel: "Less overhead",
    description:
      "Streamlined order processing and customer support, reducing operational costs significantly.",
  },
];

const industries = [
  {
    icon: Building2,
    name: "Technology",
    description: "Software companies and tech startups",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    description: "Consulting, legal, and accounting firms",
  },
  {
    icon: TrendingUp,
    name: "E-commerce",
    description: "Online retailers and marketplaces",
  },
  {
    icon: Users,
    name: "Healthcare",
    description: "Clinics, hospitals, and health tech",
  },
  {
    icon: Globe,
    name: "Education",
    description: "Schools, universities, and EdTech",
  },
  {
    icon: BarChart3,
    name: "Finance",
    description: "Banks, fintech, and insurance",
  },
];

export default function UseCasesPage() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Target className="h-4 w-4" />
              Tailored for your needs
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Solutions for Every{" "}
              <span className="text-primary">Team & Industry</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover how teams across startups, enterprises, and agencies use
              our platform to transform their workflows and achieve more.
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

      {/* Use Cases Detailed */}
      {useCases.map((useCase, index) => (
        <section
          key={useCase.id}
          className={`py-20 md:py-32 ${
            index % 2 === 1 ? "border-y bg-muted/30" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                  <useCase.icon className="h-4 w-4" />
                  {useCase.title}
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {useCase.tagline}
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  {useCase.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {useCase.stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-card border">
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/pricing">
                  <Button className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <Card className="border-border/50">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t pt-6">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                        How we solve your challenges
                      </h4>
                      <div className="space-y-4">
                        {useCase.challenges.map((item, i) => (
                          <div key={i} className="space-y-1">
                            <p className="text-sm font-medium text-red-600">
                              Challenge: {item.challenge}
                            </p>
                            <p className="text-sm text-green-600">
                              → Solution: {item.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <blockquote className="italic text-muted-foreground mb-4">
                        &quot;{useCase.testimonial.quote}&quot;
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold text-sm">
                          {useCase.testimonial.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {useCase.testimonial.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {useCase.testimonial.role}, {useCase.testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Success Stories */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real teams using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.map((story) => (
              <Card
                key={story.company}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    {story.industry}
                  </div>
                  <CardTitle className="text-xl">{story.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary">
                      {story.metric}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {story.metricLabel}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {story.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted across industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Teams in every industry use our platform to achieve their goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <Card
                key={industry.name}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple implementation process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in days, not months
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Discovery",
                  description: "We understand your workflows and requirements",
                },
                {
                  step: "2",
                  title: "Setup",
                  description: "Quick setup with templates and integrations",
                },
                {
                  step: "3",
                  title: "Training",
                  description: "Onboard your team with live sessions",
                },
                {
                  step: "4",
                  title: "Launch",
                  description: "Go live with full support from our team",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
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
              Find your use case?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already transforming their workflows.
              Start your free trial today.
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
