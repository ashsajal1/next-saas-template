"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { forwardRef } from "react";

const links = [
  { href: "/products", label: "Products" },
  { href: "/features", label: "Features" },

  { href: "/use-cases", label: "Use Cases" },
  { href: "/pricing", label: "Pricing" },
];

interface NavbarLogicProps {
  className?: string;
  isMobile?: boolean;
}

export default function NavbarLogic({ className, isMobile }: NavbarLogicProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {links.map((link) => {
        const LinkComponent = (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-primary",
              pathname === link.href
                ? "text-primary font-semibold"
                : "text-muted-foreground",
            )}
          >
            {link.label}
          </Link>
        );

        if (isMobile) {
          return (
            <SheetClose asChild key={link.href}>
              {LinkComponent}
            </SheetClose>
          );
        }

        return LinkComponent;
      })}
    </div>
  );
}
