# Brand Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved "strict engineering precision" visual direction (spec: `docs/superpowers/specs/2026-07-29-brand-visual-refresh-design.md`) across the whole site — sharper radii, flat section boundaries instead of soft gradients, accent-left-border cards instead of shadow cards, and a reusable accent-rule motif under every section heading, echoing the logo's signature orange sweep.

**Architecture:** Token-level changes in `globals.css` cascade automatically to every component using `rounded-card`/`.bg-alt`. A new `.section-heading-rule` utility class gets added once and then applied as a `<span>` under every section H2 across the site (home page + shared `HubPage` component + `WhyCard`/`TrustBadgeCard`). Card treatment (drop shadow, add left accent border) is a mechanical find-and-replace of one Tailwind class pattern, applied file-by-file.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4 (`@theme` tokens in `src/app/globals.css`), no new dependencies.

## Global Constraints

- Do not change any visible copy (headings, body text, labels) — this is a pure styling pass.
- Do not change section order, `id` attributes, `aria-labelledby` pairs, or any data/props flow (`HubPageConfig`, `constants.ts` exports) — those are out of scope per the spec.
- Do not touch `HubPage.tsx`'s or `page.tsx`'s data-fetching/rendering logic beyond className changes and the addition of `<span className="section-heading-rule" />` elements.
- The hero rating badge (`4.9★ / 180+ Google Reviews`, appearing in `HubPage.tsx` and `page.tsx`) keeps `shadow-card` — it is explicitly named in the spec as staying a "soft floating element," not part of the card-treatment change.
- The "Recent Projects" image-tile grid on the home page (`src/app/page.tsx`, `PROJECTS.map`) is NOT a card in the WhyCard/process-step sense — it uses a repeating-gradient placeholder pattern, not `shadow-card`/`rounded-card` + border. Do not modify it.
- `StatBlock.tsx` uses neither `shadow-card` nor `rounded-card` — do not modify it (already correct for this direction: flat, no card chrome).
- After each task, run `npx tsc --noEmit` from `c:\main\Projects\TopLineExteriors` and confirm zero errors before moving to the next task.
- No new npm dependencies.

---

### Task 1: Token changes and new utility classes in `globals.css`

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing (this is the root token file).
- Produces: `--radius-card: 6px` (was `14px`), `--radius-input: 6px` (was `7px`), a rewritten `.bg-alt` rule (flat fill + top/bottom border instead of gradient), and a new `.section-heading-rule` utility class — all three consumed by every later task in this plan.

- [ ] **Step 1: Read the current file to confirm exact current state**

