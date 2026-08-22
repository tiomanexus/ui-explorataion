import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../components/slider";

const meta: Meta = {
  title: "Forms/Slider",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => <Slider defaultValue={[40]} max={100} step={1} className="w-80" />,
};