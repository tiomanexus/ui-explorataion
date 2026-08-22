import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic } from "lucide-react";
import { Toggle } from "../components/toggle";

const meta: Meta = {
  title: "Primitives/Toggle",
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle aria-label="Bold">
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <Italic className="size-4" />
      </Toggle>
    </div>
  ),
};