# Hub Page Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the three near-duplicate hub pages (`/roofing`, `/siding`, `/decks` — ~330 lines each, ~95% identical JSX) into a single shared `HubPage` component driven by a per-hub config object, while fixing the small styling drifts (heading margin, heading size) that crept in from copy-pasting.

**Architecture:** One `HubPage` client-boundary-free server component in `src/components/hub/HubPage.tsx` renders all nine sections (Hero, Why, Sub-services, Gallery, How It Works, Stats, Reviews, FAQ, Estimate) from a `HubPageConfig` object. Three new config objects (`ROOFING_HUB_CONFIG`, `SIDING_HUB_CONFIG`, `DECKS_HUB_CONFIG`) live in `src/lib/hubConfigs.ts` and reference the existing per-hub data constants already in `src/lib/constants.ts` (`ROOFING_WHY_ITEMS`, `ROOFING_SUB_SERVICES`, etc. — unchanged). Each `src/app/{roofing,siding,decks}/page.tsx` shrinks to a thin wrapper: `metadata` export + `<HubPage config={...} />`.

**Tech Stack:** Next.js App Router (server components), TypeScript, Tailwind v4 (`@theme` tokens in `globals.css`), no new dependencies.

## Global Constraints

- Do not change any visible copy (headings, body text, button labels) except the two explicitly-approved unifications below — this is a structural refactor, not a content rewrite.
- Do not change `src/lib/constants.ts` data constants (`ROOFING_WHY_ITEMS`, `ROOFING_SUB_SERVICES`, `ROOFING_GALLERY`, `ROOFING_STATS`, `ROOFING_REVIEWS`, `ROOFING_FAQS` and their siding/decks equivalents) — `HubPageConfig` objects reference them, they are not duplicated.
- Two approved style unifications (apply to all three hubs identically):
  1. "How It Works" heading margin: unify on `mb-11` (the value already used by Sub-services/FAQ-adjacent headings on hub pages) — replacing `mb-[52px]`.
  2. Reviews section heading size: unify on `text-[32px]` (matching every other H2 on hub pages) — replacing `text-[34px]`.
- Preserve every `id` attribute used for anchor links (`#subservices`, `#estimate`) exactly — Header/Footer and in-page buttons link to these.
- Preserve all `aria-labelledby` / heading `id` pairs for accessibility.
- No new npm dependencies.
- After each task, run `npx tsc --noEmit` from `c:\main\Projects\TopLineExteriors` and confirm zero errors before moving to the next task.

---

### Task 1: Define `HubPageConfig` type and the three config objects

**Files:**
- Create: `src/lib/hubConfigs.ts`
- Test: manual type-check only (no test runner configured in this project — verification is `tsc --noEmit` plus a visual diff described in Task 3)

**Interfaces:**
- Consumes: existing named exports from `src/lib/constants.ts` — `WhyItem`, `SubService`, `GalleryImage`, `Stat`, `Review`, `Faq`, `ProcessStep`, `PROCESS_STEPS`, `ROOFING_WHY_ITEMS`, `ROOFING_SUB_SERVICES`, `ROOFING_GALLERY`, `ROOFING_STATS`, `ROOFING_REVIEWS`, `ROOFING_FAQS`, and the `SIDING_*` / `DECKS_*` equivalents, plus `SITE_URL`.
- Produces: `HubPageConfig` type and `ROOFING_HUB_CONFIG`, `SIDING_HUB_CONFIG`, `DECKS_HUB_CONFIG` — consumed by Task 2's `HubPage` component and Task 3's page wrappers.

- [ ] **Step 1: Read the current data constants to confirm exact field names**

Open `src/lib/constants.ts` and confirm these types exist (they do, per prior investigation): `WhyItem { title, desc }`, `SubService { num, title, desc }`, `GalleryImage { label, alt }`, `Stat { value, label }`, `Review { name, meta, stars, text }`, `Faq { q, a }`, `ProcessStep { num, title, desc }`.

- [ ] **Step 2: Write `src/lib/hubConfigs.ts`**

