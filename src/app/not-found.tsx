import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Home, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page not found
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
          moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific? Try these:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/features"
              className="text-sm text-primary hover:underline"
            >
              Features
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline"
            >
              Pricing
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/demo"
              className="text-sm text-primary hover:underline"
            >
              Book a Demo
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/contact"
              className="text-sm text-primary hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50 inline-block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Try searching or check the URL for typos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
