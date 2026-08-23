import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button } from "../components/button";
import { Toaster } from "../components/sonner";

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Sonner",
  component: Toaster,
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <>
      <Toaster />
      <div className="flex gap-3">
        <Button onClick={() => toast("Custom sonner configured")}>
          Trigger
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>
          Show error
        </Button>
      </div>
    </>
  ),
};

export const WithStyledDescription: StoryObj = {
  render: () => (
    <>
      <Toaster descriptionClassName="text-sm font-medium text-blue-500 uppercase tracking-wide" />
      <div className="flex gap-3">
        <Button
          onClick={() =>
            toast.success("Login successful", { description: "Redirecting to dashboard…" })
          }
        >
          Success with description
        </Button>
      </div>
    </>
  ),
};
