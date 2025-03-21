"use client";

import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="p-6 grid place-items-center gap-2">
      <h1 className="text-2xl md:text-5xl font-bold">
        Welcome to our website!
      </h1>
      <div className="flex items-center gap-2">
        <Button>Explore</Button>
        <Button>Explore</Button>
      </div>
    </div>
  );
}
