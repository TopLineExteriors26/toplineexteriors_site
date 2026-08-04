# Homepage Token Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revert the homepage to its original structure/content/components, then recolor the shared `globals.css` tokens so the whole site (homepage + hub pages + service-detail pages + project pages + privacy) inherits the new visual language without any component rewrite.

**Architecture:** Delete the prior session's new homepage-specific components and content; restore `page.tsx` and `EstimateForm.tsx` to their pre-redesign form via `git show`; trim the appended `HOME_REDESIGN_*` block from `constants.ts` while keeping the two small unrelated additions from the final review pass; remap 7 color tokens + 2 radius tokens + 3 shadow tokens + 2 font aliases in `globals.css`'s original `@theme` block to new values.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4 (CSS `@theme`), no new dependencies.

## Global Constraints

- No new npm dependencies.
- No structural/geometry changes to any page — this is a token recolor, not a rewrite. Component JSX structure stays byte-identical to its pre-redesign form except where this plan explicitly says to delete a file.
- `Header.tsx`, `HeaderNavLink.tsx`, `NavDropdownPanel.tsx`, `Logo.tsx`, `Footer.tsx` are NOT touched by this plan — they already use the new token vocabulary directly and are correct as-is.
- The additive `@theme` block in `globals.css` (graphite-*/sand-*/brand-*/font-display/shadow-home-*/shadow-nav/shadow-panel/shadow-float/ease-out-soft, plus `.reveal-init`/`.reveal-in`/`.ba-range` utility classes) is NOT deleted — `Header`/`Footer` still consume it. Leave that whole block untouched.
- `src/app/fonts.ts` and its `.variable` wiring in `layout.tsx` (alongside the existing Barlow wiring) are NOT touched — already correct, reused as-is.
- Do not remove `PHONE_DISPLAY`'s `TODO(client)` comment or the `NJ_HIC_LICENSE` constant from `constants.ts` — these were added in the final review pass of the prior session and are unrelated to the redesign content being reverted.
- `npm run build`, `npx tsc --noEmit`, `npm run lint` must all pass clean at the end, with zero references anywhere in `src/` to any deleted export/file.

---

## File Structure

```
src/components/homepage/                DELETE (entire directory)
src/content/homepage.ts                 DELETE
src/lib/constants.ts                    MODIFY — remove appended HOME_REDESIGN_* block only
src/components/ui/EstimateForm.tsx      MODIFY — revert to pre-redesign content (git show 5542f9b)
src/app/page.tsx                        MODIFY — revert to pre-redesign content (git show 5542f9b)
src/app/globals.css                     MODIFY — remap 7 color + 2 radius + 3 shadow tokens + 2 font aliases in the ORIGINAL @theme block (lines 3-24); additive block below untouched
```

---

### Task 1: Delete the prior session's homepage-specific files

