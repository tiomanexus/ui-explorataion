import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/checkbox";

const meta: Meta = {
  title: "Forms/Checkbox",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex gap-6">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox id="c1" defaultChecked />
        <label htmlFor="c1">Checked</label>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox id="c2" />
        <label htmlFor="c2">Unchecked</label>
      </div>
    </div>
  ),
};