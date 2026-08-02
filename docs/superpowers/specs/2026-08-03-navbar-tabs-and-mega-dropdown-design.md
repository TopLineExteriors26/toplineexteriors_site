# Navbar tabs-style links + two-row mega dropdown — Design

Date: 2026-08-03

## Context

The current desktop nav (`src/components/layout/Header.tsx`) renders plain
`Link`s with a `hover:text-accent` color transition and an `isActive` text
color. There's no visual feedback beyond color change, and hub links
(Roofing/Decks/Siding) don't expose their sub-services from the nav — a user
has to land on a hub page first to see the 7 sub-service links.

The user found a reference component (`vercel-tabs.tsx`, a shadcn-style
"Tabs" component with an animated sliding hover-highlight and an animated
active-indicator underline) and wants:

1. That sliding-highlight interaction applied to the top-level nav links.
2. A two-row dropdown that appears on hovering a hub link (Roofing / Decks /
   Siding), listing that hub's sub-services.

This project does **not** use the shadcn CLI, has no `/components/ui`
folder, and has no `@/lib/utils`. It has its own minimal `cn()` helper at
`src/lib/cn.ts`. The reference component will be adapted to fit these
conventions rather than copied verbatim — no shadcn scaffolding, no new
dependencies.

## Goals

- Desktop top-level nav links (Home, Roofing, Decks, Siding, About, Contact)
  get a sliding hover-highlight pill and an animated active-indicator
  underline, matching the interaction quality of the reference component.
- Hovering a hub link (Roofing / Decks / Siding) opens a panel below the nav
  showing that hub's 7 sub-services as a 4-then-3 two-row grid of links to
  `/[hub]/[service]`.
- Panel opens on mouseenter, closes ~150–200ms after mouseleave (debounced
  so moving the cursor from the trigger down into the panel doesn't close
  it).
- No changes to mobile behavior — mobile menu (below `xl` breakpoint) stays
  exactly as-is, no sub-service accordion.
- No new dependencies, no shadcn CLI, no `/components/ui` folder.

## Non-goals

- No changes to mobile/tablet nav.
- No keyboard/focus-triggered dropdown (mouse-hover only, matching the
  "desktop-only, no touch" decision below). Existing links remain real
  `<a>`/`<Link>` elements so they're still keyboard-focusable and
  clickable, but the dropdown panel itself only opens on hover in this
  iteration.
- No change to the mobile hamburger menu markup/behavior.
- No visual redesign of the sub-service data itself (titles only, no new
  copy, icons, or images in the dropdown).

## Data

Each hub config in `src/lib/hubConfigs.tsx` already has:

- `subServices.items: SubService[]` (7 items, `{ num, title, desc }`)
- `subServices.hrefFor: (sub: SubService) => string` (uses a private
  `*_SERVICE_SLUGS` map local to that file)

The nav needs `{ label, href }` pairs per hub, i.e. `SubService.title` +
`hrefFor(sub)`. Rather than duplicate the 7 titles a third time in
`constants.ts`, `hubConfigs.tsx` will export a small derived helper:

```ts
export function navDropdownItemsFor(config: HubPageConfig): NavLink[] {
  return config.subServices.items.map((sub) => ({
    label: sub.title,
    href: config.subServices.hrefFor(sub),
  }));
}
```

`Header.tsx` imports `ROOFING_HUB_CONFIG`, `DECKS_HUB_CONFIG`,
`SIDING_HUB_CONFIG` from `hubConfigs.tsx` and calls
`navDropdownItemsFor(...)` once per hub (module scope, not per-render) to
build a `Record<"roofing" | "decks" | "siding", NavLink[]>` map. This reuses
`NavLink` from `constants.ts` — no new type needed.

## Components

### `src/components/layout/HeaderNavLink.tsx` (new)

Renders a single top-level nav item. Two responsibilities merged into one
component since they share the same trigger element and hover state:

- **Sliding highlight**: on mouseenter of any nav item, a shared
  hover-highlight `<div>` (absolutely positioned, animated `left`/`width`
  via inline style, `transition-all duration-300 ease-out`) moves to sit
  behind the hovered item. On mouseleave of the whole nav (not each item),
  it fades out. This mirrors the reference `Tabs` component's
  `hoverStyle`/`tabRefs` approach, but adapted: the *parent* `<nav>` owns
  the shared highlight and active-indicator state (via refs to each link),
  since these are independent `Link`s, not tab-panel state.
