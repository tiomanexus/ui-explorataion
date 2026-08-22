import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";

const meta: Meta = {
  title: "Overlay/Dialog",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit profile</DialogTitle>
          <DialogDescription>Make changes and save to continue.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};