import { tv, type VariantProps } from "tailwind-variants";

/**
 * Example of a fully custom component with no HeroUI base — built with the
 * same primitives (tv, semantic color tokens, radius scale) so it stays
 * visually and behaviorally consistent with HeroUI components.
 */
const statusBadge = tv({
  base: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  variants: {
    status: {
      neutral: "bg-default text-default-foreground",
      info: "bg-accent-soft text-accent-soft-foreground",
      success: "bg-success-soft text-success-soft-foreground",
      warning: "bg-warning-soft text-warning-soft-foreground",
      danger: "bg-danger-soft text-danger-soft-foreground",
    },
  },
  defaultVariants: {
    status: "neutral",
  },
});

export type StatusBadgeVariants = VariantProps<typeof statusBadge>;

export interface StatusBadgeProps extends StatusBadgeVariants {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  return <span className={statusBadge({ status, className })}>{children}</span>;
}
