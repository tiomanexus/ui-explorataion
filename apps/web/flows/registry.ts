export interface FlowManifest {
  slug: string;
  name: string;
  description: string;
  /** Default data mode for this flow — pages inside it can still opt into "api" individually. */
  dataMode: "dummy" | "api";
}

// Add a new flow: create `app/(flows)/<slug>/page.tsx` and add an entry here
// so it shows up on the landing page and in the toolbar's flow switcher.
export const flowRegistry: FlowManifest[] = [
  {
    slug: "onboarding",
    name: "Onboarding",
    description: "New user onboarding — account setup through first project creation.",
    dataMode: "dummy",
  },
];

export function getFlow(slug: string): FlowManifest | undefined {
  return flowRegistry.find((flow) => flow.slug === slug);
}
