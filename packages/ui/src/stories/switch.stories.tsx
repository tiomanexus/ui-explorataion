import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../components/switch";

const meta: Meta = {
  title: "Forms/Switch",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Switch id="s1" defaultChecked />
        <label htmlFor="s1">Enabled</label>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Switch id="s2" />
        <label htmlFor="s2">Disabled</label>
      </div>
    </div>
  ),
};