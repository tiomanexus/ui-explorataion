import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card";

const meta: Meta = {
  title: "Primitives/Card",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Sample card</CardTitle>
        <CardDescription>A styled card using the brand design tokens.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">Content goes here.</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">Footer</span>
      </CardFooter>
    </Card>
  ),
};