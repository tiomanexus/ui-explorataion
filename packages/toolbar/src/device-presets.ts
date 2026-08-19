export interface DevicePreset {
  id: string;
  label: string;
  /** px width to constrain the flow to; null = fill the viewport width. */
  width: number | null;
  /** px height to constrain the flow to; null = fill the available viewport height. */
  height: number | null;
}

// Default set — extend this array to add more presets later.
// Desktop entries fill available height; phone/tablet entries use their real
// device height and get centered in the canvas.
export const DEVICE_PRESETS: DevicePreset[] = [
  { id: "responsive", label: "Desktop — Responsive", width: null, height: null },
  { id: "desktop-1920", label: "Desktop — 1920", width: 1920, height: null },
  { id: "desktop-1440", label: "Desktop — 1440", width: 1440, height: null },
  { id: "ipad-pro", label: "iPad Pro — 1024 × 1366", width: 1024, height: 1366 },
  { id: "ipad", label: "iPad — 820 × 1180", width: 820, height: 1180 },
  { id: "ipad-mini", label: "iPad Mini — 768 × 1024", width: 768, height: 1024 },
  { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max — 430 × 932", width: 430, height: 932 },
  { id: "iphone-15", label: "iPhone 15 — 393 × 852", width: 393, height: 852 },
  { id: "iphone-se", label: "iPhone SE — 375 × 667", width: 375, height: 667 },
];
