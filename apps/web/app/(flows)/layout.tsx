"use client";

import { usePathname } from "next/navigation";
import { PrototypeChrome } from "@ynvrs/toolbar";
import { flowRegistry, getFlow } from "@/flows/registry";

export default function FlowsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentSlug = segments[0];
  const currentFlow = getFlow(currentSlug ?? "");
  const flows = flowRegistry.map((flow) => ({
    slug: flow.slug,
    name: flow.name,
    href: `/${flow.slug}`,
  }));

  return (
    <PrototypeChrome
      flows={flows}
      pages={currentFlow?.pages.map((page) => ({ slug: page.slug, name: page.name, href: page.href }))}
      currentFlowSlug={currentSlug}
      currentPageHref={pathname}
    >
      {children}
    </PrototypeChrome>
  );
}
