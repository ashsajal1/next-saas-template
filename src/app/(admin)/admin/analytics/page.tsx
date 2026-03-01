import { BarChart3, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Monthly Active Users", value: "2,847", trend: "+8.2%" },
  { label: "Conversion Rate", value: "4.9%", trend: "+0.6%" },
  { label: "MRR", value: "$48,290", trend: "+24%" },
  { label: "Churn", value: "1.8%", trend: "-0.4%" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Snapshot of growth and business performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-green-500 mt-1">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Growth
            </CardTitle>
            <CardDescription>New users by source (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Organic 41%, Referral 33%, Paid 26%
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly recurring revenue momentum</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Revenue has grown steadily across the last 4 months.
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Engagement
            </CardTitle>
            <CardDescription>Session quality indicators</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Avg session 4m 32s, 6.8 actions/session, 58% return rate.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
