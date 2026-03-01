import { Activity, Lock, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  { event: "Admin login", actor: "admin@saasflow.com", status: "success" },
  { event: "Role updated", actor: "owner@saasflow.com", status: "success" },
  { event: "MFA challenge", actor: "secops@saasflow.com", status: "success" },
  { event: "Failed login", actor: "unknown@external", status: "warning" },
];

export default function AdminSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Security</h1>
        <p className="text-muted-foreground">
          Monitor admin security posture and recent high-risk events.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="h-4 w-4" />
              MFA Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">All admin accounts protected</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldAlert className="h-4 w-4" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">Needs manual review</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Audit Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">246</p>
            <p className="text-sm text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 max-w-3xl">
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>
            Latest account and permission activity for admins.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div
              key={`${event.event}-${event.actor}`}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3"
            >
              <div>
                <p className="font-medium">{event.event}</p>
                <p className="text-sm text-muted-foreground">{event.actor}</p>
              </div>
              <Badge variant={event.status === "warning" ? "secondary" : "outline"}>
                {event.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
