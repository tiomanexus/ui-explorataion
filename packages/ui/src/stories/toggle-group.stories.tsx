import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../components/toggle-group";

const meta: Meta = {
  title: "Primitives/ToggleGroup",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};