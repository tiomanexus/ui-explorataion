import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/label";

const meta: Meta = {
  title: "Forms/Label",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Label className="text-foreground">Standalone label</Label>
      <Label>With required</Label>
    </div>
  ),
};