"use client";

import { useState } from "react";
import { Button, buttonVariants, Dropdown, Link } from "@heroui/react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
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
  // Scoped to the prototype content only — the toolbar chrome itself always stays light.
  const [isWorkspaceDarkMode, setIsWorkspaceDarkMode] = useState(false);
  const device = DEVICE_PRESETS.find((d) => d.id === deviceId) ?? DEVICE_PRESETS[0]!;
  const isFixedSize = device.width !== null && device.height !== null;

  return (
    <div className="relative flex h-dvh flex-col">
      {isToolbarOpen ? (
        <header className="sticky top-0 z-50 flex items-center justify-between gap-2 border-b border-border bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <Link
              href={backHref}
              aria-label="Back to flow list"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              ← Flows
            </Link>

            <Dropdown>
              <Dropdown.Trigger
                aria-label="Select flow"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {flows.find((f) => f.slug === currentFlowSlug)?.name ?? "Select flow"}
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={currentFlowSlug ? [currentFlowSlug] : []}
                  onAction={(key) => {
                    const flow = flows.find((f) => f.slug === key);
                    if (flow) window.location.href = flow.href;
                  }}
                >
                  {flows.map((flow) => (
                    <Dropdown.Item key={flow.slug} id={flow.slug}>
                      {flow.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Dropdown>
              <Dropdown.Trigger
                aria-label="Select device preview size"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {device.label}
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={[deviceId]}
                  onAction={(key) => setDeviceId(String(key))}
                >
                  {DEVICE_PRESETS.map((preset) => (
                    <Dropdown.Item key={preset.id} id={preset.id}>
                      {preset.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Button
              isIconOnly
              aria-label={isWorkspaceDarkMode ? "Switch workspace to light mode" : "Switch workspace to dark mode"}
              variant="outline"
              size="sm"
              onPress={() => setIsWorkspaceDarkMode((v) => !v)}
            >
              {isWorkspaceDarkMode ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
            </Button>
          </div>

          <Button variant="outline" size="sm" onPress={() => setIsToolbarOpen(false)}>
            Hide toolbar
          </Button>
        </header>
      ) : (
        // Removed from flow (not just visually hidden) so the prototype area
        // below expands to fill the freed-up space instead of leaving a gap.
        <Button
          variant="outline"
          size="sm"
          className="fixed top-2 right-4 z-50 bg-white"
          onPress={() => setIsToolbarOpen(true)}
        >
          Show toolbar
        </Button>
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
            className={`shrink-0 overflow-auto rounded-lg border border-border shadow-overlay ${
              isWorkspaceDarkMode ? "dark bg-background text-foreground" : "bg-white"
            }`}
            style={{ width: `${device.width}px`, height: `${device.height}px` }}
          >
            {children}
          </div>
        ) : (
          <div
            className={`h-full w-full overflow-auto ${
              isWorkspaceDarkMode ? "dark bg-background text-foreground" : "bg-white"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
