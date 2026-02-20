"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ManageSubscriptionButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export function ManageSubscriptionButton({
  children,
  className,
  variant = "outline",
}: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManage = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error opening portal:", error);
      alert(error instanceof Error ? error.message : "Failed to open billing portal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleManage}
      disabled={isLoading}
      className={className}
      variant={variant}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
