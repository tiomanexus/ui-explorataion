import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/select";

const meta: Meta = {
  title: "Forms/Select",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem className="text-foreground" value="apple">
            Apple
          </SelectItem>
          <SelectItem className="text-foreground" value="banana">
            Banana
          </SelectItem>
          <SelectItem className="text-foreground" value="mango">
            Mango
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};