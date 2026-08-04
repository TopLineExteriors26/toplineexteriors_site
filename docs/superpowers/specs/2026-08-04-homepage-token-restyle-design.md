# Homepage: Revert Structure, Recolor Tokens Sitewide — Design

## Context

The first pass at the homepage redesign (see `2026-08-04-homepage-redesign-design.md` and its implementation plan) followed the design handoff's README/RECIPES literally, which specified a short ~8-section homepage (hero, trust strip, services, before/after, reviews, form, footer). That handoff spec never described the site's actual existing homepage sections — Why Topline, How It Works, Recent Projects, Service Area, FAQ — so implementing it verbatim silently dropped that content instead of restyling it. The user caught this by comparing against the live previous site and wants the original structure/content back, restyled with the new visual language.

## Goal

Restore the homepage's original structure, components, and copy (as it existed before the redesign branch, commit `5542f9b`). Apply the new visual language (colors, fonts, radii, shadows) by recoloring the *existing* design tokens in `globals.css` rather than rewriting components. Because those tokens are shared, this recolors the entire site — homepage, hub pages (`/roofing`, `/decks`, `/siding`), service-detail pages, project case studies, and `/privacy` — in one step, with zero changes to any page's geometry, copy, or component structure.

## Non-goals

- No new sections beyond what the old homepage had. The redesign's before/after slider, trust-strip, and the handoff's hero copy are explicitly dropped.
- No structural changes to any out-of-scope page beyond the color/font/radius values inherited from the shared tokens.
- No new npm dependencies.

## What gets deleted

Everything built in the prior redesign session that only existed to support the now-abandoned new homepage structure:

- `src/components/homepage/` (entire directory: `Reveal.tsx`, `BeforeAfter.tsx`, `HomePlaceholder.tsx`, `Hero.tsx`, `TrustStrip.tsx`, `Services.tsx`, `BeforeAfterSection.tsx`, `Reviews.tsx`, `EstimateSection.tsx`)
- `src/content/homepage.ts`
- The `HOME_REDESIGN_*` constants block in `src/lib/constants.ts` (added at the end of the file in the prior session)
- The `variant` prop and its `"redesign"`-branch JSX in `src/components/ui/EstimateForm.tsx` — revert this file to its pre-redesign form (i.e., as it existed at commit `5542f9b`)
- `src/app/page.tsx` — revert to its pre-redesign content (commit `5542f9b`), which restores `WhyCard`, `StatBlock`, `TrustBadgeCard`, `PlaceholderImage`, `ReviewCarousel`, `FaqAccordion`, `Button`, `Container`, and the old `HOME_*`/`SERVICES`/`PROJECTS`/`CITIES`/`PROCESS_STEPS` constants as consumers

## What stays

- `Header.tsx`, `HeaderNavLink.tsx`, `NavDropdownPanel.tsx`, `Logo.tsx`, `Footer.tsx` — already restyled to the new token vocabulary directly (not via the old `--color-accent`/`--color-ink` tokens), no changes needed.
- `src/app/fonts.ts` (Archivo/Archivo Black/JetBrains Mono loaders) and their wiring in `layout.tsx` alongside the existing Barlow loaders — reused as-is; only the `@theme inline` aliases change which physical fonts `font-head`/`font-body` resolve to.
- The additive `@theme` block in `globals.css` (graphite-*/sand-*/brand-*/font-display/shadow-home-*/etc., added in the prior session) — left in place since `Header`/`Footer` still consume it directly. Not deleted, just no longer the *only* source of new colors once the old tokens are repointed.
- `PlaceholderImage`, `WhyCard`, `TrustBadgeCard`, `Button`, `ReviewCarousel`, `FaqAccordion`, `StatBlock`, `Container` — kept exactly as they are structurally. Only the CSS variables they reference change value.

## Token remapping (`globals.css`, the original `@theme` block at the top of the file)

| Token | Old value | New value | Rationale |
|---|---|---|---|
| `--color-accent` | `#e2661b` | `#F0731E` | matches `--color-brand-500` |
| `--color-ink` | `#1b2a45` (navy) | `#2C2F33` | matches `--color-graphite-900` |
| `--color-text` | `#1b2a45` | `#1E2023` | matches `--color-graphite-950` |
| `--color-muted` | `#1b2a45` (same as text, used via opacity in different places) | `#52565B` | matches `--color-graphite-500` |
| `--color-paper` | `#ffffff` | `#ffffff` | unchanged — white base is a non-negotiable in both specs |
| `--color-paper-2` | `#f7f4ef` | `#F4F3F0` | matches `--color-sand-100` |
| `--color-line` | `rgba(27, 42, 69, 0.13)` | `#E8E6E2` | matches `--color-sand-200`; switched from a translucent navy tint to a solid sand tone per the new system's convention (borders are always solid sand, never alpha-blended) |

