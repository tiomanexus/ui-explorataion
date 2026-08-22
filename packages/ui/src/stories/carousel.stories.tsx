import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/carousel";

const meta: Meta = {
  title: "Navigation/Carousel",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"].map((label) => (
          <CarouselItem key={label} className="basis-1/3">
            <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-muted text-sm text-muted-foreground">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};