```typescript
import type {
  Faq,
  GalleryImage,
  Review,
  Stat,
  SubService,
  WhyItem,
} from "@/lib/constants";
import {
  DECKS_FAQS,
  DECKS_GALLERY,
  DECKS_REVIEWS,
  DECKS_STATS,
  DECKS_SUB_SERVICES,
  DECKS_WHY_ITEMS,
  PROCESS_STEPS,
  ROOFING_FAQS,
  ROOFING_GALLERY,
  ROOFING_REVIEWS,
  ROOFING_STATS,
  ROOFING_SUB_SERVICES,
  ROOFING_WHY_ITEMS,
  SIDING_FAQS,
  SIDING_GALLERY,
  SIDING_REVIEWS,
  SIDING_STATS,
  SIDING_SUB_SERVICES,
  SIDING_WHY_ITEMS,
  SITE_URL,
} from "@/lib/constants";

export type HubHeaderFooterVariant = "roofing" | "siding" | "decks";

export type HubPageConfig = {
  /** e.g. "roofing" — used for Header/Footer variant, canonical path, breadcrumb */
  slug: HubHeaderFooterVariant;
  breadcrumbLabel: string;
  pageUrl: string;

  metadata: {
    title: string;
    description: string;
  };

  hero: {
    eyebrow: string;
    heading: React.ReactNode;
    body: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImgLabel: string;
    heroAlt: string;
  };

  why: {
    eyebrow: string;
    heading: string;
    items: WhyItem[];
  };

  subServices: {
    eyebrow: string;
    heading: string;
    items: SubService[];
    /** Given a sub-service, return its "Learn more" href. */
    hrefFor: (sub: SubService) => string;
  };

  gallery: {
    heading: React.ReactNode;
    images: GalleryImage[];
  };

  stats: Stat[];

  reviews: {
    heading: string;
    items: Review[];
  };

  faqs: {
    eyebrow: string;
    items: Faq[];
  };

  estimate: {
    heading: string;
    projectPlaceholder: string;
    submitLabel: string;
  };
};

export const ROOFING_HUB_CONFIG: HubPageConfig = {
  slug: "roofing",
  breadcrumbLabel: "Roofing",
  pageUrl: `${SITE_URL}/roofing`,
  metadata: {
    title: "Roof Replacement & Repair in Bucks County, PA | TopLine Exteriors",
    description:
      "GAF & CertainTeed certified roof replacement, repair, and storm damage claims in Bucks County, PA & South Jersey. Lifetime workmanship warranty. Get a free estimate.",
  },
  hero: {
    eyebrow: "ROOFING",
    heading: (
      <>Roofs built to outlast the seasons in Bucks County &amp; South Jersey.</>
    ),
    body: "GAF and CertainTeed certified replacement, repair, and storm response — installed by our own crews, backed by a lifetime workmanship warranty.",
    primaryCtaLabel: "Get a Free Roof Estimate",
    secondaryCtaLabel: "See Roofing Services",
    heroImgLabel: "hero photo — finished roof replacement",
    heroAlt: "Finished roof replacement in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR ROOFING",
    heading:
      "Certified installs, our own crews, and a warranty that covers the labor too.",
    items: ROOFING_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "ROOFING SERVICES",
    heading: "Every roofing job we take on, done by one crew.",
    items: ROOFING_SUB_SERVICES,
    hrefFor: (sub) =>
      sub.num === "01" ? "/roofing/roof-replacement" : "/roofing#estimate",
  },
  gallery: {
    heading: (
      <>Roofing projects from around Bucks County &amp; South Jersey.</>
    ),
    images: ROOFING_GALLERY,
  },
  stats: ROOFING_STATS,
  reviews: {
    heading: "Roofing reviews — placeholder, swap before launch.",
    items: ROOFING_REVIEWS,
  },
  faqs: {
    eyebrow: "ROOFING FAQ",
    items: ROOFING_FAQS,
  },
  estimate: {
    heading: "Request your free roofing estimate.",
    projectPlaceholder: "Describe the roofing issue or project…",
    submitLabel: "Request My Free Roof Estimate",
  },
};

export const SIDING_HUB_CONFIG: HubPageConfig = {
  slug: "siding",
  breadcrumbLabel: "Siding",
  pageUrl: `${SITE_URL}/siding`,
  metadata: {
    title: "Siding Replacement & Repair in Bucks County, PA | TopLine Exteriors",
    description:
      "Vinyl, James Hardie fiber-cement, insulated, and wood siding installed in Bucks County, PA & South Jersey. Full tear-off, storm repair. Get a free estimate.",
  },
  hero: {
    eyebrow: "SIDING",
    heading: (
      <>Siding that locks out the weather in Bucks County &amp; South Jersey.</>
    ),
    body: "Vinyl, insulated, James Hardie fiber-cement, and wood siding — full tear-off installs by our own crews, backed by a workmanship warranty.",
    primaryCtaLabel: "Get a Free Siding Estimate",
    secondaryCtaLabel: "See Siding Services",
    heroImgLabel: "hero photo — finished fiber-cement siding install",
    heroAlt: "Finished fiber-cement siding install in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR SIDING",
    heading:
      "Certified installs, a full tear-off on every job, and a warranty that covers the labor too.",
    items: SIDING_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "SIDING SERVICES",
    heading: "Every siding job we take on, done by one crew.",
    items: SIDING_SUB_SERVICES,
    hrefFor: () => "/siding#estimate",
  },
  gallery: {
    heading: <>Siding projects from around Bucks County &amp; South Jersey.</>,
    images: SIDING_GALLERY,
  },
  stats: SIDING_STATS,
  reviews: {
    heading: "Siding reviews — placeholder, swap before launch.",
    items: SIDING_REVIEWS,
  },
  faqs: {
    eyebrow: "SIDING FAQ",
    items: SIDING_FAQS,
  },
  estimate: {
    heading: "Request your free siding estimate.",
    projectPlaceholder: "Describe your siding project or issue…",
    submitLabel: "Request My Free Siding Estimate",
  },
};

export const DECKS_HUB_CONFIG: HubPageConfig = {
  slug: "decks",
  breadcrumbLabel: "Decks",
  pageUrl: `${SITE_URL}/decks`,
  metadata: {
    title:
      "Custom Deck Building & Fencing in Bucks County, PA | TopLine Exteriors",
    description:
      "Custom deck construction, restoration, composite & wood decking, railings, and fencing in Bucks County, PA & South Jersey. Licensed & insured. Get a free estimate.",
  },
  hero: {
    eyebrow: "DECKS",
    heading: (
      <>
        Custom decks and fencing built to handle Bucks County &amp; South
        Jersey seasons.
      </>
    ),
    body: "Composite and wood decks, railings, and fencing designed and built by our own crews — permits handled, no subcontractors, backed by our workmanship warranty.",
    primaryCtaLabel: "Get a Free Deck Estimate",
    secondaryCtaLabel: "See Deck Services",
    heroImgLabel: "hero photo — finished composite deck build",
    heroAlt: "Finished composite deck build in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR DECKS",
    heading:
      "Built to code, in the material you want, by a crew that stands behind the work.",
    items: DECKS_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "DECK SERVICES",
    heading: "Every deck and fence job we take on, done by one crew.",
    items: DECKS_SUB_SERVICES,
    hrefFor: () => "/decks#estimate",
  },
  gallery: {
    heading: (
      <>
        Deck &amp; fencing projects from around Bucks County &amp; South
        Jersey.
      </>
    ),
    images: DECKS_GALLERY,
  },
  stats: DECKS_STATS,
  reviews: {
    heading: "Deck & fence reviews — placeholder, swap before launch.",
    items: DECKS_REVIEWS,
  },
  faqs: {
    eyebrow: "DECKS FAQ",
    items: DECKS_FAQS,
  },
  estimate: {
    heading: "Request your free deck estimate.",
    projectPlaceholder: "Describe your deck or fencing project…",
    submitLabel: "Request My Free Deck Estimate",
  },
};

export { PROCESS_STEPS };
```

