import type { Meta, StoryObj } from "@storybook/react";
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
        <Button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("toast", { detail: { title: "Custom sonner configured" } }),
            )
          }
        >
          Trigger
        </Button>
      </div>
    </>
  ),
};