Current content of `src/app/globals.css` (confirm this matches before editing — if it doesn't, stop and report the mismatch instead of guessing):

```css
@import "tailwindcss";

@theme {
  --color-ink: #1b2a45;
  --color-text: #1b2a45;
  --color-accent: #e2661b;
  --color-paper: #ffffff;
  --color-paper-2: #f7f4ef;
  --color-line: rgba(27, 42, 69, 0.13);
  --color-muted: rgba(27, 42, 69, 0.6);

  --radius-card: 14px;
  --radius-input: 7px;
  --radius-pill: 999px;

  --shadow-card: 0 10px 28px rgba(27, 42, 69, 0.09);
  --shadow-cta: 0 10px 22px rgba(226, 102, 27, 0.28);
  --shadow-arrow: 0 8px 20px rgba(27, 42, 69, 0.1);
}

@theme inline {
  --font-head: var(--font-barlow-condensed);
  --font-body: var(--font-barlow);
}

body {
  background: var(--color-paper);
  color: var(--color-text);
  font-family: var(--font-body);
}

@view-transition {
  navigation: auto;
}

@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: page-fade-out 150ms ease-in both;
  }

  ::view-transition-new(root) {
    animation: page-fade-in 220ms ease-out 60ms both;
  }
}

@keyframes page-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes page-fade-in {
  from {
    opacity: 0;
  }
}

.bg-alt {
  background: linear-gradient(
    180deg,
    rgba(226, 102, 27, 0.07),
    rgba(226, 102, 27, 0.03)
  );
}
```

- [ ] **Step 2: Replace the `@theme` block's radius values**

Change:
```css
  --radius-card: 14px;
  --radius-input: 7px;
```
to:
```css
  --radius-card: 6px;
  --radius-input: 6px;
```

Leave `--radius-pill: 999px;` and all `--color-*`/`--shadow-*` values unchanged.

- [ ] **Step 3: Replace the `.bg-alt` rule**

Change:
```css
.bg-alt {
  background: linear-gradient(
    180deg,
    rgba(226, 102, 27, 0.07),
    rgba(226, 102, 27, 0.03)
  );
}
```
to:
```css
.bg-alt {
  background: var(--color-paper-2);
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
}
```

- [ ] **Step 4: Add the new `.section-heading-rule` utility at the end of the file**

Append after the `.bg-alt` rule:

```css
.section-heading-rule {
  display: block;
  width: 56px;
  height: 3px;
  margin-top: 14px;
  background: var(--color-accent);
}

.section-heading-rule.is-centered {
  margin-left: auto;
  margin-right: auto;
}
```

(The `.is-centered` variant is for the FAQ/Estimate sections, which use `text-center` on their headings — Task 3 uses it there instead of a separate rule definition, per the spec.)

- [ ] **Step 5: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors (this is a CSS-only change, so this step mainly confirms nothing else in the repo broke).

- [ ] **Step 6: Visually sanity-check the token change doesn't break existing arbitrary-radius overrides**

Run: `grep -rn "rounded-\[" src/` from the project root — this finds any component using an arbitrary Tailwind radius value (e.g. `rounded-[7px]`) instead of the `rounded-card`/`rounded-input`/`rounded-pill` token classes. These are NOT affected by the `--radius-card`/`--radius-input` token change (they're hardcoded pixel values, untouched by this task) — confirm the grep results are only things like `rounded-[7px]` on the "Recent Projects" tile labels in `src/app/page.tsx`, which are explicitly out of scope per Global Constraints. If you find a `rounded-[14px]` or `rounded-[7px]` that looks like it was meant to track the old token values, flag it in your report as a DONE_WITH_CONCERNS item rather than changing it — the plan's other tasks are the ones that touch component classNames.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css
git commit -m "Sharpen radius tokens, flatten section boundaries, add accent-rule utility"
```

---

### Task 2: Card treatment — `WhyCard` and `TrustBadgeCard`

**Files:**
- Modify: `src/components/ui/WhyCard.tsx`
- Modify: `src/components/ui/TrustBadgeCard.tsx`

**Interfaces:**
- Consumes: `--radius-card` (now `6px` from Task 1), `--color-accent` token (unchanged).
- Produces: nothing new consumed by other tasks — these are leaf components rendered by `HubPage.tsx` (Task 3) and `src/app/page.tsx` (Task 4), but this task only changes their internal className, not their props or exports.

- [ ] **Step 1: Update `WhyCard.tsx`**

Current file:
```tsx
import type { WhyItem } from "@/lib/constants";

export function WhyCard({ title, desc }: WhyItem) {
  return (
    <div className="rounded-card border border-line bg-paper p-6 text-center shadow-card">
      <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-paper-2">
        <div className="h-3.5 w-3.5 rounded-[3px] bg-accent" />
      </div>
      <div className="mb-2 font-body text-base font-bold text-text">
        {title}
      </div>
      <div className="font-body text-[13px] leading-[1.6] text-muted">
        {desc}
      </div>
    </div>
  );
}
```

Change the outer `<div>`'s className from:
```
"rounded-card border border-line bg-paper p-6 text-center shadow-card"
```
to:
```
"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6 text-center"
```

(Drops `shadow-card`, adds `border-l-[3px] border-l-accent` which overrides the left edge's color/width while the other three edges keep the existing 1px `border-line`. Leave every other line of the file — the icon circle, title, description — completely unchanged; this card is centered-text, and per the spec the left accent border still applies uniformly regardless of text alignment.)

- [ ] **Step 2: Update `TrustBadgeCard.tsx`**

Current file:
```tsx
import type { TrustBadge } from "@/lib/constants";

export function TrustBadgeCard({ value, label }: TrustBadge) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-line bg-paper px-[22px] py-5 shadow-card">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M4 10.5 L8 14.5 L16 5.5"
            stroke="#fff"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div className="font-head text-base font-bold text-text">
          {value}
        </div>
        <div className="font-body text-xs font-medium text-muted">
          {label}
        </div>
      </div>
    </div>
  );
}
```

Change the outer `<div>`'s className from:
```
"flex items-center gap-4 rounded-card border border-line bg-paper px-[22px] py-5 shadow-card"
```
to:
```
"flex items-center gap-4 rounded-card border border-line border-l-[3px] border-l-accent bg-paper px-[22px] py-5"
```

Leave everything else in the file unchanged.

- [ ] **Step 3: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/WhyCard.tsx src/components/ui/TrustBadgeCard.tsx
git commit -m "Apply accent-border card treatment to WhyCard and TrustBadgeCard"
```

