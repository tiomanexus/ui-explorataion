import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../components/menubar";

const meta: Meta = {
  title: "Navigation/Menubar",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="text-foreground">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-foreground">New Tab</MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-foreground">Settings</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-foreground">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-foreground">Undo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};