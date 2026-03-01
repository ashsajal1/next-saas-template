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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Sparkles,
  Check,
  ArrowRight,
  Calendar,
  Video,
  Users,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { contactLeadSchema } from "@/lib/validation/leads";
import { submitContactForm } from "./actions";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "support@saasflow.com",
    link: "mailto:support@saasflow.com",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 6pm",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    action: "Call Now",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant support via chat",
    value: "Available 24/7",
    link: "#chat",
    action: "Start Chat",
  },
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 400",
    state: "CA 94105",
    phone: "+1 (555) 123-4567",
    timezone: "PST (UTC-8)",
  },
  {
    city: "New York",
    address: "456 Broadway, Floor 12",
    state: "NY 10013",
    phone: "+1 (555) 987-6543",
    timezone: "EST (UTC-5)",
  },
  {
    city: "London",
    address: "78 Tech Hub, Shoreditch",
    state: "EC2A 4QE",
    phone: "+44 20 7123 4567",
    timezone: "GMT (UTC+0)",
  },
];

const inquiryTypes = [
  { value: "sales", label: "Sales Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "partnership", label: "Partnership" },
  { value: "enterprise", label: "Enterprise Request" },
  { value: "billing", label: "Billing Question" },
  { value: "other", label: "Other" },
];

const faqs = [
  {
    question: "How quickly will I get a response?",
    answer:
      "We aim to respond to all inquiries within 24 hours during business days. Enterprise customers receive priority support with guaranteed 4-hour response times.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Yes! Professional and Business plan customers have access to phone support during business hours. Enterprise customers receive 24/7 phone support.",
  },
  {
    question: "Can I schedule a demo?",
    answer:
      "Absolutely! Click the 'Schedule Demo' button above to book a personalized demo with our sales team. We offer both video calls and in-person demos.",
  },
  {
    question: "Where are your offices located?",
    answer:
      "We have offices in San Francisco, New York, and London. You're welcome to visit during business hours, or we can arrange a video meeting.",
  },
];

export default function ContactPage() {
  const form = useForm<z.infer<typeof contactLeadSchema>>({
    resolver: zodResolver(contactLeadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      inquiryType: "",
      message: "",
    },
  });
  const [formState, setFormState] = useState<{
    message: string;
    status: "error" | "idle" | "success";
  }>({
    status: "idle",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: z.infer<typeof contactLeadSchema>) => {
    const submission = new FormData();
    submission.set("firstName", values.firstName);
    submission.set("lastName", values.lastName);
    submission.set("email", values.email);
    submission.set("company", values.company || "");
    submission.set("inquiryType", values.inquiryType || "");
    submission.set("message", values.message);

    startTransition(async () => {
      const result = await submitContactForm(submission);
      setFormState({
        status: result.success ? "success" : "error",
        message: result.message,
      });

      if (result.success) {
        form.reset();
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
              We&apos;re here to help
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Let&apos;s Start a{" "}
              <span className="text-primary">Conversation</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you have questions about our platform, need support, or
              want to explore partnership opportunities, we&apos;d love to hear from
              you.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#contact-form">
                <Button size="lg" className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="gap-2">
                  <Video className="h-4 w-4" />
                  Schedule Demo
                </Button>
              </Link>
            </div>

            {/* Response Time Promise */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Response within 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4 text-green-500" />
                <span>24/7 support available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method) => (
              <Card
                key={method.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold mb-4">{method.value}</p>
                  <Link href={method.link}>
                    <Button variant="outline" className="w-full">
                      {method.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section id="contact-form" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          First Name
                        </label>
                        <Input placeholder="John" {...form.register("firstName")} />
                        {form.formState.errors.firstName && (
                          <p className="text-xs text-red-600">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input placeholder="Doe" {...form.register("lastName")} />
                        {form.formState.errors.lastName && (
                          <p className="text-xs text-red-600">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-red-600">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Company Name
                      </label>
                      <Input placeholder="Acme Inc." {...form.register("company")} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Inquiry Type
                      </label>
                      <Controller
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        {...form.register("message")}
                      />
                      {form.formState.errors.message && (
                        <p className="text-xs text-red-600">
                          {form.formState.errors.message.message}
                        </p>
                      )}
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
                          <Send className="h-4 w-4" />
                          Send Message
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
                      By submitting this form, you agree to our{" "}
                      <Link
                        href="/privacy"
                        className="underline hover:text-primary"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/terms"
                        className="underline hover:text-primary"
                      >
                        Terms of Service
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Schedule Demo CTA */}
              <Card className="bg-primary/5 border-primary/20" id="demo">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Schedule a Demo</CardTitle>
                  <CardDescription>
                    See our platform in action with a personalized demo tailored
                    to your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>30-minute personalized walkthrough</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Live Q&A with our product experts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>No commitment required</span>
                    </div>
                  </div>
                  <Link href="/demo">
                    <Button className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Book a Time
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Standard Support</p>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 8am - 6pm (local time)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Enterprise Support</p>
                    <p className="text-sm text-muted-foreground">
                      24/7 phone and email support
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7 for all customers
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit us at one of our global locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {offices.map((office) => (
              <Card
                key={office.city}
                className="group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{office.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {office.address}
                    <br />
                    {office.state}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {office.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Timezone:</span>{" "}
                    {office.timezone}
                  </p>
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
                Quick answers to common questions
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

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using SaaSFlow to streamline their
              workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
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
