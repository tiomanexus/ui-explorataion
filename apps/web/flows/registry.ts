export interface PageManifest {
  slug: string;
  name: string;
  href: string;
}

export interface FlowManifest {
  slug: string;
  name: string;
  description: string;
  /** Default data mode for this flow — pages inside it can still opt into "api" individually. */
  dataMode: "dummy" | "api";
  /** Pages inside this flow, in narrative order — powers the toolbar's Pages switcher. */
  pages: PageManifest[];
}

// Add a new flow: create `app/(flows)/<slug>/page.tsx` (or `<slug>/<page>/page.tsx`
// for multi-page flows) and add an entry here so it shows up on the landing page,
// in the toolbar's flow switcher, and in the pages switcher.
export const flowRegistry: FlowManifest[] = [
  {
    slug: "auth",
    name: "Auth",
    description: "Login with success/failure states through to the dashboard.",
    dataMode: "dummy",
    pages: [
      { slug: "login", name: "Login", href: "/auth/login" },
      { slug: "dashboard", name: "Dashboard", href: "/auth/dashboard" },
    ],
  },
  {
    slug: "onboarding",
    name: "Onboarding",
    description: "New user onboarding — account setup through first project creation.",
    dataMode: "dummy",
    pages: [{ slug: "index", name: "Overview", href: "/onboarding" }],
  },
];

export function getFlow(slug: string): FlowManifest | undefined {
  return flowRegistry.find((flow) => flow.slug === slug);
}
