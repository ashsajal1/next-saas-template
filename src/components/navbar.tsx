import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
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


export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
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
              <Link href="/profile">
                <Image
                  width={36}
                  height={36}
                  src={user?.imageUrl!}
                  alt={user?.fullName!}
                  className="rounded-full ring-2 ring-border"
                />
              </Link>
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