Note: `hero.heading` and `gallery.heading` are typed `React.ReactNode` (not `string`) because two of the three hubs need an embedded `&amp;` line break via JSX fragments — using `React.ReactNode` avoids re-introducing raw `&` HTML-entity string-escaping bugs. This file has no `"use client"` directive — it is plain data, importable from both server and client components. Because it returns JSX in a `.ts` file, it must be named `hubConfigs.tsx` (not `.ts`) — use that extension.

- [ ] **Step 3: Rename the file to the correct extension**

Create the file as `src/lib/hubConfigs.tsx` (not `.ts`) since it contains JSX literals.

- [ ] **Step 4: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors related to `hubConfigs.tsx`. (There will still be errors from `page.tsx` files not yet updated to use it — ignore those for now; this task only adds a new unused-so-far file, so there should be zero new errors at all yet.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/hubConfigs.tsx
git commit -m "Add HubPageConfig type and per-hub config objects"
```

(If this repo has no git initialized, skip this step and note it — `git status` will confirm.)

---

### Task 2: Build the shared `HubPage` component

**Files:**
- Create: `src/components/hub/HubPage.tsx`
- Test: manual — `tsc --noEmit`, then visual verification in Task 4

**Interfaces:**
- Consumes: `HubPageConfig` from `src/lib/hubConfigs.tsx` (Task 1), plus existing components: `Header`, `Footer` (`src/components/layout/`), `Container`, `Button`, `PlaceholderImage`, `WhyCard`, `StatBlock`, `FaqAccordion`, `ReviewCarousel`, `GalleryCarousel`, `EstimateForm`, `Reveal` (`src/components/ui/`), `breadcrumbSchema`, `faqPageSchema`, `localBusinessSchema` (`src/lib/schema.ts`), `PROCESS_STEPS` (re-exported from `src/lib/hubConfigs.tsx`).
- Produces: `HubPage({ config }: { config: HubPageConfig })` — a default-exportable-free named export consumed by Task 3's three `page.tsx` files.

- [ ] **Step 1: Read `src/lib/schema.ts` to confirm the exact signatures of `breadcrumbSchema`, `faqPageSchema`, `localBusinessSchema`**

These are already used identically in all three current hub pages — the call shape to replicate is:

```typescript
const jsonLd = [
  localBusinessSchema(pageUrl),
  faqPageSchema(config.faqs.items),
  breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: config.breadcrumbLabel, url: pageUrl },
  ]),
];
```

Confirm `faqPageSchema` accepts a `Faq[]` (it currently receives `ROOFING_FAQS` directly, so `config.faqs.items` — same type — is a drop-in match).

- [ ] **Step 2: Write `src/components/hub/HubPage.tsx`**

```tsx
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { WhyCard } from "@/components/ui/WhyCard";
import { StatBlock } from "@/components/ui/StatBlock";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { GalleryCarousel } from "@/components/ui/GalleryCarousel";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { Reveal } from "@/components/ui/Reveal";
import type { HubPageConfig } from "@/lib/hubConfigs";
import { PROCESS_STEPS } from "@/lib/hubConfigs";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
} from "@/lib/schema";