**Files:**
- Delete: `src/components/homepage/Reveal.tsx`
- Delete: `src/components/homepage/BeforeAfter.tsx`
- Delete: `src/components/homepage/HomePlaceholder.tsx`
- Delete: `src/components/homepage/Hero.tsx`
- Delete: `src/components/homepage/TrustStrip.tsx`
- Delete: `src/components/homepage/Services.tsx`
- Delete: `src/components/homepage/BeforeAfterSection.tsx`
- Delete: `src/components/homepage/Reviews.tsx`
- Delete: `src/components/homepage/EstimateSection.tsx`
- Delete: `src/content/homepage.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. This task only removes files; Task 3 (which reverts `page.tsx`) is what stops referencing them. Do this task BEFORE Task 3 is fine, or after — order between Task 1 and Task 3 doesn't matter since `git show`-based revert in Task 3 doesn't depend on these files existing or not. Doing deletions first makes the intent clearest.

- [ ] **Step 1: Delete the entire `src/components/homepage/` directory**

Run: `rm -rf src/components/homepage`

- [ ] **Step 2: Delete the content manifest file**

Run: `rm src/content/homepage.ts`

- [ ] **Step 3: Confirm nothing outside this directory still imports from the deleted paths**

Run: `grep -rn "components/homepage\|content/homepage" src/ --include=*.tsx --include=*.ts`

Expected: no output yet (Task 3 and Task 4 haven't run) EXCEPT `src/app/page.tsx` and `src/components/ui/EstimateForm.tsx`, which still import from these deleted paths until Tasks 3 and 4 fix them. This is expected and will be resolved by those tasks — do not attempt to fix `page.tsx`/`EstimateForm.tsx` imports in this task.

- [ ] **Step 4: Commit**

```bash
git add -A src/components/homepage src/content/homepage.ts
git commit -m "Delete redesign-session homepage components and content manifest"
```

Note: `git add -A` is used here (not `git add <specific files>`) because these are deletions — `git add -A` on these exact paths stages the removal correctly. Do not run `git add -A` on the whole repo.

---

### Task 2: Trim `HOME_REDESIGN_*` block from constants.ts

**Files:**
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `src/lib/constants.ts` with its original `HOME_*`/`SERVICES`/`PROJECTS`/`CITIES`/`PROCESS_STEPS`/etc. exports intact (untouched, they were never modified by the redesign session), plus the two small additions from the prior session's final review (`PHONE_DISPLAY`'s TODO comment, `NJ_HIC_LICENSE`) preserved, with the appended `HOME_REDESIGN_*` block removed.

The file currently ends with a block starting with this exact comment header (added by the redesign session, must be removed):

```typescript
// ---------------------------------------------------------------------------
// HOMEPAGE REDESIGN (2026-08-04) — copy is verbatim from the approved design
// handoff README.md. Do not reuse these for hub/service-detail pages; those
// keep their existing HOME_*/ROOFING_*/etc. constants above.
// ---------------------------------------------------------------------------
```

...and everything after it, through the end of the file, consisting of these exports (delete all of them, in this exact set):

```
HOME_REDESIGN_EYEBROW
HOME_REDESIGN_HERO_LINES
HOME_REDESIGN_LEDE
HOME_REDESIGN_SECONDARY_CTA
HOME_REDESIGN_REPLY_STAT
HOME_REDESIGN_REPLY_CAPTION
HOME_REDESIGN_TRUST_LABEL
HOME_REDESIGN_TRUST_BRANDS
HomeRedesignService (type)
HOME_REDESIGN_SERVICES
HOME_REDESIGN_BA_HEADLINE_LINES
HOME_REDESIGN_BA_ASIDE
HomeRedesignStat (type)
HOME_REDESIGN_BA_STATS
HomeRedesignReview (type)
HOME_REDESIGN_REVIEWS
HOME_REDESIGN_FORM_STEPS
HOME_REDESIGN_SERVICE_TYPE_OPTIONS
HOME_REDESIGN_FOOTER_LINKS
```

- [ ] **Step 1: Find the exact line where the block starts**

Run: `grep -n "HOMEPAGE REDESIGN (2026-08-04)" src/lib/constants.ts`

This prints the line number of the comment header shown above.

- [ ] **Step 2: Delete from that line to the end of the file**

Using the line number `N` from Step 1, delete lines `N` through the end of the file. One way to do this precisely:

Run: `sed -i "${N},\$d" src/lib/constants.ts` (replace `${N}` with the actual line number found in Step 1)

If there's a blank line immediately before line `N` that was the separator before the appended block, it's fine to leave a single trailing blank line at the end of the file — that's normal and not a defect.

- [ ] **Step 3: Confirm the two final-review additions are still present (must NOT have been deleted)**

Run: `grep -n "NJ_HIC_LICENSE\|replace placeholder phone number" src/lib/constants.ts`

Expected: two matches — the `// TODO(client): replace placeholder phone number before launch.` comment near the top of the file (above `PHONE_DISPLAY`), and the `NJ_HIC_LICENSE` constant with its own `TODO(client)` comment (near `HIC_LICENSE`). If either is missing, the deletion in Step 2 went too far — restore from `git diff` and redo Step 2 more precisely, cutting only from the `HOMEPAGE REDESIGN` comment onward.

