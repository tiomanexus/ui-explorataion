import { useEffect, useMemo, useState } from "react";
import type { Decorator } from "@storybook/react";

type TokenEntry = {
  name: string;
  value: string;
  used: boolean;
  hitCount: number;
};

/**
 * Scan the cascade (rather than matching resolved values). A token is "used"
 * by a story only when a CSS rule that actually applies to one of its rendered
 * elements references `var(--token-name)`. This avoids both false positives
 * (numeric coincidences like `--leading-none: 1`) and false negatives (Button
 * styled with var() but whose computed value came back as `rgb(...)`).
 */
const VAR_REF = /var\((--[a-zA-Z0-9-]+)/g;

/**
 * Tailwind v4 emits a large set of internal utility variables (`--tw-*`) and a
 * default `@theme` block onto :root. Those are NOT design tokens we own, so we
 * exclude them and only surface variables in our own design-token namespaces
 * (defined in @ynvrs/design-tokens/src/tokens.css).
 */
const LOCAL_TOKEN_PREFIXES = [
  "--color-",
  "--font-",
  "--radius-",
  "--spacing-",
  "--tracking-",
  "--leading-",
  "--text-",
  "--font-weight-",
  "--shadow-",
  "--breakpoint-",
  "--container-",
] as const;

/** Semantic aliases declared without a prefix (shadcn/ui semantic names). */
const LOCAL_SEMANTIC_NAMES = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--success",
  "--success-foreground",
  "--warning",
  "--warning-foreground",
  "--border",
  "--input",
  "--ring",
] as const;

/** Runtime vars we intentionally do NOT treat as local tokens. */
const EXCLUDED_NAMES = new Set(["--tw", "--font-dm-sans"]);

function isLocalToken(name: string): boolean {
  if (EXCLUDED_NAMES.has(name)) return false;
  if (LOCAL_SEMANTIC_NAMES.includes(name as (typeof LOCAL_SEMANTIC_NAMES)[number])) return true;
  return LOCAL_TOKEN_PREFIXES.some((p) => name.startsWith(p));
}

/** Every referenced CSS property we care about for "is this styled by a token?". */

/**
 * Collect story's design-token usage by scanning the cascade.
 *
 * 1. Enumerate ONLY the local token variables at :root (for name + current value).
 * 2. Walk every CSS rule across document.styleSheets; for each rule that actually
 *    matches one of the story's elements, extract any `var(--token)` references
 *    and count them. A token is "used" iff a matching rule references it.
 */
function collectTokens(root: HTMLElement | null): TokenEntry[] {
  if (!root) return [];

  const rootStyles = getComputedStyle(document.documentElement);

  // 1. Local token names + their current resolved value at :root.
  const tokenValues = new Map<string, string>();
  for (const name of rootStyles) {
    if (name.startsWith("--") && isLocalToken(name)) {
      const value = rootStyles.getPropertyValue(name).trim();
      if (value) tokenValues.set(name, value);
    }
  }

  const elements = [
    root as HTMLElement,
    ...Array.from(root.querySelectorAll<HTMLElement>("*")),
  ];

  // Collect (selector, cssText) for every applicable rule, recursing into
  // nested at-rules (@media/@supports/etc.) so we don't miss responsive rules.
  const rules: Array<{ selector: string; cssText: string }> = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      collectRules(sheet.cssRules ?? [], rules);
    } catch {
      // cross-origin / inaccessible sheets — skip
    }
  }

  const used = new Map<string, number>();

  for (const rule of rules) {
    // Only bother parsing the rule body if it references a local token at all.
    const refs = parseVarRefs(rule.cssText).filter(isLocalToken);
    if (refs.length === 0) continue;

    let matches = false;
    for (const el of elements) {
      try {
        if (el.matches(rule.selector)) {
          matches = true;
          break;
        }
      } catch {
        // selectors with unsupported pseudo/arbitrary syntax — ignore
      }
    }
    if (matches) {
      for (const ref of refs) used.set(ref, (used.get(ref) ?? 0) + 1);
    }
  }

  // Font-family is applied via inheritance / `--font-sans: var(--font-dm-sans)`
  // rather than a rule referencing `var(--font-body)`, so the cascade scan above
  // misses it. In Storybook `--font-dm-sans` (from next/font) is undefined, so
  // `--font-sans` falls back to the browser's default — the value that IS the
  // effective body font here. So we probe the *inherited* body font (no forced
  // family) and mark `--font-body` used whenever story elements render in that
  // font. Comparison is by the FIRST font family name, because `next/font`
  // expands to e.g. `DM Sans, DM Sans Fallback` while `var(--font-body)`
  // resolves to plain `DM Sans` — a full string match would always miss.
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
  document.body.appendChild(probe);
  const bodyFamily = firstFamily(getComputedStyle(probe).fontFamily);
  probe.remove();

  if (bodyFamily) {
    let matchedElements = 0;
    for (const el of elements) {
      if (firstFamily(getComputedStyle(el).fontFamily) === bodyFamily) {
        matchedElements++;
      }
    }
    if (matchedElements > 0) used.set("--font-body", matchedElements);
  }

  const entries: TokenEntry[] = [];
  for (const [name, value] of tokenValues) {
    const hits = used.get(name) ?? 0;
    entries.push({ name, value, used: hits > 0, hitCount: hits });
  }
  return entries.sort((a, b) =>
    b.used === a.used ? a.name.localeCompare(b.name) : b.used ? 1 : -1,
  );
}

