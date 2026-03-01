import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review SaaSFlow terms of service for account usage, billing, responsibilities, and legal limitations.",
};

const sections = [
  {
    title: "Service Use",
    content:
      "You agree to use SaaSFlow in compliance with applicable laws and not misuse, disrupt, or attempt unauthorized access to the service.",
  },
  {
    title: "Accounts and Billing",
    content:
      "You are responsible for maintaining account security and for charges incurred under your subscription plan according to your billing cycle.",
  },
  {
    title: "Data and Privacy",
    content:
      "We handle your information as described in our Privacy Policy, and we implement safeguards to protect account and usage data.",
  },
  {
    title: "Limitations",
    content:
      "Except where prohibited by law, SaaSFlow is provided on an as-is basis and liability is limited to the maximum extent permitted by law.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Scale className="h-4 w-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              These terms govern your use of SaaSFlow and define the rights and
              responsibilities for all users.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.title} className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions about these terms?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our team for clarification on account, billing, or legal
              obligations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Contact Legal Team
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/privacy">
                <Button variant="outline" size="lg">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