- [ ] **Step 4: Confirm no `HOME_REDESIGN_*` references remain anywhere**

Run: `grep -rn "HOME_REDESIGN_\|HomeRedesignService\|HomeRedesignStat\|HomeRedesignReview" src/`

Expected: no output.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`

Expected: errors ARE expected at this point, since `page.tsx` and `EstimateForm.tsx` still reference the now-deleted `HOME_REDESIGN_*` constants and the deleted `src/components/homepage/` files (Task 1). This is fine — Tasks 3 and 4 fix those files next. Do not attempt to fix `page.tsx`/`EstimateForm.tsx` in this task.

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.ts
git commit -m "Remove HOME_REDESIGN_* constants block, keep unrelated final-review additions"
```

---

### Task 3: Revert `EstimateForm.tsx` to its pre-redesign form

**Files:**
- Modify: `src/components/ui/EstimateForm.tsx`

**Interfaces:**
- Consumes: nothing new — restores the original component's own self-contained logic (`SERVICE_TYPE_OPTIONS` from `constants.ts`, which was never touched by the redesign and still exists).
- Produces: `EstimateForm` component with its original prop signature `{ showServiceChips?, projectPlaceholder?, submitLabel? }` — NO `variant` prop. Later Task 5 (which reverts `page.tsx`) expects this exact original signature (no `variant` argument passed anywhere).

The redesign session added a `variant?: "default" | "redesign"` prop and a large amount of conditional JSX to this file. Since this file's pre-redesign content is fully preserved in git history at commit `5542f9b` (confirmed: no unrelated commits touched this file between then and now), the correct and safest way to revert is to restore that exact historical version wholesale, rather than manually removing the `isRedesign` branches (manual editing risks subtly breaking the original logic that's interleaved with the added branches).

- [ ] **Step 1: Restore the file from git history**

Run: `git show 5542f9b:src/components/ui/EstimateForm.tsx > src/components/ui/EstimateForm.tsx`

- [ ] **Step 2: Confirm the restored file has no `variant` prop or redesign-related imports**

Run: `grep -n "variant\|isRedesign\|HOME_REDESIGN" src/components/ui/EstimateForm.tsx`

Expected: no output.

- [ ] **Step 3: Confirm the restored file imports `SERVICE_TYPE_OPTIONS` (not `HOME_REDESIGN_SERVICE_TYPE_OPTIONS`)**

Run: `grep -n "SERVICE_TYPE_OPTIONS" src/components/ui/EstimateForm.tsx`

Expected: one import line and one usage inside a `.map()` call, both referencing the plain `SERVICE_TYPE_OPTIONS` name.

- [ ] **Step 4: Typecheck this file specifically**

Run: `npx tsc --noEmit`

