"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ynvrs/ui";
import { useFlowData } from "@ynvrs/data-client";
import { dashboardDummyData } from "../_data/dashboard";

export default function DashboardPage() {
  const { data } = useFlowData({ mode: "dummy", data: dashboardDummyData });

  if (!data) return null;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Hello, {data.user.name}
          </h1>
          <p className="text-sm text-muted-foreground">{data.user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.assign("/auth/login")}>
          Log out
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="flex flex-col gap-1 pt-6">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Latest events across your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {data.activity.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0">
              <span className="text-sm text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
