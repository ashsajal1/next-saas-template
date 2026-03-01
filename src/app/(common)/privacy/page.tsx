
import type { Metadata } from "next";

import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Clock,
  Mail,
  FileText,
  Check,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read SaaSFlow's privacy policy covering data collection, processing, retention, and user rights.",
};

const lastUpdated = "February 19, 2026";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
    content: [
      "SaaSFlow (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, products, and services.",
      "By using SaaSFlow, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.",
    ],
  },
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Database,
    content: [
      "We collect several types of information from and about users of our services:",
    ],
    list: [
      "Personal Information: Name, email address, phone number, company name, job title",
      "Account Information: Username, password, account preferences",
      "Usage Data: How you interact with our services, features used, time spent",
      "Device Information: IP address, browser type, operating system, device identifiers",
      "Cookies and Tracking Technologies: Session cookies, persistent cookies, web beacons",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: Eye,
    content: ["We use the information we collect for various purposes:"],
    list: [
      "To provide and maintain our services",
      "To notify you about changes to our services",
      "To provide customer support",
      "To gather analysis or valuable information to improve our services",
      "To monitor the usage of our services",
      "To detect, prevent and address technical issues",
      "To send you newsletters, marketing or promotional materials (with your consent)",
    ],
  },
  {
    id: "data-sharing",
    title: "Information Sharing and Disclosure",
    icon: Globe,
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:",
    ],
    list: [
      "Service Providers: We may employ third-party companies to facilitate our services",
      "Business Transfers: If we are involved in a merger, acquisition, or asset sale",
      "Legal Requirements: To comply with legal obligations or protect our rights",
      "With Your Consent: When you give us explicit permission to share your information",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      "The security of your data is important to us. We implement industry-standard security measures:",
    ],
    list: [
      "Encryption: All data is encrypted in transit (TLS 1.3) and at rest (AES-256)",
      "Access Controls: Role-based access control and multi-factor authentication",
      "Regular Audits: Security assessments and penetration testing",
      "SOC 2 Compliance: We maintain SOC 2 Type II certification",
      "Data Backup: Regular automated backups with geographic redundancy",
    ],
  },
  {
    id: "your-rights",
    title: "Your Data Rights",
    icon: UserCheck,
    content: [
      "Depending on your location, you may have certain rights regarding your personal data:",
    ],
    list: [
      "Right to Access: Request a copy of your personal data",
      "Right to Rectification: Request correction of inaccurate data",
      "Right to Erasure: Request deletion of your personal data",
      "Right to Restrict Processing: Request limitation of data processing",
      "Right to Data Portability: Receive data in a structured format",
      "Right to Object: Object to processing of your personal data",
    ],
  },
];

const dataRetention = [
  {
    type: "Account Information",
    period: "As long as your account is active",
    note: "Deleted 30 days after account closure",
  },
  {
    type: "Usage Data",
    period: "24 months",
    note: "Anonymized after 12 months",
  },
  {
    type: "Payment Information",
    period: "7 years",
    note: "Required for tax and legal compliance",
  },
  {
    type: "Marketing Data",
    period: "Until you unsubscribe",
    note: "Can be deleted immediately upon request",
  },
];

export default function PrivacyPage() {
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
              <Shield className="h-4 w-4" />
              Your Privacy Matters
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We take your privacy seriously. Learn how we collect, use, and protect your personal information.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-6 text-center">Table of Contents</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {sections.map((section, index) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{section.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="space-y-3 mt-4">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Retention Section */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                How long we keep your information
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 font-semibold text-sm">
                    <div>Data Type</div>
                    <div>Retention Period</div>
                    <div>Notes</div>
                  </div>
                  {dataRetention.map((item) => (
                    <div key={item.type} className="grid grid-cols-3 gap-4 p-4 text-sm">
                      <div className="font-medium">{item.type}</div>
                      <div className="text-muted-foreground">{item.period}</div>
                      <div className="text-muted-foreground">{item.note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">International Data Transfers</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
              </p>
              <p>
                If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including personal data, to the United States and process it there.
              </p>
              <p>
                We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses approved by the European Commission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies Section */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Cookies and Tracking</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Essential Cookies</CardTitle>
                  <CardDescription>
                    Required for the website to function properly. Cannot be disabled.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics Cookies</CardTitle>
                  <CardDescription>
                    Help us understand how visitors interact with our website.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Contact Us</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>By email: privacy@saasflow.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>By visiting: saasflow.com/contact</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Data Protection Officer: dpo@saasflow.com</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-semibold mb-2">Data Protection Authority</h3>
              <p className="text-sm text-muted-foreground">
                You have the right to lodge a complaint with your local data protection authority if you believe we have not complied with applicable data protection laws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your trust is our priority
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;re committed to transparency and protecting your data. If you have any questions or concerns, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Contact Privacy Team
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/security">
                <Button variant="outline" size="lg">
                  Security Overview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