Expected: this file itself should now be error-free. Errors from `page.tsx` (still referencing deleted homepage components/constants) are still expected at this point — Task 5 fixes that.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/EstimateForm.tsx
git commit -m "Revert EstimateForm to its pre-redesign form (drop variant prop)"
```

---

### Task 4: Revert `page.tsx` to its pre-redesign content

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `WhyCard`, `StatBlock`, `TrustBadgeCard`, `PlaceholderImage`, `ReviewCarousel`, `FaqAccordion`, `Button`, `Container`, `Reveal` (the ORIGINAL `src/components/ui/Reveal.tsx`, not the deleted `src/components/homepage/Reveal.tsx`), `EstimateForm` (from Task 3, its reverted pre-redesign signature — called with no `variant` prop), `Header`, `Footer` — all of these already exist untouched, this task doesn't need to create or modify any of them.
- Produces: the homepage route `/` renders the original structure: Hero → Trust Badges → Why Topline → Services → How It Works → Recent Projects → Reviews → Service Area → FAQ → Estimate Form → Footer, with the original `jsonLd` schema and `metadata` export.

Like Task 3, this file's pre-redesign content is fully preserved in git history at commit `5542f9b` with no unrelated commits in between, so restore it wholesale rather than manually reconstructing it.

- [ ] **Step 1: Restore the file from git history**

Run: `git show 5542f9b:src/app/page.tsx > src/app/page.tsx`

- [ ] **Step 2: Confirm the restored file has no references to deleted homepage components/constants**

Run: `grep -n "components/homepage\|content/homepage\|HOME_REDESIGN_" src/app/page.tsx`

Expected: no output.

- [ ] **Step 3: Confirm the restored file imports the original `Reveal` from `@/components/ui/Reveal`, not from `@/components/homepage/Reveal`**

Run: `grep -n "import.*Reveal" src/app/page.tsx`

Expected: one line, `import { Reveal } from "@/components/ui/Reveal";`.

- [ ] **Step 4: Confirm `EstimateForm` is called without a `variant` prop**

Run: `grep -n -A3 "<EstimateForm" src/app/page.tsx`

Expected: the JSX call passes only `showServiceChips`/similar original props, no `variant="..."`.

- [ ] **Step 5: Full typecheck — this should now be completely clean**

Run: `npx tsc --noEmit`

Expected: zero errors. All references to deleted/removed content have now been resolved by Tasks 1-4 together.

- [ ] **Step 6: Build**

Run: `npm run build`

Expected: succeeds, all routes generate (home, hub pages, service-detail pages, project page, privacy, 404) — the same ~33 pages as before, structurally unaffected by this revert since none of those other routes were touched.

- [ ] **Step 7: Lint**

Run: `npm run lint`

Expected: same result as the prior session's final state (0 errors, 0 warnings) — no new issues introduced by this revert, since it's removing code, not adding any.

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx
git commit -m "Revert homepage to its pre-redesign structure and content"
```

---

### Task 5: Recolor the shared design tokens in `globals.css`

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing — this task only changes CSS variable VALUES, not names. Every class name (`bg-accent`, `text-text`, `border-line`, `bg-paper-2`, `font-head`, `font-body`, `rounded-card`, `rounded-input`, `shadow-card`, `shadow-cta`, `shadow-arrow`) used across the entire codebase (homepage, hub pages, service-detail pages, project pages, privacy, `Button`, `WhyCard`, `TrustBadgeCard`, `PlaceholderImage`, `ReviewCarousel`, `FaqAccordion`, `Container`, `.bg-alt` and its siblings) continues to resolve to these same variable names — only what color/font/size those names point to changes.
- Produces: the whole site inherits the new visual language (brand orange, graphite dark tones, sand neutrals, Archivo/Archivo Black fonts, 14px card radii) with zero JSX/component changes anywhere.

The file's current top section (before this task's edit) is:

```css
@import "tailwindcss";

@theme {
  --color-ink: #1b2a45;
  --color-text: #1b2a45;
  --color-accent: #e2661b;
  --color-paper: #ffffff;
  --color-paper-2: #f7f4ef;
  --color-line: rgba(27, 42, 69, 0.13);
  --color-muted: #1b2a45;

  --radius-card: 6px;
  --radius-input: 6px;
  --radius-pill: 999px;

  --shadow-card: 0 10px 28px rgba(27, 42, 69, 0.09);
  --shadow-cta: 0 10px 22px rgba(226, 102, 27, 0.28);
  --shadow-arrow: 0 8px 20px rgba(27, 42, 69, 0.1);
}

@theme inline {
  --font-head: var(--font-barlow-condensed);
  --font-body: var(--font-barlow);
}
```

Everything from `body { ... }` onward (the rest of the file, including the entire additive graphite/sand/brand `@theme` block added by the prior redesign session) is UNCHANGED by this task — do not touch anything below the `@theme inline` block shown above.

