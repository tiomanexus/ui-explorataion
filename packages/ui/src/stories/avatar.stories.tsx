import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";

const meta: Meta = {
  title: "Primitives/Avatar",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">YN</AvatarFallback>
      </Avatar>
    </div>
  ),
};