import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/badge";

const meta: Meta = {
  title: "Primitives/Badge",
  parameters: { layout: "centered" },
};

export default meta;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
};