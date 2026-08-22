import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button } from "../components/button";
import { Toaster } from "../components/sonner";

const meta: Meta = {
  title: "Feedback/Sonner",
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