`--radius-card` and `--radius-input` change from `6px` to `14px` (matching the new `--radius-lg` scale). `--radius-pill` stays `999px` (unchanged; pills are pills in both systems).

`--shadow-card`, `--shadow-cta`, `--shadow-arrow` get new values consistent with the new palette (graphite-tinted ambient shadow for `--shadow-card`/`--shadow-arrow`, brand-orange-tinted for `--shadow-cta` — same relationship as today, just re-tinted). Exact values chosen during implementation to look correct against the new backgrounds; not prescribed numerically here since they're a visual-tuning detail, not a structural one.

The `@theme inline` block's font aliases change:
```css
--font-head: var(--font-archivo-black);
--font-body: var(--font-archivo);
```
(from `var(--font-barlow-condensed)` / `var(--font-barlow)`). The Barlow font loaders in `src/lib/fonts.ts` and their `.variable` wiring in `layout.tsx` are left in place (harmless if unreferenced) rather than removed, since removing them is unrelated cleanup outside this task's purpose.

## `.bg-alt` and dark sections

`.bg-alt` currently reads `background: var(--color-ink)`. Once `--color-ink` is repointed to graphite-900, `.bg-alt` (used by the homepage's "Why Topline" and "How It Works" sections, and implicitly matching the Footer's dark surface) becomes graphite instead of navy automatically — no class changes needed. `.bg-alt-heading`/`.bg-alt-muted`/`.bg-alt-pill`/`.bg-alt-btn-secondary` (white/white-opacity text on that dark background) remain correct as-is since they're already color-neutral (`#ffffff` and opacity-based, not tied to the old palette).

This means the homepage keeps 2 dark graphite sections (Why Topline, How It Works) plus the dark Footer — more than the handoff spec's "graphite appears in exactly two places" rule, but the user has explicitly chosen to preserve the original geometry over that rule, so this is accepted, not a defect.

## Scope of the sitewide recolor

Because `--color-accent`/`--color-ink`/`--color-text`/`--color-muted`/`--color-paper-2`/`--color-line`/`font-head`/`font-body`/`--radius-card`/`--radius-input`/`--shadow-card`/`--shadow-cta`/`--shadow-arrow` are consumed by components shared across the whole site (`Button`, `WhyCard`, `TrustBadgeCard`, `PlaceholderImage`, `ReviewCarousel`, `FaqAccordion`, `Container`, plus every page's own inline Tailwind classes referencing `bg-paper`/`text-text`/`border-line`/etc.), this one token change propagates to:

- `/` (homepage, this task's actual target)
- `/roofing`, `/decks`, `/siding` (hub pages)
- All ~21 service-detail pages under those three hubs
- `/projects/[slug]` (project case studies)
- `/privacy`
- `/_not-found` (404)

This is intentional per the user's explicit choice (recolor the whole site now rather than defer hub pages to a later pass) — confirmed directly, not an accidental side effect to flag as a risk.

## Verification approach

No visual regression testing tooling exists in this project (confirmed in the prior session). Verification is: `npm run build` (all routes still compile, especially the ~30 dynamic service-detail/project paths), `npx tsc --noEmit`, `npm run lint`, and a grep sweep confirming the deleted files/exports have zero remaining references anywhere in `src/`. Final visual confirmation is the user's own manual check in their browser (per `CLAUDE.md`, no dev server or screenshots from this side).

## Definition of done

- `src/app/page.tsx` matches the pre-redesign homepage's structure/copy/components (from commit `5542f9b`), rendering with the new colors/fonts/radii.
- `src/components/homepage/`, `src/content/homepage.ts` do not exist.
- `EstimateForm.tsx` has no `variant` prop or redesign-branch JSX — matches its pre-redesign form.
- `src/lib/constants.ts` has no `HOME_REDESIGN_*` exports.
- `globals.css`'s original `@theme` block's color/font/radius/shadow tokens carry the new values; the additive graphite/sand/brand block from the prior session remains untouched.
- `npm run build`, `npx tsc --noEmit`, `npm run lint` all pass clean.
- Every route in the site (home, 3 hub pages, ~21 service-detail pages, project page, privacy, 404) builds and visually inherits the new palette/fonts/radii with unchanged geometry.
