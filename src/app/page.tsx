import HeroSection from "@/components/hero-section";
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
  Workflow,
  Star,
  Play,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const logoCompanies = [
  "Acme Corp",
  "GlobalTech",
  "InnovateCo",
  "FutureSys",
  "CloudMax",
  "DataFlow",
];

const features = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks and streamline your processes with intelligent workflows.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get deep insights into your business performance with real-time dashboards.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with shared workspaces and real-time updates.",
  },
];

const steps = [
  {
    step: "01",
    title: "Sign Up",
    description:
      "Create your account in seconds. No credit card required to get started.",
  },
  {
    step: "02",
    title: "Set Up",
    description:
      "Connect your tools and customize workflows to match your processes.",
  },
  {
    step: "03",
    title: "Scale",
    description:
      "Watch your productivity soar as automation handles the repetitive work.",
  },
];

const testimonials = [
  {
    quote:
      "This platform completely transformed how we work. We've cut our project delivery time by 60%.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc.",
    avatar: "S",
  },
  {
    quote:
      "The automation features alone saved us 20+ hours per week. Best investment we've made.",
    author: "Michael Ross",
    role: "Operations Director",
    company: "GlobalAgency",
    avatar: "M",
  },
  {
    quote:
      "Incredible ROI. We saw productivity gains within the first month of implementation.",
    author: "Emily Watson",
    role: "VP of Engineering",
    company: "ScaleUp Co",
    avatar: "E",
  },
];

const stats = [
  { value: "10,000+", label: "Active Teams" },
  { value: "99.9%", label: "Uptime" },
  { value: "500+", label: "Integrations" },
  { value: "4.9/5", label: "User Rating" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Logo Cloud */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {logoCompanies.map((company) => (
              <div
                key={company}
                className="text-lg font-bold text-muted-foreground grayscale hover:grayscale-0 transition-all"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to scale
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to help your team work smarter, not
              harder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <Link
                    href="/features"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/features">
              <Button variant="outline" size="lg">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes and see results immediately
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/demo">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <p className="text-muted-foreground mb-6">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold text-sm">
                      {testimonial.avatar}
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

      {/* Pricing Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">Free</div>
                <div className="text-sm text-muted-foreground mb-4">
                  For individuals
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Up to 3 projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Basic analytics
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-primary/5 border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Most Popular
                </div>
                <div className="text-3xl font-bold text-primary mb-2">$29</div>
                <div className="text-sm text-muted-foreground mb-4">
                  per month
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Advanced analytics
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">
                  Custom
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  For enterprises
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Dedicated support
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg">View Full Pricing</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 10,000+ teams already using SaaSFlow to streamline their
              operations and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
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
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