- [ ] **Step 1: Replace the `@theme` block's color/radius/shadow values and the `@theme inline` block's font aliases**

Find (the exact block shown above, lines 1-24 of the current file):

```css
@import "tailwindcss";

@theme {
  --color-ink: #1b2a45;
  --color-text: #1b2a45;
  --color-accent: #e2661b;
  --color-paper: #ffffff;
  --color-paper-2: #f7f4ef;
  --color-line: rgba(27, 42, 69, 0.13);
  --color-muted: #1b2a45;

  --radius-card: 6px;
  --radius-input: 6px;
  --radius-pill: 999px;

  --shadow-card: 0 10px 28px rgba(27, 42, 69, 0.09);
  --shadow-cta: 0 10px 22px rgba(226, 102, 27, 0.28);
  --shadow-arrow: 0 8px 20px rgba(27, 42, 69, 0.1);
}

@theme inline {
  --font-head: var(--font-barlow-condensed);
  --font-body: var(--font-barlow);
}
```

Replace with:

```css
@import "tailwindcss";

@theme {
  --color-ink: #2C2F33;
  --color-text: #1E2023;
  --color-accent: #F0731E;
  --color-paper: #ffffff;
  --color-paper-2: #F4F3F0;
  --color-line: #E8E6E2;
  --color-muted: #52565B;

  --radius-card: 14px;
  --radius-input: 14px;
  --radius-pill: 999px;

  --shadow-card: 0 10px 28px rgba(44, 47, 51, 0.10);
  --shadow-cta: 0 10px 24px rgba(240, 115, 30, 0.28);
  --shadow-arrow: 0 8px 20px rgba(44, 47, 51, 0.12);
}

@theme inline {
  --font-head: var(--font-archivo-black);
  --font-body: var(--font-archivo);
}
```

Note on `--color-line`: this switches from a translucent navy tint (`rgba(27, 42, 69, 0.13)`) to a solid sand tone (`#E8E6E2`, matching `--color-sand-200` already defined in the additive block below), per the design spec's explicit decision to make borders solid rather than alpha-blended, matching the new system's convention.

Note on shadow values: `--shadow-card`/`--shadow-arrow` keep the same alpha/blur/spread shape as before, re-tinted from navy (`rgba(27,42,69,...)`) to graphite (`rgba(44,47,51,...)`, i.e. `#2C2F33` in rgb). `--shadow-cta` keeps its shape, re-tinted from the old orange (`rgba(226,102,27,...)`) to the new brand orange (`rgba(240,115,30,...)`, i.e. `#F0731E` in rgb).

- [ ] **Step 2: Confirm the additive block below is untouched**

Run: `grep -n "color-graphite-900\|color-brand-500\|color-sand-200" src/app/globals.css`

Expected: these still resolve inside the SECOND `@theme` block further down in the file (the one with the comment `Homepage redesign tokens (2026-08-04)`), completely separate from the block edited in Step 1. If this second block is missing or altered, something went wrong — revert this task's edit and redo Step 1 more precisely, touching only the first 24 lines.

- [ ] **Step 3: Build**

Run: `npm run build`

Expected: succeeds. This step won't catch color mistakes (Tailwind resolves whatever hex value is given, wrong-but-valid colors still build fine) — visual verification is the user's job in their browser per project rules, not something to attempt here.

- [ ] **Step 4: Confirm no old `--color-*`/`--radius-*`/`--shadow-*` variable NAMES were accidentally removed or renamed**

Run: `grep -n "\-\-color-ink\|\-\-color-text\|\-\-color-accent\|\-\-color-paper\b\|\-\-color-paper-2\|\-\-color-line\|\-\-color-muted\|\-\-radius-card\|\-\-radius-input\|\-\-radius-pill\|\-\-shadow-card\|\-\-shadow-cta\|\-\-shadow-arrow" src/app/globals.css`

Expected: exactly one declaration line for each of these 12 variable names (all still present, just with new values from Step 1).

