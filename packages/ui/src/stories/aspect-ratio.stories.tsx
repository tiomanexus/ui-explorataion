import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "../components/aspect-ratio";

const meta: Meta = {
  title: "Primitives/AspectRatio",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="w-80">
      <div className="rounded-lg overflow-hidden bg-muted">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            16 / 9
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};