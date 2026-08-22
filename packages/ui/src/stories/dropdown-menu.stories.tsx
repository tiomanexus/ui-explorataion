import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";

const meta: Meta = {
  title: "Overlay/DropdownMenu",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="text-foreground">Profile</DropdownMenuItem>
        <DropdownMenuItem className="text-foreground">Billing</DropdownMenuItem>
        <DropdownMenuItem className="text-foreground">Team</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};