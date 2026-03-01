import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Mail, MessageSquare, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { checkRole } from "@/lib/roles";

export default async function LeadsPage() {
  if (!checkRole("admin")) {
    notFound();
  }

  const [contactLeads, demoLeads] = await Promise.all([
    prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
    prisma.demoLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="mb-3 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Leads</h1>
        <p className="text-muted-foreground">
          Track contact and demo requests captured from marketing pages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contact Leads</CardTitle>
            <CardDescription>Inbound support and sales inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{contactLeads.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Demo Leads</CardTitle>
            <CardDescription>Qualified product demo requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{demoLeads.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Contact Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactLeads.length === 0 && (
              <p className="text-sm text-muted-foreground">No contact submissions yet.</p>
            )}
            {contactLeads.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-border/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <Badge variant="secondary">{lead.inquiryType || "general"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3" />
                  {lead.email}
                </p>
                {lead.company && (
                  <p className="text-sm text-muted-foreground mt-1">{lead.company}</p>
                )}
                <p className="text-sm mt-2 line-clamp-2">{lead.message}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  <Calendar className="h-3 w-3" />
                  {lead.createdAt.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Demo Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoLeads.length === 0 && (
              <p className="text-sm text-muted-foreground">No demo requests yet.</p>
            )}
            {demoLeads.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-border/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <Badge variant="outline">{lead.teamSize}</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="h-3 w-3" />
                  {lead.workEmail}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {lead.company} • {lead.useCase}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  <Calendar className="h-3 w-3" />
                  {lead.createdAt.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
