# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Topline Exteriors homepage (`/`) to the approved design (`design_handoff_homepage_redesign/`), plus the shared `Header`/`Footer`/`Logo` chrome that appears on every route, while leaving every other page's internal content unchanged.

**Architecture:** Additive Tailwind v4 `@theme` tokens (new palette/type/radius/shadow scale layered onto the existing one, nothing removed), two new client components ported from the handoff (`Reveal`, `BeforeAfter`, namespaced under `src/components/homepage/` to avoid clashing with the existing `src/components/ui/Reveal.tsx`), a new typed image-slot manifest, and a full rewrite of `src/app/page.tsx`'s JSX using new homepage-only section components. `Header.tsx` and `Footer.tsx` are edited in place (same behavior, new classes).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4 (CSS `@theme`), no new dependencies.

## Global Constraints

- No new npm dependencies. `package.json` must be unchanged except nothing (do not touch it).
- Orange (`brand-500`, `#F0731E`) is action-only: primary buttons, active chip, numbered badges, stars, small dots. Never an orange section background or orange body copy.
- Orange text on white must never be smaller than 18px; use `text-brand-700` for smaller orange-on-white text.
- Page background stays white. `graphite-900` appears as a large surface in exactly two places (before/after block, footer) plus the small floating stat chip over the hero photo. No other dark sections.
- Radii: `rounded-full` (pill, small interactive things), `rounded-lg` (14px, buttons/inputs), `rounded-xl`/`rounded-2xl` (20/24px, cards/panels/dark blocks). Nothing square-cornered on the homepage.
- No gradients, no glassmorphism, no decorative SVG illustration.
- Do not invent copy — every string used must come from `README.md` (quoted verbatim in this plan's tasks) or be an existing constant already in `src/lib/constants.ts`.
- Every unverified placeholder stat/number/quote gets a `TODO(client)` comment at its first use.
- `/roofing`, `/decks`, `/siding`, service-detail pages, `/projects/[slug]`, `/privacy`, `not-found.tsx` must render exactly as before except for the restyled `Header`/`Footer`. Do not touch their section markup, `src/lib/constants.ts` entries they use, or `src/components/ui/PlaceholderImage.tsx`, `src/components/ui/Button.tsx`'s existing consumers' behavior.
- Do not remove or rename any existing `@theme` token, existing CSS rule, or `src/lib/fonts.ts`/its wiring in `layout.tsx`.
- `npm run build` and `npm run lint` must pass with no new errors/warnings at the end.

---

## File Structure

```
src/app/globals.css                      MODIFY — append new @theme block + new base/utility layers
src/app/fonts.ts                         CREATE — Archivo/Archivo Black/JetBrains Mono next/font loaders
src/app/layout.tsx                       MODIFY — add three new .variable classes to <html>
src/components/homepage/Reveal.tsx       CREATE — ported from handoff, renamed to avoid clash
src/components/homepage/BeforeAfter.tsx  CREATE — ported from handoff verbatim
src/components/homepage/HomePlaceholder.tsx  CREATE — new-token placeholder image block
src/components/homepage/Hero.tsx         CREATE
src/components/homepage/TrustStrip.tsx   CREATE
src/components/homepage/Services.tsx     CREATE
src/components/homepage/BeforeAfterSection.tsx  CREATE
src/components/homepage/Reviews.tsx      CREATE
src/components/homepage/EstimateSection.tsx     CREATE — new panel UI wrapping form logic
src/content/homepage.ts                  CREATE — typed photo-slot manifest
src/lib/constants.ts                     MODIFY — add HOME_REDESIGN_* copy constants (additive only)
src/app/page.tsx                         MODIFY — full rewrite of JSX using the new sections
src/components/layout/Header.tsx         MODIFY — restyle classes only, no behavior change
src/components/layout/HeaderNavLink.tsx  MODIFY — restyle classes only
src/components/layout/NavDropdownPanel.tsx  MODIFY — restyle classes only
src/components/layout/Footer.tsx         MODIFY — restyle classes only
src/components/layout/Logo.tsx           MODIFY — restyle classes only (font swap in dark wordmark variant)
```

---

### Task 1: Fonts — add Archivo/Archivo Black/JetBrains Mono

**Files:**
- Create: `src/app/fonts.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `archivo`, `archivoBlack`, `jetbrains` exports from `src/app/fonts.ts`, each a `next/font/google` result object with a `.variable` string property (`--font-archivo`, `--font-archivo-black`, `--font-jetbrains` respectively). Later tasks' `@theme` tokens (Task 2) reference these CSS variable names directly.

- [ ] **Step 1: Create `src/app/fonts.ts`**

```typescript
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

- [ ] **Step 2: Wire the three `.variable` classes onto `<html>` in `src/app/layout.tsx`, alongside the existing Barlow ones**

Current `src/app/layout.tsx` (for reference, do not delete any of it):

```tsx
import type { Metadata } from "next";
import { barlow, barlowCondensed } from "@/lib/fonts";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TopLine Exteriors | Roofing, Decks & Siding — Bucks County, PA & South Jersey",
    template: "%s | TopLine Exteriors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
```

Edit the import block and the `<html className>` line only:

```tsx
import type { Metadata } from "next";
import { barlow, barlowCondensed } from "@/lib/fonts";
import { archivo, archivoBlack, jetbrains } from "./fonts";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TopLine Exteriors | Roofing, Decks & Siding — Bucks County, PA & South Jersey",
    template: "%s | TopLine Exteriors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${archivo.variable} ${archivoBlack.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds with no type errors. (No visual check yet — no component consumes the new fonts until Task 2/3.)

- [ ] **Step 4: Commit**

```bash
git add src/app/fonts.ts src/app/layout.tsx
git commit -m "Add Archivo, Archivo Black and JetBrains Mono fonts for homepage redesign"
```

---

### Task 2: Design tokens — append new `@theme` block to globals.css

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: new Tailwind utility classes usable in every later task: colors `graphite-950/900/700/500/300/200/100`, `sand-50/100/200/300/500/600`, `brand-50/400/500/600/700`, `placeholder`, `ph-a`, `ph-b`; font families `font-display`, `font-sans` (via `--font-sans` alias — note existing `font-sans` Tailwind default is overridden, see Step 1 note), `font-mono`; type steps `text-display-xl/lg/md/sm`; radii `rounded-lg` (14px, **overrides Tailwind's default `rounded-lg` value** — audit note in Step 3), `rounded-xl` (20px), `rounded-2xl` (24px); shadows `shadow-nav`, `shadow-card`, `shadow-panel`, `shadow-cta`, `shadow-float`; utility classes `.reveal-init`, `.reveal-in`, `.ba-range` (and its pseudo-element rules).

The existing `src/app/globals.css` (read in full before editing — reproduced here for exact line targeting):

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

body {
  background: var(--color-paper);
  color: var(--color-text);
  font-family: var(--font-body);
  text-wrap: pretty;
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
  background: var(--color-ink);
}

.bg-alt-heading {
  color: #ffffff;
}

.bg-alt-muted {
  color: rgba(255, 255, 255, 0.68);
}

.bg-alt-pill {
  border-color: rgba(255, 255, 255, 0.28);
  color: #ffffff;
}

.bg-alt-btn-secondary {
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.bg-alt .bg-line {
  background: rgba(255, 255, 255, 0.28);
}

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

@media (prefers-reduced-motion: no-preference) {
  .reveal-stagger > * {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease-out, transform 0.55s ease-out;
    transition-delay: var(--stagger-delay, 0ms);
  }

  .reveal-stagger.is-visible > * {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-stagger > *:nth-child(1) { --stagger-delay: 0ms; }
  .reveal-stagger > *:nth-child(2) { --stagger-delay: 80ms; }
  .reveal-stagger > *:nth-child(3) { --stagger-delay: 160ms; }
  .reveal-stagger > *:nth-child(4) { --stagger-delay: 240ms; }
  .reveal-stagger > *:nth-child(5) { --stagger-delay: 320ms; }
  .reveal-stagger > *:nth-child(6) { --stagger-delay: 400ms; }
  .reveal-stagger > *:nth-child(7) { --stagger-delay: 480ms; }
  .reveal-stagger > *:nth-child(8) { --stagger-delay: 560ms; }
  .reveal-stagger > *:nth-child(n+9) { --stagger-delay: 640ms; }
}
```

Note on radius naming collision (resolve before editing): the existing theme has no `--radius-lg`/`--radius-xl`/`--radius-2xl` overrides, so Tailwind's built-in defaults for `rounded-lg` (0.5rem/8px), `rounded-xl` (0.75rem/12px), `rounded-2xl` (1rem/16px) are currently in effect wherever those utilities are used elsewhere in the codebase. Grep confirms **no existing file uses `rounded-lg`, `rounded-xl`, or `rounded-2xl`** (the current codebase's custom radius scale is `rounded-card`/`rounded-input`/`rounded-pill` only) — so overriding these three Tailwind defaults via `--radius-lg`/`--radius-xl`/`--radius-2xl` is safe and won't change any out-of-scope page.

- [ ] **Step 1: Verify the radius-collision assumption before editing**

Run: `grep -rn "rounded-lg\|rounded-xl\|rounded-2xl" src/ --include=*.tsx`
Expected: no output (zero matches). If this finds matches, stop and re-scope this task — do not override the shared Tailwind radius defaults; use a different token prefix (e.g. `--radius-home-lg`) instead and note the deviation in a code comment at the top of the new `@theme` block.

- [ ] **Step 2: Append the new `@theme` block, `@layer base`, and `@layer utilities` to the end of `src/app/globals.css`**

Add this to the end of the file, after the existing `.reveal-stagger` media query block (do not remove or reorder anything above it):

