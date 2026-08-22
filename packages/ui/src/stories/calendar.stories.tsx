import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "../components/calendar";

const meta: Meta = {
  title: "Forms/Calendar",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => <Calendar className="rounded-md border border-border shadow-sm" />,
};