import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Rocket,
  Heart,
  Target,
  Lightbulb,
  Globe,
  Mail,
  MapPin,
  Calendar,
  Award,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the SaaSFlow team building modern automation tools for fast-growing organizations.",
};

const team = [
  {
    name: "Ashfiquzzaman Sajal",
    role: "Lead Developer",
    description: "Full-stack developer with 8+ years of experience building scalable web applications.",
    image: null,
    github: "https://github.com/ashsajal1",
    linkedin: "https://linkedin.com/in/ashsajal1",
    twitter: "https://twitter.com/ashsajal1",
  },
  {
    name: "John Doe",
    role: "Lead Designer",
    description: "UI/UX designer passionate about creating beautiful and intuitive user experiences.",
    image: null,
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    description: "Experienced product manager focused on delivering value to customers.",
    image: null,
    github: "https://github.com/sarahj",
    linkedin: "https://linkedin.com/in/sarahj",
    twitter: null,
  },
  {
    name: "Michael Chen",
    role: "DevOps Engineer",
    description: "Cloud infrastructure specialist with expertise in AWS and Kubernetes.",
    image: null,
    github: "https://github.com/mchen",
    linkedin: "https://linkedin.com/in/mchen",
    twitter: "https://twitter.com/mchen",
  },
];

const stats = [
  { label: "Team Members", value: "15+", icon: Users },
  { label: "Years Combined Experience", value: "50+", icon: Zap },
  { label: "Projects Delivered", value: "200+", icon: Rocket },
  { label: "Happy Clients", value: "100+", icon: Heart },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're focused on solving real problems for our users.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Every decision we make puts our users first.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries to deliver better solutions.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Building tools that help teams worldwide succeed.",
  },
];

export default function TeamPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              Meet the Team
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              The People Behind{" "}
              <span className="text-primary">SaaSFlow</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a passionate team of designers, developers, and problem solvers
              dedicated to helping teams work smarter.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The talented people who make SaaSFlow possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member) => (
              <Card
                key={member.name}
                className="border-border/50 hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    {member.name[0]}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
                <CardFooter className="justify-center gap-2">
                  {member.github && (
                    <Link href={member.github} target="_blank">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <GitHubLogoIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <LinkedInLogoIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {member.twitter && (
                    <Link href={member.twitter} target="_blank">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <TwitterLogoIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented people to join our mission.
              Check out our open positions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Contact Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