```css

/* ---------------------------------------------------------------------
   Homepage redesign tokens (2026-08-04). Additive: the block above this
   comment backs every page NOT yet redesigned (hub pages, service-detail
   pages, project case studies). Do not delete it. See
   docs/superpowers/specs/2026-08-04-homepage-redesign-design.md
   ------------------------------------------------------------------- */
@theme {
  --color-graphite-950: #1E2023;
  --color-graphite-900: #2C2F33;
  --color-graphite-700: #43464A;
  --color-graphite-500: #52565B;
  --color-graphite-300: #8A9099;
  --color-graphite-200: #9AA0A7;
  --color-graphite-100: #C9CDD2;

  --color-sand-50:  #F7F6F4;
  --color-sand-100: #F4F3F0;
  --color-sand-200: #E8E6E2;
  --color-sand-300: #DCDAD6;
  --color-sand-500: #8A857D;
  --color-sand-600: #6E6A63;

  --color-brand-50:  #FDF1E8;
  --color-brand-400: #F79553;
  --color-brand-500: #F0731E;
  --color-brand-600: #D45F10;
  --color-brand-700: #C25A10;

  --color-placeholder: #9C968D;
  --color-ph-a: #EFEDE9;
  --color-ph-b: #E7E5E0;

  --font-display: var(--font-archivo-black), system-ui, sans-serif;
  --font-sans: var(--font-archivo), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  --text-display-xl: 4.75rem;
  --text-display-xl--line-height: 0.95;
  --text-display-xl--letter-spacing: -0.035em;
  --text-display-lg: 3.5rem;
  --text-display-lg--line-height: 0.98;
  --text-display-lg--letter-spacing: -0.035em;
  --text-display-md: 3rem;
  --text-display-md--line-height: 1;
  --text-display-md--letter-spacing: -0.03em;
  --text-display-sm: 2.125rem;
  --text-display-sm--line-height: 1;

  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-2xl: 24px;

  --shadow-nav: 0 4px 18px rgb(30 28 25 / 0.05);
  --shadow-card: 0 18px 44px rgb(30 28 25 / 0.10);
  --shadow-panel: 0 20px 50px rgb(30 28 25 / 0.08);
  --shadow-cta: 0 10px 24px rgb(240 115 30 / 0.28);
  --shadow-float: 0 16px 40px rgb(20 20 20 / 0.25);

  --ease-out-soft: cubic-bezier(0.2, 0.7, 0.2, 1);
}

@layer utilities {
  .reveal-init {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.7s var(--ease-out-soft), transform 0.7s var(--ease-out-soft);
  }
  .reveal-in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    .reveal-init { opacity: 1; transform: none; transition: none; }
  }
}

.ba-range {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
.ba-range::-webkit-slider-runnable-track { height: 34px; }
.ba-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #fff;
  border: 3px solid var(--color-brand-500);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.35);
  cursor: ew-resize;
}
.ba-range::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fff;
  border: 3px solid var(--color-brand-500);
  cursor: ew-resize;
}
```

Note: this task deliberately **omits** the handoff's `@theme` shadowed name `--color-graphite-900` collision check — there is no existing `--color-graphite-*` token, so no collision. Also omits the handoff's redundant `body { background/color/font-family }` re-declaration (already merged conceptually into the existing `body` rule's behavior — the existing rule wins by file order and this task doesn't touch it) and its `h1, h2 { text-wrap: balance }` / `a { color/hover }` rules, which are homepage-authorship conveniences, not required by any acceptance criterion; if per-element balance/hover is needed it will be applied directly in the section components using `text-wrap: balance` inline where called for by RECIPES (the hero H1 already gets this per README's copy block).

- [ ] **Step 3: Confirm every new token resolves**

Run: `npm run build`
Expected: build succeeds. Then run a quick grep-based sanity check that no typo'd var name exists in the new block:

Run: `grep -n "color-graphite\|color-sand\|color-brand\|font-display\|font-sans\|font-mono\|text-display\|radius-lg\|radius-xl\|radius-2xl\|shadow-nav\|shadow-card\|shadow-panel\|shadow-cta\|shadow-float" src/app/globals.css`

Expected: every token listed in this task's "Produces" section appears exactly once as a `--`-prefixed declaration inside the new `@theme` block (plus the pre-existing `--shadow-card`/`--shadow-cta` in the OLD block — those two names are intentionally reused/redefined for the new block's own tokens, which is fine since Tailwind v4 lets a later `@theme` block's declarations for the same custom property win; this is the desired "new components should get the new shadow values" behavior — but confirm this doesn't leak into old components: run `grep -rn "shadow-card\|shadow-cta" src/components/ui src/components/hub src/components/service-detail` before proceeding).

**If** that grep finds existing consumers of `shadow-card`/`shadow-cta` outside `Header`/`Footer`/`Button` (the shared components this plan also restyles) — stop and flag it: it means redefining those two shadow tokens changes look on out-of-scope pages too. (Expected finding: `WhyCard.tsx`, `TrustBadgeCard.tsx`, `NavDropdownPanel.tsx`, `ReviewCarousel.tsx`, `Button.tsx`, `not-found.tsx`, hub/service-detail files all use `shadow-card`; `Button.tsx` uses `shadow-cta` for its primary variant. This is a real collision.)

