"use client";

import { useState } from "react";
import { DEVICE_PRESETS } from "./device-presets";

export interface FlowLink {
  slug: string;
  name: string;
  href: string;
}

export interface PrototypeChromeProps {
  flows: FlowLink[];
  currentFlowSlug?: string;
  /** Where the back button links to. Defaults to "/" (the flow list). */
  backHref?: string;
  children: React.ReactNode;
}

/**
 * Sticky top toolbar for prototype flows: lets stakeholders switch which
 * flow they're viewing and preview it at common device sizes. Sits above
 * the content so it never overlaps Vercel's Comments toolbar (bottom-right)
 * or Agentation (dev-only, also floats bottom).
 */
export function PrototypeChrome({
  flows,
  currentFlowSlug,
  backHref = "/",
  children,
}: PrototypeChromeProps) {
  const [deviceId, setDeviceId] = useState(DEVICE_PRESETS[0]!.id);
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const device = DEVICE_PRESETS.find((d) => d.id === deviceId) ?? DEVICE_PRESETS[0]!;
  const isFixedSize = device.width !== null && device.height !== null;

  return (
    <div className="relative flex h-dvh flex-col">
      {isToolbarOpen ? (
        <header className="sticky top-0 z-50 flex items-center justify-between gap-2 border-b border-border bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <a
              href={backHref}
              aria-label="Back to flow list"
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-sm text-foreground hover:bg-surface-secondary"
            >
              ← Flows
            </a>

            <select
              aria-label="Select flow"
              className="rounded-md border border-border bg-field px-2 py-1 text-sm text-field-foreground"
              value={currentFlowSlug}
              onChange={(e) => {
                const flow = flows.find((f) => f.slug === e.target.value);
                if (flow) window.location.href = flow.href;
              }}
            >
              {flows.map((flow) => (
                <option key={flow.slug} value={flow.slug}>
                  {flow.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Select device preview size"
              className="rounded-md border border-border bg-field px-2 py-1 text-sm text-field-foreground"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
            >
              {DEVICE_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsToolbarOpen(false)}
            className="rounded-md border border-border bg-white px-2 py-1 text-sm text-foreground hover:bg-surface-secondary"
          >
            Hide toolbar
          </button>
        </header>
      ) : (
        // Removed from flow (not just visually hidden) so the prototype area
        // below expands to fill the freed-up space instead of leaving a gap.
        <button
          type="button"
          onClick={() => setIsToolbarOpen(true)}
          className="fixed top-4 right-4 z-50 rounded-md border border-border bg-white px-2 py-1 text-sm text-foreground shadow-surface hover:bg-surface-secondary"
        >
          Show toolbar
        </button>
      )}

      <div
        className={
          isFixedSize
            ? "flex flex-1 overflow-auto bg-zinc-200 p-6"
            : "flex flex-1 overflow-auto bg-zinc-200"
        }
        // "safe center" (inline style — Tailwind's items-[safe_center]
        // arbitrary syntax doesn't compile for this property): centers the
        // frame when it fits the viewport; for a device taller than the
        // screen (e.g. iPad Pro at 1366px) it falls back to start-aligned +
        // scrollable instead of clipping.
        style={isFixedSize ? { alignItems: "safe center", justifyContent: "safe center" } : undefined}
      >
        {isFixedSize ? (
          <div
            className="shrink-0 overflow-auto rounded-lg border border-border bg-white shadow-overlay"
            style={{ width: `${device.width}px`, height: `${device.height}px` }}
          >
            {children}
          </div>
        ) : (
          <div className="h-full w-full overflow-auto bg-white">{children}</div>
        )}
      </div>
    </div>
  );
}
