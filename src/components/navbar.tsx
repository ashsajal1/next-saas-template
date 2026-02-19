import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Bell, Menu } from "lucide-react";
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
    <nav className="p-4 z-10 fixed backdrop-blur-2xl top-0 w-full h-[80px] border-b flex items-center justify-between">
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
        <Link className="font-bold cursor-pointer" href="/">
          Logo
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavbarLogic className="flex items-center gap-6" />
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <Link href="/notification">
          <Button size={"icon"} variant={"outline"}>
            <Bell className="w-4 h-4" />
          </Button>
        </Link>
        <SignedIn>
          <Link href="/profile">
            <Image
              width={35}
              height={35}
              src={user?.imageUrl!}
              alt={user?.fullName!}
              className="rounded-full"
            />
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
