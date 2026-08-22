import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/resizable";

const meta: Meta = {
  title: "Layout/Resizable",
  parameters: { layout: "padded" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-full rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Panel A
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Panel B
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};