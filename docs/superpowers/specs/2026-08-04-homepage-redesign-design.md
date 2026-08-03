# Homepage redesign — design spec

## Overview

Topline Exteriors has an approved visual redesign for the homepage, handed off as a complete package (`design_handoff_homepage_redesign/`: README.md, RECIPES.md, design tokens, fonts, two ready-made client components, and an HTML prototype). The design work itself is done and approved by the client — this spec is about **how to land it in this specific codebase** without breaking the rest of the site, since the current site has grown well beyond a single homepage (service hubs, service-detail pages, project case studies) and the redesign only specifies the homepage.

Primary goal: implement the new look on `/` (homepage) pixel-for-pixel per the handoff, using the existing Next.js/Tailwind v4 architecture, without regressing any other route.

## Scope decision

The handoff's tokens, fonts, and RECIPES describe a full site-wide system (new color palette, new type scale, new radii). But:

- The current codebase has **shared** components — `Header`, `Footer`, `Logo`, `Button` — rendered on every route (home, roofing/decks/siding hubs, service-detail pages, project case studies, privacy, 404).
- The current color/spacing tokens (`--color-accent`, `--color-ink`, `rounded-pill`, `rounded-card`, `border-line`, `font-head`, `font-body`, etc.) are used directly in 22 files, most of which belong to hub pages, service-detail pages, and project pages that are **not** part of this redesign and have no design spec of their own yet.

Decision (confirmed with the user): **restyle the homepage now, plus the shared chrome (`Header`, `Footer`, `Logo`) since it appears on every page. Leave the internal section styling of `/roofing`, `/decks`, `/siding`, service-detail pages, and `/projects/[slug]` untouched.** Those pages will temporarily show old-style internal sections framed by new-style nav/footer until they get their own redesign pass. This is accepted as an intentional, temporary visual seam — not a bug to fix now.

Consequence for implementation: **the old token set cannot be deleted.** `globals.css` will carry both the old tokens (`accent`, `ink`, `paper`, `pill`/`card` radii, `shadow-card`/`shadow-cta`/`shadow-arrow`, `font-head`/`font-body`) — still consumed by out-of-scope pages — and the new token set from the handoff (`graphite-*`, `sand-*`, `brand-*`, `display-*` type steps, `radius-lg/xl/2xl`, new shadow names, `font-display`/`font-sans`/`font-mono`). No token name collisions exist between the two sets (verified), so this is safe to do additively.

## Fonts

Current: Barlow + Barlow Condensed (`src/lib/fonts.ts`), wired as `--font-barlow` / `--font-barlow-condensed` on `<html>`, consumed via `font-head`/`font-body` theme aliases used everywhere.

New: Archivo, Archivo Black, JetBrains Mono (handoff `tokens/fonts.ts`), exposed as `--font-archivo`, `--font-archivo-black`, `--font-jetbrains`.

