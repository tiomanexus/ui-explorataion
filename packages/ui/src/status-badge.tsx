import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./lib/utils";

const statusBadge = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        neutral: "bg-muted text-muted-foreground",
        info: "bg-primary/10 text-primary",
        success: "bg-success/15 text-success",
        warning: "bg-warning/15 text-warning",
        danger: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  },
);

export type StatusBadgeVariants = VariantProps<typeof statusBadge>;

export interface StatusBadgeProps extends StatusBadgeVariants {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  return <span className={cn(statusBadge({ status }), className)}>{children}</span>;
}