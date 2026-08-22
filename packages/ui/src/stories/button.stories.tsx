import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};