import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/collapsible";

const meta: Meta = {
  title: "Primitives/Collapsible",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
        <span className="text-sm font-medium text-foreground">Toggle content</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Expand
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
        Hidden content revealed on toggle.
      </CollapsibleContent>
    </Collapsible>
  ),
};