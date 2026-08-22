import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/drawer";

const meta: Meta = {
  title: "Overlay/Drawer",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-foreground">Settings</DrawerTitle>
          <DrawerDescription>Drag down to dismiss.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};