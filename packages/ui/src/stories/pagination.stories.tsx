import type { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/pagination";

const meta: Meta = {
  title: "Navigation/Pagination",
  parameters: { layout: "centered" },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="text-foreground" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-foreground" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-foreground" href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="text-foreground" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};