export function HubPage({ config }: { config: HubPageConfig }) {
  const jsonLd = [
    localBusinessSchema(config.pageUrl),
    faqPageSchema(config.faqs.items),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: config.breadcrumbLabel, url: config.pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant={config.slug} />

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-paper">
        <Container className="pb-0 pt-4">
          <ol className="m-0 flex list-none gap-1.5 p-0 font-body text-[13px] font-medium text-muted">
            <li>
              <Link href="/" className="text-muted no-underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text" aria-current="page">
              {config.breadcrumbLabel}
            </li>
          </ol>
        </Container>
      </nav>

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-paper">
          <Container className="grid grid-cols-1 items-center gap-14 pb-[88px] pt-11 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.14em] text-accent">
                {config.hero.eyebrow}
              </p>
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] md:text-[52px]">
                {config.hero.heading}
              </h1>
              <p className="mb-[30px] max-w-[500px] font-body text-[17px] leading-[1.6] text-muted">
                {config.hero.body}
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href={`/${config.slug}#estimate`} variant="primary">
                  {config.hero.primaryCtaLabel}
                </Button>
                <Button
                  href={`/${config.slug}#subservices`}
                  variant="secondary"
                >
                  {config.hero.secondaryCtaLabel}
                </Button>
              </div>
            </div>
            <div className="relative">
              <PlaceholderImage
                label={config.hero.heroImgLabel}
                alt={config.hero.heroAlt}
              />
              <div className="absolute -bottom-5 -left-5 flex items-center gap-3.5 rounded-card border border-line bg-white px-[22px] py-[18px] text-text shadow-card">
                <div className="font-head text-[28px] font-bold text-accent">
                  4.9★
                </div>
                <div className="font-body text-[13px] font-medium leading-[1.3] text-muted">
                  180+ Google
                  <br />
                  Reviews
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WHY */}
        <section className="bg-paper" aria-labelledby="why-heading">
          <Container className="pb-24">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[640px] text-center">
                <p className="mb-2.5 font-body text-xs font-bold tracking-[.14em] text-accent">
                  {config.why.eyebrow}
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[32px] font-bold leading-[1.3] text-text"
                >
                  {config.why.heading}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {config.why.items.map((item) => (
                  <WhyCard key={item.title} {...item} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* SUB-SERVICES */}
        <section
          id="subservices"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="subservices-heading"
        >
          <Container className="pb-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                {config.subServices.eyebrow}
              </p>
              <h2
                id="subservices-heading"
                className="mb-11 max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
              >
                {config.subServices.heading}
              </h2>
              <div className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
                {config.subServices.items.map((sub) => (
                  <div
                    key={sub.title}
                    className="flex flex-col gap-4 bg-paper p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
                  >
                    <div className="w-[60px] flex-none font-head text-[32px] font-bold text-accent opacity-30">
                      {sub.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1.5 font-head text-[17px] font-bold uppercase text-text">
                        {sub.title}
                      </h3>
                      <p className="font-body text-sm leading-[1.5] text-muted">
                        {sub.desc}
                      </p>
                    </div>
                    <Link
                      href={config.subServices.hrefFor(sub)}
                      className="whitespace-nowrap font-body text-[13px] font-bold text-accent no-underline"
                    >
                      Learn more →
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* GALLERY */}
        <section className="bg-paper" aria-labelledby="gallery-heading">
          <Container className="pb-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                RECENT WORK
              </p>
              <h2
                id="gallery-heading"
                className="mb-11 max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
              >
                {config.gallery.heading}
              </h2>
              <GalleryCarousel images={config.gallery.images} />
            </Reveal>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-alt" aria-labelledby="process-heading">
          <Container className="py-[88px]">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                HOW IT WORKS
              </p>
              <h2
                id="process-heading"
                className="mb-11 font-head text-[32px] font-bold uppercase text-text"
              >
                From estimate to warranty, in four steps.
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="rounded-card border border-line bg-paper p-6 shadow-card"
                  >
                    <p className="mb-2.5 font-body text-[13px] font-bold text-accent">
                      {step.num}
                    </p>
                    <h3 className="mb-2 font-body text-lg font-bold text-text">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.6] text-muted">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* STATS */}
        <section className="bg-ink text-white">
          <Container className="py-14">
            <Reveal className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
              {config.stats.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </Reveal>
          </Container>
        </section>

        {/* REVIEWS */}
        <section className="bg-paper" aria-labelledby="reviews-heading">
          <Container className="py-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                WHAT HOMEOWNERS SAY
              </p>
              <h2
                id="reviews-heading"
                className="mb-11 font-head text-[32px] font-bold uppercase text-text"
              >
                {config.reviews.heading}
              </h2>
              <ReviewCarousel
                reviews={config.reviews.items}
                mode="paginate"
                autoAdvanceMs={6000}
              />
            </Reveal>
          </Container>
        </section>

        {/* FAQ */}
        <section className="bg-alt" aria-labelledby="faq-heading">
          <Container narrow className="py-[88px]">
            <Reveal>
              <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
                {config.faqs.eyebrow}
              </p>
              <h2
                id="faq-heading"
                className="mb-12 text-center font-head text-[32px] font-bold uppercase text-text"
              >
                Questions we hear most.
              </h2>
              <FaqAccordion faqs={config.faqs.items} />
            </Reveal>
          </Container>
        </section>

        {/* ESTIMATE FORM */}
        <section
          id="estimate"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="estimate-heading"
        >
          <Container className="py-[88px]" maxWidthPx={800}>
            <Reveal>
              <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
                GET STARTED
              </p>
              <h2
                id="estimate-heading"
                className="mb-8 text-center font-head text-[32px] font-bold uppercase text-text"
              >
                {config.estimate.heading}
              </h2>
              <EstimateForm
                projectPlaceholder={config.estimate.projectPlaceholder}
                submitLabel={config.estimate.submitLabel}
              />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant={config.slug} />
    </>
  );
}
```

Note the two unifications already applied here per Global Constraints: `process-heading` uses `mb-11` (was `mb-[52px]`), `reviews-heading` uses `text-[32px]` (was `text-[34px]`).

Confirm `Header`/`Footer` accept a `variant` prop typed to include `"roofing" | "siding" | "decks"` (they currently accept `"home" | "roofing" | "decks" | "siding"` per `src/components/layout/Header.tsx:17` — `config.slug` is a subset, assignable without a cast).

- [ ] **Step 3: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: no errors in `HubPage.tsx`. (Existing `page.tsx` files still have their old content and will still compile fine since they're untouched — this task only adds a new file.)

- [ ] **Step 4: Commit**

```bash
git add src/components/hub/HubPage.tsx
git commit -m "Add shared HubPage component"
```

---

### Task 3: Rewire the three hub page routes to use `HubPage`

**Files:**
- Modify: `src/app/roofing/page.tsx` (replace entire contents)
- Modify: `src/app/siding/page.tsx` (replace entire contents)
- Modify: `src/app/decks/page.tsx` (replace entire contents)

**Interfaces:**
- Consumes: `HubPage` (Task 2), `ROOFING_HUB_CONFIG` / `SIDING_HUB_CONFIG` / `DECKS_HUB_CONFIG` (Task 1).
- Produces: nothing further consumes these — they are route entry points.

- [ ] **Step 1: Replace `src/app/roofing/page.tsx` in full**

```tsx
import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { ROOFING_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: ROOFING_HUB_CONFIG.metadata.title,
  description: ROOFING_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/roofing",
  },
};

export default function RoofingHub() {
  return <HubPage config={ROOFING_HUB_CONFIG} />;
}
```

- [ ] **Step 2: Replace `src/app/siding/page.tsx` in full**

```tsx
import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { SIDING_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: SIDING_HUB_CONFIG.metadata.title,
  description: SIDING_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/siding",
  },
};

export default function SidingHub() {
  return <HubPage config={SIDING_HUB_CONFIG} />;
}
```

- [ ] **Step 3: Replace `src/app/decks/page.tsx` in full**

```tsx
import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { DECKS_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: DECKS_HUB_CONFIG.metadata.title,
  description: DECKS_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/decks",
  },
};

