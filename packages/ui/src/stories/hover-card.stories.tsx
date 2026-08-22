import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/hover-card";

const meta: Meta = {
  title: "Overlay/HoverCard",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@design</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">Design system</CardTitle>
            <CardDescription>Brand tokens kept in lockstep with Paper.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Hover cards surface context on demand.
          </CardContent>
        </Card>
      </HoverCardContent>
    </HoverCard>
  ),
};