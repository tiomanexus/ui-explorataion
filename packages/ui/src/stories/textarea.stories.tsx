import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/textarea";

const meta: Meta = {
  title: "Forms/Textarea",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="w-80">
      <Textarea placeholder="Type a message..." className="min-h-24" />
    </div>
  ),
};