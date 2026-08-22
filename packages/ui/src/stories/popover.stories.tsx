import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../components/popover";

const meta: Meta = {
  title: "Overlay/Popover",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle className="text-foreground">Dimensions</PopoverTitle>
          <PopoverDescription>Set the width of the popover.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};