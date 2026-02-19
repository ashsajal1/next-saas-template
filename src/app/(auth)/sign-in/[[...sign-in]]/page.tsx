import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | SaaSFlow",
  description: "Sign in to your SaaSFlow account",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl">SaaSFlow</span>
          </Link>
        </div>

        {/* Sign In Form */}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border border-border bg-card p-6 rounded-xl dark:bg-primary dark:border-border/50 dark:backdrop-blur-sm",
              header: "hidden",
              footer: "hidden",
            }
          }}
        />

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
