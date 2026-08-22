import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";

const meta: Meta = {
  title: "Primitives/Accordion",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-foreground">Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-foreground">Is it tokenized?</AccordionTrigger>
        <AccordionContent>
          Yes. All colors, spacing, and radii come from the Paper design tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-foreground">Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It is animated with tw-animate-css.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};