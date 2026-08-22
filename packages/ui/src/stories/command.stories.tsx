import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/command";

const meta: Meta = {
  title: "Overlay/Command",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Command className="w-80 rounded-lg border border-border shadow-sm">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem className="text-foreground">
            Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem className="text-foreground">
            Calendar <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          <CommandItem className="text-foreground">Design tokens</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};