import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: { layout: "centered" },
  argTypes: { type: { control: "inline-radio", options: ["text", "password", "email"] } },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter your name", className: "w-80" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true, className: "w-80" },
};