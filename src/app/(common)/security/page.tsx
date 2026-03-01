import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Understand SaaSFlow security controls, monitoring, and data protection practices for customer workloads.",
};

const controls = [
  "Encryption in transit (TLS 1.3) and at rest (AES-256)",
  "Role-based access controls and audit logging",
  "Continuous monitoring and incident response",
  "Periodic penetration testing and security reviews",
  "Data backups with geographic redundancy",
  "Security awareness training for internal teams",
];

export default function SecurityPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Shield className="h-4 w-4" />
              Trust Center
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Security <span className="text-primary">Overview</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Security is built into SaaSFlow across infrastructure, product,
              and operational practices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lock className="h-6 w-6 text-primary" />
                  Core Security Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {controls.map((control) => (
                    <div key={control} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-muted-foreground">{control}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a security review?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reach out for compliance questionnaires, architecture details, or
              security documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Contact Security Team
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
