"use client";

import dynamic from "next/dynamic";

// Dev-only visual feedback tool for agents — never rendered in production.
const Agentation = dynamic(() => import("agentation").then((mod) => mod.Agentation), {
  ssr: false,
});

export function AgentationDevTool() {
  if (process.env.NODE_ENV !== "development") return null;
  return <Agentation />;
}