**Resolution (apply now, don't defer):** rename the new homepage-only shadow tokens to avoid the collision — use `--shadow-home-card` and `--shadow-home-cta` instead of reusing `--shadow-card`/`--shadow-cta`. Update the `@theme` block above to use these names, and use `shadow-home-card`/`shadow-home-cta` Tailwind classes in every later task instead of `shadow-card`/`shadow-cta`. `--shadow-nav`, `--shadow-panel`, `--shadow-float` have no existing consumers (confirmed via the same grep pattern) and keep their names as-is.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "Add homepage redesign design tokens to globals.css"
```

---

### Task 3: Port `Reveal` and `BeforeAfter` client components

**Files:**
- Create: `src/components/homepage/Reveal.tsx`
- Create: `src/components/homepage/BeforeAfter.tsx`

**Interfaces:**
- Produces: `Reveal` component — props `{ children: ReactNode; index?: number; as?: ElementType; className?: string }`, default export via named export `Reveal`. Renders visible-by-default server-side; arms hidden state client-side only; 2.5s safety timeout; respects `prefers-reduced-motion`.
- Produces: `BeforeAfter` component — props `{ before: string; after: string; beforeAlt?: string; afterAlt?: string; initial?: number; className?: string }`, named export `BeforeAfter`. Internal state `pos: number` (0–100, default from `initial`, default value `48`).
- Consumes: Tailwind classes `reveal-init`/`reveal-in` and `ba-range` (from Task 2).

- [ ] **Step 1: Create `src/components/homepage/Reveal.tsx`** (ported verbatim from the handoff, only the file location changes — no API changes)

```tsx
"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger inside a grid: 0, 1, 2… → 0ms, 90ms, 180ms */
  index?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fade + 26px rise once, when the element enters the viewport.
 * Renders visible-by-default on the server so content is never hidden
 * if JS fails; the hidden class is applied only after mount.
 */
export function Reveal({ children, index = 0, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety: never leave content invisible.
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const state = !armed || shown ? "reveal-in" : "reveal-init";

  return (
    <Tag
      ref={ref as never}
      className={`${armed ? "reveal-init" : ""} ${state} ${className}`.trim()}
      style={armed && !shown ? { transitionDelay: `${index * 90}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Create `src/components/homepage/BeforeAfter.tsx`** (ported verbatim)

```tsx
"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Starting handle position, 0–100 */
  initial?: number;
  className?: string;
};

/**
 * Draggable before/after wipe. The BEFORE image sits on top and is clipped
 * from the right; a native range input is the only control, so it works with
 * keyboard, touch and screen readers for free.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  initial = 48,
  className = "",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(initial);
  const id = useId();

  return (
    <div className={`relative h-[520px] overflow-hidden rounded-2xl ${className}`}>
      <Image src={after} alt={afterAlt} fill sizes="100vw" className="object-cover" priority={false} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="100vw" className="object-cover" />
      </div>

      <div
        aria-hidden
        className="absolute inset-y-0 w-[3px] bg-brand-500"
        style={{ left: `calc(${pos}% - 1.5px)` }}
      />

      <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3.5 py-2 text-xs font-bold tracking-[0.14em] text-white">
        BEFORE
      </span>
      <span className="absolute right-5 top-5 rounded-full bg-brand-500 px-3.5 py-2 text-xs font-bold tracking-[0.14em] text-white">
        AFTER
      </span>

      <label htmlFor={id} className="sr-only">
        Reveal the finished roof
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba-range absolute inset-x-0 top-1/2 h-[34px] w-full -translate-y-1/2 cursor-ew-resize"
      />
    </div>
  );
}
```

Note: `BeforeAfter` will fail to render images until Task 4 provides real or placeholder image paths — that's expected; this task only creates the component, it isn't wired into a page yet.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors from these two new files (unused-export warnings are fine since nothing imports them yet).

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage/Reveal.tsx src/components/homepage/BeforeAfter.tsx
git commit -m "Port Reveal and BeforeAfter client components for homepage redesign"
```

---

### Task 4: Image manifest + homepage placeholder component

**Files:**
- Create: `src/content/homepage.ts`
- Create: `src/components/homepage/HomePlaceholder.tsx`

**Interfaces:**
- Produces: `HOMEPAGE_IMAGES` object from `src/content/homepage.ts` with typed slots: `hero`, `serviceRoofing`, `serviceDecks`, `serviceSiding`, `beforeAfterBefore`, `beforeAfterAfter`. Each slot is `{ src: string | null; alt: string; caption: string }`. `src: null` means "no real photo yet, render `HomePlaceholder`".
- Produces: `HomePlaceholder` component, props `{ caption: string; className?: string }`, named export. Renders a `bg-sand-100` block with a centered `font-mono text-sand-500` caption, matching the existing `PlaceholderImage` component's *pattern* but using the new token vocabulary (kept as a separate component per the spec — `PlaceholderImage` is used by out-of-scope pages and must not change).
- Consumes: nothing from earlier tasks besides Tailwind tokens from Task 2.

- [ ] **Step 1: Create `src/content/homepage.ts`**

```typescript
export type HomeImageSlot = {
  /** Path under /public, or null if no real photo exists yet — render a HomePlaceholder instead. */
  src: string | null;
  alt: string;
  caption: string;
};

export const HOMEPAGE_IMAGES = {
  hero: {
    src: null,
    alt: "Finished roof and home exterior in Bucks County, PA",
    caption: "hero photo — finished roof + exterior",
  },
  serviceRoofing: {
    src: null,
    alt: "Roof replacement in progress in Bucks County, PA",
    caption: "roofing photo",
  },
  serviceDecks: {
    src: null,
    alt: "Custom composite deck build in Bucks County, PA",
    caption: "deck photo",
  },
  serviceSiding: {
    src: null,
    alt: "Fiber-cement siding installation in Bucks County, PA",
    caption: "siding photo",
  },
  beforeAfterBefore: {
    src: null,
    alt: "Hail-damaged roof before repair, Levittown, PA",
    caption: "BEFORE — hail damage photo",
  },
  beforeAfterAfter: {
    src: null,
    alt: "New roof after repair, Levittown, PA",
    caption: "AFTER — new roof photo",
  },
} as const satisfies Record<string, HomeImageSlot>;
```

- [ ] **Step 2: Create `src/components/homepage/HomePlaceholder.tsx`**

```tsx
type HomePlaceholderProps = {
  caption: string;
  className?: string;
};

/**
 * Neutral placeholder for a not-yet-supplied homepage photo slot.
 * TODO(client): replace every HomePlaceholder usage with a real photo per
 * README § Images before launch.
 */
export function HomePlaceholder({ caption, className = "" }: HomePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={`flex items-center justify-center bg-sand-100 ${className}`}
    >
      <span className="px-6 text-center font-mono text-[11px] leading-[1.4] text-sand-500">
        [ {caption} ]
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/homepage.ts src/components/homepage/HomePlaceholder.tsx
git commit -m "Add homepage image manifest and placeholder component"
```

---

### Task 5: Homepage copy constants

**Files:**
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces: new exported constants (all additive, appended at end of file, nothing existing is edited): `HOME_REDESIGN_EYEBROW`, `HOME_REDESIGN_HERO_LINES`, `HOME_REDESIGN_LEDE`, `HOME_REDESIGN_TRUST_LABEL`, `HOME_REDESIGN_TRUST_BRANDS`, `HOME_REDESIGN_SERVICES`, `HOME_REDESIGN_BA_HEADLINE_LINES`, `HOME_REDESIGN_BA_ASIDE`, `HOME_REDESIGN_BA_STATS`, `HOME_REDESIGN_REVIEWS`, `HOME_REDESIGN_FORM_STEPS`, `HOME_REDESIGN_SERVICE_TYPE_OPTIONS`, `HOME_REDESIGN_FOOTER_LINKS`. Later tasks (Hero, TrustStrip, Services, BeforeAfterSection, Reviews, EstimateSection) import these by exact name.

- [ ] **Step 1: Append to the end of `src/lib/constants.ts`**

```typescript
// ---------------------------------------------------------------------------
// HOMEPAGE REDESIGN (2026-08-04) — copy is verbatim from the approved design
// handoff README.md. Do not reuse these for hub/service-detail pages; those
// keep their existing HOME_*/ROOFING_*/etc. constants above.
// ---------------------------------------------------------------------------

export const HOME_REDESIGN_EYEBROW =
  // TODO(client): confirm "booking 3 weeks out" reflects real current lead time.
  "Bucks County, PA · South Jersey · booking 3 weeks out";

export const HOME_REDESIGN_HERO_LINES = ["Roof leaking?", "Deck rotting?", "We answer today."] as const;

export const HOME_REDESIGN_LEDE =
  "Roofing, decks and siding installed by our own crews — never subcontracted. Detail-obsessed work, straight answers, and one fixed price before anyone touches your house.";

// TODO(client): confirm "See 40 recent jobs" — count of real portfolio jobs available to link to.
export const HOME_REDESIGN_SECONDARY_CTA = "See 40 recent jobs";

// TODO(client): confirm "2 hrs" average reply time.
export const HOME_REDESIGN_REPLY_STAT = { value: "2 hrs", label: "Average reply" };
export const HOME_REDESIGN_REPLY_CAPTION = "A real person calls you back — weekends included.";

export const HOME_REDESIGN_TRUST_LABEL = "Certified installer for";
// TODO(client): verify the client currently holds each of these five certifications before shipping.
export const HOME_REDESIGN_TRUST_BRANDS = ["GAF", "CertainTeed", "James Hardie", "Trex", "Owens Corning"] as const;

export type HomeRedesignService = {
  title: string;
  imageSlot: "serviceRoofing" | "serviceDecks" | "serviceSiding";
  body: string;
  chips: readonly string[];
  href: string;
};

export const HOME_REDESIGN_SERVICES: HomeRedesignService[] = [
  {
    title: "Roof replacement",
    imageSlot: "serviceRoofing",
    body: "Full tear-off, synthetic underlayment, ice & water shield in every valley. Most homes done in a day.",
    chips: ["Shingle", "Standing seam", "Storm claims"],
    href: "/roofing",
  },
  {
    title: "Custom decks",
    imageSlot: "serviceDecks",
    body: "Composite or cedar on framing we deliberately over-build. Hidden fasteners, permits pulled by us.",
    chips: ["Trex", "Cedar", "Multi-level"],
    href: "/decks",
  },
  {
    title: "Siding & trim",
    imageSlot: "serviceSiding",
    body: "Fiber-cement or insulated vinyl, wrapped windows, new flashing — the parts that fail first, done first.",
    chips: ["James Hardie", "Insulated vinyl"],
    href: "/siding",
  },
];

export const HOME_REDESIGN_BA_HEADLINE_LINES = ["Hail hit Tuesday.", "New roof by Friday."] as const;

// TODO(client): verify the Levittown insurance-approval story is accurate before shipping.
export const HOME_REDESIGN_BA_ASIDE =
  "Levittown, PA. Insurance approved in six days because every shingle was photographed before we touched it.";

export type HomeRedesignStat = { value: string; label: string };

export const HOME_REDESIGN_BA_STATS: HomeRedesignStat[] = [
  // TODO(client): confirm 15+ years in the region.
  { value: "15+", label: "Years in the region" },
  // TODO(client): confirm 500+ jobs finished.
  { value: "500+", label: "Jobs finished" },
  // TODO(client): confirm 4.9★ / 180+ Google reviews.
  { value: "4.9★", label: "180+ Google reviews" },
  { value: "0", label: "Subcontracted crews" },
];

export type HomeRedesignReview = { quote: string; attribution: string };

// TODO(client): these are placeholder quotes — replace with real Google reviews
// (Places API or client-supplied verbatim text with permission) before launch.
export const HOME_REDESIGN_REVIEWS: HomeRedesignReview[] = [
  {
    quote: "Estimate in my inbox the same evening. Roof finished in a day and my flowerbeds were untouched.",
    attribution: "Dana R. — Newtown, PA",
  },
  {
    quote: "Called at 8am about a leak, someone was on my roof by noon. Price never moved from the quote.",
    attribution: "Anthony M. — Levittown, PA",
  },
  {
    quote: "The deck framing is over-built and you can see it. Caulk lines on the siding are perfect.",
    attribution: "Grace P. — Cherry Hill, NJ",
  },
];

export const HOME_REDESIGN_FORM_STEPS = [
  "You send the address and the problem",
  "We measure on site and photograph everything",
  "Fixed price in writing, plus a start date",
] as const;

export const HOME_REDESIGN_SERVICE_TYPE_OPTIONS = [
  { key: "roof", label: "Roof" },
  { key: "deck", label: "Deck" },
  { key: "siding", label: "Siding" },
  { key: "not-sure", label: "Not sure" },
] as const;

export const HOME_REDESIGN_FOOTER_LINKS = [
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Our work", href: "/#projects" },
  { label: "Contact", href: "/#estimate" },
] as const;
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "Add homepage redesign copy constants"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/homepage/Hero.tsx`

**Interfaces:**
- Produces: `Hero` component, no props (reads directly from `HOME_REDESIGN_*` constants and `HOMEPAGE_IMAGES`), named export, Server Component (no `"use client"`).
- Consumes: `Reveal` (Task 3), `HomePlaceholder` (Task 4), `HOMEPAGE_IMAGES` (Task 4), `HOME_REDESIGN_EYEBROW`, `HOME_REDESIGN_HERO_LINES`, `HOME_REDESIGN_LEDE`, `HOME_REDESIGN_SECONDARY_CTA`, `HOME_REDESIGN_REPLY_STAT`, `HOME_REDESIGN_REPLY_CAPTION` (Task 5), `PHONE_DISPLAY`/`PHONE_DIGITS`/etc. not needed here (nav owns those).

Copy (verbatim, from README § 2 / reference HTML lines 68–101): H1 three lines `"Roof leaking?"` / `"Deck rotting?"` / `"We answer today."` (third line `text-brand-500`); lede as in constants; primary CTA `"Get my free estimate →"`; secondary CTA `HOME_REDESIGN_SECONDARY_CTA`; proof row `★★★★★` + `"4.9 · 180+ Google reviews"` (bold "4.9"); `"Licensed in PA & NJ"` (bold "PA & NJ"); floating stat chip "2 hrs" / "Average reply" / reply caption.

- [ ] **Step 1: Write `src/components/homepage/Hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/homepage/Reveal";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import {
  HOME_REDESIGN_EYEBROW,
  HOME_REDESIGN_HERO_LINES,
  HOME_REDESIGN_LEDE,
  HOME_REDESIGN_SECONDARY_CTA,
  HOME_REDESIGN_REPLY_STAT,
  HOME_REDESIGN_REPLY_CAPTION,
} from "@/lib/constants";

export function Hero() {
  const hero = HOMEPAGE_IMAGES.hero;

  return (
    <section className="grid grid-cols-1 items-center gap-12 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:px-10">
      <Reveal className="flex flex-col gap-[26px]" as="div">
        <div className="inline-flex w-fit items-center gap-2.5 self-start rounded-full bg-brand-50 px-4 py-2.5">
          <span className="size-[7px] rounded-full bg-brand-500" aria-hidden="true" />
          <span className="text-[13px] font-bold tracking-[0.06em] text-brand-700">
            {HOME_REDESIGN_EYEBROW}
          </span>
        </div>

        <h1 className="text-wrap-balance font-display text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.035em] text-graphite-950 lg:text-display-xl">
          {HOME_REDESIGN_HERO_LINES[0]}
          <br />
          {HOME_REDESIGN_HERO_LINES[1]}
          <br />
          <span className="text-brand-500">{HOME_REDESIGN_HERO_LINES[2]}</span>
        </h1>

        <p className="max-w-[540px] text-xl leading-relaxed text-graphite-500">
          {HOME_REDESIGN_LEDE}
        </p>

        <div className="flex flex-wrap gap-3.5 pt-1.5">
          <Link
            href="/#estimate"
            className="rounded-lg bg-brand-500 px-8 py-5 text-[17px] font-bold text-white shadow-home-cta transition-colors hover:bg-brand-600"
          >
            Get my free estimate →
          </Link>
          <Link
            href="/#projects"
            className="rounded-lg border border-sand-300 px-7 py-[19px] text-[17px] font-semibold text-graphite-900 transition-colors hover:bg-sand-100"
          >
            {HOME_REDESIGN_SECONDARY_CTA}
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-[17px] text-brand-500" aria-hidden="true">★★★★★</span>
            <span className="text-[15px] text-graphite-500">
              <span className="font-bold text-graphite-950">4.9</span> · 180+ Google reviews
            </span>
          </div>
          <span className="hidden h-[22px] w-px bg-sand-200 sm:block" aria-hidden="true" />
          <span className="text-[15px] text-graphite-500">
            Licensed in <span className="font-bold text-graphite-950">PA &amp; NJ</span>
          </span>
        </div>
      </Reveal>

      <Reveal className="relative" as="div" index={1}>
        {hero.src ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            width={720}
            height={600}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-[380px] w-full rounded-xl object-cover lg:h-[600px]"
          />
        ) : (
          <HomePlaceholder caption={hero.caption} className="h-[380px] w-full rounded-xl lg:h-[600px]" />
        )}

        <div className="relative mt-4 flex items-center gap-5 rounded-xl bg-graphite-900 p-6 shadow-float lg:absolute lg:-bottom-[18px] lg:-left-[22px] lg:mt-0">
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-display-sm text-white">{HOME_REDESIGN_REPLY_STAT.value}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite-200">
              {HOME_REDESIGN_REPLY_STAT.label}
            </span>
          </div>
          <span className="h-10 w-px bg-graphite-700" aria-hidden="true" />
          <p className="max-w-[170px] text-sm leading-[1.45] text-graphite-100">
            {HOME_REDESIGN_REPLY_CAPTION}
          </p>
        </div>

        <div className="absolute -left-[18px] -top-3.5 hidden h-[54px] w-auto rounded-lg bg-white px-3 py-2 shadow-[0_8px_22px_rgb(20_20_20/0.12)] lg:block">
          <Image
            src="/logo-full.png"
            alt=""
            width={1448}
            height={1086}
            className="h-full w-auto"
          />
        </div>
      </Reveal>
    </section>
  );
}
```

Note: `text-wrap-balance` is not a real Tailwind utility name — remove it; `text-wrap: balance` is already applied globally to `h1, h2` only if that rule was kept (it was deliberately dropped in Task 2 Step 2's note). Since it was dropped, add `[text-wrap:balance]` arbitrary-value utility directly on the `h1` instead. Fix before running Step 2 below: replace `className="text-wrap-balance font-display ...`  with `className="[text-wrap:balance] font-display ...`.

The floating stat chip is positioned `absolute` only at `lg` and above per RECIPES/README responsive spec ("floating stat chip moves inline below the photo" on mobile); below `lg` it's stacked as a normal-flow block via `relative mt-4 ... lg:absolute lg:-bottom-[18px] lg:-left-[22px] lg:mt-0`.

- [ ] **Step 2: Apply the `text-wrap` fix and typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. (This component isn't rendered by any page yet, so no runtime check here — that happens in Task 12.)

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/Hero.tsx
git commit -m "Add homepage Hero section component"
```

---

### Task 7: Trust strip section

**Files:**
- Create: `src/components/homepage/TrustStrip.tsx`

**Interfaces:**
- Produces: `TrustStrip` component, no props, named export, Server Component.
- Consumes: `Reveal` (Task 3), `HOME_REDESIGN_TRUST_LABEL`, `HOME_REDESIGN_TRUST_BRANDS` (Task 5).

- [ ] **Step 1: Write `src/components/homepage/TrustStrip.tsx`**

```tsx
import { Reveal } from "@/components/homepage/Reveal";
import { HOME_REDESIGN_TRUST_BRANDS, HOME_REDESIGN_TRUST_LABEL } from "@/lib/constants";

export function TrustStrip() {
  return (
    <section className="px-5 py-[34px] sm:px-8 lg:px-10">
      <Reveal
        as="div"
        className="flex flex-col gap-4 overflow-x-auto rounded-xl bg-sand-100 px-6 py-[22px] sm:flex-row sm:items-center sm:justify-between lg:px-[30px]"
      >
        <span className="whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.14em] text-sand-500">
          {HOME_REDESIGN_TRUST_LABEL}
        </span>
        <div className="flex snap-x gap-3 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {HOME_REDESIGN_TRUST_BRANDS.map((brand) => (
            <span
              key={brand}
              className="shrink-0 snap-start rounded-lg bg-white px-6 py-3 text-[15px] font-bold text-graphite-700"
            >
              {brand}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/TrustStrip.tsx
git commit -m "Add homepage TrustStrip section component"
```

---

### Task 8: Services section

**Files:**
- Create: `src/components/homepage/Services.tsx`

**Interfaces:**
- Produces: `Services` component, no props, named export, Server Component.
- Consumes: `Reveal` (Task 3), `HomePlaceholder` (Task 4), `HOMEPAGE_IMAGES` (Task 4), `HOME_REDESIGN_SERVICES` (Task 5), `HomeRedesignService` type (Task 5).

- [ ] **Step 1: Write `src/components/homepage/Services.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/homepage/Reveal";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import { HOME_REDESIGN_SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section className="flex flex-col gap-8 px-5 py-[60px] sm:px-8 lg:px-10">
      <Reveal as="div" className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-500">
            What we do
          </span>
          <h2 className="font-display text-display-md leading-none tracking-[-0.03em] text-graphite-950">
            Three trades. One crew.
          </h2>
        </div>
        <p className="max-w-[380px] text-[17px] leading-relaxed text-graphite-500">
          Same team from estimate to final walkthrough, so nothing gets lost between trades.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {HOME_REDESIGN_SERVICES.map((service, i) => {
          const image = HOMEPAGE_IMAGES[service.imageSlot];
          return (
            <Reveal key={service.title} as="div" index={i}>
              <Link
                href={service.href}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-sand-200 bg-white transition-shadow duration-200 hover:shadow-home-card"
              >
                <div className="relative m-3 h-[230px] overflow-hidden rounded-[14px]">
                  {image.src ? (
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <HomePlaceholder caption={image.caption} className="h-full w-full" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[27px] font-bold tracking-[-0.02em] text-graphite-950">
                      {service.title}
                    </h3>
                    <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand-50 text-[15px] font-bold text-brand-500">
                      →
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-graphite-500">{service.body}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {service.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full bg-sand-100 px-3.5 py-1.5 text-[13px] font-semibold text-sand-600"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/Services.tsx
git commit -m "Add homepage Services section component"
```

---

### Task 9: Before/after section

**Files:**
- Create: `src/components/homepage/BeforeAfterSection.tsx`

**Interfaces:**
- Produces: `BeforeAfterSection` component, no props, named export, Server Component (the `BeforeAfter` child is itself a client component, composed here).
- Consumes: `Reveal` (Task 3), `BeforeAfter` (Task 3), `HomePlaceholder` (Task 4), `HOMEPAGE_IMAGES` (Task 4), `HOME_REDESIGN_BA_HEADLINE_LINES`, `HOME_REDESIGN_BA_ASIDE`, `HOME_REDESIGN_BA_STATS` (Task 5).

Note on images: `BeforeAfter` requires non-null `src` strings (it always renders `<Image src={before}>`/`<Image src={after}>` — it has no built-in placeholder fallback, unlike the other sections). Since `HOMEPAGE_IMAGES.beforeAfterBefore/After.src` are `null` (Task 4), render `HomePlaceholder` blocks side-by-side instead of `<BeforeAfter>` until real photos exist, and swap to `<BeforeAfter>` once both `src` values are non-null. This is called out explicitly so the "single most persuasive element" isn't silently broken by passing `null` into an `<Image src>`.

- [ ] **Step 1: Write `src/components/homepage/BeforeAfterSection.tsx`**

```tsx
import { Reveal } from "@/components/homepage/Reveal";
import { BeforeAfter } from "@/components/homepage/BeforeAfter";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import {
  HOME_REDESIGN_BA_ASIDE,
  HOME_REDESIGN_BA_HEADLINE_LINES,
  HOME_REDESIGN_BA_STATS,
} from "@/lib/constants";

export function BeforeAfterSection() {
  const before = HOMEPAGE_IMAGES.beforeAfterBefore;
  const after = HOMEPAGE_IMAGES.beforeAfterAfter;
  const hasBothPhotos = Boolean(before.src && after.src);

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-[30px] rounded-2xl bg-graphite-900 p-6 lg:p-12">
        <Reveal as="div" className="flex flex-col gap-[30px] lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
          <div className="flex flex-col gap-3.5">
            <span className="w-fit rounded-full bg-brand-500/15 px-3.5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-400">
              Drag the handle
            </span>
            <h2 className="font-display text-display-md leading-none tracking-[-0.03em] text-white">
              {HOME_REDESIGN_BA_HEADLINE_LINES[0]}
              <br />
              {HOME_REDESIGN_BA_HEADLINE_LINES[1]}
            </h2>
          </div>
          <p className="max-w-[340px] text-base leading-relaxed text-graphite-200">
            {HOME_REDESIGN_BA_ASIDE}
          </p>
        </Reveal>

        <Reveal as="div" index={1}>
          {hasBothPhotos ? (
            <BeforeAfter
              before={before.src as string}
              after={after.src as string}
              beforeAlt={before.alt}
              afterAlt={after.alt}
              className="h-[300px] md:h-[520px]"
            />
          ) : (
            <div className="grid h-[300px] grid-cols-2 gap-1 overflow-hidden rounded-2xl md:h-[520px]">
              <HomePlaceholder caption={before.caption} className="h-full w-full" />
              <HomePlaceholder caption={after.caption} className="h-full w-full" />
            </div>
          )}
        </Reveal>

        <Reveal as="div" index={2} className="grid grid-cols-2 gap-[18px] lg:grid-cols-4">
          {HOME_REDESIGN_BA_STATS.map((stat) => (
            <div key={stat.label} className="rounded-[14px] bg-white/[0.06] p-[22px]">
              <div className="font-display text-display-sm leading-none text-brand-500">{stat.value}</div>
              <div className="mt-1 text-sm text-graphite-200">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/BeforeAfterSection.tsx
git commit -m "Add homepage BeforeAfterSection component"
```

---

### Task 10: Reviews section

**Files:**
- Create: `src/components/homepage/Reviews.tsx`

**Interfaces:**
- Produces: `Reviews` component, no props, named export, Server Component.
- Consumes: `Reveal` (Task 3), `HOME_REDESIGN_REVIEWS` (Task 5).

- [ ] **Step 1: Write `src/components/homepage/Reviews.tsx`**

```tsx
import { Reveal } from "@/components/homepage/Reveal";
import { HOME_REDESIGN_REVIEWS } from "@/lib/constants";

export function Reviews() {
  return (
    <section className="grid grid-cols-1 gap-[22px] px-5 pb-5 pt-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
      {HOME_REDESIGN_REVIEWS.map((review, i) => (
        <Reveal key={review.attribution} as="div" index={i} className="flex flex-col gap-3.5 rounded-xl bg-sand-100 p-7">
          <span className="text-base text-brand-500" aria-hidden="true">★★★★★</span>
          <p className="text-[17px] leading-snug text-graphite-900">&ldquo;{review.quote}&rdquo;</p>
          <span className="text-sm font-bold text-sand-600">{review.attribution}</span>
        </Reveal>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/Reviews.tsx
git commit -m "Add homepage Reviews section component"
```

---

### Task 11: Estimate form section

**Files:**
- Create: `src/components/homepage/EstimateSection.tsx`
- Modify: `src/components/ui/EstimateForm.tsx`

**Interfaces:**
- Produces: `EstimateSection` component, no props, named export, Server Component wrapper around the (client) form.
- Modifies: `EstimateForm` gets a new optional prop `variant?: "default" | "redesign"` (default `"default"`) so its existing consumers (`HubPage.tsx`, and this file's own prior self in `page.tsx` before Task 12 removes that usage) keep their current look and behavior unchanged, while `variant="redesign"` renders the new visual language, new service-type option set, and the panel-swap success state. This avoids forking the component while satisfying "preserve form submission logic" — the validation/state logic (`useState` for `service`/`errors`/`submitted`, `handleSubmit`, `PHONE_PATTERN`, `EMAIL_PATTERN`) is untouched; only the returned JSX branches on `variant`.
- Consumes: `HOME_REDESIGN_SERVICE_TYPE_OPTIONS`, `HOME_REDESIGN_FORM_STEPS` (Task 5), `cn` (existing `src/lib/cn.ts`).

Design note on the "Not sure" 4th option and dropped email field visual (see spec § Estimate form decision): the redesign variant uses `HOME_REDESIGN_SERVICE_TYPE_OPTIONS` (4 options: Roof/Deck/Siding/Not sure) instead of the existing `SERVICE_TYPE_OPTIONS` (3 options: Roofing/Decks/Siding) — `SERVICE_TYPE_OPTIONS` itself is untouched so `HubPage.tsx` is unaffected. The email field is kept (deviation from the literal RECIPES markup, justified in the spec) but restyled to fit the panel as a natural fifth field between phone and the service-type row... actually per README's exact field order (name+phone row, then address, then service type, then message) the email field's insertion point must not disturb that order — insert it as a third row-mate: change the "First name + Phone" 2-up row into "First name + Phone" unchanged, and add email as its own full-width row directly below address, before the service-type selector, so the required core fields (name, phone, address, email) are grouped before the optional-feeling service-type/message fields.

- [ ] **Step 1: Read the current full `src/components/ui/EstimateForm.tsx`** (already reproduced in the spec/earlier investigation — reread it now to confirm exact current line numbers before editing, since Edit requires exact string matches)

Run: `grep -n "" src/components/ui/EstimateForm.tsx | head -30`

- [ ] **Step 2: Add the `variant` prop and branch the field/style JSX**

Modify `src/components/ui/EstimateForm.tsx`. Change the props type and destructuring (near the top):

Find:
```tsx
type EstimateFormProps = {
  showServiceChips?: boolean;
  projectPlaceholder?: string;
  submitLabel?: string;
};
```

Replace with:
```tsx
type EstimateFormProps = {
  showServiceChips?: boolean;
  projectPlaceholder?: string;
  submitLabel?: string;
  /** "redesign" renders the 2026-08-04 homepage redesign's visual language and field set. */
  variant?: "default" | "redesign";
};
```

Find:
```tsx
export function EstimateForm({
  showServiceChips = false,
  projectPlaceholder = "Tell us about your project…",
  submitLabel = "Request My Free Estimate",
}: EstimateFormProps) {
  const [service, setService] = useState<string>("roofing");
```

Replace with:
```tsx
export function EstimateForm({
  showServiceChips = false,
  projectPlaceholder = "Tell us about your project…",
  submitLabel = "Request My Free Estimate",
  variant = "default",
}: EstimateFormProps) {
  const isRedesign = variant === "redesign";
  const serviceTypeOptions = isRedesign ? HOME_REDESIGN_SERVICE_TYPE_OPTIONS : SERVICE_TYPE_OPTIONS;
  const [service, setService] = useState<string>(serviceTypeOptions[0].key);
```

Add the new import at the top (find the existing constants import and extend it):

Find:
```tsx
import { SERVICE_TYPE_OPTIONS } from "@/lib/constants";
```

Replace with:
```tsx
import { HOME_REDESIGN_SERVICE_TYPE_OPTIONS, SERVICE_TYPE_OPTIONS } from "@/lib/constants";
```

- [ ] **Step 3: Update the service-type rendering to use `serviceTypeOptions` and, for `redesign`, a real radio group**

Find:
```tsx
      {showServiceChips && (
        <>
          <div className="mb-3 font-body text-[13px] font-semibold text-muted">
            WHICH SERVICE DO YOU NEED?
          </div>
          <div className="mb-7 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Service type">
            {SERVICE_TYPE_OPTIONS.map((opt) => {
              const isActive = service === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setService(opt.key)}
                  className={cn(
                    "rounded-pill px-5 py-2.5 font-body text-[13px] font-semibold",
                    isActive
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-transparent text-text"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>
      )}
```

Replace with (branches purely on `isRedesign` for classes/markup; non-redesign path is byte-for-byte the original):
```tsx
      {showServiceChips && !isRedesign && (
        <>
          <div className="mb-3 font-body text-[13px] font-semibold text-muted">
            WHICH SERVICE DO YOU NEED?
          </div>
          <div className="mb-7 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Service type">
            {SERVICE_TYPE_OPTIONS.map((opt) => {
              const isActive = service === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setService(opt.key)}
                  className={cn(
                    "rounded-pill px-5 py-2.5 font-body text-[13px] font-semibold",
                    isActive
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-transparent text-text"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {showServiceChips && isRedesign && (
        <div className="mb-1 flex gap-2.5" role="radiogroup" aria-label="Service type">
          {HOME_REDESIGN_SERVICE_TYPE_OPTIONS.map((opt) => {
            const isActive = service === opt.key;
            return (
              <div key={opt.key} className="flex-1">
                <input
                  type="radio"
                  id={`service-type-${opt.key}`}
                  name="serviceType"
                  value={opt.key}
                  checked={isActive}
                  onChange={() => setService(opt.key)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`service-type-${opt.key}`}
                  className={cn(
                    "block cursor-pointer rounded-full border py-3 text-center text-sm font-bold peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/15",
                    isActive
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-sand-200 text-sand-600"
                  )}
                >
                  {opt.label}
                </label>
              </div>
            );
          })}
        </div>
      )}
```

- [ ] **Step 4: Branch the input classes and success state on `isRedesign`, and swap the whole panel on success in the redesign variant**

Find the `inputClasses` definition:
```tsx
  const inputClasses =
    "w-full rounded-input border border-line bg-paper px-4 py-3.5 font-body text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
```

Replace with:
```tsx
  const inputClasses = isRedesign
    ? "w-full rounded-xl border border-sand-200 bg-sand-50 p-[15px] text-[15px] text-graphite-900 placeholder:text-placeholder focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
    : "w-full rounded-input border border-line bg-paper px-4 py-3.5 font-body text-sm text-text placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
```

Find the outer wrapper `div` and the `submitted` block at the very end, and the `submit` button. Given the scale of branching needed for the redesign's panel-swap-on-success behavior, replace the entire component body (everything from `return (` to the closing `);` before the final `}`) with:

```tsx
  if (isRedesign && submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-[22px] bg-sand-100 p-[34px] text-center">
        <div className="grid size-12 place-items-center rounded-full bg-brand-500">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12.5 9.5 17 19 6.5"
              stroke="#fff"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-lg font-bold text-graphite-900">
          We&rsquo;ve got it — expect a call within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        isRedesign
          ? "rounded-[22px] border border-sand-200 bg-white p-[34px] shadow-panel"
          : "rounded-card border border-line border-l-[3px] border-l-accent p-6 sm:p-10"
      }
    >
      {isRedesign && (
        <div className="mb-4 flex items-center gap-3">
          <Image src="/logo-full.png" alt="" width={1448} height={1086} className="h-[38px] w-auto" />
          <span className="h-7 w-px bg-sand-200" aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-[0.1em] text-sand-500">Free estimate</span>
        </div>
      )}

      {showServiceChips && !isRedesign && (
        <>
          <div className="mb-3 font-body text-[13px] font-semibold text-muted">
            WHICH SERVICE DO YOU NEED?
          </div>
          <div className="mb-7 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Service type">
            {SERVICE_TYPE_OPTIONS.map((opt) => {
              const isActive = service === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setService(opt.key)}
                  className={cn(
                    "rounded-pill px-5 py-2.5 font-body text-[13px] font-semibold",
                    isActive
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-transparent text-text"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} noValidate className={isRedesign ? "flex flex-col gap-4" : undefined}>
        <div className={isRedesign ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "mb-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2"}>
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={isRedesign ? "First name" : "Full name"}
              className={inputClasses}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className={isRedesign ? "mt-1.5 text-[13px] text-brand-700" : "mt-1.5 font-body text-xs text-accent"}>
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              className={inputClasses}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className={isRedesign ? "mt-1.5 text-[13px] text-brand-700" : "mt-1.5 font-body text-xs text-accent"}>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={isRedesign ? undefined : "mb-[18px] grid grid-cols-1 gap-[18px] md:grid-cols-2"}>
          <div>
            <label htmlFor="address" className="sr-only">
              Property address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder={isRedesign ? "Street address in PA or NJ" : "Property address"}
              className={inputClasses}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p id="address-error" className={isRedesign ? "mt-1.5 text-[13px] text-brand-700" : "mt-1.5 font-body text-xs text-accent"}>
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className={isRedesign ? cn(inputClasses, "mt-3") : inputClasses}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className={isRedesign ? "mt-1.5 text-[13px] text-brand-700" : "mt-1.5 font-body text-xs text-accent"}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {showServiceChips && isRedesign && (
          <div className="flex gap-2.5" role="radiogroup" aria-label="Service type">
            {HOME_REDESIGN_SERVICE_TYPE_OPTIONS.map((opt) => {
              const isActive = service === opt.key;
              return (
                <div key={opt.key} className="flex-1">
                  <input
                    type="radio"
                    id={`service-type-${opt.key}`}
                    name="serviceType"
                    value={opt.key}
                    checked={isActive}
                    onChange={() => setService(opt.key)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`service-type-${opt.key}`}
                    className={cn(
                      "block cursor-pointer rounded-full border py-3 text-center text-sm font-bold peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/15",
                      isActive ? "border-brand-500 bg-brand-50 text-brand-700" : "border-sand-200 text-sand-600"
                    )}
                  >
                    {opt.label}
                  </label>
                </div>
              );
            })}
          </div>
        )}

        <label htmlFor="message" className="sr-only">
          Project description
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={projectPlaceholder}
          rows={4}
          className={cn(inputClasses, isRedesign ? "h-[84px] resize-y" : "mb-[22px] resize-y")}
        />

        <button
          type="submit"
          className={
            isRedesign
              ? "w-full rounded-lg bg-brand-500 py-[19px] text-[17px] font-bold text-white shadow-home-cta transition-colors hover:bg-brand-600"
              : "w-full rounded-pill bg-accent px-4 py-[18px] font-body text-[15px] font-bold text-white transition-[filter] duration-150 ease-out hover:brightness-95"
          }
        >
          {submitLabel}
        </button>

        {isRedesign ? (
          <p className="text-center text-[13px] text-sand-500">
            We reply in about 2 hours, 7 days a week. No spam.
          </p>
        ) : (
          <p className="mt-4 text-center font-body text-xs leading-[1.6] text-muted">
            By submitting this form, you agree to be contacted about your
            project. We respect your privacy — see our{" "}
            <Link href="/privacy" className="font-semibold text-accent underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}

        {!isRedesign && submitted && (
          <p role="status" className="mt-4 text-center font-body text-sm font-semibold text-accent">
            Thanks! We&rsquo;ll be in touch shortly to schedule your free estimate.
          </p>
        )}
      </form>
    </div>
  );
}
```

Add the `Image` import at the top of the file (find the existing `import Link from "next/link";` line and add above it):

```tsx
import Image from "next/image";
```

- [ ] **Step 5: Create `src/components/homepage/EstimateSection.tsx`**

```tsx
import { Reveal } from "@/components/homepage/Reveal";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { HOME_REDESIGN_FORM_STEPS } from "@/lib/constants";

export function EstimateSection() {
  return (
    <section id="estimate" className="scroll-mt-20 grid grid-cols-1 items-start gap-10 px-5 pb-10 pt-15 sm:px-8 lg:grid-cols-2 lg:gap-15 lg:px-10">
      <Reveal as="div" className="flex flex-col gap-6">
        <h2 className="font-display text-display-lg leading-[0.98] tracking-[-0.035em] text-graphite-950">
          Tell us what&rsquo;s wrong. We&rsquo;ll price it.
        </h2>
        <p className="max-w-[470px] text-[19px] leading-relaxed text-graphite-500">
          Two minutes now, a real number within 48 hours — no sales visit required just to get a range.
        </p>
        <div className="flex flex-col gap-3 pt-1.5">
          {HOME_REDESIGN_FORM_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3.5 rounded-[14px] bg-sand-100 px-[18px] py-4">
              <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-brand-500 text-[13px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-base font-semibold text-graphite-900">{step}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="div" index={1}>
        <EstimateForm
          variant="redesign"
          showServiceChips
          projectPlaceholder="Leak over the kitchen since the last storm…"
          submitLabel="Request my free estimate"
        />
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If `EstimateForm.tsx` reports unused-variable errors (e.g. `Link` no longer used in some branch), check: `Link` is still used in the non-redesign privacy-policy paragraph, so it should remain used — confirm no orphaned imports.

- [ ] **Step 7: Confirm the non-redesign path is unchanged by diffing against original behavior**

Run: `grep -n "isRedesign" src/components/ui/EstimateForm.tsx`
Expected: every branch point uses `isRedesign` consistently; manually re-read the file once fully to confirm the `!isRedesign` / default branches reconstruct the exact original JSX (same classes, same conditions, same copy) with no accidental omissions (e.g. the original success message, the original privacy-policy paragraph, the original `mb-[18px]`/`mb-[22px]` spacing) — this is the step that protects `HubPage.tsx`'s rendering, so treat it as load-bearing, not a formality.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/EstimateForm.tsx src/components/homepage/EstimateSection.tsx
git commit -m "Add redesign variant to EstimateForm and new EstimateSection wrapper"
```

---

### Task 12: Rewrite `src/app/page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Hero`, `TrustStrip`, `Services`, `BeforeAfterSection`, `Reviews`, `EstimateSection` (Tasks 6–11), existing `Header`, `Footer` (restyled in Task 13, but functionally unchanged — safe to reference now).
- Produces: the homepage route `/` renders the new design end to end.

The current `page.tsx` renders `Header`, a long sequence of sections (hero/trust/why/services/how-it-works/projects/reviews/service-area/faq/estimate), then `Footer`, plus `jsonLd` schema and `metadata`. The redesign's README specifies exactly 8 sections (nav, hero, trust strip, services, before/after, reviews, estimate form, footer) — it has **no** "Why Topline", "How it works", "Recent projects", "Service area", or "FAQ" sections. Per the spec, this is a full JSX replacement for the body, but `metadata`, `jsonLd`, and the `<script type="application/ld+json">` tag must be preserved (SEO-critical, not a visual concern, not mentioned in the design at all so nothing says to remove it).

Sections dropped from the current homepage (Why Topline, How it works, Recent Projects, Service area, FAQ) are **not deleted from the codebase** — their components (`WhyCard`, `StatBlock`, `FaqAccordion`, the projects grid markup, `PROCESS_STEPS`/`CITIES` usage) simply become unused by `page.tsx`. Confirm none of them are used elsewhere before leaving them as dead code long-term (out of scope to prune now — flag, don't act, per plan scope discipline), but do not delete the underlying constants or components since `HubPage.tsx`/other pages may reuse the same building blocks.

- [ ] **Step 1: Check whether `WhyCard`, `StatBlock`, `FaqAccordion`, `ReviewCarousel`, `TrustBadgeCard` are used anywhere besides `page.tsx`**

Run: `grep -rln "WhyCard\|StatBlock\|FaqAccordion\|ReviewCarousel\|TrustBadgeCard" src/ --include=*.tsx`

Expected: at least `src/components/hub/HubPage.tsx` uses several of these (hub pages have their own Why/Stats/FAQ/Reviews sections). Confirm this before proceeding — if any of them turn out to be used ONLY by `page.tsx`, that's fine too (dead code is acceptable per this plan's explicit scope-trim; do not delete it as part of this task, since pruning unused exports is a separate, non-visual cleanup task the spec doesn't ask for).

- [ ] **Step 2: Replace `src/app/page.tsx` in full**

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { TrustStrip } from "@/components/homepage/TrustStrip";
import { Services } from "@/components/homepage/Services";
import { BeforeAfterSection } from "@/components/homepage/BeforeAfterSection";
import { Reviews } from "@/components/homepage/Reviews";
import { EstimateSection } from "@/components/homepage/EstimateSection";
import { HOME_FAQS, SITE_URL } from "@/lib/constants";
import { faqPageSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "TopLine Exteriors | Roofing, Decks & Siding — Bucks County, PA & South Jersey",
  description:
    "Licensed & insured roofing, deck, and siding contractor with 15+ years serving Bucks County, PA, Philadelphia, and South Jersey. Get a free estimate today.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = [localBusinessSchema(SITE_URL), faqPageSchema(HOME_FAQS)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="home" />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Services />
        <BeforeAfterSection />
        <Reviews />
        <EstimateSection />
      </main>
      <Footer variant="home" />
    </>
  );
}
```

Note: `HOME_FAQS` is retained here purely to keep feeding the existing `faqPageSchema` structured-data output (SEO value, invisible to users) even though the visible FAQ accordion section is removed from the page body — this preserves the site's existing FAQ rich-result eligibility without requiring a visible FAQ section, which is a reasonable interpretation of "don't remove SEO machinery the design doesn't mention." If this turns out to violate Google's structured-data guidelines (content must be visible on the page), that's a follow-up fix, not a blocker for this visual task — flag it in a comment above the `jsonLd` line:

```tsx
  // NOTE: FAQPage schema references HOME_FAQS even though the FAQ section
  // is no longer rendered on this page (redesign spec has no FAQ section).
  // TODO(client/seo): confirm this doesn't violate structured-data visible-
  // content requirements, or move FAQs to their own page/section.
  const jsonLd = [localBusinessSchema(SITE_URL), faqPageSchema(HOME_FAQS)];
```

- [ ] **Step 3: Remove now-unused imports flagged by the linter**

Run: `npm run lint`
Expected: no errors related to `page.tsx` (the new version has no unused imports by construction — verify).

- [ ] **Step 4: Build and manually sanity-check in devtools (no dev server per project rules — use `next build && next start` briefly, or ask the user to check in their already-running dev server)**

Run: `npm run build`
Expected: build succeeds, `/` route compiles.

Per `CLAUDE.md`: do not start the dev server yourself — the user runs it. Do not take screenshots. After this task, note to the user that they should visually check `/` in their own running dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "Rewrite homepage to use the new redesign section components"
```

---

### Task 13: Restyle shared `Header`

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/HeaderNavLink.tsx`
- Modify: `src/components/layout/NavDropdownPanel.tsx`
- Modify: `src/components/layout/Logo.tsx`

**Interfaces:**
- No prop/behavior changes to any of these four components — same exports, same prop types, same state, same effects. Only Tailwind class strings change.

This task is the highest-risk one in the plan: `Header` is rendered on every route. Any behavior regression (scroll-collapse breaking, dropdown not opening, mobile menu not toggling) affects the whole site, not just the homepage. Go class-by-class, preserving every existing conditional (`cn(...)`, `isScrolled`, `isMenuOpen`, `isActive`, `hoveredIndex`) exactly — only the literal string values inside those conditions change.

- [ ] **Step 1: Restyle `src/components/layout/Header.tsx`**

Read the current file fully first (already captured in the investigation above). Apply these exact substitutions (find/replace each occurrence — every one is unique in context):

Find:
```tsx
      className={cn(
        "sticky top-0 z-40 transition-[padding] duration-300 ease-out",
        isScrolled ? "xl:px-4 xl:pt-3" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-4 bg-paper transition-all duration-300 ease-out",
          isScrolled
            ? "xl:w-fit xl:rounded-full xl:px-6 xl:py-1.5 xl:shadow-card"
            : "w-full max-w-[1440px] px-5 py-2 sm:px-8 lg:px-10"
        )}
      >
```

Replace with:
```tsx
      className={cn(
        "sticky top-0 z-40 bg-white transition-[padding] duration-300 ease-out",
        isScrolled ? "xl:px-4 xl:pt-3" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-4 border border-transparent bg-white transition-all duration-300 ease-out",
          isScrolled
            ? "xl:w-fit xl:rounded-full xl:border-sand-200 xl:px-6 xl:py-1.5 xl:shadow-nav"
            : "w-full max-w-[1440px] rounded-full border-sand-200 px-5 py-2 shadow-nav sm:px-8 lg:px-10"
        )}
      >
```

Note: the un-scrolled state is given `rounded-full border-sand-200 shadow-nav` too, matching RECIPES's pill nav look (`rounded-full border border-sand-200 ... shadow-nav`) at all times, not just on scroll — the existing component only pillified itself on scroll at `xl` and above; the new design's mock shows the pill look always. Confirm this reads correctly at all breakpoints once rendered (flag as an assumption if it looks wrong — the RECIPES doesn't show a "not scrolled, not xl" state distinctly).

Find:
```tsx
          <div
            className="pointer-events-none absolute top-0 h-[34px] rounded-[6px] bg-ink/5 transition-all duration-300 ease-out"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-[2px] h-[2px] bg-accent transition-all duration-300 ease-out"
            style={{ ...activeStyle, opacity: activeIndicatorOpacity }}
          />
```

Replace with:
```tsx
          <div
            className="pointer-events-none absolute top-0 h-[34px] rounded-full bg-sand-100 transition-all duration-300 ease-out"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-[2px] h-[2px] bg-brand-500 transition-all duration-300 ease-out"
            style={{ ...activeStyle, opacity: activeIndicatorOpacity }}
          />
```

Find:
```tsx
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="whitespace-nowrap font-body text-[15px] font-bold text-text no-underline"
          >
            {PHONE_DISPLAY}
          </a>
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            className="whitespace-nowrap rounded-pill bg-accent px-5 py-[11px] font-body text-[13px] font-bold tracking-[.02em] text-white no-underline transition-[filter] duration-150 ease-out hover:brightness-95"
          >
            Free Estimate
          </Link>
        </div>
```

Replace with:
```tsx
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="whitespace-nowrap text-[17px] font-bold text-graphite-900 no-underline"
          >
            {PHONE_DISPLAY}
          </a>
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            className="whitespace-nowrap rounded-full bg-brand-500 px-6 py-3.5 text-[15px] font-bold text-white no-underline transition-colors duration-150 ease-out hover:bg-brand-600"
          >
            Free Estimate
          </Link>
        </div>
```

Find (mobile call/menu buttons):
```tsx
          <a
            href={`tel:${PHONE_DIGITS}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-text no-underline"
          >
```

Replace with:
```tsx
          <a
            href={`tel:${PHONE_DIGITS}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand-200 text-graphite-900 no-underline"
          >
```

Find:
```tsx
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-text"
          >
```

Replace with:
```tsx
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand-200 text-graphite-900"
          >
```

Find (mobile sheet):
```tsx
        className={cn(
          "overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 ease-out xl:hidden",
          isMenuOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-3 sm:px-8">
          {links.map((link) => {
            const isActive =
              link.href !== "/" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "border-b border-line py-3 font-body text-base font-semibold no-underline last:border-b-0",
                  isActive ? "text-accent" : "text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            onClick={closeMenu}
            className="mt-4 w-full whitespace-nowrap rounded-pill bg-accent px-5 py-3 text-center font-body text-[15px] font-bold tracking-[.02em] text-white no-underline"
          >
            Free Estimate
          </Link>
        </nav>
```

Replace with:
```tsx
        className={cn(
          "overflow-hidden rounded-b-2xl border-t border-sand-200 bg-white transition-[max-height] duration-300 ease-out xl:hidden",
          isMenuOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-3 sm:px-8">
          {links.map((link) => {
            const isActive =
              link.href !== "/" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "min-h-[44px] border-b border-sand-200 py-3 text-base font-semibold no-underline last:border-b-0",
                  isActive ? "text-brand-500" : "text-graphite-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            onClick={closeMenu}
            className="mt-4 min-h-[44px] w-full whitespace-nowrap rounded-full bg-brand-500 px-5 py-3 text-center text-[15px] font-bold text-white no-underline"
          >
            Free Estimate
          </Link>
        </nav>
```

- [ ] **Step 2: Restyle `src/components/layout/HeaderNavLink.tsx`**

Find:
```tsx
        className={cn(
          "relative z-10 block whitespace-nowrap px-3 py-2 font-body text-sm font-semibold no-underline transition-colors duration-150 ease-out hover:text-accent",
          isActive ? "text-accent" : "text-text"
        )}
```

Replace with:
```tsx
        className={cn(
          "relative z-10 block whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] font-semibold no-underline transition-colors duration-150 ease-out hover:text-brand-500",
          isActive ? "text-brand-500" : "text-graphite-700"
        )}
```

- [ ] **Step 3: Restyle `src/components/layout/NavDropdownPanel.tsx`**

Find:
```tsx
      className={cn(
        "absolute left-0 top-full z-40 w-[420px] rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6 shadow-card transition-all duration-150 ease-out",
        isOpen
          ? "translate-y-2 opacity-100"
          : "pointer-events-none translate-y-0 opacity-0"
      )}
```

Replace with:
```tsx
      className={cn(
        "absolute left-0 top-full z-40 w-[420px] rounded-xl border border-sand-200 bg-white p-6 shadow-nav transition-all duration-150 ease-out",
        isOpen
          ? "translate-y-2 opacity-100"
          : "pointer-events-none translate-y-0 opacity-0"
      )}
```

Find:
```tsx
            className="font-body text-sm font-semibold leading-snug text-text no-underline transition-colors duration-150 ease-out hover:text-accent"
```

Replace with:
```tsx
            className="text-sm font-semibold leading-snug text-graphite-900 no-underline transition-colors duration-150 ease-out hover:text-brand-500"
```

- [ ] **Step 4: Restyle `src/components/layout/Logo.tsx`**

The light-mode `Logo` (used in `Header`) is already just an `<Image>` — no token classes to change there. The dark-mode `Logo` (used in `Footer`) uses `font-head`/`font-body`/`text-accent`. Since `Footer` is redesigned to a graphite block already, and this component's dark variant is the wordmark shown in the *old* footer style — check RECIPES/README footer spec again: it says "Logo inverted `opacity-90 h-10`" using the **real image logo**, not the text wordmark `Logo` currently renders in `dark` mode. This is a component behavior mismatch worth fixing as part of this task since it directly affects the footer.

Find:
```tsx
export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <Link
        href="/"
        className="flex items-baseline gap-[9px] no-underline"
        aria-label="TopLine Exteriors home"
      >
        <span className="font-head text-2xl font-bold uppercase tracking-[.01em] text-white">
          TopLine
        </span>
        <span className="font-body text-xs font-semibold uppercase tracking-[.2em] text-accent">
          Exteriors
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center no-underline" aria-label="TopLine Exteriors home">
      <Image
        src="/logo-full.png"
        alt="TopLine Exteriors"
        width={1448}
        height={1086}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
```

Replace with:
```tsx
export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <Link href="/" className="flex items-center no-underline" aria-label="TopLine Exteriors home">
        <Image
          src="/logo-full.png"
          alt="TopLine Exteriors"
          width={1448}
          height={1086}
          className="h-10 w-auto opacity-90 invert"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center no-underline" aria-label="TopLine Exteriors home">
      <Image
        src="/logo-full.png"
        alt="TopLine Exteriors"
        width={1448}
        height={1086}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
```

Note: this changes the footer's brand mark on **every page** (home, roofing, decks, siding — `Footer` is shared), not just the homepage, since `Logo dark` had no other consumers. Verify: `grep -rn "<Logo" src/` before finalizing — expected only `Header.tsx` (light) and `Footer.tsx` (`dark`). If any other consumer exists using text-wordmark styling on purpose, reconsider; otherwise this is in line with "shared chrome gets the new look everywhere."

Also drop `priority` was never on the dark variant — confirm it stays absent (footer logo is below the fold, shouldn't be priority-loaded); this is preserved correctly above (no `priority` prop added to the dark branch).

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: succeeds. Ask the user to manually verify in their dev server: nav pill renders correctly on `/`, `/roofing`, `/decks`, `/siding`; scroll-collapse still works; dropdown mega-menus on hub links still open/close on hover; mobile menu still opens/closes; footer logo now shows the inverted image mark instead of the text wordmark on every page.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/HeaderNavLink.tsx src/components/layout/NavDropdownPanel.tsx src/components/layout/Logo.tsx
git commit -m "Restyle shared Header, nav link, dropdown panel and Logo to redesign tokens"
```

---

### Task 14: Restyle shared `Footer`

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- No prop/behavior changes — same `variant` prop, same conditional rendering of hub-specific columns.

The current `Footer` is a multi-column layout (logo+contact, services, service-area-or-hub-subservices, company links) inside a full-bleed `bg-ink` band. The new design's footer (README § 8) is a single-row, four-item nav layout inside a `rounded-[22px]` graphite block with page gutters around it — visually much simpler than the current footer's column layout. Per the "restyle, don't rewrite" principle, and because the current footer's columns carry real informational content (service links, service area list, company links) that the redesign's simpler mock doesn't address at all for hub-page variants, the resolution is: apply new tokens/radius/shadow to the existing column structure rather than deleting columns to force-fit the simpler home-only mock, EXCEPT for `variant="home"` specifically where the mock is explicit and this plan controls the full spec — for `variant="home"` render the exact simplified README layout; for hub variants keep the existing multi-column structure with new token colors only.

- [ ] **Step 1: Restyle the outer footer shell and the non-home multi-column layout with new tokens (applies to ALL variants)**

Find:
```tsx
  return (
    <footer className="bg-ink text-white">
      <Container
        className={`grid gap-10 pb-8 pt-16 md:pt-[72px] ${
          isHub
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
        }`}
      >
```

Replace with (branch the whole render on `isHub` vs. home so home gets the exact new simplified layout, hub keeps the informational columns restyled):
```tsx
  if (!isHub) {
    return (
      <footer className="px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-6 rounded-[22px] bg-graphite-900 px-10 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo dark />
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {HOME_REDESIGN_FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-semibold text-graphite-100 no-underline hover:text-brand-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-right text-[13px] leading-normal text-graphite-300">
            {BUSINESS_LEGAL_NAME}
            <br />
            {HIC_LICENSE}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-graphite-900 text-white">
      <Container
        className="grid grid-cols-1 gap-10 pb-8 pt-16 sm:grid-cols-2 md:pt-[72px] lg:grid-cols-[1.3fr_1fr_1fr]"
      >
```

- [ ] **Step 2: Restyle the remaining hub-branch JSX (colors only)**

Find:
```tsx
        <div>
          <div className="mb-[18px]">
            <Logo dark />
          </div>
          <div className="font-body text-sm leading-[1.8] text-white/65">
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
            <br />
            {SERVICE_AREA_BLURB}
          </div>
        </div>

        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            {hubConfig ? hubConfig.heading : "SERVICES"}
          </div>
          {hubConfig
            ? hubConfig.subServices.map((s) => (
                <div
                  key={s.title}
                  className="py-1 font-body text-[13px] text-white/60"
                >
                  {s.title}
                </div>
              ))
            : FOOTER_SERVICES.map((s) => (
                <div
                  key={s}
                  className="py-1.5 font-body text-sm text-white/65"
                >
                  {s}
                </div>
              ))}
        </div>

        {variant === "home" && (
          <div>
            <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
              SERVICE AREA
            </div>
            {FOOTER_CITIES.map((city) => (
              <div
                key={city}
                className="py-1.5 font-body text-sm text-white/65"
              >
                {city}
              </div>
            ))}
          </div>
        )}

        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            COMPANY
          </div>
          <Link
            href="/"
            className="block py-1.5 font-body text-sm text-white/65 no-underline"
          >
            Home
          </Link>
          <div className="py-1.5 font-body text-sm text-white/65">About</div>
          <div className="py-1.5 font-body text-sm text-white/65">
            Contact
          </div>
          {variant === "home" && (
            <Link
              href="/privacy"
              className="block py-1.5 font-body text-sm text-white/65 no-underline"
            >
              Privacy Policy
            </Link>
          )}
        </div>
      </Container>

      <div className="border-t border-white/[.14]">
        <Container className="flex flex-wrap justify-between gap-2 py-6 font-body text-xs text-white/45">
          <span>
            © {year} {BUSINESS_LEGAL_NAME}. {HIC_LICENSE}. Licensed &amp;
            insured.
          </span>
        </Container>
      </div>
    </footer>
  );
}
```

Replace with (same structure; since `variant === "home"` now returns earlier via the new branch in Step 1, the `variant === "home"` conditionals inside this remaining block are dead but harmless — remove them for clarity since `isHub` is guaranteed true here):
```tsx
        <div>
          <div className="mb-[18px]">
            <Logo dark />
          </div>
          <div className="text-sm leading-[1.8] text-graphite-200">
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
            <br />
            {SERVICE_AREA_BLURB}
          </div>
        </div>

        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[.06em] text-white/90">
            {hubConfig?.heading}
          </div>
          {hubConfig?.subServices.map((s) => (
            <div key={s.title} className="py-1 text-[13px] text-graphite-200">
              {s.title}
            </div>
          ))}
        </div>

        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[.06em] text-white/90">
            COMPANY
          </div>
          <Link href="/" className="block py-1.5 text-sm text-graphite-200 no-underline">
            Home
          </Link>
          <div className="py-1.5 text-sm text-graphite-200">About</div>
          <div className="py-1.5 text-sm text-graphite-200">Contact</div>
        </div>
      </Container>

      <div className="border-t border-graphite-700">
        <Container className="flex flex-wrap justify-between gap-2 py-6 text-xs text-graphite-300">
          <span>
            © {year} {BUSINESS_LEGAL_NAME}. {HIC_LICENSE}. Licensed &amp;
            insured.
          </span>
        </Container>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update imports**

Find:
```tsx
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  BUSINESS_LEGAL_NAME,
  DECKS_SUB_SERVICES,
  EMAIL,
  FOOTER_CITIES,
  FOOTER_SERVICES,
  HIC_LICENSE,
  PHONE_DISPLAY,
  ROOFING_SUB_SERVICES,
  SERVICE_AREA_BLURB,
  SIDING_SUB_SERVICES,
  type SubService,
} from "@/lib/constants";
```

Replace with:
```tsx
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  BUSINESS_LEGAL_NAME,
  DECKS_SUB_SERVICES,
  EMAIL,
  HIC_LICENSE,
  HOME_REDESIGN_FOOTER_LINKS,
  PHONE_DISPLAY,
  ROOFING_SUB_SERVICES,
  SERVICE_AREA_BLURB,
  SIDING_SUB_SERVICES,
  type SubService,
} from "@/lib/constants";
```

Note: `FOOTER_CITIES` and `FOOTER_SERVICES` are dropped from this file's imports since the home-variant branch no longer uses them (the redesign's home footer has no service-area or services column, per README § 8's exact 5-link nav). Confirm no other file needs these two constants removed from `constants.ts` itself — **do not delete them from `constants.ts`**, only stop importing them here, since deleting shared constants is out of this task's scope and they cost nothing left unused.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If `SubService` type import is now unused for some reason, re-check — it's still used by `SERVICE_HUB_CONFIG`'s type annotation, so it should remain necessary.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no new warnings (in particular no unused-import warnings for `FOOTER_CITIES`/`FOOTER_SERVICES` since Step 3 already removed their imports).

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "Restyle shared Footer to redesign tokens; simplify home-variant layout per spec"
```

---

### Task 15: Full-site verification pass

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: succeeds, zero type errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero warnings/errors (no new ones versus the pre-existing baseline — if the baseline already had warnings unrelated to this work, confirm the count hasn't increased).

- [ ] **Step 3: Grep for accidental leftover old-token usage in NEW files only**

Run: `grep -rn "bg-accent\|text-accent\|bg-ink\|text-ink\|rounded-pill\|rounded-card\|border-line\|bg-paper\|font-head\|font-body" src/components/homepage/ src/components/homepage/*.tsx src/app/page.tsx`
Expected: no matches (the new homepage components should use only the new token vocabulary).

- [ ] **Step 4: Grep for accidental new-token usage leaking into files NOT covered by this plan**

Run: `grep -rln "graphite-\|sand-\|brand-\|shadow-home-\|shadow-nav\|shadow-panel\|shadow-float\|font-display\|display-xl\|display-lg\|display-md\|display-sm" src/components/hub src/components/service-detail src/app/roofing src/app/decks src/app/siding src/app/projects src/app/privacy src/app/not-found.tsx 2>/dev/null`
Expected: no matches. If any appear, it means a plan step accidentally touched an out-of-scope file — investigate and revert that specific change.

- [ ] **Step 5: Confirm every `TODO(client)` from the spec is present**

Run: `grep -rn "TODO(client)" src/`
Expected: matches in `src/lib/constants.ts` (years/jobs/reviews/reply-time/booking-status/recent-jobs-count/Levittown-story/review-quotes) and `src/components/homepage/HomePlaceholder.tsx` (photo replacement reminder). Cross-check against the spec's list: 15+ years, 500+ jobs, 4.9★/180+ reviews, 2 hr reply, "booking 3 weeks out", "See 40 recent jobs", license numbers, manufacturer certifications, review quotes, Levittown story. Confirm license numbers already carry a placeholder marker in the pre-existing `HIC_LICENSE` constant (`"PA HIC #PA000000 (placeholder)"`) — if the design's footer also references an NJ license number not currently in `constants.ts`, add it with a `TODO(client)` comment now.

Run: `grep -n "HIC_LICENSE\|NJ #13VH" src/lib/constants.ts`
Expected: only a PA license placeholder exists. The design's footer copy (README § 8) is `"PA HIC #PA000000 · NJ #13VH00000000"` — two license numbers, but `HIC_LICENSE` only has one. Fix: add a new `NJ_HIC_LICENSE` constant with a `TODO(client)` comment, and update Task 14's footer legal line to include it.

- [ ] **Step 6: Apply the license-number fix found in Step 5**

Add to `src/lib/constants.ts`, near `HIC_LICENSE`:

```typescript
// TODO(client): confirm real NJ HIC license number.
export const NJ_HIC_LICENSE = "NJ HIC #13VH00000000 (placeholder)";
```

In `src/components/layout/Footer.tsx`'s new home-variant branch (Task 14 Step 1), update:

Find:
```tsx
          <p className="text-right text-[13px] leading-normal text-graphite-300">
            {BUSINESS_LEGAL_NAME}
            <br />
            {HIC_LICENSE}
          </p>
```

Replace with:
```tsx
          <p className="text-right text-[13px] leading-normal text-graphite-300">
            {BUSINESS_LEGAL_NAME}
            <br />
            {HIC_LICENSE} · {NJ_HIC_LICENSE}
          </p>
```

And update the import line to add `NJ_HIC_LICENSE`.

- [ ] **Step 7: Rebuild and re-lint after the fix**

Run: `npm run build && npm run lint`
Expected: succeeds, no new errors.

- [ ] **Step 8: Commit**

```bash
git add src/lib/constants.ts src/components/layout/Footer.tsx
git commit -m "Add NJ license placeholder to footer legal line"
```

- [ ] **Step 9: Final note to user**

This plan does not include Lighthouse or visual-diff automation (no headless browser tooling exists in this project and none should be added per "no new dependencies"). Tell the user, at the end of execution: "Build and lint are clean. Please check `/` in your own dev server against `reference/Topline Homepage.dc.html` at 1440px, and spot-check `/roofing`, `/decks`, `/siding` to confirm the header/footer restyle didn't break anything, since I can't run the dev server or take screenshots myself."

---

## Self-review notes (from plan authoring)

- **Spec coverage:** every section of the spec (tokens, fonts, Reveal/BeforeAfter naming, Header/Footer decision, form decision, images, responsive, accessibility, definition of done, out-of-scope list) maps to a task above. The one spec item without an explicit task is "Google Places API live review integration" and "requesting an SVG logo from client" — both are explicitly out-of-scope per the spec itself, so correctly have no task.
- **Placeholder scan:** no "TBD"/"add appropriate X" phrases remain; every step has literal code. The one spot that looked like a placeholder ("decide during implementation" language in the original spec's Images section) was resolved concretely in Task 4/9 (HomePlaceholder component + explicit before/after fallback behavior) rather than deferred further.
- **Type consistency:** `HomeRedesignService`, `HomeRedesignStat`, `HomeRedesignReview`, `HomeImageSlot` types are defined once (Tasks 4–5) and consumed with matching names in Tasks 6, 8, 9, 10. `EstimateForm`'s new `variant` prop name and `"redesign"`/`"default"` literal values are used consistently in Task 11's own steps and Task 11 Step 5 (`EstimateSection`). `HOMEPAGE_IMAGES` slot keys (`hero`, `serviceRoofing`, `serviceDecks`, `serviceSiding`, `beforeAfterBefore`, `beforeAfterAfter`) match between Task 4's definition and Tasks 6/8/9's usage.
- **Known residual risk flagged for the executor, not silently swallowed:** Task 13's un-scrolled nav pill styling ("give it `rounded-full` even when not scrolled") is the one instance in this plan where the RECIPES mock doesn't fully specify an existing interactive state (scroll-collapse) that the current codebase already has — the plan makes an explicit, documented assumption rather than guessing silently.
