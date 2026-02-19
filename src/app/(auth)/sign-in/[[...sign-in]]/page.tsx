import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Shield, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | SaaSFlow",
  description: "Sign in to your SaaSFlow account to access your dashboard and manage your workflows.",
};

const benefits = [
  {
    icon: Zap,
    title: "Automate Workflows",
    description: "Save 20+ hours per week with intelligent automation"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with unlimited team members"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help whenever you need it"
  }
];

export default function SignInPage() {
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
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome back to<br />
              <span className="text-primary">SaaSFlow</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to access your dashboard and continue automating your workflows.
            </p>
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

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 10,000+ teams worldwide
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 font-semibold">4.9/5</span>
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
            <h2 className="text-3xl font-bold mb-2">Sign in</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Clerk SignIn component */}
          <SignIn 
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
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline font-medium">
                Sign up
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
          </div>
        </div>
      </div>
    </div>
  );
}
