
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
  Sparkles,
  Target,
  Zap,
  Heart,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SaaSFlow's mission, values, team, and journey building workflow automation for modern teams.",
};

const companyStats = [
  { value: "2019", label: "Founded" },
  { value: "150+", label: "Team Members" },
  { value: "10,000+", label: "Customers" },
  { value: "50+", label: "Countries" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description:
      "We build what our customers need. Every feature, every update is driven by real user feedback and pain points.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description:
      "Speed is our competitive advantage. We ship updates weekly and respond to customer needs within hours, not weeks.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your data is sacred. We maintain the highest security standards and are transparent about how we handle your information.",
  },
  {
    icon: Heart,
    title: "Passion for Excellence",
    description:
      "Good enough isn't good enough. We obsess over the details to deliver a product that exceeds expectations.",
  },
];

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Founded in a small apartment with a simple mission: make work less work.",
  },
  {
    year: "2020",
    title: "First 1,000 Customers",
    description:
      "Grew rapidly as remote work became essential. Raised seed funding to accelerate development.",
  },
  {
    year: "2021",
    title: "Series A & Team Growth",
    description:
      "Expanded to 50+ team members and opened offices in New York and London.",
  },
  {
    year: "2022",
    title: "Enterprise Launch",
    description:
      "Launched enterprise features and achieved SOC 2 compliance. Signed first Fortune 500 customers.",
  },
  {
    year: "2023",
    title: "AI-Powered Features",
    description:
      "Introduced AI-powered automation and analytics. Reached 10,000+ active teams.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Expanded to 50+ countries and launched mobile apps. Processing 1B+ automated tasks monthly.",
  },
];

const leadership = [
  {
    name: "Alex Rivera",
    role: "CEO & Co-Founder",
    bio: "Former Product Lead at Google. Passionate about building tools that help teams work smarter.",
    avatar: "AR",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-Founder",
    bio: "Ex-Microsoft engineer with 15+ years in distributed systems and automation.",
    avatar: "SC",
  },
  {
    name: "Michael Torres",
    role: "Chief Product Officer",
    bio: "Led product at Slack and Dropbox. Expert in SaaS product strategy and growth.",
    avatar: "MT",
  },
  {
    name: "Emily Watson",
    role: "VP of Engineering",
    bio: "Scaled engineering teams at Spotify and Uber. Focused on building high-performance teams.",
    avatar: "EW",
  },
];

const awards = [
  { name: "G2 Leader 2024", category: "Workflow Automation" },
  { name: "Capterra Best Value", category: "Project Management" },
  { name: "Gartner Cool Vendor", category: "Enterprise Software" },
  { name: "Product Hunt #1", category: "Product of the Month" },
];

export default function AboutPage() {
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
              Our Story
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              We&apos;re on a Mission to{" "}
              <span className="text-primary">Transform Work</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              SaaSFlow started with a simple idea: what if work didn&apos;t have to
              feel like work? Today, we&apos;re helping 10,000+ teams automate the
              mundane and focus on what matters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/team">
                <Button size="lg" className="gap-2">
                  Meet Our Team
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {companyStats.map((stat) => (
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

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why we exist
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that too much of our workday is spent on repetitive,
                manual tasks that drain creativity and energy. Our mission is to
                give that time back.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Every feature we build, every integration we add, every update
                we ship is designed to help you work smarter, not harder. We
                want you to focus on the work that truly matters — the creative,
                strategic, human work that drives real impact.
              </p>
              <div className="space-y-3">
                {[
                  "Save 20+ hours per week on average",
                  "Reduce operational costs by 40%",
                  "Scale without adding headcount",
                  "Improve team satisfaction scores",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <TrendingUp className="h-8 w-8 text-primary mb-4" />
                      <div className="text-3xl font-bold">3x</div>
                      <p className="text-sm text-muted-foreground">
                        Average productivity gain
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <Users className="h-8 w-8 text-primary mb-4" />
                      <div className="text-3xl font-bold">98%</div>
                      <p className="text-sm text-muted-foreground">
                        Customer satisfaction
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card>
                    <CardContent className="pt-6">
                      <Globe className="h-8 w-8 text-primary mb-4" />
                      <div className="text-3xl font-bold">50+</div>
                      <p className="text-sm text-muted-foreground">
                        Countries served
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <Rocket className="h-8 w-8 text-primary mb-4" />
                      <div className="text-3xl font-bold">10M+</div>
                      <p className="text-sm text-muted-foreground">
                        Tasks automated monthly
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <Card
                key={value.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              From a small idea to a global platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex gap-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10">
                      {milestone.year.slice(2)}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="text-sm text-primary font-semibold mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind SaaSFlow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {leadership.map((leader) => (
              <Card
                key={leader.name}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {leader.avatar}
                  </div>
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {leader.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/team">
              <Button variant="outline" size="lg">
                Meet the Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Recognition
            </h2>
            <p className="text-lg text-muted-foreground">
              Awards and accolades we&apos;re proud of
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {awards.map((award) => (
              <Card
                key={award.name}
                className="text-center hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{award.name}</CardTitle>
                  <CardDescription>{award.category}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Want to join us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented people who are passionate about
              building the future of work. Check out our open positions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/team">
                <Button size="lg" className="gap-2">
                  Meet the Team
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Remote-first culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>Great benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  <span>Fast-growing team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