export default function DecksHub() {
  return <HubPage config={DECKS_HUB_CONFIG} />;
}
```

- [ ] **Step 4: Type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: zero errors across the whole project.

- [ ] **Step 5: Commit**

```bash
git add src/app/roofing/page.tsx src/app/siding/page.tsx src/app/decks/page.tsx
git commit -m "Rewire hub page routes to use shared HubPage component"
```

---

### Task 4: Visual verification against the pre-refactor pages

**Files:** none modified — verification only.

**Interfaces:**
- Consumes: the running dev server.
- Produces: a pass/fail confirmation gating whether the refactor is considered complete.

- [ ] **Step 1: Start the dev server**

```bash
cd c:\main\Projects\TopLineExteriors && npm run dev
```

Wait for `Ready` in the output (poll, don't sleep-guess): `until curl -sf http://localhost:3000/roofing >/dev/null; do sleep 1; done`

- [ ] **Step 2: Diff rendered HTML structure, not bytes**

Byte-for-byte HTML will NOT match the pre-refactor version because of the two intentional unifications (`mb-11` instead of `mb-[52px]` on How It Works heading; `text-[32px]` instead of `text-[34px]` on Reviews heading) — this is expected and correct, not a regression.

For each of `/roofing`, `/siding`, `/decks`:

