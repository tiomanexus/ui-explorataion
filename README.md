# mnx-dsgn-test

Design-system-driven prototyping workspace: build flows fast on top of a shared
HeroUI-based design system, present them to stakeholders on Vercel.

## Structure

```
apps/web/                  Next.js app — all prototype flows live here
  app/(flows)/<slug>/      One route per flow (wrapped by the flow toolbar)
  flows/registry.ts        Manifest of every flow — powers the landing page and toolbar
  data/<slug>/             Dummy data fixtures

packages/design-tokens/    Brand tokens (color, radius, font) — single source of truth
packages/ui/               HeroUI re-export + fully custom components (@mnx/ui)
packages/toolbar/          Floating viewer toolbar (device preview + flow switcher)
packages/data-client/      Dummy ⇄ API data-source switch (useFlowData)
```

## Adding a new flow

1. Create `apps/web/app/(flows)/<slug>/page.tsx`.
2. Add an entry to `apps/web/flows/registry.ts`.
3. Optionally add dummy data under `apps/web/data/<slug>/`.

The flow automatically shows up on the landing page and in the toolbar's flow switcher.

## Data: dummy vs API

Every flow reads data through `useFlowData` from `@mnx/data-client`:

```ts
useFlowData({ mode: "dummy", data: someFixture });
useFlowData({ mode: "api", fetcher: () => fetch("/api/...").then((r) => r.json()) });
```

Ship a flow against dummy data before the backend is ready, then flip `mode` to `"api"`
later without touching the component tree.

## Design tokens

All brand tokens live in `packages/design-tokens/src/tokens.css`, applied once via
`apps/web/app/globals.css`. Every page in `apps/web` shares one Tailwind build, so a
token change (color, radius, font) propagates to every flow — there is no per-flow
override path, by design.

## Using this as a template for a new project

This repo is meant to be forked without carrying its flows along:

1. Use GitHub's "Use this template" (or `git clone` + reset the remote).
2. Delete `apps/web/app/(flows)/*` and `apps/web/data/*`, and empty `flows/registry.ts`.
3. Everything else — `packages/*`, routing, toolbar, data-client — is the reusable foundation.

## Dev tools

- **Agentation** (`apps/web/app/agentation-dev-tool.tsx`) — dev-only visual annotation
  toolbar for talking to AI agents about UI changes. Never rendered in production.
- **Vercel Comments** — enable in the Vercel project's Toolbar settings; no code needed.
  It's separate from Agentation and only relevant once deployed.

## Deploy

Push to a repo connected to Vercel — it auto-detects the Next.js app in `apps/web`.
Set the project's Root Directory to `apps/web` in Vercel project settings.