function collectRules(
  cssRules: CSSRuleList | readonly CSSRule[],
  out: Array<{ selector: string; cssText: string }>,
): void {
  for (const rule of Array.from(cssRules)) {
    try {
      if (rule instanceof CSSStyleRule) {
        out.push({ selector: rule.selectorText, cssText: rule.style?.cssText ?? "" });
      } else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
        // Recurse into the media/supports block.
        collectRules(rule.cssRules, out);
      } else if ("cssRules" in rule) {
        // Container/other grouped at-rules.
        const nested = (rule as CSSGroupingRule).cssRules;
        if (nested) collectRules(nested, out);
      }
    } catch {
      // skip unreadable rules
    }
  }
}

function parseVarRefs(cssText: string): string[] {
  const refs: string[] = [];
  let m: RegExpExecArray | null;
  VAR_REF.lastIndex = 0;
  while ((m = VAR_REF.exec(cssText)) !== null) refs.push(m[1]!);
  return refs;
}

/**
 * Extract the first font family name from a computed `font-family` value.
 * Handles quoted ("DM Sans") and unquoted (DM+ Sans) names, and ignores the
 * fallback stack so "DM Sans, DM Sans Fallback" and "DM Sans" compare equal.
 */
function firstFamily(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const m = /^(["'])(.*?)\1/.exec(trimmed);
  const name = m ? m[2]! : trimmed.split(",")[0]!.replace(/^["']|["']$/g, "").trim();
  return name.replace(/\\ /g, " ").trim();
}

/**
 * Preview-side panel. Renders directly inside the Storybook iframe, so it
 * works identically under the Vite builder (no webpack loader required).
 */
function TokenInspector({ root }: { root: HTMLElement | null }) {
  const [entries, setEntries] = useState<TokenEntry[]>([]);
  const [onlyUsed, setOnlyUsed] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!root) return;
    let timer: ReturnType<typeof setTimeout>;
    const read = () => {
      timer = setTimeout(() => {
        setEntries(collectTokens(root));
      }, 250);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { subtree: true, childList: true, attributes: true });
    const win = window as Window & { addEventListener: typeof window.addEventListener };
    win.addEventListener("resize", read);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      win.removeEventListener("resize", read);
    };
  }, [root]);

  const shown = useMemo(
    () => (onlyUsed ? entries.filter((e) => e.used) : entries),
    [entries, onlyUsed],
  );

  const usedCount = entries.filter((e) => e.used).length;

  return (
    <div
      data-token-inspector
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 2147483647,
        maxWidth: 360,
        minWidth: 240,
        fontFamily: "system-ui, sans-serif",
        fontSize: 12,
        lineHeight: 1.4,
        background: "rgba(12,12,16,0.92)",
        color: "#eee",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 10,
        boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
        overflow: "hidden",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "8px 10px",
          cursor: "pointer",
          borderBottom: open ? "1px solid rgba(255,255,255,0.1)" : "none",
          fontWeight: 600,
          userSelect: "none",
        }}
      >
        <span>🔗 Design tokens</span>
        <span style={{ color: usedCount ? "#34d399" : "#f87171", fontSize: 11, fontWeight: 500 }}>
          {usedCount}/{entries.length} used
        </span>
      </div>

      {open && (
        <>
          <div style={{ padding: "6px 10px", display: "flex", gap: 6, alignItems: "center" }}>
            <label style={{ display: "flex", gap: 4, alignItems: "center", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={onlyUsed}
                onChange={(e) => setOnlyUsed(e.target.checked)}
              />
              Only used
            </label>
            {onlyUsed && shown.length === 0 && (
              <span style={{ color: "#f87171", fontSize: 11 }}>— no token matched by this story</span>
            )}
          </div>
          <div style={{ maxHeight: 320, overflowY: "auto", padding: "0 10px 10px" }}>
            {shown.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: "2px 0",
                  color: t.used ? "#34d399" : "#8b8b92",
                }}
              >
                <code style={{ fontSize: 11, color: "inherit", whiteSpace: "nowrap" }}>{t.name}</code>
                <span style={{ fontSize: 11, opacity: 0.85, textAlign: "right", wordBreak: "break-all" }}>
                  {t.value}
                  {t.used ? ` ×${t.hitCount}` : ""}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Global decorator: drops a fixed token-inspector overlay next to the story.
 * The story itself is NOT wrapped in a layout-affecting element — the overlay
 * is a sibling with `position: fixed`, so it never changes the story's box
 * (which was the cause of the extra bottom padding when the inspector was on).
 * The wrapper div uses `display: contents`, which produces no box of its own.
 */
export const tokenInspectorDecorator: Decorator = (Story, context) => {
  const enabled = context.globals.cssVarsToolbar === "on";
  if (!enabled) return <Story />;

  return <TokenInspectorShell>{<Story />}</TokenInspectorShell>;
};

function TokenInspectorShell({ children }: { children: React.ReactNode }) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  return (
    <>
      <div ref={setRoot} style={{ display: "contents" }}>
        {children}
      </div>
      {root ? <TokenInspector root={root} /> : null}
    </>
  );
}