Both font sets must load simultaneously (old fonts still back the out-of-scope pages' `font-head`/`font-body` classes). Plan:
- Add `src/app/fonts.ts` with the three new `next/font` loaders (as given in the handoff file, unchanged).
- In `src/app/layout.tsx`, add all three new `.variable` classes onto `<html>` alongside the two existing Barlow ones. Six font weights total loading is acceptable — this is a transitional state until the rest of the site is redesigned, not a permanent regression.
- Do **not** remove `src/lib/fonts.ts` or its wiring.

## Tokens

Append the handoff's `@theme` block into `src/app/globals.css`, below the existing `@theme` block (Tailwind v4 supports multiple `@theme` blocks; they merge). Keep every existing rule (the `@theme inline` font aliases, `body` base styles, view-transition keyframes, `.bg-alt*` dark-section helper classes, `.section-heading-rule`, `.reveal-stagger` keyframes) exactly as-is — none of them are touched by the new page.

Add the handoff's `@layer base` and `@layer utilities` blocks (reveal-init/reveal-in classes, `.ba-range` slider thumb styling) — these names don't collide with anything existing.

One resolved conflict: the handoff's `@layer base` sets `body { background: #fff; color: var(--color-graphite-500); font-family: var(--font-sans); }`, but the existing `globals.css` already has a `body` rule using `--color-paper`/`--color-text`/`--font-body`. Since both rules target the same selector, the later one in file order wins for every property it sets. Resolution: do not duplicate the `body` selector. Fold only the new declarations that don't already exist (`text-wrap: pretty`) into the existing `body` rule, and drop the redundant `background`/`color`/`font-family` re-declaration from the appended block — the homepage's new sections set their own text/background colors per-element via the new utility classes regardless, so the global `body` default doesn't need to change for this task.

## Components to add

- `src/components/ui/Reveal2.tsx` — **naming conflict**: a `Reveal` component already exists at `src/components/ui/Reveal.tsx` and is used across every current page (different API: `stagger` boolean prop, IntersectionObserver-based, CSS class toggle). The handoff's `Reveal` has an incompatible API (`index` prop for per-item stagger delay, different class names `reveal-init`/`reveal-in`). Renaming avoids breaking the existing one. Decision: add the new one as `src/components/homepage/Reveal.tsx` (scoped to the homepage rebuild, following the pattern where page-specific building blocks can live near their feature) — see Directory layout below.
- `src/components/homepage/BeforeAfter.tsx` — new, no conflict, added verbatim from the handoff.

## Directory layout for new/changed files

The existing codebase organizes shared, cross-page UI under `src/components/ui/` and `src/components/layout/`, with an empty `src/components/sections/` that was seemingly reserved for page-section components but never used. Since the new homepage sections are one-off, homepage-specific layouts (not reused elsewhere, and structurally different from the generic `Container`/card patterns used on other pages), they go in a new `src/components/homepage/` directory:

```
src/components/homepage/
  Reveal.tsx            (handoff component, renamed from conflict)
  BeforeAfter.tsx        (handoff component, verbatim)
  Hero.tsx
  TrustStrip.tsx
  Services.tsx
  BeforeAfterSection.tsx  (wraps BeforeAfter.tsx with copy/stat-row per RECIPES)
  Reviews.tsx
  EstimateSection.tsx     (new form UI; wraps existing EstimateForm logic — see Form decision)
src/content/homepage.ts  (typed photo-slot manifest, per handoff "Images" section)
```

Nav and footer are **not** rebuilt as new homepage-specific components — see Header/Footer decision below: the existing shared `Header`/`Footer` are restyled in place and reused.

`src/app/page.tsx` becomes a thin composition, in order: `<Header variant="home" />` → Hero → TrustStrip → Services → BeforeAfterSection → Reviews → EstimateSection → `<Footer variant="home" />`, each new section wrapped in `<Reveal>` per RECIPES.

## Header/Footer decision

The current `Header`/`Footer` are shared across every route via a `variant` prop (`home | roofing | decks | siding`) and carry real behavior worth preserving: scroll-collapse-to-pill, hover/active nav indicators, dropdown mega-menus for hub pages, mobile sheet menu, `usePathname`-based active state. The new design's nav is visually a **floating pill nav with no scroll/dropdown behavior shown in the mock** (RECIPES § Nav) — the mock doesn't address hub dropdowns or scroll-collapse at all, because it's a homepage-only mock.

Decision: **do not fork Header/Footer into two components.** Restyle the existing `Header.tsx` and `Footer.tsx` in place to the new visual language (new color tokens, radii, shadows, fonts) while preserving 100% of their existing behavior (scroll collapse, dropdowns, active/hover indicators, mobile sheet, `variant` prop). This satisfies "shared chrome gets the new look everywhere" from the scope decision, without a parallel implementation to maintain. The homepage renders the existing `<Header variant="home" />` and `<Footer variant="home" />`, restyled — no separate nav component is built.

Restyling means: swap `bg-accent`→`bg-brand-500`, `text-text`→`text-graphite-900`, `border-line`→`border-sand-200`, `rounded-pill`→`rounded-full`, `font-body text-[15px] font-semibold`→ new equivalents, `bg-ink`→`bg-graphite-900`, etc., following RECIPES § Nav / § Footer for exact values, and keep every existing class name for things the redesign doesn't mention (e.g., the scroll-collapse width/shadow transition logic, the dropdown panel's open/close timing) as close to current behavior as possible, translated only in color/radius/shadow/type vocabulary.

