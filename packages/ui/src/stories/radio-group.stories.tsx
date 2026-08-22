import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";

const meta: Meta = {
  title: "Forms/RadioGroup",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <RadioGroupItem value="a" id="ra" />
        <label htmlFor="ra">Option A</label>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <RadioGroupItem value="b" id="rb" />
        <label htmlFor="rb">Option B</label>
      </div>
    </RadioGroup>
  ),
};