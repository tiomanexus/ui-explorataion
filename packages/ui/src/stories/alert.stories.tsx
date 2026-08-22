import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";

const meta: Meta = {
  title: "Primitives/Alert",
  parameters: { layout: "centered" },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="w-96 space-y-3">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Uses the muted surface from the design tokens.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Uses the destructive token (red-600).</AlertDescription>
      </Alert>
    </div>
  ),
};