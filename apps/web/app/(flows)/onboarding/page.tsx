"use client";

import { Button, Card, StatusBadge } from "@mnx/ui";
import { useFlowData } from "@mnx/data-client";
import { onboardingDummyData } from "@/data/onboarding/dummy";

export default function OnboardingFlowPage() {
  const { data } = useFlowData({ mode: "dummy", data: onboardingDummyData });

  if (!data) return null;

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Card>
        <Card.Header>
          <Card.Title>Welcome, {data.user.name.split(" ")[0]}</Card.Title>
          <Card.Description>{data.user.email}</Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3">
          {data.steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between">
              <span className="text-sm text-surface-foreground">{step.label}</span>
              <StatusBadge status={step.status}>{step.status}</StatusBadge>
            </div>
          ))}
        </Card.Content>
        <Card.Footer>
          <Button>Continue</Button>
        </Card.Footer>
      </Card>
    </main>
  );
}
