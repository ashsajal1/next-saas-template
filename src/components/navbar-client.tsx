"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Bell, Menu, Zap } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavbarLogic from "./navbar-logic";

export default function NavbarClient() {
  const { user, isLoaded } = useUser();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-0 ${
        hasScrolled 
          ? "border-b bg-background/80 backdrop-blur-xl" 
          : "bg-transparent border-b-0"
      }`}
    >
      {/* Background gradient - only visible when scrolled */}
      {hasScrolled && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <NavbarLogic className="flex flex-col gap-4" isMobile />
                </div>
              </SheetContent>
            </Sheet>
            <Link className="flex items-center gap-2 font-bold text-xl" href="/">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>SaaSFlow</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavbarLogic className="flex items-center gap-8" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            <SignedIn>
              <Link href="/notification">
                <Button size="icon" variant="outline" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                </Button>
              </Link>
              {isLoaded && user && (
                <Link href="/profile">
                  <Image
                    width={36}
                    height={36}
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="rounded-full ring-2 ring-border"
                  />
                </Link>
              )}
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="hidden sm:block">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="gap-2">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
