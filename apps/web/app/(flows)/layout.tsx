"use client";

import { usePathname } from "next/navigation";
import { PrototypeChrome } from "@ynvrs/toolbar";
import { flowRegistry } from "@/flows/registry";

export default function FlowsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").filter(Boolean)[0];
  const flows = flowRegistry.map((flow) => ({
    slug: flow.slug,
    name: flow.name,
    href: `/${flow.slug}`,
  }));

  return (
    <PrototypeChrome flows={flows} currentFlowSlug={currentSlug}>
      {children}
    </PrototypeChrome>
  );
}
