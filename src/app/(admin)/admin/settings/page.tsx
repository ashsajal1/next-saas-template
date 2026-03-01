import { Bell, Shield, SlidersHorizontal } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    title: "Email Alerts",
    description: "Notify admins about billing and user lifecycle events.",
    icon: Bell,
    enabled: true,
  },
  {
    title: "Strict Admin MFA",
    description: "Require MFA for all admin accounts.",
    icon: Shield,
    enabled: true,
  },
  {
    title: "Experimental Features",
    description: "Enable controlled rollouts in admin tools.",
    icon: SlidersHorizontal,
    enabled: false,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure platform-level behavior and operational defaults.
        </p>
      </div>

      <Card className="border-border/50 max-w-3xl">
        <CardHeader>
          <CardTitle>Platform Controls</CardTitle>
          <CardDescription>
            Toggle settings that affect admin workflows and system behavior.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.map((item) => (
            <div key={item.title} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
              <Switch checked={item.enabled} aria-label={item.title} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