- **Active indicator**: a `2px` bottom border under the current-page link,
  position/width animated the same way, using the existing `isActive`
  logic (`pathname.startsWith(link.href)`).
- **Dropdown trigger** (hub links only): if the nav item has
  `dropdownItems`, wrap it in a `relative` container; on mouseenter, start
  a "show" (immediate); on mouseleave, start a 150–200ms `setTimeout` to
  hide, cleared if mouseenter fires again (covers moving from trigger into
  the panel). Dropdown open state is local to that one `HeaderNavLink`
  instance.

Colors/tokens: reference component's hardcoded `#0e0f1114` /
`#ffffff1a` / `#0e0f11` hex values are replaced with this project's
existing tokens — hover pill uses a low-opacity neutral (e.g.
`bg-ink/5` or the closest existing muted-surface token found in
`globals.css`), active-indicator underline uses `bg-accent` (matching the
existing `text-accent` active-state color already used for the text).
Exact token names confirmed against `globals.css` during implementation.

### `src/components/layout/NavDropdownPanel.tsx` (new)

Presentational panel used by `HeaderNavLink` for hub items:

- Positioned `absolute` below the trigger (`top-full`), not `fixed` full
  width — sized to its own content, left-aligned to the trigger.
- Grid: `grid-cols-4 gap-x-6 gap-y-3` (4 columns), 7 items placed in source
  order so the first 4 fill row one and the remaining 3 fill row two,
  left-aligned (default grid flow — no special handling needed for the
  under-filled last row).
- Each cell is a `Link` to the sub-service page, styled consistently with
  existing text conventions (`font-body text-sm`, hover color shifts to
  `text-accent`), no icons/images per non-goals.
- Wrapped in a simple fade/scale-in via CSS transition on an
  `opacity`/`translate-y` pair gated by the open boolean (no animation
  library).

### `Header.tsx` changes

- Replace the current inline `links.map(...)` block in the desktop `<nav>`
  with `links.map((link) => <HeaderNavLink ... />)`.
- Build `dropdownItems` per link by matching `link.href` against
  `/roofing`, `/decks`, `/siding` and pulling from the
  `navDropdownItemsFor` map; `undefined` for Home/About/Contact.
- Mobile nav block (`#mobile-nav`) is untouched.

## Interaction detail: hover-highlight ownership

The reference component tracks `hoveredIndex`/`activeIndex` and a single
`tabRefs` array inside one `Tabs` component because all tabs are siblings
under one parent with shared state. Here, nav items are already individual
`Link`s inside `Header.tsx`'s `<nav>`. To keep the sliding highlight without
restructuring the whole nav into a single mega-component, `Header.tsx`'s
`<nav>` itself will own:

- `hoveredIndex: number | null`, `tabRefs: (HTMLElement | null)[]` — same
  pattern as the reference, hoisted one level up.
- `activeStyle` computed from whichever link's `isActive` is true (falls
  back to no visible underline if none match, e.g. on `/` when Home isn't
  marked active by the current `pathname.startsWith` logic — existing
  behavior, not changed by this work).

`HeaderNavLink` becomes a fairly thin presentational item (label, href,
active flag, ref callback, dropdown items); `Header.tsx` keeps the
highlight/indicator state, matching how it already owns `isMenuOpen`.

## Styling reference points (existing tokens to reuse, not invent)

- `text-accent` — active/hover link color (already used).
- `font-body text-sm font-semibold` — existing link typography (already
  used).
- `border-line`, `bg-paper` — existing header chrome tokens (already used).
- Panel shadow/border: reuse whatever card/accent-border treatment already
  exists in `globals.css` from the recent "accent-border cards" pass
  (checked and matched during implementation, not re-invented).

## Testing / verification

- No dev server start (per CLAUDE.md) — user verifies visually in browser.
- `npx tsc --noEmit` (or existing project typecheck script) to confirm
  types compile, since `NavDropdownItemsFor` and the new components
  introduce new exported types.
- Manual code-level check: confirm dropdown item hrefs match real routes
  already present under `src/app/roofing/[service]/`,
  `src/app/decks/[service]/`, `src/app/siding/[service]/` (cross-check
  against the slug maps in `hubConfigs.tsx`).
