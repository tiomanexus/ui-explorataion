"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Toaster,
} from "@ynvrs/ui";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { DEVICE_PRESETS } from "./device-presets";

const MIN_CUSTOM_WIDTH = 320;
const MIN_CUSTOM_HEIGHT = 240;

export interface FlowLink {
  slug: string;
  name: string;
  href: string;
}

export interface PrototypeChromeProps {
  flows: FlowLink[];
  /** Pages inside the current flow — renders a Pages switcher when provided with more than one entry. */
  pages?: FlowLink[];
  currentFlowSlug?: string;
  currentPageHref?: string;
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
  pages,
  currentFlowSlug,
  currentPageHref,
  backHref = "/",
  children,
}: PrototypeChromeProps) {
  const router = useRouter();
  const [deviceId, setDeviceId] = useState(DEVICE_PRESETS[0]!.id);
  // Restore the device selection after mount so it survives full page loads —
  // the chosen resolution must never reset when moving between flows or pages.
  // The write effect waits for hydration so it can't clobber the stored value
  // with the default before the restore has run.
  const [isDeviceHydrated, setIsDeviceHydrated] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("prototype-device-id");
    if (stored && DEVICE_PRESETS.some((preset) => preset.id === stored)) {
      setDeviceId(stored);
    }
    setIsDeviceHydrated(true);
  }, []);
  useEffect(() => {
    if (isDeviceHydrated) {
      window.localStorage.setItem("prototype-device-id", deviceId);
    }
  }, [deviceId, isDeviceHydrated]);
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  // Scoped to the prototype content only — the toolbar chrome itself always stays light.
  const [isWorkspaceDarkMode, setIsWorkspaceDarkMode] = useState(false);
  // Persisted like the device selection so theme survives page navigation.
  useEffect(() => {
    if (window.localStorage.getItem("prototype-dark-mode") === "1") {
      setIsWorkspaceDarkMode(true);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("prototype-dark-mode", isWorkspaceDarkMode ? "1" : "0");
  }, [isWorkspaceDarkMode]);
  const device = DEVICE_PRESETS.find((d) => d.id === deviceId) ?? DEVICE_PRESETS[0]!;
  const isCustom = device.id === "custom";
  const isFixedSize = (device.width !== null && device.height !== null) || isCustom;

  // Free-form size for the "Custom" preset, draggable via edge grabbers
  // (left/right for width, bottom for height — like Chrome DevTools).
  const [customSize, setCustomSize] = useState({ width: 800, height: 600 });
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("prototype-custom-size");
      if (stored) {
        const parsed = JSON.parse(stored) as { width?: number; height?: number };
        if (parsed.width && parsed.height) {
          setCustomSize({
            width: Math.max(MIN_CUSTOM_WIDTH, parsed.width),
            height: Math.max(MIN_CUSTOM_HEIGHT, parsed.height),
          });
        }
      }
    } catch {
      // Ignore malformed stored values.
    }
  }, []);
  useEffect(() => {
    if (isCustom && isDeviceHydrated) {
      window.localStorage.setItem("prototype-custom-size", JSON.stringify(customSize));
    }
  }, [customSize, isCustom, isDeviceHydrated]);

  function startResize(direction: "left" | "right" | "bottom", event: React.PointerEvent) {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = customSize.width;
    const startHeight = customSize.height;
    document.body.style.cursor = direction === "bottom" ? "ns-resize" : "ew-resize";

    function onMove(moveEvent: PointerEvent) {
      if (direction === "left") {
        setCustomSize((size) => ({
          ...size,
          width: Math.max(MIN_CUSTOM_WIDTH, Math.round(startWidth + (startX - moveEvent.clientX))),
        }));
      } else if (direction === "right") {
        setCustomSize((size) => ({
          ...size,
          width: Math.max(MIN_CUSTOM_WIDTH, Math.round(startWidth + (moveEvent.clientX - startX))),
        }));
      } else {
        setCustomSize((size) => ({
          ...size,
          height: Math.max(MIN_CUSTOM_HEIGHT, Math.round(startHeight + (moveEvent.clientY - startY))),
        }));
      }
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.cursor = "";
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const frameWidth = isCustom ? customSize.width : device.width ?? 0;
  const frameHeight = isCustom ? customSize.height : device.height ?? 0;

  // Typing a dimension switches to Custom automatically; clamped & integer-only.
  function handleDimensionChange(kind: "width" | "height", raw: string) {
    const value = parseInt(raw, 10);
    if (Number.isNaN(value)) return;
    if (!isCustom) setDeviceId("custom");
    setCustomSize((size) => ({
      ...size,
      [kind]:
        kind === "width"
          ? Math.max(MIN_CUSTOM_WIDTH, Math.round(value))
          : Math.max(MIN_CUSTOM_HEIGHT, Math.round(value)),
    }));
  }

  return (
    <div className="relative flex h-dvh flex-col">
      {isToolbarOpen ? (
        <header className="relative sticky top-0 z-50 flex items-center justify-between gap-2 border-b border-border bg-background px-4 py-2">
          {/* Absolutely centered dimension inputs — stays put no matter how
              the dropdown labels on the left change width. */}
          {isFixedSize ? (
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 md:flex">
              <label className="pointer-events-auto flex items-center gap-1 text-xs text-muted-foreground">
                W
                <Input
                  type="number"
                  aria-label="Frame width in pixels"
                  className="h-7 w-20 text-xs"
                  value={frameWidth || ""}
                  onChange={(event) => handleDimensionChange("width", event.target.value)}
                />
              </label>
              <span className="text-xs text-muted-foreground">×</span>
              <label className="pointer-events-auto flex items-center gap-1 text-xs text-muted-foreground">
                H
                <Input
                  type="number"
                  aria-label="Frame height in pixels"
                  className="h-7 w-20 text-xs"
                  value={frameHeight || ""}
                  onChange={(event) => handleDimensionChange("height", event.target.value)}
                />
              </label>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Back to flow list"
              onClick={() => router.push(backHref)}
            >
              ← Flows
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Select flow">
                  {flows.find((f) => f.slug === currentFlowSlug)?.name ?? "Select flow"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {flows.map((flow) => (
                  <DropdownMenuItem
                    key={flow.slug}
                    onSelect={() => router.push(flow.href)}
                  >
                    {flow.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {pages && pages.length > 1 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Select page">
                    {pages.find((p) => p.href === currentPageHref)?.name ?? "Pages"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {pages.map((page) => (
                    <DropdownMenuItem
                      key={page.slug}
                    onSelect={() => router.push(page.href)}
                    >
                      {page.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Select device preview size">
                  {isCustom ? `Custom — ${customSize.width} × ${customSize.height}` : device.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {DEVICE_PRESETS.map((preset) => (
                  <DropdownMenuItem key={preset.id} onSelect={() => setDeviceId(preset.id)}>
                    {preset.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="icon-sm"
              aria-label={isWorkspaceDarkMode ? "Switch workspace to light mode" : "Switch workspace to dark mode"}
              variant="outline"
              onClick={() => setIsWorkspaceDarkMode((v) => !v)}
            >
              {isWorkspaceDarkMode ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsToolbarOpen(false)}>
            Hide toolbar
          </Button>
        </header>
      ) : (
        // Removed from flow (not just visually hidden) so the prototype area
        // below expands to fill the freed-up space instead of leaving a gap.
        <Button
          variant="outline"
          size="sm"
          className="fixed top-2 right-4 z-50 bg-background"
          onClick={() => setIsToolbarOpen(true)}
        >
          Show toolbar
        </Button>
      )}

      <div
        className={
          isFixedSize
            ? "flex flex-1 overflow-auto bg-muted p-6"
            : "flex flex-1 overflow-auto bg-muted"
        }
        // "safe center" (inline style — Tailwind's items-[safe_center]
        // arbitrary syntax doesn't compile for this property): centers the
        // frame when it fits the viewport; for a device taller than the
        // screen (e.g. iPad Pro at 1366px) it falls back to start-aligned +
        // scrollable instead of clipping.
        style={isFixedSize ? { alignItems: "safe center", justifyContent: "safe center" } : undefined}
      >
        {isFixedSize ? (
          <div className="relative shrink-0" style={{ padding: 12 }}>
            <div
              className={`relative overflow-auto rounded-lg border border-border shadow-overlay ${
                isWorkspaceDarkMode ? "dark bg-background text-foreground" : "bg-background"
              }`}
              // The transform makes this frame the containing block for
              // position:fixed descendants, so the Toaster stays inside the
              // workspace viewport instead of escaping to the platform window.
              style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
                transform: "translate(0, 0)",
              }}
            >
              {children}
              <Toaster position="top-center" />
            </div>

            {isCustom ? (
              <>
                {/* Width grabbers: left & right edges */}
                {(["left", "right"] as const).map((side) => (
                  <div
                    key={side}
                    role="separator"
                    aria-label={`Resize width from ${side} edge`}
                    onPointerDown={(event) => startResize(side, event)}
                    className={`group absolute top-3 bottom-[21px] flex w-4 cursor-ew-resize items-center justify-center ${
                      side === "left" ? "left-0" : "right-0"
                    }`}
                  >
                    <span className="h-8 w-1 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground" />
                  </div>
                ))}
                {/* Height grabber: bottom edge */}
                <div
                  role="separator"
                  aria-label="Resize height from bottom edge"
                  onPointerDown={(event) => startResize("bottom", event)}
                  className="absolute right-3 bottom-0 left-3 flex h-4 cursor-ns-resize items-end justify-center"
                >
                  <span className="h-1 w-8 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground" />
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div
            className={`relative h-full w-full overflow-auto ${
              isWorkspaceDarkMode ? "dark bg-background text-foreground" : "bg-background"
            }`}
            style={{ transform: "translate(0, 0)" }}
          >
            {children}
            <Toaster position="top-center" />
          </div>
        )}
      </div>
    </div>
  );
}
