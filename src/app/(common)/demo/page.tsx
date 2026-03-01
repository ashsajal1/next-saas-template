"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Video,
  Check,
  Sparkles,
  ArrowRight,
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  Play,
  CalendarDays,
  MessageSquare,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

import { submitDemoRequest } from "./actions";

const demoBenefits = [
  {
    icon: Video,
    title: "Personalized Walkthrough",
    description:
      "See exactly how our platform works for your specific use case and industry.",
  },
  {
    icon: Users,
    title: "Live Q&A Session",
    description:
      "Ask questions in real-time and get answers from our product experts.",
  },
  {
    icon: Zap,
    title: "Quick Setup Guide",
    description:
      "Learn how to get started and see your first results within minutes.",
  },
  {
    icon: BarChart3,
    title: "ROI Calculator",
    description:
      "Calculate your potential savings and productivity gains with our platform.",
  },
];

const whatToExpect = [
  {
    step: "01",
    title: "Introduction",
    duration: "5 min",
    description:
      "We'll learn about your business, current challenges, and what you're looking to achieve.",
  },
  {
    step: "02",
    title: "Live Demo",
    duration: "20 min",
    description:
      "We'll show you the features most relevant to your needs and answer your questions.",
  },
  {
    step: "03",
    title: "Q&A & Next Steps",
    duration: "5 min",
    description:
      "Get all your questions answered and learn about pricing, implementation, and support.",
  },
];

const testimonials = [
  {
    quote:
      "The demo was incredibly helpful. They showed us exactly how to solve our specific problems.",
    author: "Jessica Miller",
    role: "Operations Manager",
    company: "TechCorp",
  },
  {
    quote:
      "Best product demo I've ever had. They actually listened to our needs instead of giving a generic pitch.",
    author: "David Chen",
    role: "CTO",
    company: "StartupXYZ",
  },
  {
    quote:
      "We signed up immediately after the demo. It was clear this was exactly what we needed.",
    author: "Sarah Thompson",
    role: "VP of Product",
    company: "GrowthCo",
  },
];

const teamSizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501+", label: "501+ employees" },
];

const useCaseOptions = [
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "analytics", label: "Analytics & Reporting" },
  { value: "collaboration", label: "Team Collaboration" },
  { value: "enterprise", label: "Enterprise Solutions" },
  { value: "integration", label: "Integration & APIs" },
  { value: "other", label: "Other / Not Sure" },
];

const timeZoneOptions = [
  { value: "pst", label: "Pacific Time (PST/PDT)" },
  { value: "mst", label: "Mountain Time (MST/MDT)" },
  { value: "cst", label: "Central Time (CST/CDT)" },
  { value: "est", label: "Eastern Time (EST/EDT)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "cet", label: "Central European Time (CET)" },
  { value: "other", label: "Other" },
];

const faqs = [
  {
    question: "How long is the demo?",
    answer:
      "Our demos typically last 30 minutes, but we're flexible. If you need more time or have specific questions, just let us know when booking.",
  },
  {
    question: "Who will be on the demo?",
    answer:
      "You'll be matched with a product specialist who understands your industry and use case. They'll be able to answer all your technical and business questions.",
  },
  {
    question: "Is there a recording available?",
    answer:
      "Yes! We can record the demo and share it with your team afterward. Just let us know when booking.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "No problem at all. You'll receive a confirmation email with a link to reschedule. We understand things come up!",
  },
];

export default function DemoPage() {
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [timezone, setTimezone] = useState("");
  const [formState, setFormState] = useState<{
    message: string;
    status: "error" | "idle" | "success";
  }>({
    status: "idle",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("teamSize", teamSize);
    formData.set("useCase", useCase);
    formData.set("timezone", timezone);

    startTransition(async () => {
      const result = await submitDemoRequest(formData);
      setFormState({
        status: result.success ? "success" : "error",
        message: result.message,
      });

      if (result.success) {
        form.reset();
        setTeamSize("");
        setUseCase("");
        setTimezone("");
      }
    });
  };

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
              See it in action
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Book a Personalized{" "}
              <span className="text-primary">Product Demo</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              See exactly how SaaSFlow can help your team save time, reduce
              costs, and scale your operations. No generic pitches — just
              solutions tailored to your needs.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">30 min</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">No Cost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Live</div>
                <div className="text-sm text-muted-foreground">Interactive</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Get a recording to share</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Privacy guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What you&apos;ll get from your demo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every demo is tailored to your specific needs and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {demoBenefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + What to Expect */}
      <section id="book-demo" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Demo Form */}
            <div>
              <Card className="border-border/50 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Book your demo</CardTitle>
                  <CardDescription>
                    Fill out the form and we&apos;ll find a time that works for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          First Name *
                        </label>
                        <Input name="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Last Name *
                        </label>
                        <Input name="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Work Email *
                      </label>
                      <Input
                        name="workEmail"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Company Name *
                      </label>
                      <Input name="company" placeholder="Acme Inc." required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Team Size *
                      </label>
                      <Select value={teamSize} onValueChange={setTeamSize}>
                        <input type="hidden" name="teamSize" value={teamSize} />
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamSizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Primary Use Case *
                      </label>
                      <Select value={useCase} onValueChange={setUseCase}>
                        <input type="hidden" name="useCase" value={useCase} />
                        <SelectTrigger>
                          <SelectValue placeholder="What are you looking for?" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCaseOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Your Timezone *
                      </label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <input type="hidden" name="timezone" value={timezone} />
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZoneOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Preferred Date & Time
                      </label>
                      <Input name="preferredDateTime" type="datetime-local" />
                      <p className="text-xs text-muted-foreground">
                        Or we&apos;ll suggest times based on your timezone
                      </p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          name="recordDemo"
                          type="checkbox"
                          value="yes"
                          className="rounded border-gray-300"
                        />
                        <span>Record the demo for my team</span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Check className="h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" />
                          Book My Demo
                        </>
                      )}
                    </Button>
                    {formState.status !== "idle" && (
                      <p
                        className={`text-sm text-center ${
                          formState.status === "success"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formState.message}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground text-center">
                      By booking a demo, you agree to our{" "}
                      <Link
                        href="/privacy"
                        className="underline hover:text-primary"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* What to Expect */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  What happens next?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Here&apos;s what you can expect from your 30-minute demo session
                </p>
              </div>

              <div className="space-y-6">
                {whatToExpect.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-6 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {item.step}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Highlight */}
              <Card className="bg-primary/5 border-primary/20 mt-8">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    &quot;The demo was incredibly insightful. Within 30 minutes, we
                    saw exactly how SaaSFlow could solve our workflow
                    challenges.&quot;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold">
                      M
                    </div>
                    <div>
                      <p className="font-semibold">Michael Torres</p>
                      <p className="text-sm text-muted-foreground">
                        CTO, Tech Innovations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by teams who&apos;ve seen the demo
            </h2>
            <p className="text-lg text-muted-foreground">
              Here&apos;s what they had to say
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

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our demos
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not ready for a live demo?
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore these other ways to learn about SaaSFlow
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Watch Video</CardTitle>
                  <CardDescription>
                    See a 5-minute product overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="#video">
                    <Button variant="outline" className="w-full">
                      Watch Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our sales team now
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="#chat">
                    <Button variant="outline" className="w-full">
                      Start Chat
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Free Trial</CardTitle>
                  <CardDescription>
                    Try it yourself for 14 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/sign-up">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams who transformed their workflow after
              seeing our demo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#book-demo">
                <Button size="lg" className="gap-2">
                  <Video className="h-4 w-4" />
                  Book My Demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No Commitment Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
