import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Shield, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up | SaaSFlow",
  description: "Create your SaaSFlow account and start automating your workflows today. Free 14-day trial.",
};

const features = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
  "Full feature access"
];

const benefits = [
  {
    icon: Zap,
    title: "Get Started in Minutes",
    description: "Set up your first workflow automation in under 5 minutes"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with SOC 2 compliance"
  },
  {
    icon: Clock,
    title: "Save 20+ Hours/Week",
    description: "Automate repetitive tasks and focus on what matters"
  }
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Marketing */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-8 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl">SaaSFlow</span>
          </Link>

          {/* Content */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Start your free trial
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Join 10,000+ teams<br />
              <span className="text-primary">working smarter</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your account today and start automating your workflows in minutes.
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-wrap gap-3 mb-8">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <blockquote className="text-lg italic mb-4">
              &quot;SaaSFlow transformed how our team works. We&apos;ve saved 25 hours per week on manual tasks.&quot;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold">
                S
              </div>
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">CEO, TechStart Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-background">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 font-bold text-xl mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>SaaSFlow</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create account</h2>
            <p className="text-muted-foreground">
              Start your free 14-day trial today
            </p>
          </div>

          {/* Free trial badge */}
          <div className="flex flex-wrap gap-2 mb-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Clerk SignUp component */}
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
                header: "hidden",
                footer: "hidden",
                socialButtons: "gap-3",
                socialButtonsBlockButton: "h-11 border-border hover:bg-muted",
                formFieldInput: "h-11 border-border focus:ring-primary",
                formButtonPrimary: "h-11 bg-primary hover:bg-primary/90",
                dividerRow: "my-6",
                formFieldLabel: "text-sm font-medium",
              }
            }}
          />

          {/* Footer links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
