import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../components/skeleton";

const meta: Meta = {
  title: "Primitives/Skeleton",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
};