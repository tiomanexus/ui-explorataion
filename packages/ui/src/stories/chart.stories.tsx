import type { Meta, StoryObj } from "@storybook/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart";

const meta: Meta = {
  title: "Charts/BarChart",
};

export default meta;

const chartData = [
  { month: "January", sales: 186, revenue: 80 },
  { month: "February", sales: 305, revenue: 200 },
  { month: "March", sales: 237, revenue: 120 },
];

const chartConfig = {
  sales: { label: "Sales", color: "var(--color-primary)" },
  revenue: { label: "Revenue", color: "var(--color-muted-foreground)" },
};

export const Overview: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl p-4">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(v: string) => v.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="sales" fill="var(--color-primary)" radius={4} />
          <Bar dataKey="revenue" fill="var(--color-muted-foreground)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};