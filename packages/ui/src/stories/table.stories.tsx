import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";

const meta: Meta = {
  title: "Data/Table",
  parameters: { layout: "centered" },
};

export default meta;

const rows = [
  { id: 1, name: "Ada", role: "Engineer" },
  { id: 2, name: "Grace", role: "Designer" },
  { id: 3, name: "Alan", role: "Researcher" },
];

export const Overview: StoryObj = {
  render: () => (
    <div className="w-96 rounded-md border border-border">
      <Table>
        <TableCaption>Team members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium text-foreground">{row.name}</TableCell>
              <TableCell className="text-muted-foreground">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};