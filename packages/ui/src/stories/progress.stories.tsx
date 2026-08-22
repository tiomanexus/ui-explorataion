import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../components/progress";

const meta: Meta = {
  title: "Primitives/Progress",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={60} className="h-2" />
      <Progress value={100} className="h-2" />
    </div>
  ),
};