```bash
curl -s http://localhost:3000/roofing | grep -o 'id="[a-z-]*-heading"' | sort -u
```

Expected output (same for all three, confirms every section rendered): `id="estimate-heading"`, `id="faq-heading"`, `id="gallery-heading"`, `id="process-heading"`, `id="reviews-heading"`, `id="subservices-heading"`, `id="why-heading"`.

- [ ] **Step 3: Confirm anchor-link targets survived**

```bash
curl -s http://localhost:3000/roofing | grep -o 'id="subservices"\|id="estimate"'
```

Expected: both present (these are the `<section id="...">` anchors that `#subservices` / `#estimate` links target — losing these would silently break in-page navigation and the Header's "Free Estimate" button).

- [ ] **Step 4: Confirm per-hub copy differentiation survived (catches config mix-ups)**

```bash
curl -s http://localhost:3000/roofing | grep -o "Roofing projects from around"
curl -s http://localhost:3000/siding | grep -o "Siding projects from around"
curl -s http://localhost:3000/decks | grep -o "Deck &amp; fencing projects"
```

Expected: each command prints exactly its one matching string — proves `ROOFING_HUB_CONFIG` didn't leak into the siding/decks routes or vice versa.

- [ ] **Step 5: Confirm the two intentional unifications actually landed**

```bash
curl -s http://localhost:3000/roofing | grep -o 'mb-\[52px\]'
```

Expected: no output (empty) — the old arbitrary value is gone from all three hub pages.

```bash
curl -s http://localhost:3000/roofing -o /tmp/roofing.html
grep -B2 'id="reviews-heading"' /tmp/roofing.html | grep -o 'text-\[3[24]px\]'
```

Expected: `text-[32px]` (not `text-[34px]`).

- [ ] **Step 6: Screenshot each hub page for a human visual check**

If `chromium-cli` or Playwright is available in this environment, screenshot `/roofing`, `/siding`, `/decks` at the Hero, Sub-services, and How-It-Works sections and visually confirm layout/spacing looks unchanged aside from the two intentional unifications. If no browser automation is available (as was the case in a prior session on this project), state that explicitly rather than claiming a visual check was performed — the curl-based structural checks in Steps 2–5 remain the verification of record.

- [ ] **Step 7: Stop the dev server**

```bash
# PowerShell
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force -Confirm:$false }
```

---

### Task 5: Delete dead weight and confirm no leftover references

**Files:**
- Verify (no modification expected): `src/app/roofing/page.tsx`, `src/app/siding/page.tsx`, `src/app/decks/page.tsx` no longer import `Header`, `Footer`, `Container`, `Button`, `PlaceholderImage`, `WhyCard`, `StatBlock`, `FaqAccordion`, `ReviewCarousel`, `GalleryCarousel`, `EstimateForm`, `Reveal`, or any `*_WHY_ITEMS`/`*_SUB_SERVICES`/etc. constants directly (all now flow through `HubPageConfig`).

**Interfaces:** none — this is a cleanliness check.

- [ ] **Step 1: Grep for stale direct imports in the three page files**

```bash
grep -n "^import" src/app/roofing/page.tsx src/app/siding/page.tsx src/app/decks/page.tsx
```

Expected: each file shows exactly two imports — `Metadata` from `"next"`, `HubPage` from `"@/components/hub/HubPage"`, and its one `*_HUB_CONFIG` from `"@/lib/hubConfigs"`. If more remain, Task 3 wasn't applied cleanly — re-check the file was fully replaced, not merged.

- [ ] **Step 2: Confirm line count dropped as expected**

```bash
wc -l src/app/roofing/page.tsx src/app/siding/page.tsx src/app/decks/page.tsx
```

Expected: each file is now ~15-20 lines (down from ~330).

- [ ] **Step 3: Final full type-check**

Run: `cd c:\main\Projects\TopLineExteriors && npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 4: Commit (if anything was left uncommitted)**

```bash
git status
git add -A
git commit -m "Confirm hub page refactor is clean"
```

(Skip if `git status` shows nothing to commit — Task 3's commit already covered everything.)

---

## Post-Refactor Follow-Up (not part of this plan — flag to user, do not implement)

Once this plan is executed, the codebase will have a clean single point of truth for hub-page structure. The visual/genericness issues identified in the earlier audit (flat typographic hierarchy, repeated 4-column card grid pattern, thin section-background contrast, `--color-muted` contrast risk on small text) are **not addressed by this plan** — they are token/design changes, deliberately deferred per the user's own prioritization ("сначала техдолг"). Suggest opening a follow-up brainstorming session for those once this refactor lands.
