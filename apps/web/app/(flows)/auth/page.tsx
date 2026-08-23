import { redirect } from "next/navigation";

// Multi-page flows need an index route so the landing page and the toolbar's
// flow switcher (`/<flow-slug>`) land on the first page of the narrative.
export default function AuthFlowIndex() {
  redirect("/auth/login");
}
