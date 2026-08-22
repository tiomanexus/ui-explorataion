import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "../components/scroll-area";

const meta: Meta = {
  title: "Primitives/ScrollArea",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <ScrollArea className="h-48 w-80 rounded-md border border-border">
      <div className="space-y-2 p-4 text-sm text-muted-foreground">
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="border-b border-border pb-2">
            Scrollable item {i + 1}
          </p>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};