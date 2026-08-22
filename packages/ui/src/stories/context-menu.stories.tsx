import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../components/context-menu";

const meta: Meta = {
  title: "Overlay/ContextMenu",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-80 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem className="text-foreground">
          Profile <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem className="text-foreground">
          Billing <ContextMenuShortcut>⌘B</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" className="text-foreground">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};