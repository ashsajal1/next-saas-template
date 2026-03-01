import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  CreditCard,
  Clock,
  Globe,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find quick answers about pricing, security, onboarding, integrations, and support for SaaSFlow.",
};

const faqCategories = [
  {
    name: "Getting Started",
    icon: Zap,
    questions: [
      {
        question: "How do I get started with SaaSFlow?",
        answer:
          "Getting started is easy! Sign up for a free trial, and you'll be up and running in minutes. Our onboarding wizard will guide you through setting up your first workspace and inviting your team members.",
      },
      {
        question: "What features are included in the free trial?",
        answer:
          "Our 14-day free trial includes access to all Pro features, including unlimited projects, team collaboration tools, automation workflows, and analytics. No credit card required to start.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "Most teams are fully set up and running within 30 minutes. Our intuitive interface and pre-built templates make it easy to get started quickly.",
      },
    ],
  },
  {
    name: "Pricing & Billing",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Absolutely! You can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you'll get immediate access to new features. Downgrades take effect at the end of your billing cycle.",
      },
      {
        question: "Do you offer discounts for non-profits?",
        answer:
          "Yes! We offer a 50% discount for verified non-profit organizations and educational institutions. Contact our sales team to learn more.",
      },
    ],
  },
  {
    name: "Security",
    icon: Shield,
    questions: [
      {
        question: "How secure is my data?",
        answer:
          "We take security seriously. All data is encrypted in transit and at rest using AES-256 encryption. We're SOC 2 Type II certified and comply with GDPR, HIPAA, and other major regulations.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your data is stored in secure, SOC 2 compliant data centers in the United States. Enterprise customers can choose from additional regions including Europe and Asia-Pacific.",
      },
      {
        question: "Do you offer two-factor authentication?",
        answer:
          "Yes! We support two-factor authentication (2FA) via authenticator apps and SMS. Team admins can make 2FA mandatory for all team members.",
      },
    ],
  },
  {
    name: "Integrations",
    icon: Globe,
    questions: [
      {
        question: "What integrations do you support?",
        answer:
          "We integrate with 100+ popular tools including Slack, Microsoft Teams, GitHub, Jira, Zapier, Google Workspace, and many more. Check our integrations page for the full list.",
      },
      {
        question: "Can I build custom integrations?",
        answer:
          "Yes! Our robust API allows you to build custom integrations. We also provide webhooks for real-time data sync and a JavaScript SDK for frontend integrations.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Yes! Our mobile apps are available on both iOS and Android. You can manage your projects, respond to notifications, and collaborate with your team on the go.",
      },
    ],
  },
];

const supportOptions = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team in real-time",
    availability: "Available 24/7",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help within 24 hours",
    availability: "support@saasflow.com",
  },
  {
    icon: HelpCircle,
    title: "Documentation",
    description: "Browse our knowledge base",
    availability: "docs.saasflow.com",
  },
];

export default function FaqPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              Help Center
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to know about SaaSFlow. Can&apos;t find the answer
              you&apos;re looking for? Contact our support team.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-12 h-12 text-lg border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => (
              <div key={category.name} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                </div>

                <Card className="border-border/50">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.name}-${index}`}
                        className="px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re here to help. Reach out through any of these channels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supportOptions.map((option) => (
              <Card
                key={option.title}
                className="border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <Card className="border-0 shadow-none bg-transparent">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground mb-2">
                      {option.description}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {option.availability}
                    </p>
                  </div>
                </Card>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using SaaSFlow to work smarter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
