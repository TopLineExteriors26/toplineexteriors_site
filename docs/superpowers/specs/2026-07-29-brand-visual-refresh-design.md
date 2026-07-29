# Brand Visual Refresh — Design Spec

**Date:** 2026-07-29
**Status:** Approved by user, ready for implementation plan

## Problem

The current site (white background, soft `bg-alt` gradient, `14px` card radii, `shadow-card` on nearly every card) reads as generic SaaS-template design. It has no visual connection to the TopLine Exteriors logo, which is sharp, linear, and confident — a contour-drawn house with a hard-angled roofline and a single dynamic accent: an orange line that sweeps from the roofline into a long horizontal flourish.

## Direction

**"Строгая инженерная точность" (Strict engineering precision).** Sharp lines, decisive angles, minimal softness. The brand's dark charcoal (`#1b2a45`) and orange (`#e2661b`) already exist in the token set (`--color-ink`, `--color-accent`) and don't need to change — what needs to change is how those tokens get *applied*: less soft-shadow "SaaS card" language, more "spec sheet / technical drawing" language.

## Logo Analysis (source of truth for this direction)

- House is drawn in contour/line, not filled — reads as precision, not warmth.
- Roofline is a hard, decisive angle.
- The one non-geometric element: an orange line sweeping off the roof into a long horizontal flourish — this is the brand's single unique visual signature and currently appears nowhere else on the site.
- Wordmark: geometric sans, wide tracking, all-caps — already well-matched by the site's existing Barlow Condensed headings. No change needed there.

## Token Changes (`src/app/globals.css`)

```css
@theme {
  /* unchanged — already match the logo */
  --color-ink: #1b2a45;
  --color-text: #1b2a45;
  --color-accent: #e2661b;
  --color-paper: #ffffff;
  --color-paper-2: #f7f4ef;
  --color-line: rgba(27, 42, 69, 0.13);
  --color-muted: rgba(27, 42, 69, 0.6);

  /* changed: sharper radius */
  --radius-card: 6px;      /* was 14px */
  --radius-input: 6px;     /* was 7px — align with card radius */
  --radius-pill: 999px;    /* unchanged — pills/tags are the deliberate soft exception */

  /* shadow-card: deprecated for cards (see Card Treatment below).
     Keep the token defined (still used by e.g. the hero rating badge,
     which stays a soft floating element) but stop applying it to
     WhyCard / process-step cards / sub-service rows. */
  --shadow-card: 0 10px 28px rgba(27, 42, 69, 0.09);
  --shadow-cta: 0 10px 22px rgba(226, 102, 27, 0.28);
  --shadow-arrow: 0 8px 20px rgba(27, 42, 69, 0.1);
}
```

## Section Boundaries (replaces `.bg-alt` gradient)

Current `.bg-alt` is a nearly-invisible 3–7% orange gradient. Replace with a flat `--color-paper-2` fill plus a crisp 1px `--color-line` rule at the top and bottom of the section — a cut, not a fade.

```css
.bg-alt {
  background: var(--color-paper-2);
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
}
```

Sections currently using `.bg-alt` (How It Works, FAQ on every hub page) get this automatically — no per-page changes needed beyond the CSS rule itself.

## Card Treatment: Accent Rule (left border, no shadow)

Applies to: `WhyCard`, the "How It Works" process-step cards (the ones in the screenshot), and any other card currently using `shadow-card` + `rounded-card` as its primary visual language.

**Before:** `rounded-card border border-line bg-paper p-6 shadow-card`
**After:** `rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6`

- Drop `shadow-card` entirely.
- Keep the existing 1px `border-line` on all four sides (this is what makes it read as a bounded "spec card," not a floating panel).
- Left border becomes 3px solid `--color-accent`, overriding the 1px line color on that one edge only.
- `--radius-card` now resolves to `6px` from the token change above — no per-component change needed.

This applies uniformly; no per-hub or per-section variation.

## Section Heading Rule (accent flourish motif)

New reusable pattern: a short horizontal accent rule under each section H2, referencing the logo's signature sweep. Applied site-wide, left-aligned under the heading (not centered, not full-width).

```css
.section-heading-rule {
  display: block;
  width: 56px;
  height: 3px;
  margin-top: 14px;
  background: var(--color-accent);
}
```

Usage pattern (every section H2 across hub pages, home, project/service detail pages):

```tsx
<h2 id="why-heading" className="...">
  Certified installs, our own crews, and a warranty that covers the labor too.
</h2>
<span className="section-heading-rule" aria-hidden="true" />
```

For centered headings (FAQ, Estimate — which currently use `text-center`), the rule stays centered too: add a `mx-auto` variant class rather than a separate rule definition.

## Explicitly Out of Scope for This Pass

- Typographic scale / hierarchy problems (flat H2 sizing across the site) — separate follow-up, not touched here.
- The repeated 4-column card grid pattern itself (Why / Process / Stats all using the same grid shape) — this pass changes the *card skin*, not the *grid structure*.
- `--color-muted` contrast risk on small text — separate accessibility follow-up.
- Any changes to `HubPage.tsx`'s data flow, section order, or the `HubPageConfig` shape — this is a pure styling pass on top of the already-refactored shared component.

## Files Expected to Change (for the implementation plan)

- `src/app/globals.css` — token values, `.bg-alt` rule, new `.section-heading-rule` utility.
- `src/components/ui/WhyCard.tsx` — card treatment (border-left accent, drop shadow).
- `src/components/hub/HubPage.tsx` — process-step card markup (same card treatment), section heading rule spans added under every section H2.
- `src/app/page.tsx` (home) — same process-step card markup, same heading rule treatment (kept in sync manually since this file wasn't part of the earlier hub refactor).
- Possibly `src/components/ui/StatBlock.tsx`, `src/components/ui/TrustBadgeCard.tsx` — audit during implementation for any hardcoded `shadow-card`/radius usage that should follow the same rule.