- [ ] **Step 5: Full typecheck, lint, build one more time to confirm the whole site is clean**

Run: `npx tsc --noEmit && npm run lint && npm run build`

Expected: all three pass clean, matching Task 4's Steps 5-7 results (this task doesn't change any TypeScript/JSX, only CSS values, so nothing here should regress).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "Recolor shared design tokens: brand orange, graphite dark tones, Archivo fonts, 14px radii"
```

---

### Task 6: Sitewide verification sweep

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Full build**

Run: `npm run build`

Expected: succeeds, zero type errors, all routes generate — home, `/roofing`, `/decks`, `/siding`, all service-detail pages under each, `/projects/[slug]`, `/privacy`, `/_not-found`.

- [ ] **Step 2: Lint**

Run: `npm run lint`

Expected: 0 errors, 0 warnings (matching the state at the end of the prior redesign session — this plan removes code and recolors CSS, it doesn't add any new lintable surface).

- [ ] **Step 3: Confirm zero remaining references to anything deleted in this plan**

Run: `grep -rn "components/homepage\|content/homepage\|HOME_REDESIGN_\|HomeRedesignService\|HomeRedesignStat\|HomeRedesignReview" src/`

Expected: no output.

- [ ] **Step 4: Confirm `EstimateForm` has no stray `variant` prop usage anywhere it's called**

Run: `grep -rn "<EstimateForm" src/`

Expected: matches in `src/app/page.tsx` and `src/components/hub/HubPage.tsx` (both pre-existing, out-of-scope-for-this-plan call sites), neither passing a `variant` prop.

- [ ] **Step 5: Confirm the homepage's `#projects` anchor is intact (the original page.tsx had its own `<section id="projects">`, unlike the deleted redesign's separate fix for this)**

Run: `grep -n "id=\"projects\"" src/app/page.tsx`

Expected: one match, inside the "Recent Projects" section.

- [ ] **Step 6: Confirm the two final-review additions from the prior session survived intact**

Run: `grep -n "NJ_HIC_LICENSE\|replace placeholder phone number" src/lib/constants.ts`

Expected: two matches, as verified already in Task 2 Step 3 — this is a final re-confirmation now that all other tasks have also run.

- [ ] **Step 7: Report completion**

No code changes in this step — if all six prior checks in this task pass, the plan is complete. Tell the user: "Build/lint/typecheck clean sitewide. Homepage structure reverted to original; whole site (home, hub pages, service-detail pages, project pages, privacy) now uses the new brand-orange/graphite/Archivo token values via globals.css. Please check `/` and a couple of hub pages in your own dev server to confirm the colors/fonts read correctly — I can't run the dev server or take screenshots myself."

---

## Self-review notes (from plan authoring)

- **Spec coverage:** every section of `2026-08-04-homepage-token-restyle-design.md` maps to a task: "what gets deleted" → Tasks 1-2; "what stays" → confirmed untouched by omission (no task modifies Header/Footer/Logo/fonts.ts); "token remapping" → Task 5's exact table, transcribed value-for-value; ".bg-alt and dark sections" → no task needed, this falls out automatically once `--color-ink` is remapped (confirmed in the design doc's own reasoning, re-verified here: `.bg-alt { background: var(--color-ink); }` is untouched CSS, inherits the new value automatically); "scope of the sitewide recolor" → Task 6's verification confirms all routes build; "definition of done" → each bullet maps to a Task 6 grep check.
- **Placeholder scan:** no TBD/TODO-as-placeholder language found. The only `TODO(client)` mentions in this plan are exact strings being verified to still exist (not new placeholders).
- **Type consistency:** `EstimateForm`'s prop signature (Task 3) is referenced identically in Task 4's Step 4 verification (no `variant` prop) and Task 6's Step 4 (re-verified sitewide). Token variable names in Task 5 (`--color-ink`, `--color-text`, etc.) match exactly what Task 5 Step 4's grep checks for. No mismatched names found between tasks.
