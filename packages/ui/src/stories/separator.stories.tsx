import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../components/separator";

const meta: Meta = {
  title: "Primitives/Separator",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex w-80 flex-col gap-3 text-sm text-muted-foreground">
      <span>Above</span>
      <Separator />
      <span>Below</span>
    </div>
  ),
};