Known tension to flag inline as a code comment, not block on: the new design's trust proof number in the header area doesn't exist (nav has no proof chip); the existing Header's dropdown mega-menu (`NavDropdownPanel`) has no equivalent in the mock at all. Keep its current structure, restyle its surface only (`bg-paper`→`bg-white`, `border-l-accent`→ drop or restyle per RECIPES card conventions, `shadow-card`→ new `shadow-panel`/`shadow-nav` as best fits).

## Estimate form decision

`EstimateForm.tsx` currently: client component, `showServiceChips` prop, fields name/phone/email/address/message, client-side validation, `console.log` submission (marked `TODO: wire to lead backend`), inline success message appended below the form (not a panel swap).

The new design (README § 7, § Interactions) specifies: first name + phone (2-up), street address, textarea, a 4-option service-type radio pill row (Roof/Deck/Siding/Not sure — note: **not** the current 3-option Roofing/Decks/Siding + no "Not sure"), submit button, and on success **replaces the whole panel** with a same-sized `bg-sand-100` success block — a different success UX than today's inline message. It also specifies phone normalization to `+1XXXXXXXXXX` and PA/NJ address validation, which don't exist today, and says "Submit via a Server Action... validate server-side too" where today it's client-only with a `console.log`.

Given this task is a **style transfer**, not a rewrite, and per PROMPT.md "preserve... form submission logic," the plan is:
- Keep `EstimateForm.tsx`'s existing client-side logic, state shape, and the `TODO: wire to lead backend` submission stub as-is — do not invent a Server Action or backend wiring that doesn't exist yet (out of scope, would need real CRM/email integration decisions).
- Restyle its markup to match RECIPES § Estimate form: new input classes, new radio-pill treatment (already implemented as a real radio-group-like button set with `role="radio"`/`aria-checked` — will convert to the handoff's recommended `<input type="radio" className="peer sr-only">` + `<label>` pattern per README § Accessibility, which is more standard and keyboard-robust than the current `button role="radio"` custom pattern).
- Add the 4th "Not sure" option to `SERVICE_TYPE_OPTIONS` in `constants.ts` (this constant is shared — check its only other consumer, the roofing/decks/siding hub pages' forms, before touching it — plan is to add a new homepage-only options array rather than mutate the shared one, to avoid changing hub page behavior).
- Implement the success state as a panel swap (`bg-sand-100` block replacing the form) since it's explicitly specified and self-contained within this one component.
- Leave phone/address validation logic as today's (name/phone/email/address required, phone regex) — do **not** add PA/NJ address-format validation or phone normalization to `+1XXXXXXXXXX`; these are backend-adjacent behavior changes beyond a style transfer and aren't needed to match the visual spec. Note this as a deliberate scope trim in a code comment.
- Note: the new design's form has **no email field** shown in RECIPES (name + phone + address + textarea + service type). The current form requires email. Decision: **keep the email field** (dropping a required lead-capture field is a business-logic change, not a style change, and isn't something the design brief authorizes) but restyle it to fit the new panel, inserted as a natural 5th field. Flag this deviation from the literal mock in a comment.

## Images

Follow README § Images: create `src/content/homepage.ts` as a typed manifest (hero shot, 3 service shots, before/after pair), and render every slot as `next/image` per RECIPES `sizes` values when real files exist, falling back to a `bg-sand-100` placeholder block with a caption when they don't (mirroring the existing `PlaceholderImage` component's pattern, but using new tokens — reuse `PlaceholderImage` restyled, or a small new variant if the new radius/caption styling doesn't fit; decide during implementation, default to reusing `PlaceholderImage` with new classes passed via props if its API allows, else fork minimally).

`assets/logo-full.png` → copy to `public/logo-full-redesign.png` only if the existing `public/logo-full.png` differs from the handoff asset; diff them first. (Likely identical — both are "the real logo" — in which case no copy is needed and the existing `public/logo-full.png` / `Logo.tsx` component is reused as-is, just restyled where the new design calls for an inverted footer version, which `Logo.tsx` already supports via its `dark` prop.)

## Data / copy

Homepage-specific copy (headline, lede, trust strip labels, service card copy, before/after stats, review quotes, form step copy) comes verbatim from README.md — added as new constants (either inline in the new homepage section components or a new `HOME_REDESIGN_*` block in `constants.ts`; decide during implementation based on what stays readable). Do not touch the existing `HOME_*` constants used only by hub/service-detail pages.

All unverified placeholder numbers (15+ years, 500+ jobs, 4.9★/180+ reviews, 2 hr reply, "booking 3 weeks out", "See 40 recent jobs", phone number already a placeholder in `constants.ts`, license numbers, manufacturer certifications, review quotes, Levittown story) get a `TODO(client)` comment at first use, per README § Unverified content. The phone number and license placeholder already exist in `constants.ts` with a "(placeholder)" marker — reuse those constants rather than re-inventing new placeholder values, and add the `TODO(client)` comment there if not already present.

## Responsive behavior

Implement per README § Responsive behavior / RECIPES § Responsive (hero collapses to one column with photo-first at `lg` and below, nav collapses to logo+phone+menu button, services grid steps down 3→2→1 column, trust strip becomes horizontal scroll, before/after height steps down, reviews go single-column, form goes single-column panel-first, mobile sticky bottom bar with Free estimate + Call). The existing `Header` already has its own mobile sheet menu implementation (`xl` breakpoint, `isMenuOpen` state) — reuse it, restyled, rather than building a second mobile nav.

## Accessibility

Per README § Accessibility requirements: real radio group for service type (see Estimate form decision above), `BeforeAfter`'s native range input preserved as-is (already keyboard/touch native per the handoff component), `text-brand-700` for any orange-on-white text under 18px, real alt text on every photo slot, visible focus rings (`ring-4 ring-brand-500/15` + `border-brand-500` on light, `outline-2 outline-offset-2 outline-brand-500` on dark), single `<h1>` (hero), `<h2>` per section, `<h3>` for cards.

## Definition of done

- `npm run build` passes, no new TypeScript errors, no new lint warnings.
- Homepage matches the handoff's `Topline Homepage.dc.html` at 1440px on color, radius, type scale, spacing (per README's own fidelity bar).
- All other routes (`/roofing`, `/decks`, `/siding`, service-detail pages, `/projects/[slug]`, `/privacy`, 404) render unchanged apart from the restyled shared `Header`/`Footer`.
- No new npm dependencies added.
- Content on the homepage is visible with JS disabled (Reveal's server-visible-by-default behavior, preserved from the handoff component).
- Every unverified placeholder has a `TODO(client)` comment.

## Explicitly out of scope (follow-up work, not this task)

- Restyling `/roofing`, `/decks`, `/siding` hub page sections, service-detail pages, `/projects/[slug]`, `/privacy`, and 404 page body content to the new design language.
- Wiring the estimate form to a real backend/CRM (Server Action), phone normalization, PA/NJ address validation.
- Sourcing real photography or manufacturer certification logos — placeholders remain per README.
- Requesting an SVG logo from the client — flagged as a TODO, not blocking.
- Google Places API live review integration.
