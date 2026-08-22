import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";

const meta: Meta = {
  title: "Navigation/Tabs",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" className="text-foreground">
          Account
        </TabsTrigger>
        <TabsTrigger value="settings" className="text-foreground">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted-foreground">
        Manage your account details.
      </TabsContent>
      <TabsContent value="settings" className="text-sm text-muted-foreground">
        Adjust application settings.
      </TabsContent>
    </Tabs>
  ),
};