
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Layers,
  Cpu,
  LineChart,
  Lock,
  Bell,
  FolderOpen,
  MessageSquare,
  Calendar,
  Cloud,
  Smartphone,
  Code,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore SaaSFlow features for workflow automation, analytics, team collaboration, and enterprise-grade security.",
};

const coreFeatures = [
  {
    id: "automation",
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Build complex workflows without writing code. Automate repetitive tasks and connect your favorite tools.",
    highlights: [
      { icon: Layers, text: "Visual drag-and-drop builder" },
      { icon: Code, text: "Custom code actions" },
      { icon: Clock, text: "Scheduled & triggered workflows" },
      { icon: Check, text: "Error handling & retry logic" },
    ],
    stats: [
      { value: "500+", label: "Integrations" },
      { value: "10M+", label: "Automations run monthly" },
      { value: "99.9%", label: "Uptime" },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Turn data into actionable insights with powerful analytics dashboards and customizable reports.",
    highlights: [
      { icon: LineChart, text: "Real-time dashboards" },
      { icon: Cpu, text: "AI-powered insights" },
      { icon: FolderOpen, text: "Custom report builder" },
      { icon: Cloud, text: "Export to any format" },
    ],
    stats: [
      { value: "50+", label: "Chart types" },
      { value: "<100ms", label: "Query time" },
      { value: "1B+", label: "Data points processed" },
    ],
  },
  {
    id: "collaboration",
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with real-time collaboration, shared workspaces, and smart notifications.",
    highlights: [
      { icon: MessageSquare, text: "Real-time comments" },
      { icon: Bell, text: "Smart notifications" },
      { icon: Calendar, text: "Shared calendars" },
      { icon: Check, text: "Activity feed" },
    ],
    stats: [
      { value: "Unlimited", label: "Team members" },
      { value: "Real-time", label: "Collaboration" },
      { value: "100%", label: "Sync across devices" },
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with comprehensive compliance certifications and advanced access controls.",
    highlights: [
      { icon: Lock, text: "End-to-end encryption" },
      { icon: Shield, text: "SOC 2 Type II certified" },
      { icon: Users, text: "Role-based permissions" },
      { icon: Check, text: "Audit logs" },
    ],
    stats: [
      { value: "256-bit", label: "Encryption" },
      { value: "GDPR", label: "Compliant" },
      { value: "99.99%", label: "Security uptime" },
    ],
  },
];

const additionalFeatures = [
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast performance with servers in 35+ locations worldwide.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native iOS and Android apps for work on the go.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Unlimited cloud storage with automatic backups and version control.",
  },
  {
    icon: Code,
    title: "API Access",
    description: "Full REST API and webhooks for custom integrations.",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description: "Real-time synchronization across all devices and team members.",
  },
  {
    icon: Calendar,
    title: "Calendar Integration",
    description: "Sync with Google Calendar, Outlook, and other popular calendars.",
  },
];

const comparisons = [
  {
    feature: "Workflow Automation",
    saasflow: "Unlimited workflows",
    competitor: "Limited to 10",
  },
  {
    feature: "Team Members",
    saasflow: "Unlimited",
    competitor: "Up to 50",
  },
  {
    feature: "Storage",
    saasflow: "Unlimited",
    competitor: "100 GB",
  },
  {
    feature: "Integrations",
    saasflow: "500+",
    competitor: "100+",
  },
  {
    feature: "Analytics",
    saasflow: "Advanced AI-powered",
    competitor: "Basic reports",
  },
  {
    feature: "Support",
    saasflow: "24/7 priority",
    competitor: "Email only",
  },
];

export default function FeaturesPage() {
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
              <Sparkles className="h-4 w-4" />
              Powerful features, simple pricing
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Everything You Need to{" "}
              <span className="text-primary">Work Smarter</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the features that make teams 10x more productive. From
              automation to analytics, we&apos;ve got you covered.
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
                  Watch Demo
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

      {/* Core Features Tabs */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore our core features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dive into the features that power thousands of teams
              worldwide
            </p>
          </div>

          <Tabs defaultValue="automation" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 h-auto gap-2">
              {coreFeatures.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  <feature.icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {coreFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="space-y-3">
                      {feature.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-card border"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <highlight.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Card className="border-border/50">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="h-48 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <feature.icon className="h-20 w-20 text-primary/60" />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {feature.stats.map((stat, index) => (
                              <div
                                key={index}
                                className="text-center p-4 rounded-lg bg-muted"
                              >
                                <div className="text-2xl font-bold text-primary">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              And so much more
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature you need, included in every plan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature) => (
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why teams choose us
              </h2>
              <p className="text-lg text-muted-foreground">
                See how we compare to the competition
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-6 font-semibold">Feature</th>
                      <th className="text-center p-6 font-semibold text-primary">
                        SaaSFlow
                      </th>
                      <th className="text-center p-6 font-semibold text-muted-foreground">
                        Others
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((comparison, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-6 font-medium">{comparison.feature}</td>
                        <td className="p-6 text-center">
                          <div className="inline-flex items-center gap-2 text-primary font-semibold">
                            <Check className="h-5 w-5" />
                            {comparison.saasflow}
                          </div>
                        </td>
                        <td className="p-6 text-center text-muted-foreground">
                          {comparison.competitor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Roadmap */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Constantly improving
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              New features shipped every month based on your feedback
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recently Shipped</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>AI-powered insights</li>
                <li>Dark mode</li>
                <li>Mobile app v2</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Coming Next</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>Advanced AI chat</li>
                <li>Custom dashboards</li>
                <li>API v2</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">On the Horizon</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>Enterprise SSO</li>
                <li>White-label options</li>
                <li>Advanced analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to experience it?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using these powerful features to
              supercharge their productivity.
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
