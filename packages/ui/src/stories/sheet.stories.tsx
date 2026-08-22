import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/sheet";

const meta: Meta = {
  title: "Overlay/Sheet",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-foreground">Side panel</SheetTitle>
          <SheetDescription>Slides in from the side of the screen.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};