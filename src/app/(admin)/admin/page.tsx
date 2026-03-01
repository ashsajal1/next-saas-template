
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Active Now",
    value: "2,847",
    change: "+8%",
    changeType: "positive",
    icon: Activity,
  },
  {
    title: "Revenue",
    value: "$48,290",
    change: "+24%",
    changeType: "positive",
    icon: CreditCard,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "-2%",
    changeType: "negative",
    icon: Clock,
  },
];

const quickActions = [
  {
    title: "Manage Users",
    description: "View and manage user accounts, roles, and permissions",
    icon: Users,
    href: "/admin",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Leads Inbox",
    description: "Review contact and demo submissions",
    icon: MessageSquare,
    href: "/admin/leads",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "View Analytics",
    description: "Track growth, usage, and performance metrics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Settings",
    description: "Configure system settings and preferences",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-gray-500/10 text-gray-500",
  },
  {
    title: "Security",
    description: "Review security logs and manage access controls",
    icon: Shield,
    href: "/admin/security",
    color: "bg-red-500/10 text-red-500",
  },
];

const recentActivity = [
  { action: "New user signed up", user: "john@example.com", time: "2 minutes ago" },
  { action: "Payment received", user: "sarah@company.com", time: "15 minutes ago" },
  { action: "Subscription upgraded", user: "mike@startup.io", time: "1 hour ago" },
  { action: "New team created", user: "admin@enterprise.com", time: "2 hours ago" },
  { action: "Password reset requested", user: "lisa@client.net", time: "3 hours ago" },
];

export default function AdminPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your platform, users, and analytics from one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span>from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks and navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform events and actions
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Top Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise Plan</span>
                  <Badge variant="secondary">+42%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Team Seats</span>
                  <Badge variant="secondary">+28%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Add-ons</span>
                  <Badge variant="secondary">+15%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                User Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Free Trial</span>
                  <Badge>3,421</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pro Plan</span>
                  <Badge>6,892</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise</span>
                  <Badge>2,032</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-purple-500" />
                Revenue Mix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly Recurring</span>
                  <Badge variant="outline">$42,500</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Annual</span>
                  <Badge variant="outline">$5,790</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">One-time</span>
                  <Badge variant="outline">$0</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
