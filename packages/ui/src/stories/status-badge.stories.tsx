import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "../status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "Primitives/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  argTypes: {
    status: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Neutral: Story = { args: { status: "neutral", children: "Neutral" } };
export const Info: Story = { args: { status: "info", children: "Info" } };
export const Success: Story = { args: { status: "success", children: "Success" } };
export const Warning: Story = { args: { status: "warning", children: "Warning" } };
export const Danger: Story = { args: { status: "danger", children: "Danger" } };

export const AllStatuses: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8">
      <StatusBadge status="neutral">Neutral</StatusBadge>
      <StatusBadge status="info">Info</StatusBadge>
      <StatusBadge status="success">Success</StatusBadge>
      <StatusBadge status="warning">Warning</StatusBadge>
      <StatusBadge status="danger">Danger</StatusBadge>
    </div>
  ),
};