---

### Task 3: `HubPage.tsx` — card treatment + accent-rule under every section heading

**Files:**
- Modify: `src/components/hub/HubPage.tsx`

**Interfaces:**
- Consumes: `.section-heading-rule` / `.section-heading-rule.is-centered` (Task 1), the updated `WhyCard` (Task 2, no prop changes — this task doesn't need to change how `WhyCard` is invoked, only the process-step card markup that lives inline in this file).
- Produces: nothing new — this is the last task that touches `HubPage.tsx`'s visuals in this plan.

- [ ] **Step 1: Add the accent-rule span under each of the 7 section H2 elements**

For each heading below, insert a `<span className="section-heading-rule" aria-hidden="true" />` (or the `.is-centered` variant where noted) immediately after the closing `</h2>` tag. Do not change the `<h2>` itself — same id, same className, same text content.

**`why-heading`** (around line 111-117): after
```tsx
              <h2
                id="why-heading"
                className="font-head text-[32px] font-bold leading-[1.3] text-text"
              >
                {config.why.heading}
              </h2>
```
add:
```tsx
              <span className="section-heading-rule is-centered" aria-hidden="true" />
```
(This heading's wrapping `<div>` already has `text-center`, so use the centered variant.)

**`subservices-heading`** (around line 138-143): after
```tsx
              <h2
                id="subservices-heading"
                className="mb-11 max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
              >
                {config.subServices.heading}
              </h2>
```
add:
```tsx
              <span className="section-heading-rule mb-11" aria-hidden="true" />
```
(Left-aligned — no `is-centered`. Note this heading already carries `mb-11` for spacing to the content below; the rule needs its own `mb-11` since the heading's margin no longer applies once the rule is a sibling element after it. Remove `mb-11` from the `<h2>` className since the rule now owns that spacing — final h2 className becomes `"max-w-[680px] font-head text-[32px] font-bold uppercase text-text"`.)

**`gallery-heading`** (around line 181-186): same pattern as subservices — remove `mb-11` from the h2 className (becomes `"max-w-[680px] font-head text-[32px] font-bold uppercase text-text"`), add after `</h2>`:
```tsx
              <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`process-heading`** (around line 199-204): remove `mb-11` from the h2 className (becomes `"font-head text-[32px] font-bold uppercase text-text"`), add after `</h2>`:
```tsx
              <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`reviews-heading`** (around line 245-250): remove `mb-11` from the h2 className (becomes `"font-head text-[32px] font-bold uppercase text-text"`), add after `</h2>`:
```tsx
              <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`faq-heading`** (around line 267-272): this one is `text-center`. Remove `mb-12` from the h2 className (becomes `"text-center font-head text-[32px] font-bold uppercase text-text"`), add after `</h2>`:
```tsx
              <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
```

**`estimate-heading`** (around line 289-294): this one is `text-center`. Remove `mb-8` from the h2 className (becomes `"text-center font-head text-[32px] font-bold uppercase text-text"`), add after `</h2>`:
```tsx
              <span className="section-heading-rule is-centered mb-8" aria-hidden="true" />
```

- [ ] **Step 2: Update the process-step card markup (card treatment)**

Around line 206-221, find:
```tsx
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="rounded-card border border-line bg-paper p-6 shadow-card"
                  >
```

Change the `<div>` className from:
```
"rounded-card border border-line bg-paper p-6 shadow-card"
```
to:
```
"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6"
```

Leave the rest of that block (`step.num`, `step.title`, `step.desc` rendering) unchanged.

- [ ] **Step 3: Confirm the hero rating badge is untouched**

Around line 89, the hero rating badge (`4.9★ / 180+ Google Reviews`) uses `rounded-card border border-line bg-white px-[22px] py-[18px] text-text shadow-card`. Per Global Constraints, this element keeps `shadow-card` — do not modify this line. (It will automatically pick up the new sharper `6px` radius from Task 1's token change, which is fine — only the shadow removal and left-accent-border are scoped to the WhyCard/TrustBadgeCard/process-step card pattern, not this floating badge.)

- [ ] **Step 4: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/hub/HubPage.tsx
git commit -m "Add accent-rule under section headings, apply card treatment to process steps"
```

---

### Task 4: Home page (`src/app/page.tsx`) — same treatment, kept in sync manually

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `.section-heading-rule` / `.section-heading-rule.is-centered` (Task 1). This file was NOT part of the earlier hub-page refactor (it predates `HubPageConfig`/`HubPage.tsx` and has its own independent section markup), so this task ports the same visual treatment by hand rather than through a shared component.
- Produces: nothing consumed by other tasks — this is the last task touching page markup.

- [ ] **Step 1: Add accent-rule spans under each of the 8 section H2 elements**

Same pattern as Task 3. For each heading, remove its own bottom-margin class and move that margin value onto a new `<span className="section-heading-rule ..." aria-hidden="true" />` placed immediately after `</h2>`.

**`why-heading`** (around line 111-117): wrapping div already has `text-center` — h2 has no margin class here (the margin is on the wrapping div, `mb-12`, which stays as-is since it applies to the whole eyebrow+heading block, not just the heading). Add after `</h2>`:
```tsx
                <span className="section-heading-rule is-centered" aria-hidden="true" />
```

**`services-heading`** (around line 139-144): current className is `"mb-11 max-w-[640px] font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"max-w-[640px] font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`process-heading`** (around line 197-202): current className is `"mb-14 font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-14`, becomes `"font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-14" aria-hidden="true" />
```

**`projects-heading`** (around line 247-252): current className is `"mb-11 font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`reviews-heading`** (around line 299-304): current className is `"mb-11 font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`service-area-heading`** (around line 318-323): current className is `"mb-5 font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-5`, becomes `"font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
              <span className="section-heading-rule mb-5" aria-hidden="true" />
```

**`faq-heading`** (around line 352-357): current className is `"mb-12 text-center font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-12`, becomes `"text-center font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
```

**`estimate-heading`** (around line 370-375): current className is `"mb-9 text-center font-head text-[34px] font-bold uppercase text-text"`. Remove `mb-9`, becomes `"text-center font-head text-[34px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule is-centered mb-9" aria-hidden="true" />
```

- [ ] **Step 2: Update the process-step card markup (card treatment)**

Around line 204-219 (same shape as the one already fixed in `HubPage.tsx` — this file has its own independent copy since it predates the hub-page shared-component refactor), find:
```tsx
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-card border border-line bg-paper p-6 shadow-card"
                >
```

Change the `<div>` className from:
```
"rounded-card border border-line bg-paper p-6 shadow-card"
```
to:
```
"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6"
```

- [ ] **Step 3: Update the SERVICES card markup (card treatment)**

Around line 145-184, find:
```tsx
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col overflow-hidden rounded-card border border-line shadow-card"
                >
                  <div className="h-1 bg-accent" />
```

This card already has its own accent treatment — a solid `h-1 bg-accent` bar across the top (not a left border). This is a *different* card shape (image + content, not icon + text), and the existing top-bar accent already satisfies "engineering precision" without needing the left-border treatment from Task 2/3. Per the spec's Card Treatment section, this pattern only explicitly covers `WhyCard`, process-step cards, and other cards "currently using `shadow-card` + `rounded-card` as its primary visual language" — this card qualifies for the shadow removal, but should KEEP its existing `h-1 bg-accent` top bar rather than gaining a redundant left border too.

Change the outer `<div>` className from:
```
"flex flex-col overflow-hidden rounded-card border border-line shadow-card"
```
to:
```
"flex flex-col overflow-hidden rounded-card border border-line"
```
(Drops `shadow-card` only — keeps the existing `<div className="h-1 bg-accent" />` top bar unchanged, and does not add a left border to this card.)

- [ ] **Step 4: Confirm the hero rating badge is untouched**

Around line 80, same as Task 3 Step 3 — this file has its own copy of the hero rating badge (`shadow-card border border-line bg-white ...`). Leave it unchanged; it keeps `shadow-card` per Global Constraints.

- [ ] **Step 5: Confirm the "Recent Projects" tile grid is untouched**

Around line 253-287 (`PROJECTS.map`) — confirm no changes were made here. This grid uses `rounded-card border border-line bg-[repeating-linear-gradient(...)]`, which is a placeholder-image pattern, not the shadow-card pattern this plan targets. It will pick up the new `6px` radius automatically from Task 1's token change (fine, no action needed) but should NOT get a left accent border or lose/gain a shadow — it has no `shadow-card` class to begin with.

- [ ] **Step 6: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "Apply accent-rule and card treatment to home page sections"
```

---

### Task 4.5: Card treatment — `ReviewCarousel`, `FaqAccordion`, `EstimateForm`

**Files:**
- Modify: `src/components/ui/ReviewCarousel.tsx`
- Modify: `src/components/ui/FaqAccordion.tsx`
- Modify: `src/components/ui/EstimateForm.tsx`

**Interfaces:**
- Consumes: `--radius-card` (now `6px` from Task 1), `--color-accent` token (unchanged).
- Produces: nothing new consumed by other tasks — these are leaf/mid-level components rendered on both the home page and every hub page. This task was discovered during Task 5's verification pass: the original codebase audit for the design spec missed these three files, which also used `shadow-card` and were not covered by Tasks 2-4.

- [ ] **Step 1: Update `ReviewCarousel.tsx`**

Inside the `ReviewCard` function, change the outer `<div>`'s className from:
```
"h-full rounded-card border border-line bg-paper p-8 shadow-card"
```
to:
```
"h-full rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-8"
```

Leave every other line in the file — the carousel slide/pagination logic, the prev/next buttons (which use `shadow-arrow`, not `shadow-card` — do not touch those), the dot pagination — completely unchanged.

- [ ] **Step 2: Update `FaqAccordion.tsx`**

The card className is built with the `cn()` helper:
```tsx
            className={cn(
              "overflow-hidden rounded-card border border-line bg-paper shadow-card",
              isLastOdd && "md:col-span-2"
            )}
```

Change the first string argument from:
```
"overflow-hidden rounded-card border border-line bg-paper shadow-card"
```
to:
```
"overflow-hidden rounded-card border border-line border-l-[3px] border-l-accent bg-paper"
```

Leave the `isLastOdd && "md:col-span-2"` conditional and everything else in the file (accordion open/close state, button markup, panel rendering) unchanged.

- [ ] **Step 3: Update `EstimateForm.tsx`**

Change the outer `<div>`'s className from:
```
"rounded-card border border-line p-6 shadow-card sm:p-10"
```
to:
```
"rounded-card border border-line border-l-[3px] border-l-accent p-6 sm:p-10"
```

Leave every other line in the file (form fields, validation, service chips, submit button) unchanged.

- [ ] **Step 4: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ReviewCarousel.tsx src/components/ui/FaqAccordion.tsx src/components/ui/EstimateForm.tsx
git commit -m "Apply accent-border card treatment to ReviewCarousel, FaqAccordion, EstimateForm"
```

---

### Task 4.6: Card treatment + accent-rule — service detail and project case-study pages

**Files:**
- Modify: `src/app/roofing/[service]/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `.section-heading-rule` / `.section-heading-rule.is-centered` (Task 1), the same card-treatment pattern already applied elsewhere (Tasks 2-4.5).
- Produces: nothing new consumed by other tasks — these are the last two route templates in the app that still had the old `shadow-card` treatment and un-accented section headings.

This task exists because the final whole-branch review found that the original codebase audit (which also missed the three files fixed in Task 4.5) additionally missed these two live, statically-generated route templates — `/roofing/roof-replacement` and `/projects/storm-damage-repair-bristol-pa` are both real pages, both linked from other already-updated pages, and both use the exact same card/heading patterns already converted elsewhere. Leaving them meant `--radius-card`'s global 6px change gave their cards sharp corners while they kept the old soft shadow — a visibly half-migrated hybrid, worse than before the refresh started.

- [ ] **Step 1: `src/app/roofing/[service]/page.tsx` — accent-rule under all 7 section headings**

For each heading below, remove its own bottom-margin Tailwind class and add a `<span className="section-heading-rule ..." aria-hidden="true" />` immediately after the closing `</h2>`, carrying that same margin value — the same pattern used in Tasks 3 and 4.

**`intro-heading`** (around line 121-126): current className `"mb-6 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-6`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-6" aria-hidden="true" />
```

**`signs-heading`** (around line 145-150): current className `"mb-8 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-8`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-8" aria-hidden="true" />
```

**`process-heading`** (around line 178-183): current className `"mb-11 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`materials-heading`** (around line 213-218): current className `"mb-11 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`faq-heading`** (around line 245-250): this one is `text-center`. Current className `"mb-12 text-center font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-12`, becomes `"text-center font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
```

**`related-heading`** (around line 263-268): current className `"mb-11 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`estimate-heading`** (around line 306-311): this one is `text-center`. Current className `"mb-8 text-center font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-8`, becomes `"text-center font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule is-centered mb-8" aria-hidden="true" />
```

- [ ] **Step 2: `src/app/roofing/[service]/page.tsx` — card treatment on 4 card blocks**

**Signs-you-need-this list items** (around line 151-165), find:
```tsx
                <li
                  key={sign}
                  className="flex gap-3 rounded-card border border-line bg-paper p-5 font-body text-sm leading-[1.6] text-text shadow-card"
                >
```
Change the className from `"flex gap-3 rounded-card border border-line bg-paper p-5 font-body text-sm leading-[1.6] text-text shadow-card"` to `"flex gap-3 rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-5 font-body text-sm leading-[1.6] text-text"`.

**Process-step cards** (around line 184-200), find:
```tsx
                <div
                  key={step.num}
                  className="rounded-card border border-line bg-paper p-6 shadow-card"
                >
```
Change the className from `"rounded-card border border-line bg-paper p-6 shadow-card"` to `"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6"` — identical to the process-step treatment already applied in `HubPage.tsx` and `page.tsx`.

**Materials cards** (around line 219-233), find:
```tsx
                <div
                  key={material.title}
                  className="rounded-card border border-line bg-paper p-7 shadow-card"
                >
```
Change the className from `"rounded-card border border-line bg-paper p-7 shadow-card"` to `"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-7"`.

**Related-services link cards** (around line 270-289), find:
```tsx
                <Link
                  key={related.title}
                  href={`${service.hubHref}#subservices`}
                  className="rounded-card border border-line bg-paper p-7 no-underline shadow-card transition-[filter] duration-150 ease-out hover:brightness-95"
                >
```
Change the className from `"rounded-card border border-line bg-paper p-7 no-underline shadow-card transition-[filter] duration-150 ease-out hover:brightness-95"` to `"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-7 no-underline transition-[filter] duration-150 ease-out hover:brightness-95"`.

- [ ] **Step 3: `src/app/projects/[slug]/page.tsx` — accent-rule under visible section headings only**

This page has 5 total `<h2>` elements, but two (`facts-heading`, `review-heading`) are `className="sr-only"` — visually hidden, accessibility-only headings with no visible heading text on the page at all. Do NOT add an accent-rule span to either of those two — the motif is a visual decoration under a visible heading; adding it to an `sr-only` heading would either be invisible (harmless but pointless) or, worse, accidentally become visible if the `sr-only` utility ever changes, which is not a risk worth taking for a purely decorative element. Only the 3 visible headings get the treatment:

**`story-heading`** (around line 127-132): current className `"mb-6 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-6`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-6" aria-hidden="true" />
```

**`gallery-heading`** (around line 151-156): current className `"mb-11 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-11`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Add after `</h2>`:
```tsx
            <span className="section-heading-rule mb-11" aria-hidden="true" />
```

**`cta-heading`** (around line 204-209): this one is inside a `text-center` Container/Reveal block (the whole CTA section is centered via `Container className="py-24 text-center"`, not a `text-center` class on the h2 itself). Current h2 className `"mb-4 font-head text-[32px] font-bold uppercase text-text"`. Remove `mb-4`, becomes `"font-head text-[32px] font-bold uppercase text-text"`. Since the containing block is already centered, use the centered span variant. Add after `</h2>`:
```tsx
            <span className="section-heading-rule is-centered mb-4" aria-hidden="true" />
```

Leave `facts-heading` and `review-heading` (the two `sr-only` ones) completely untouched — no span, no className change.

- [ ] **Step 4: `src/app/projects/[slug]/page.tsx` — card treatment on the client review card**

Around line 178, find:
```tsx
            <div className="rounded-card border border-line bg-paper p-10 text-center shadow-card">
```
Change the className from `"rounded-card border border-line bg-paper p-10 text-center shadow-card"` to `"rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-10 text-center"`.

Note: this page's `dl` element at line 107 (`"grid grid-cols-1 gap-5 rounded-card border border-line bg-paper-2 p-8 sm:grid-cols-2 lg:grid-cols-5"`, the project-facts stat block) does NOT use `shadow-card` and is not a card in the WhyCard/process-step sense — it's a stat/definition-list block on a tinted background. Do not modify it.

- [ ] **Step 5: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add "src/app/roofing/[service]/page.tsx" "src/app/projects/[slug]/page.tsx"
git commit -m "Apply accent-rule and card treatment to service detail and project case-study pages"
```

---

### Task 5: Full-site visual verification

**Files:** none modified — verification only.

**Interfaces:**
- Consumes: the running dev server, all changes from Tasks 1-4.
- Produces: pass/fail confirmation gating whether the visual refresh is complete.

- [ ] **Step 1: Clear the Next.js build cache before starting**

A prior session on this codebase hit a stale-Turbopack-cache false alarm during verification (old className values appeared to persist in dev-server output after a source change). Avoid repeating that: before starting the dev server, run:

```bash
cd c:\main\Projects\TopLineExteriors && rm -rf .next
```

- [ ] **Step 2: Start the dev server and wait for it to be ready**

```bash
cd c:\main\Projects\TopLineExteriors && npm run dev
```

Poll instead of guessing a sleep duration: `until curl -sf http://localhost:3000/ >/dev/null; do sleep 1; done`

- [ ] **Step 3: Confirm the old shadow-card / gradient values are gone from card markup**

```bash
curl -s http://localhost:3000/roofing -o /tmp/roofing.html
curl -s http://localhost:3000/ -o /tmp/home.html
```

Check that `shadow-card` survives ONLY on the two explicitly-exempted hero rating badges (one per page — roofing hub and home each have their own copy) — not on any WhyCard, process-step card, TrustBadgeCard, or SERVICES card:

```bash
grep -o 'shadow-card' /tmp/roofing.html | wc -l
grep -o 'shadow-card' /tmp/home.html | wc -l
```

Expected: `/roofing` shows exactly 1 (the hero badge). `/` (home) shows exactly 1 (the hero badge) — the SERVICES cards and process-step cards on home should no longer carry it.

- [ ] **Step 4: Confirm the accent-rule spans rendered**

```bash
grep -o 'section-heading-rule' /tmp/roofing.html | wc -l
```

Expected: 7 (one per section heading on a hub page: why, subservices, gallery, process, reviews, faq, estimate).

```bash
grep -o 'section-heading-rule' /tmp/home.html | wc -l
```

Expected: 8 (why, services, process, projects, reviews, service-area, faq, estimate).

- [ ] **Step 5: Confirm `.bg-alt` sections no longer carry the old gradient**

```bash
curl -s http://localhost:3000/roofing | grep -o 'linear-gradient'
```

Expected: no output (empty) — the gradient was replaced with a flat fill + border rule in Task 1; nothing in hub-page or home-page markup should reference `linear-gradient` for section backgrounds. (Note: `PlaceholderImage` and the home page's `PROJECTS` tile grid legitimately use `repeating-linear-gradient` for their placeholder texture — that's a different, unrelated pattern and is expected to still appear if you grep more broadly. This check is specifically about the removed `.bg-alt` gradient, which was a plain `linear-gradient`, not `repeating-linear-gradient` — the exact string `linear-gradient` with nothing else on the matched line, not part of `repeating-linear-gradient`, confirms this. If the grep above returns 0 matches, that's sufic; if it returns matches, read the surrounding context to confirm none of them are the removed `.bg-alt` rule reappearing.)

- [ ] **Step 6: Confirm left-accent border classes are present on the expected cards**

```bash
grep -o 'border-l-\[3px\] border-l-accent' /tmp/roofing.html | wc -l
```

Expected: at least 8 on a hub page (4 WhyCard instances + 4 process-step cards — exact WhyCard count depends on `ROOFING_WHY_ITEMS` length, confirmed earlier in this project as 4 items).

- [ ] **Step 7: Run a full project type-check one more time**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 8: Screenshot for a human visual check, if browser automation is available**

If `chromium-cli` or Playwright is available in this environment, screenshot `/`, `/roofing`, `/siding`, `/decks` — specifically the "How It Works" section (to see the new left-accent cards and flat `.bg-alt` section boundary together) and one section heading close-up (to see the new accent-rule under the H2). If no browser automation is available (as was the case in prior sessions on this project), state that explicitly rather than claiming a visual check was performed — the curl-based structural checks in Steps 3-6 remain the verification of record.

- [ ] **Step 9: Stop the dev server**

```bash
# PowerShell
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force -Confirm:$false }
```

---

## Post-Refresh Follow-Up (not part of this plan — flag to user, do not implement)

Per the design spec's "Explicitly Out of Scope" section, this plan does not address: the flat typographic hierarchy (all H2s roughly the same size/weight across the site), the repeated 4-column card grid *structure* (this plan changes the card *skin*, not the grid shape itself), or `--color-muted` contrast risk on small text. Suggest a follow-up brainstorming session for those once this visual refresh lands and the user has seen it live.
