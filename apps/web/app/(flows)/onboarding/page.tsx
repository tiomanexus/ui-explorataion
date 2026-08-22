"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, StatusBadge } from "@ynvrs/ui";
import { useFlowData } from "@ynvrs/data-client";
import { onboardingDummyData } from "@/data/onboarding/dummy";

export default function OnboardingFlowPage() {
  const { data } = useFlowData({ mode: "dummy", data: onboardingDummyData });

  if (!data) return null;

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {data.user.name.split(" ")[0]}</CardTitle>
          <CardDescription>{data.user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {data.steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{step.label}</span>
              <StatusBadge status={step.status}>{step.status}</StatusBadge>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button>Continue</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
