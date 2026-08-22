import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/navigation-menu";

const meta: Meta = {
  title: "Navigation/NavigationMenu",
  parameters: { layout: "centered" },
};

export default meta;

const ListItem = ({ href, title }: { href: string; title: string }) => (
  <li>
    <NavigationMenuLink href={href} className="text-sm text-foreground">
      {title}
    </NavigationMenuLink>
  </li>
);

export const Overview: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <ListItem href="/docs" title="Docs" />
              <ListItem href="/api" title="API Reference" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};