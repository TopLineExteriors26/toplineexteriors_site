# Service Detail Pages Rollout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create SEO-content detail pages for all 20 remaining services across the three hubs (Roofing, Decks, Siding), reusing the existing `roof-replacement` page as the template, and wire the hub pages' "Learn more" links to point at them.

**Architecture:** The existing `/roofing/[service]/page.tsx` is hardcoded to the Roofing hub (`Header variant="roofing"`, `Footer variant="roofing"`, hardcoded "roofing" copy). Task 1 generalizes it into a single shared component (`ServiceDetailPage`) parameterized by `HubHeaderFooterVariant`, then three thin `[service]/page.tsx` route files (one per hub) each supply their own service list and `generateStaticParams`. Tasks 2–4 add the `ServiceDetail` content objects for all 20 remaining services directly to `src/lib/constants.ts`, grouped by hub. Task 5 rewires each hub's `hrefFor` in `hubConfigs.tsx` so every "Learn more" link on the hub pages points at a real detail page instead of the `#estimate` fallback.

**Tech Stack:** Next.js 15 App Router (server components, `generateStaticParams`), Tailwind v4, existing `ServiceDetail` type in `src/lib/constants.ts`.

## Global Constraints

- Do not start the dev server — the user runs it themselves (CLAUDE.md).
- Do not take or generate screenshots — the user verifies in-browser (CLAUDE.md).
- No new npm dependencies.
- Every new `ServiceDetail` object must have real, service-specific copy — no lorem ipsum, no copy-pasted paragraphs across services. City/region names (from `CITIES` in `constants.ts`: Levittown, Bristol, Newtown, Yardley, Doylestown, Langhorne PA; Philadelphia PA; Cherry Hill, Trenton, Camden NJ) should appear naturally in intro copy or FAQ answers on at least the first service per hub — do not force it into every field.
- `signsList` needs 5–6 items, `processSteps` needs 4, `materials` needs 3 (or an empty array if the service genuinely has no distinct "materials" story — see Task 3/4 notes), `faqs` needs 4–5, `quickFacts` needs 4.
- After each task, run `npm run build` from `c:/main/Projects/TopLineExteriors` and confirm it exits clean before moving on.
- Run builds with the Bash tool (POSIX paths as shown above), not PowerShell.

---

### Task 1: Generalize the service detail page template

**Files:**
- Create: `src/components/service-detail/ServiceDetailPage.tsx`
- Modify: `src/app/roofing/[service]/page.tsx` (replace body with thin wrapper)
- Create: `src/app/decks/[service]/page.tsx`
- Create: `src/app/siding/[service]/page.tsx`

**Interfaces:**
- Consumes: `ServiceDetail` type and `ROOF_REPLACEMENT_SERVICE` from `@/lib/constants` (existing, unchanged), `HubHeaderFooterVariant` type from `@/lib/hubConfigs` (existing, unchanged), `PHONE_DIGITS`/`PHONE_DISPLAY`/`SITE_URL` from `@/lib/constants` (existing).
- Produces: `ServiceDetailPage` component with props `{ service: ServiceDetail; hubVariant: HubHeaderFooterVariant; allServices: SubService[] }` — used by all three route files in this task and unchanged by later tasks. `allServices` is the hub's full `*_SUB_SERVICES` list, used to compute "Related Services" (all entries except the current one, matched by `title`).

- [ ] **Step 1: Read the current roofing detail page in full**

Read `src/app/roofing/[service]/page.tsx` (already open in context from prior work — re-read if context was compacted). Note every hardcoded "roofing"/"Roofing" string: `Header variant="roofing"`, `Footer variant="roofing"`, the FINAL CTA paragraph text `"Tell us about your project on our roofing page..."`.

- [ ] **Step 2: Create the shared `ServiceDetailPage` component**

Create `src/components/service-detail/ServiceDetailPage.tsx` with this exact content (this is the current roofing page body, generalized: `variant="roofing"` → `hubVariant` prop, `ROOFING_SUB_SERVICES` → `allServices` prop, and the FINAL CTA copy made hub-agnostic):

```tsx
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { PHONE_DIGITS, PHONE_DISPLAY } from "@/lib/constants";
import type { ServiceDetail, SubService } from "@/lib/constants";
import type { HubHeaderFooterVariant } from "@/lib/hubConfigs";

type ServiceDetailPageProps = {
  service: ServiceDetail;
  hubVariant: HubHeaderFooterVariant;
  allServices: SubService[];
};

export function ServiceDetailPage({
  service,
  hubVariant,
  allServices,
}: ServiceDetailPageProps) {
  const relatedServices = allServices.filter(
    (sub) => sub.title !== service.title
  );

  return (
    <>
      <Header variant={hubVariant} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: service.hubLabel, href: service.hubHref },
          { label: service.title },
        ]}
      />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-paper">
          <Container className="grid grid-cols-1 items-center gap-14 pb-[88px] pt-11 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.14em] text-accent">
                {service.eyebrow}
              </p>
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] md:text-[52px]">
                {service.title} in Bucks County &amp; South Jersey
              </h1>
              <p className="mb-[30px] max-w-[500px] font-body text-[17px] leading-[1.6] text-muted">
                {service.heroDek}
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href={`${service.hubHref}#estimate`} variant="primary">
                  Get a Free Estimate
                </Button>
                <a
                  href={`tel:${PHONE_DIGITS}`}
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill border border-line bg-transparent px-7 py-4 font-body text-[15px] font-bold text-text no-underline transition-[filter] duration-200 ease-out motion-safe:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                    <path
                      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.9 21 3 14.1 3 5.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 1.7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <PlaceholderImage
              label={service.heroImgLabel}
              alt={service.heroAlt}
            />
          </Container>
        </section>

        {/* INTRO */}
        <section className="bg-paper" aria-labelledby="intro-heading">
          <Container className="grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[1fr_280px]">
            <Reveal>
            <h2
              id="intro-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              What is {service.title.toLowerCase()}?
            </h2>
            <span className="section-heading-rule mb-6" aria-hidden="true" />
            <div className="max-w-[75ch]">
              {service.introParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-5 font-body text-[16px] leading-[1.75] text-muted last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            </Reveal>
            <Reveal
              stagger
              as="ul"
              className="flex flex-col gap-3 p-0 lg:pt-[52px]"
            >
              {service.quickFacts.map((fact) => (
                <li
                  key={fact.label}
                  className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper-2 px-5 py-4"
                >
                  <p className="mb-1 font-body text-xs font-bold tracking-[.06em] text-muted">
                    {fact.label.toUpperCase()}
                  </p>
                  <p className="font-head text-lg font-bold text-text">
                    {fact.value}
                  </p>
                </li>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* SIGNS YOU NEED THIS */}
        <section className="bg-alt" aria-labelledby="signs-heading">
          <Container className="py-[88px]">
            <Reveal>
            <h2
              id="signs-heading"
              className="font-head text-[32px] font-bold uppercase text-text bg-alt-heading"
            >
              Signs you may need {service.title.toLowerCase()}
            </h2>
            <span className="section-heading-rule mb-8" aria-hidden="true" />
            </Reveal>
            <Reveal stagger as="ul" className="grid grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {service.signsList.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-4 rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-5 font-body text-sm leading-[1.6] text-text"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-paper-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3.5l10 17.3H2L12 3.5z"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 10.5v4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="17.8" r="1" fill="var(--color-accent)" />
                    </svg>
                  </span>
                  {sign}
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-11 flex justify-center">
              <Button href={`${service.hubHref}#estimate`} variant="primary">
                Get a Free Estimate
              </Button>
            </Reveal>
          </Container>
        </section>

        {/* PROCESS */}
        <section className="bg-paper" aria-labelledby="process-heading">
          <Container className="py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              HOW IT WORKS
            </p>
            <h2
              id="process-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              Our {service.title.toLowerCase()} process.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.processSteps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6"
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
            </Reveal>
          </Container>
        </section>

        {/* MATERIALS */}
        {service.materials.length > 0 && (
          <section className="bg-alt" aria-labelledby="materials-heading">
            <Container className="py-[88px]">
              <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                MATERIALS WE INSTALL
              </p>
              <h2
                id="materials-heading"
                className="font-head text-[32px] font-bold uppercase text-text bg-alt-heading"
              >
                Manufacturer-certified systems, not generic materials.
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
              </Reveal>
              <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {service.materials.map((material) => (
                  <div
                    key={material.title}
                    className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-7"
                  >
                    <h3 className="mb-2.5 font-head text-lg font-bold uppercase text-text">
                      {material.title}
                    </h3>
                    <p className="font-body text-sm leading-[1.6] text-muted">
                      {material.desc}
                    </p>
                  </div>
                ))}
              </Reveal>
              <Reveal className="mt-11 flex justify-center">
                <Button href={`${service.hubHref}#estimate`} variant="primary">
                  Get a Free Estimate
                </Button>
              </Reveal>
            </Container>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-paper" aria-labelledby="faq-heading">
          <Container narrow className="py-24">
            <Reveal>
            <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-center font-head text-[32px] font-bold uppercase text-text"
            >
              {service.title} questions.
            </h2>
            <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
            <FaqAccordion faqs={service.faqs} columns={1} />
            </Reveal>
          </Container>
        </section>

        {/* RELATED SERVICES */}
        <section className={service.materials.length > 0 ? "bg-paper" : "bg-alt"} aria-labelledby="related-heading">
          <Container className="py-[88px]">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              RELATED SERVICES
            </p>
            <h2
              id="related-heading"
              className={service.materials.length > 0 ? "font-head text-[32px] font-bold uppercase text-text" : "font-head text-[32px] font-bold uppercase text-text bg-alt-heading"}
            >
              Other {service.hubLabel.toLowerCase()} services you may need.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.title}
                  href={`${service.hubHref}#subservices`}
                  className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-7 no-underline transition-[filter] duration-150 ease-out hover:brightness-95"
                >
                  <p className="mb-2 font-head text-2xl font-bold text-accent opacity-40">
                    {related.num}
                  </p>
                  <h3 className="mb-2 font-head text-lg font-bold uppercase text-text">
                    {related.title}
                  </h3>
                  <p className="mb-3 font-body text-sm leading-[1.6] text-muted">
                    {related.desc}
                  </p>
                  <span className="font-body text-[13px] font-bold text-accent">
                    Learn more →
                  </span>
                </Link>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* FINAL CTA */}
        <section className="bg-ink" aria-labelledby="cta-heading">
          <Container className="py-24 text-center" maxWidthPx={700}>
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              GET STARTED
            </p>
            <h2
              id="cta-heading"
              className="mb-4 font-head text-[32px] font-bold uppercase text-white"
            >
              Ready for your free {service.title.toLowerCase()} estimate?
            </h2>
            <p className="mb-8 font-body text-[17px] leading-[1.6] text-white/70">
              Tell us about your project on our {service.hubLabel.toLowerCase()} page and
              we&rsquo;ll get back to you with a written quote — usually within 48 hours.
            </p>
            <Button href={`${service.hubHref}#estimate`} variant="primary">
              Get My Free Estimate
            </Button>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant={hubVariant} />
    </>
  );
}
```

Note the two behavior changes from the original roofing-only page, both required for reuse across hubs:
1. `service.materials.length > 0` guards the MATERIALS section — some services genuinely have no distinct materials list (see Tasks 3–4). When materials is empty, RELATED SERVICES picks up the `bg-alt` dark treatment instead (so the page doesn't have two consecutive light sections).
2. FINAL CTA copy uses `service.hubLabel.toLowerCase()` instead of a hardcoded "roofing" — works for "Roofing", "Decks", "Siding".

- [ ] **Step 2: Rewrite the roofing route file as a thin wrapper**

Replace the entire content of `src/app/roofing/[service]/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail/ServiceDetailPage";
import {
  ROOF_REPLACEMENT_SERVICE,
  ROOF_REPAIR_SERVICE,
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  METAL_ROOFING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
  ROOFING_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const SERVICES = [
  ROOF_REPLACEMENT_SERVICE,
  ROOF_REPAIR_SERVICE,
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  METAL_ROOFING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
];

type ServicePageProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/roofing/${service.slug}`,
    },
  };
}

export default async function RoofingServiceDetailPage({
  params,
}: ServicePageProps) {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/roofing/${service.slug}`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    serviceSchema({
      name: service.title,
      description: service.metaDescription,
      url: pageUrl,
      serviceType: service.title,
    }),
    faqPageSchema(service.faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: service.hubLabel, url: `${SITE_URL}${service.hubHref}` },
      { name: service.title, url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailPage
        service={service}
        hubVariant="roofing"
        allServices={ROOFING_SUB_SERVICES}
      />
    </>
  );
}
```

This references six roofing services that don't exist yet (`ROOF_REPAIR_SERVICE` etc. — added in Task 2). That's expected: this step will fail typecheck until Task 2 lands. Proceed to Step 3 and Step 4 anyway; the build check for this task only covers `roof-replacement` still working, deferring the six-service typecheck to Task 2's build check.

Actually — to keep this task's own build green, use ONLY `ROOF_REPLACEMENT_SERVICE` in the `SERVICES` array for now, and leave a comment marking where Task 2 appends the rest:

```tsx
const SERVICES = [
  ROOF_REPLACEMENT_SERVICE,
  // Task 2 appends: ROOF_REPAIR_SERVICE, ASPHALT_SHINGLE_ROOFING_SERVICE,
  // METAL_ROOFING_SERVICE, FLAT_LOW_SLOPE_ROOFING_SERVICE,
  // ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE, GUTTERS_GUTTER_GUARDS_SERVICE
];
```

And drop the unused imports for the six not-yet-created services from this step's version of the file (add them back in Task 2 Step where the array is updated).

- [ ] **Step 3: Create the decks route file**

Create `src/app/decks/[service]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail/ServiceDetailPage";
import { DECKS_SUB_SERVICES, SITE_URL } from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const SERVICES: import("@/lib/constants").ServiceDetail[] = [];

type ServicePageProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/decks/${service.slug}`,
    },
  };
}

export default async function DecksServiceDetailPage({
  params,
}: ServicePageProps) {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/decks/${service.slug}`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    serviceSchema({
      name: service.title,
      description: service.metaDescription,
      url: pageUrl,
      serviceType: service.title,
    }),
    faqPageSchema(service.faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: service.hubLabel, url: `${SITE_URL}${service.hubHref}` },
      { name: service.title, url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailPage
        service={service}
        hubVariant="decks"
        allServices={DECKS_SUB_SERVICES}
      />
    </>
  );
}
```

(`SERVICES` is intentionally empty here — Task 3 replaces the empty array with the 7 deck service imports. An empty `generateStaticParams` array is valid Next.js and produces zero static pages, so this compiles and builds cleanly as a no-op until Task 3.)

- [ ] **Step 4: Create the siding route file**

Create `src/app/siding/[service]/page.tsx` — identical structure to Step 3, with `decks` → `siding`, `DECKS_SUB_SERVICES` → `SIDING_SUB_SERVICES`, `hubVariant="decks"` → `hubVariant="siding"`, function name `DecksServiceDetailPage` → `SidingServiceDetailPage`. `SERVICES` stays an empty array (Task 4 fills it).

- [ ] **Step 5: Build and verify**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build, `/roofing/roof-replacement` still listed as a static page (SSG), no route conflicts.

- [ ] **Step 6: Commit**

```bash
git add src/components/service-detail/ServiceDetailPage.tsx src/app/roofing/[service]/page.tsx src/app/decks/[service]/page.tsx src/app/siding/[service]/page.tsx
git commit -m "refactor: extract shared ServiceDetailPage component for all three hubs"
```

---

### Task 2: Roofing services content (6 new services)

**Files:**
- Modify: `src/lib/constants.ts` (append 6 new `ServiceDetail` consts after `ROOF_REPLACEMENT_SERVICE`)
- Modify: `src/app/roofing/[service]/page.tsx` (restore the full `SERVICES` array and imports from Task 1 Step 2's original draft)

**Interfaces:**
- Consumes: `ServiceDetail` type, `ProcessStep` type, `Faq` type (all existing, from `src/lib/constants.ts:378-895` region).
- Produces: `ROOF_REPAIR_SERVICE`, `ASPHALT_SHINGLE_ROOFING_SERVICE`, `METAL_ROOFING_SERVICE`, `FLAT_LOW_SLOPE_ROOFING_SERVICE`, `ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE`, `GUTTERS_GUTTER_GUARDS_SERVICE` — all exported `ServiceDetail` consts, same shape as `ROOF_REPLACEMENT_SERVICE`. Slugs must exactly match `ROOFING_SUB_SERVICES` titles' kebab-case so hub "Learn more" links resolve correctly in Task 5.

Source titles/descriptions (from `ROOFING_SUB_SERVICES` in `src/lib/constants.ts:384-420`, do not change these — they're the hub page's existing sub-service list):
- 02 "Roof Repair" — "Leaks, flashing, and damaged shingles fixed fast, with a clear written scope."
- 03 "Asphalt Shingle Roofing" — "GAF and CertainTeed shingle systems, installed to manufacturer spec."
- 04 "Metal Roofing" — "Standing-seam and metal shingle roofing for long-term durability."
- 05 "Flat / Low-Slope Roofing" — "Membrane roofing systems for additions, porches, and low-slope sections."
- 06 "Roof Inspections & Storm Damage" — "Full inspection reports and insurance-ready storm damage documentation."
- 07 "Gutters & Gutter Guards" — "Seamless gutters and guards installed alongside your roofing project."

- [ ] **Step 1: Write `ROOF_REPAIR_SERVICE`**

Insert directly after the closing `};` of `ROOF_REPLACEMENT_SERVICE` (currently ending at `src/lib/constants.ts:983`):

```ts
export const ROOF_REPAIR_SERVICE: ServiceDetail = {
  slug: "roof-repair",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Repair",
  metaTitle: "Roof Repair in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Fast, honest roof leak and shingle repair in Bucks County, PA & South Jersey. Written scope before we start, no unnecessary upsells. Get a free estimate today.",
  eyebrow: "ROOFING · ROOF REPAIR",
  heroDek:
    "Leaks, flashing failures, and storm-damaged shingles fixed fast — with a clear written scope before we start, not a replacement pitch you didn't ask for.",
  heroImgLabel: "roof repair — flashing and shingle replacement",
  heroAlt: "Roof repair in progress, replacing damaged flashing and shingles",
  introParagraphs: [
    "A roof repair targets a specific problem — a leak, a section of damaged shingles, failed flashing around a chimney or vent — without touching the rest of a roof that's still doing its job. It's the right call when the damage is contained and the roof still has years of life left in it.",
    "Most repair calls we get in Bucks County and South Jersey come down to a handful of causes: ice damming after a hard winter, wind-lifted shingles after a storm, or flashing that was never sealed correctly around a penetration. We diagnose the actual cause first, not just patch the symptom, so the same leak doesn't come back six months later.",
    "If an inspection turns up wear that goes beyond what a repair can reasonably fix, we'll tell you that directly and explain why — we don't pad repair jobs and we don't push replacements that aren't needed yet.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "Same day–1 day" },
    { label: "Response time", value: "Often within 48 hrs" },
    { label: "Scope", value: "Written before work starts" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "A stain spreading across a ceiling or upper wall after rain",
    "Missing, cracked, or curled shingles in one section of the roof",
    "Visible daylight or water around a chimney, skylight, or vent pipe",
    "Granules collecting in gutters after a storm",
    "A shingle or two lifted or torn loose after high wind",
    "A small leak that's been patched before and has come back",
  ],
  processSteps: [
    {
      num: "01",
      title: "Diagnosis",
      desc: "We trace the leak to its actual source — not just the spot where water is showing up inside.",
    },
    {
      num: "02",
      title: "Written Scope & Price",
      desc: "A fixed price for exactly what needs to be fixed, before any work begins.",
    },
    {
      num: "03",
      title: "Repair",
      desc: "Flashing, decking, underlayment, and shingles repaired or replaced as needed to match the surrounding roof.",
    },
    {
      num: "04",
      title: "Follow-Up Check",
      desc: "We confirm the repair is holding, especially after the next real rain or storm.",
    },
  ],
  materials: [
    {
      title: "Matched Shingle Replacement",
      desc: "We source GAF or CertainTeed shingles that match your existing roof as closely as possible for repairs.",
    },
    {
      title: "Step & Counter-Flashing",
      desc: "New aluminum flashing at chimneys, walls, and penetrations — the most common source of recurring leaks.",
    },
    {
      title: "Ice & Water Shield",
      desc: "Added at eaves and valleys during repair when the existing underlayment is missing or failed.",
    },
  ],
  faqs: [
    {
      q: "How do you know a repair is enough, and I don't need a full replacement?",
      a: "We inspect the full roof, not just the leak location — checking overall shingle condition, decking, and how many other repairs the roof has needed. If the rest of the roof has real life left, a targeted repair is the honest recommendation, and that's what we'll quote.",
    },
    {
      q: "How fast can you get someone out for an active leak?",
      a: "We prioritize active leaks and can usually get a crew out within 48 hours across Bucks County and South Jersey, sooner after major storms permitting.",
    },
    {
      q: "Will the repaired area match the rest of my roof?",
      a: "We match shingle brand, style, and color as closely as possible. Some color variation is normal with older roofs since shingles fade over time, but we aim for the closest available match.",
    },
    {
      q: "Do you offer any guarantee on repair work?",
      a: "Yes — every repair is backed by our workmanship guarantee. If the same issue recurs due to our work, we come back and fix it at no charge.",
    },
  ],
};
```

- [ ] **Step 2: Write `ASPHALT_SHINGLE_ROOFING_SERVICE`**

```ts
export const ASPHALT_SHINGLE_ROOFING_SERVICE: ServiceDetail = {
  slug: "asphalt-shingle-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Asphalt Shingle Roofing",
  metaTitle: "Asphalt Shingle Roofing in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "GAF & CertainTeed certified asphalt shingle roofing installation in Bucks County, PA & South Jersey. Architectural & 3-tab options. Get a free estimate today.",
  eyebrow: "ROOFING · ASPHALT SHINGLE ROOFING",
  heroDek:
    "GAF and CertainTeed shingle systems installed to manufacturer spec, in a range of styles and colors built to handle Pennsylvania and New Jersey weather.",
  heroImgLabel: "architectural asphalt shingle roof — finished install",
  heroAlt: "Finished architectural asphalt shingle roof installation",
  introParagraphs: [
    "Asphalt shingles are the most common roofing material in the region for good reason — they're durable, cost-effective, and available in styles that suit almost any home, from a straightforward 3-tab shingle to dimensional architectural shingles that mimic the look of slate or wood shake.",
    "As GAF and CertainTeed certified installers, we install these systems exactly to manufacturer specification — correct nailing pattern, proper ventilation, and the underlayment each manufacturer requires to honor its warranty. That certification matters because a shingle warranty can be voided by incorrect installation, even if the shingles themselves are defect-free.",
    "We work with homeowners across Levittown, Newtown, Doylestown, and the wider Bucks County and South Jersey area to pick a shingle line and color that fits both the home's style and the budget, then install it as a full system — not just shingles nailed to whatever was underneath before.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–2 days" },
    { label: "Materials", value: "GAF & CertainTeed" },
    { label: "Lifespan", value: "20–30+ years" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Shingles curling, cupping, or losing their granule coating",
    "Bald or shiny patches where granules have worn away completely",
    "Cracked shingles after a hail or wind event",
    "A roof over 20 years old that hasn't been reroofed",
    "Visible sagging along the roofline",
    "Frequent ice damming or water backing up under the eaves",
  ],
  processSteps: [
    {
      num: "01",
      title: "Consultation & Selection",
      desc: "Walk through GAF and CertainTeed shingle lines, colors, and pricing tiers to find the right fit.",
    },
    {
      num: "02",
      title: "Permits & Scheduling",
      desc: "We pull the required township permit and schedule the install around weather windows.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Full removal of the old roof, decking inspection, then new underlayment, flashing, and shingle system.",
    },
    {
      num: "04",
      title: "Final Inspection",
      desc: "Walkthrough with you, magnetic nail sweep, and warranty registration paperwork.",
    },
  ],
  materials: [
    {
      title: "GAF Timberline HDZ Shingles",
      desc: "The best-selling architectural shingle in North America, with GAF's LayerLock technology and a limited lifetime warranty.",
    },
    {
      title: "CertainTeed Landmark Shingles",
      desc: "Dimensional shingles with StreakFighter algae resistance and a range of color blends.",
    },
    {
      title: "3-Tab Shingle Options",
      desc: "A budget-friendly, flat-profile option for homeowners who prefer a traditional look or a tighter project budget.",
    },
  ],
  faqs: [
    {
      q: "What's the difference between architectural and 3-tab shingles?",
      a: "Architectural (dimensional) shingles are thicker, layered for a shadowed look, and typically carry a longer warranty. 3-tab shingles are flatter and less expensive, but generally have a shorter rated lifespan. We'll price both so you can compare directly.",
    },
    {
      q: "Does the color fade over time?",
      a: "All asphalt shingles fade somewhat with UV exposure over their lifespan, and CertainTeed's StreakFighter technology specifically resists the dark algae streaking common in humid climates. We can show samples of both new and weathered shingle color.",
    },
    {
      q: "How does certification affect my warranty?",
      a: "GAF and CertainTeed extend enhanced warranty coverage — including labor, in some tiers — only when the roof is installed by a certified contractor following their exact specifications. We register every qualifying install so you get that extended coverage automatically.",
    },
    {
      q: "Can you match my existing shingle color for a partial reroof?",
      a: "For a full replacement this isn't a concern, but if you're only replacing one section, we'll do our best to match the closest current color — some variation is normal since shingles fade with age.",
    },
  ],
};
```

- [ ] **Step 3: Write `METAL_ROOFING_SERVICE`**

```ts
export const METAL_ROOFING_SERVICE: ServiceDetail = {
  slug: "metal-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Metal Roofing",
  metaTitle: "Metal Roofing in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Standing-seam & metal shingle roofing installation in Bucks County, PA & South Jersey. Built for long-term durability and snow shedding. Get a free estimate.",
  eyebrow: "ROOFING · METAL ROOFING",
  heroDek:
    "Standing-seam and metal shingle systems built for decades of service — better snow shedding, fire resistance, and long-term durability than asphalt.",
  heroImgLabel: "standing-seam metal roof — finished install",
  heroAlt: "Finished standing-seam metal roof installation",
  introParagraphs: [
    "Metal roofing covers a range of systems — standing-seam panels with concealed fasteners, and metal shingles designed to mimic the look of slate or shake — all sharing the same core advantages over asphalt: a much longer service life, better performance in heavy snow, and strong resistance to wind, fire, and impact damage.",
    "It costs more upfront than asphalt shingles, which is the main reason more homes in Bucks County and South Jersey don't have it, but the lifespan difference is significant — a properly installed metal roof commonly lasts 40 to 70 years against 20 to 30 for asphalt, and most homeowners never need a second reroof.",
    "Installation quality matters even more with metal than asphalt — panel alignment, fastener spacing, and expansion allowance all affect how the roof performs over decades, not just years. We install standing-seam and metal shingle systems to manufacturer spec with crews trained specifically on metal, not asphalt crews doing metal occasionally.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "2–4 days" },
    { label: "Lifespan", value: "40–70 years" },
    { label: "Snow performance", value: "Sheds heavy snow well" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "An asphalt roof nearing the end of its life where you want a longer-term replacement",
    "Recurring ice dam problems that a metal roof's snow-shedding helps prevent",
    "Visible rust, seam separation, or fastener backing out on an existing metal roof",
    "A desire for better fire resistance, especially near wooded property",
    "Frequent hail or severe wind events in your area",
    "Wanting to reduce long-term reroofing costs over a 30+ year horizon",
  ],
  processSteps: [
    {
      num: "01",
      title: "System Selection",
      desc: "Choose between standing-seam panels or metal shingles, plus gauge, finish, and color.",
    },
    {
      num: "02",
      title: "Measurement & Permits",
      desc: "Precise measurement for custom panel fabrication, plus the required township permit.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Full tear-off, decking repair as needed, then underlayment and metal panel or shingle installation.",
    },
    {
      num: "04",
      title: "Detail Work & Walkthrough",
      desc: "Trim, flashing, and snow guards installed as needed, then final walkthrough and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "Standing-Seam Steel & Aluminum Panels",
      desc: "Concealed-fastener panels in a range of gauges and factory finishes, custom-fabricated to your roof's exact dimensions.",
    },
    {
      title: "Metal Shingle Systems",
      desc: "Interlocking metal shingles styled to resemble slate, shake, or tile, with the durability of steel.",
    },
    {
      title: "Snow Retention & Trim Accessories",
      desc: "Snow guards, custom trim, and flashing to control snow shed and keep water moving where it should.",
    },
  ],
  faqs: [
    {
      q: "Is metal roofing noisier in the rain than asphalt?",
      a: "With proper solid-deck installation and underlayment — which is how we install every metal roof — the noise difference from asphalt is minimal. The old 'loud tin roof' reputation mostly comes from metal installed directly over open framing without decking, which we don't do.",
    },
    {
      q: "Will a metal roof void my homeowners insurance discount eligibility?",
      a: "The opposite is usually true — many insurers offer a discount for metal roofing due to its fire and impact resistance. Check with your specific carrier, but it's worth asking about when you switch.",
    },
    {
      q: "How does metal roofing handle heavy snow?",
      a: "Standing-seam panels are especially effective at shedding snow due to their smooth, low-friction surface, which reduces the ice damming and structural load that heavy snow causes on asphalt roofs.",
    },
    {
      q: "Can you install metal roofing over my existing roof?",
      a: "We do a full tear-off on every metal roof install. Installing over an old roof can trap moisture, add weight the structure wasn't designed for, and prevent proper inspection of the decking underneath.",
    },
  ],
};
```

- [ ] **Step 4: Write `FLAT_LOW_SLOPE_ROOFING_SERVICE`**

```ts
export const FLAT_LOW_SLOPE_ROOFING_SERVICE: ServiceDetail = {
  slug: "flat-low-slope-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Flat / Low-Slope Roofing",
  metaTitle: "Flat & Low-Slope Roofing in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Membrane roofing systems for flat and low-slope roofs in Bucks County, PA & South Jersey — additions, porches, garages. Get a free estimate today.",
  eyebrow: "ROOFING · FLAT / LOW-SLOPE ROOFING",
  heroDek:
    "Membrane roofing systems built specifically for flat and low-slope sections — additions, porch roofs, and garages that standard shingles aren't designed for.",
  heroImgLabel: "flat roof membrane — finished install",
  heroAlt: "Finished flat roof membrane installation on a home addition",
  introParagraphs: [
    "Flat and low-slope roofs — generally anything under a 3:12 pitch — need a different roofing system than a standard pitched roof. Asphalt shingles rely on gravity and slope to shed water; on a flat or nearly flat surface, water sits instead of running off, which shingles aren't built to handle over time.",
    "We install membrane systems designed for this: fully adhered or mechanically fastened membranes that create a continuous, seamless waterproof layer rather than overlapping shingles. These are common on home additions, porch roofs, garages, and sections of larger homes with a modern flat-roof design element.",
    "Getting a flat roof right depends heavily on proper drainage design and correct membrane seaming — the most common flat roof failures we see on other contractors' work come down to ponding water and seam separation, both of which we address directly in how we design and install the system.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–3 days" },
    { label: "Best for", value: "Additions, porches, garages" },
    { label: "Materials", value: "Membrane systems" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Water pooling on a flat or low-slope section more than 48 hours after rain",
    "Visible bubbling, cracking, or seam separation in the membrane",
    "A leak showing up on the ceiling below a flat-roofed addition or porch",
    "An aging built-up or tar roof that's never been replaced with a membrane system",
    "Debris or granule buildup blocking drains on a flat roof",
    "Soft or spongy spots when walking a flat roof section",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Drainage Review",
      desc: "We assess the existing roof, structure, and drainage slope before recommending a membrane system.",
    },
    {
      num: "02",
      title: "System & Permit",
      desc: "Select the right membrane type for the application; we pull the required permit.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Remove the old roofing down to the deck, then install insulation and the membrane system with properly sealed seams.",
    },
    {
      num: "04",
      title: "Drainage Check & Walkthrough",
      desc: "Water test drainage points, final walkthrough, and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "TPO Membrane",
      desc: "A reflective, heat-welded single-ply membrane offering strong UV and puncture resistance.",
    },
    {
      title: "EPDM Rubber Membrane",
      desc: "A durable synthetic rubber roofing membrane with a long track record on flat residential sections.",
    },
    {
      title: "Modified Bitumen",
      desc: "A torch- or cold-applied asphalt membrane system, well suited to smaller flat sections like porch roofs.",
    },
  ],
  faqs: [
    {
      q: "How long does a membrane roof last compared to shingles?",
      a: "A properly installed TPO or EPDM membrane typically lasts 20 to 30 years, comparable to a mid-grade asphalt shingle roof, provided drainage is correctly designed and seams are properly sealed.",
    },
    {
      q: "Why does my flat roof keep collecting water?",
      a: "Ponding water usually points to a drainage slope problem — either the original roof was built without enough pitch toward the drains, or the structure has settled over time. We assess this during inspection and can address it with tapered insulation as part of the reroof.",
    },
    {
      q: "Can you install a membrane roof on just one section of my house?",
      a: "Yes — this is one of the most common jobs we do, matching a membrane system to a specific flat-roofed addition, porch, or garage while the rest of the home keeps its existing pitched roof.",
    },
    {
      q: "Is a flat roof more prone to leaks than a pitched roof?",
      a: "A well-installed membrane system with correct drainage is not inherently leak-prone, but flat roofs have less margin for installation error than pitched roofs, which is why proper membrane seaming and drainage design matter more here.",
    },
  ],
};
```

- [ ] **Step 5: Write `ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE`**

```ts
export const ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE: ServiceDetail = {
  slug: "roof-inspections-storm-damage",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Inspections & Storm Damage",
  metaTitle:
    "Roof Inspections & Storm Damage Claims in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Full roof inspections and insurance-ready storm damage documentation in Bucks County, PA & South Jersey. We work directly with your adjuster. Free estimate.",
  eyebrow: "ROOFING · INSPECTIONS & STORM DAMAGE",
  heroDek:
    "Full inspection reports and insurance-ready storm damage documentation — we work directly with your adjuster from inspection through final sign-off.",
  heroImgLabel: "roof inspection — hail damage documentation",
  heroAlt: "Roof inspector documenting hail damage on residential shingles",
  introParagraphs: [
    "A roof inspection is a full assessment of your roof's condition — shingle wear, flashing integrity, ventilation, and any storm damage — documented with photos and a written report. It's the starting point for almost every roofing decision, whether that's a simple repair, an insurance claim, or planning ahead for a future replacement.",
    "After hail or high wind, insurance-related storm damage inspections are their own category. Adjusters need clear, specific documentation to approve a claim, and homeowners without that documentation often get lowball offers or outright denials. We inspect specifically for what an adjuster looks for — hail bruising, granule loss patterns, and wind-lifted or creased shingles — and document it accordingly.",
    "We work directly with your insurance adjuster throughout the claims process across Bucks County, Philadelphia, and South Jersey, from the initial inspection through the final scope agreement, so you're not navigating that process alone.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "Same day report" },
    { label: "Insurance claims", value: "We work with adjusters" },
    { label: "Documentation", value: "Photos + written report" },
    { label: "Cost", value: "Free inspection" },
  ],
  signsList: [
    "A recent hail, wind, or severe storm event in your area",
    "Granules collecting in gutters or downspouts after a storm",
    "Visible dents or bruising on shingles, vents, or gutters",
    "Missing or torn shingles after high wind",
    "Planning to sell your home and want a pre-listing roof condition report",
    "An insurance adjuster requesting an independent roof assessment",
  ],
  processSteps: [
    {
      num: "01",
      title: "Full Roof Walk",
      desc: "We physically walk the roof, not just view it from the ground, checking every slope for damage.",
    },
    {
      num: "02",
      title: "Photo Documentation",
      desc: "Detailed photos of any hail, wind, or wear damage found, organized by location on the roof.",
    },
    {
      num: "03",
      title: "Written Report",
      desc: "A clear report covering condition, damage found, and our recommendation — repair, or file a claim.",
    },
    {
      num: "04",
      title: "Adjuster Coordination",
      desc: "If you file a claim, we meet your adjuster on-site and advocate for a fair, complete scope.",
    },
  ],
  materials: [],
  faqs: [
    {
      q: "Is the inspection really free, even if I don't end up filing a claim?",
      a: "Yes — the inspection and report are free with no obligation. Plenty of inspections turn up minor wear that doesn't need immediate action, and we'll tell you that directly.",
    },
    {
      q: "How do I know if storm damage is significant enough to file a claim?",
      a: "Hail bruising and wind damage aren't always visible from the ground. That's exactly why we do a full roof walk — cosmetic-looking damage can still compromise a shingle's ability to shed water over time, which is what qualifies for most claims.",
    },
    {
      q: "Will you meet with my insurance adjuster in person?",
      a: "Yes, this is standard practice for us on storm damage claims. Having a roofing contractor on-site with the adjuster generally leads to a more accurate and complete scope than a homeowner navigating it alone.",
    },
    {
      q: "What if the insurance company denies my claim or offers too little?",
      a: "We can provide additional documentation to support a reinspection or appeal. We're not a public adjuster and can't file appeals on your behalf, but we'll give you everything needed to make the case yourself or through one.",
    },
  ],
};
```

- [ ] **Step 6: Write `GUTTERS_GUTTER_GUARDS_SERVICE`**

```ts
export const GUTTERS_GUTTER_GUARDS_SERVICE: ServiceDetail = {
  slug: "gutters-gutter-guards",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Gutters & Gutter Guards",
  metaTitle: "Gutter Installation & Guards in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Seamless gutter and gutter guard installation in Bucks County, PA & South Jersey, alongside your roofing project or as a standalone job. Free estimate.",
  eyebrow: "ROOFING · GUTTERS & GUTTER GUARDS",
  heroDek:
    "Seamless gutters and gutter guards installed alongside your roofing project — or on their own — to keep water moving away from your home's foundation.",
  heroImgLabel: "seamless gutters — freshly installed",
  heroAlt: "Freshly installed seamless aluminum gutters on a home",
  introParagraphs: [
    "Gutters do one job — move roof water away from your siding, foundation, and landscaping — but a lot can go wrong when they're undersized, poorly pitched, or clogged constantly. Seamless gutters, formed on-site to the exact length needed, eliminate the seam joints that are the most common failure point on sectional gutters.",
    "Gutter guards reduce how often gutters need to be cleaned by keeping leaves and debris out while still letting water through, which matters a lot on properties with mature trees — a common feature across Bucks County and South Jersey neighborhoods.",
    "We install gutters as part of a full roofing project or as a standalone job on a home whose gutters are failing independent of the roof itself, in aluminum sizes and colors matched to your home's trim.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1 day" },
    { label: "Material", value: "Seamless aluminum" },
    { label: "Add-on", value: "Gutter guards available" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Water overflowing the gutter during moderate rain",
    "Gutters pulling away from the fascia or sagging between hangers",
    "Visible rust, cracks, or seam leaks on sectional gutters",
    "Water pooling near the foundation after rain",
    "Constant leaf and debris buildup requiring frequent cleaning",
    "Ice buildup in gutters contributing to ice dams in winter",
  ],
  processSteps: [
    {
      num: "01",
      title: "Measurement & Sizing",
      desc: "We measure roof area and pitch to size gutters and downspouts correctly for real water volume, not just standard sizing.",
    },
    {
      num: "02",
      title: "Material & Color Selection",
      desc: "Choose aluminum gauge and color to match your home's trim and fascia.",
    },
    {
      num: "03",
      title: "Seamless Fabrication & Install",
      desc: "Gutters are formed on-site to exact length and installed with properly spaced hangers for real snow and debris load.",
    },
    {
      num: "04",
      title: "Guard Install & Walkthrough",
      desc: "Gutter guards installed if selected, then a final walkthrough to confirm proper pitch and drainage.",
    },
  ],
  materials: [
    {
      title: "Seamless Aluminum Gutters",
      desc: "Formed on-site in a range of colors, eliminating the seam leaks common on pre-formed sectional gutters.",
    },
    {
      title: "Micro-Mesh Gutter Guards",
      desc: "Fine-mesh guards that block leaves and debris while allowing full water flow, reducing cleaning frequency.",
    },
    {
      title: "Oversized Downspouts",
      desc: "Upsized downspout options for roofs that see heavy water volume during storms.",
    },
  ],
  faqs: [
    {
      q: "Are gutter guards worth the extra cost?",
      a: "On properties with mature trees nearby, yes — they significantly cut down on cleaning frequency and reduce the risk of clogged gutters overflowing near the foundation. On properties with minimal tree coverage, standard gutters with occasional cleaning may be sufficient.",
    },
    {
      q: "Can you install gutters without doing a full roof replacement?",
      a: "Yes, gutter installation and repair is a standalone service. We install gutters alongside roofing projects often, but plenty of our gutter jobs are independent of any roof work.",
    },
    {
      q: "Why do seamless gutters cost more than sectional gutters from a hardware store?",
      a: "Seamless gutters are custom-formed on-site to your home's exact roofline length, eliminating the seams that are the most common leak point on pre-cut sectional gutters. The material and labor cost more, but the maintenance and leak risk over time drop significantly.",
    },
    {
      q: "How often do gutters need to be replaced?",
      a: "Well-maintained aluminum gutters typically last 20+ years. Replacement is usually driven by physical damage, persistent leaks at seams, or pulling away from the fascia rather than age alone.",
    },
  ],
};
```

- [ ] **Step 7: Update the roofing route file's `SERVICES` array**

In `src/app/roofing/[service]/page.tsx`, replace the imports and `SERVICES` array with the full version (undoing the Task 1 Step 2 placeholder):

```tsx
import {
  ROOF_REPLACEMENT_SERVICE,
  ROOF_REPAIR_SERVICE,
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  METAL_ROOFING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
  ROOFING_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
```

```tsx
const SERVICES = [
  ROOF_REPLACEMENT_SERVICE,
  ROOF_REPAIR_SERVICE,
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  METAL_ROOFING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
];
```

- [ ] **Step 8: Build and verify**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build, 7 static roofing service pages generated (check the build route summary output lists all 7 slugs under `/roofing/[service]`).

- [ ] **Step 9: Commit**

```bash
git add src/lib/constants.ts src/app/roofing/[service]/page.tsx
git commit -m "content: add detail pages for all 6 remaining roofing services"
```

---

### Task 3: Decks services content (7 services)

**Files:**
- Modify: `src/lib/constants.ts` (append 7 new `ServiceDetail` consts after the roofing services block)
- Modify: `src/app/decks/[service]/page.tsx` (fill in the `SERVICES` array from Task 1 Step 3's empty placeholder)

**Interfaces:**
- Consumes: same `ServiceDetail` type as Task 2.
- Produces: `CUSTOM_DECK_CONSTRUCTION_SERVICE`, `DECK_RESTORATION_REFINISHING_SERVICE`, `COMPOSITE_DECKING_SERVICE`, `WOOD_DECKING_SERVICE`, `RAILINGS_GUARDRAILS_SERVICE`, `FENCING_SERVICE`, `DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE`.

Source titles/descriptions (from `DECKS_SUB_SERVICES` in `src/lib/constants.ts:560-596`):
- 01 "Custom Deck Construction" — "Design and build from the ground up — layout, framing, decking, and finishing handled by one crew."
- 02 "Deck Restoration & Refinishing" — "Board replacement, joist sistering, sanding, staining, and sealing to bring an aging deck back to life."
- 03 "Composite Decking" — "Trex, TimberTech, and other low-maintenance composite systems built for PA & NJ weather."
- 04 "Wood Decking" — "Cedar, pressure-treated pine, and exotic hardwoods like ipe, installed and finished to last."
- 05 "Railings & Guardrails" — "Cable, composite, wood, and metal railing systems built to code and matched to your deck's style."
- 06 "Fencing" — "Wood, vinyl, and decorative fencing for privacy, pets, pools, and property-line marking."
- 07 "Deck Repair & Structural Reinforcement" — "Rotted board and joist replacement, ledger reattachment, and footing repair for decks with real structural issues."

Note: `hubHref` is `/decks` and `hubLabel` is `"Decks"` for all seven.

- [ ] **Step 1: Write `CUSTOM_DECK_CONSTRUCTION_SERVICE`**

```ts
export const CUSTOM_DECK_CONSTRUCTION_SERVICE: ServiceDetail = {
  slug: "custom-deck-construction",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Custom Deck Construction",
  metaTitle: "Custom Deck Building in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Custom deck design and construction in Bucks County, PA & South Jersey — layout, framing, decking, and railings by one crew. Get a free estimate today.",
  eyebrow: "DECKS · CUSTOM DECK CONSTRUCTION",
  heroDek:
    "Design and build from the ground up — layout, framing, decking, and finishing handled by our own crew, with permits pulled for you.",
  heroImgLabel: "custom composite deck — finished build",
  heroAlt: "Finished custom composite deck build in Bucks County, PA",
  introParagraphs: [
    "Custom deck construction means the whole project — from initial layout and footing placement through framing, decking, and railings — is designed for your specific yard and how you actually plan to use the space, rather than a stock size and shape.",
    "We handle it as one project with one crew: footings and framing engineered to hold real load, decking material selected to fit your budget and maintenance preference, and railings that match the deck's style. We also pull the required township permit and schedule inspections, which is required in most Bucks County and South Jersey municipalities for any elevated deck.",
    "Whether it's a simple ground-level platform or a multi-level deck with built-in seating, lighting, and a pergola, we design and build it as a single coordinated project rather than handing pieces off to different subcontractors.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–3 weeks" },
    { label: "Materials", value: "Composite or wood" },
    { label: "Permits", value: "Pulled for you" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting outdoor living space but starting from a bare yard",
    "An existing deck too small, poorly placed, or beyond repair",
    "Planning a multi-level deck to work with a sloped yard",
    "Wanting built-in features like seating, lighting, or a pergola",
    "Needing a deck engineered for a hot tub or heavy furniture load",
    "A home addition or renovation that includes new outdoor space",
  ],
  processSteps: [
    {
      num: "01",
      title: "Design Consultation",
      desc: "We walk your yard, discuss how you'll use the space, and design a layout and material plan.",
    },
    {
      num: "02",
      title: "Permits & Engineering",
      desc: "We pull the required township permit and, for larger builds, provide engineered footing and framing plans.",
    },
    {
      num: "03",
      title: "Framing & Construction",
      desc: "Footings, framing, decking, and railings built by our own crew from start to finish.",
    },
    {
      num: "04",
      title: "Final Walkthrough & Inspection",
      desc: "Township inspection scheduled and passed, then a final walkthrough with you before we call it done.",
    },
  ],
  materials: [
    {
      title: "Trex & TimberTech Composite",
      desc: "Low-maintenance composite decking in a range of colors and grain patterns, built for PA & NJ weather.",
    },
    {
      title: "Pressure-Treated & Cedar Framing",
      desc: "Structural framing lumber rated for ground contact and long-term outdoor exposure.",
    },
    {
      title: "Cable, Wood & Composite Railings",
      desc: "Railing systems matched to your deck's style and built to current code height and spacing requirements.",
    },
  ],
  faqs: [
    {
      q: "Do I need a permit for a new deck?",
      a: "Most townships in Bucks County and South Jersey require a permit for any deck attached to the house or elevated above a certain height. We pull the permit and schedule required inspections as part of every custom build.",
    },
    {
      q: "How long does a custom deck take to build?",
      a: "A straightforward single-level deck usually takes about a week of on-site work; multi-level or larger decks with built-in features can take two to three weeks, plus permit lead time before we start.",
    },
    {
      q: "Can you design a deck that works with a sloped or uneven yard?",
      a: "Yes — multi-level decks and stepped footings are common solutions for sloped lots, and we design the framing plan specifically around your yard's actual grade rather than assuming flat ground.",
    },
    {
      q: "What's the price difference between composite and wood decking?",
      a: "Composite typically costs more upfront but requires little to no annual maintenance. Pressure-treated wood costs less initially but needs regular staining and sealing. We'll price both so you can compare the total cost over time, not just the install price.",
    },
  ],
};
```

- [ ] **Step 2: Write `DECK_RESTORATION_REFINISHING_SERVICE`**

```ts
export const DECK_RESTORATION_REFINISHING_SERVICE: ServiceDetail = {
  slug: "deck-restoration-refinishing",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Deck Restoration & Refinishing",
  metaTitle: "Deck Restoration & Refinishing in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Deck restoration, board replacement, sanding, staining, and sealing in Bucks County, PA & South Jersey. Bring an aging deck back to life. Free estimate.",
  eyebrow: "DECKS · DECK RESTORATION & REFINISHING",
  heroDek:
    "Board replacement, joist sistering, sanding, staining, and sealing — bringing an aging deck back to life instead of tearing it out and starting over.",
  heroImgLabel: "wood deck restoration — before and after",
  heroAlt: "Wood deck mid-restoration, sanded and ready for staining",
  introParagraphs: [
    "A deck that's structurally sound but showing its age — graying wood, splintering boards, a worn or peeling finish — is usually a restoration candidate rather than a full rebuild. Restoration replaces damaged boards, sisters weakened joists for extra support, and refinishes the surface to look and perform like new.",
    "We start with a structural check, because refinishing over a deck with hidden rot or a failing ledger board just delays a bigger problem. Once we confirm the frame is sound, we replace individual boards as needed, sand the deck surface, and apply a stain and sealer rated for real outdoor exposure across our Pennsylvania and New Jersey seasons.",
    "Restoration is typically a fraction of the cost of a full rebuild and can add years of life to a deck that's fundamentally solid — it's the right call more often than homeowners expect, and we'll tell you directly if your deck actually needs a rebuild instead.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–3 days" },
    { label: "Cost vs. rebuild", value: "Usually a fraction" },
    { label: "Includes", value: "Board repair, stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wood that's turned gray and lost its original finish",
    "Splintering, cupping, or cracked boards in isolated spots",
    "A finish that's peeling, flaking, or wearing thin",
    "Loose railings or handrails that move when you push on them",
    "A deck that hasn't been stained or sealed in 3+ years",
    "Minor soft spots that haven't spread across the whole structure",
  ],
  processSteps: [
    {
      num: "01",
      title: "Structural Assessment",
      desc: "We check joists, the ledger board, and footings to confirm the deck's frame is sound before refinishing.",
    },
    {
      num: "02",
      title: "Board & Joist Repair",
      desc: "Replace damaged boards and sister any weakened joists for added structural support.",
    },
    {
      num: "03",
      title: "Sanding",
      desc: "The full deck surface is sanded smooth to remove the old, worn finish and any splintering.",
    },
    {
      num: "04",
      title: "Staining & Sealing",
      desc: "A weather-rated stain and sealer applied to protect the wood through another set of PA & NJ seasons.",
    },
  ],
  materials: [
    {
      title: "Matched Replacement Decking",
      desc: "New boards matched to your deck's existing wood species where individual replacement is needed.",
    },
    {
      title: "Semi-Transparent & Solid Stains",
      desc: "Weather-rated exterior stains in a range of tones, from natural wood grain to solid color coverage.",
    },
    {
      title: "Penetrating Sealers",
      desc: "UV- and water-resistant sealers that protect refinished wood from sun and moisture damage.",
    },
  ],
  faqs: [
    {
      q: "How do I know if my deck needs restoration or a full rebuild?",
      a: "It comes down to the frame. If the joists, ledger board, and footings are structurally sound and the issues are cosmetic or limited to a handful of boards, restoration is the right call. Widespread rot or a failing ledger usually means a rebuild is the more responsible option, and we'll tell you which applies during inspection.",
    },
    {
      q: "How often should a wood deck be restained?",
      a: "Most exterior stains need reapplication every 2 to 3 years depending on sun exposure and foot traffic, though a solid stain can last a bit longer than a semi-transparent one.",
    },
    {
      q: "Can you match the stain color to my existing deck?",
      a: "Yes, we can match or closely approximate an existing stain color, or help you choose a new tone entirely as part of the restoration.",
    },
    {
      q: "Does restoration work on composite decks too?",
      a: "Composite decking doesn't need staining, but boards can crack, fade unevenly, or loosen from fasteners over time — we handle composite board replacement and railing repair as part of restoration work as well.",
    },
  ],
};
```

- [ ] **Step 3: Write `COMPOSITE_DECKING_SERVICE`**

```ts
export const COMPOSITE_DECKING_SERVICE: ServiceDetail = {
  slug: "composite-decking",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Composite Decking",
  metaTitle: "Composite Decking Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Trex & TimberTech composite decking installation in Bucks County, PA & South Jersey. Low-maintenance, built for real weather. Get a free estimate today.",
  eyebrow: "DECKS · COMPOSITE DECKING",
  heroDek:
    "Trex, TimberTech, and other low-maintenance composite systems built for Pennsylvania and New Jersey weather — no annual staining or sealing required.",
  heroImgLabel: "composite decking — finished surface detail",
  heroAlt: "Close-up of finished composite decking surface",
  introParagraphs: [
    "Composite decking is built from a blend of wood fiber and recycled plastic, engineered specifically to resist the rot, splintering, and fading that wood decking is prone to over time. It costs more upfront than pressure-treated lumber, but requires no annual staining or sealing — a meaningful trade-off for homeowners who want a deck without the yearly maintenance cycle.",
    "We install Trex and TimberTech systems, two of the most established composite brands, in a range of colors and grain patterns designed to resemble natural wood without the upkeep. Both offer strong warranties against fading, staining, and structural defects.",
    "Composite decking's performance depends heavily on correct installation — proper spacing for expansion, hidden fastener systems for a clean surface, and framing built to the manufacturer's specifications to keep the warranty valid. We install to manufacturer spec on every job across Bucks County and South Jersey.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "3–7 days" },
    { label: "Maintenance", value: "No annual staining" },
    { label: "Materials", value: "Trex & TimberTech" },
    { label: "Warranty", value: "25+ year manufacturer" },
  ],
  signsList: [
    "Wanting a deck without annual staining or sealing upkeep",
    "Replacing a wood deck that's failed faster than expected",
    "Building a new deck and comparing composite vs. wood long-term cost",
    "Wanting a consistent, splinter-free surface for bare feet and kids",
    "Building near a pool or hot tub where wood maintenance is harder",
    "Wanting a longer manufacturer warranty than wood decking offers",
  ],
  processSteps: [
    {
      num: "01",
      title: "Product Selection",
      desc: "Choose between Trex and TimberTech lines, plus color and board profile.",
    },
    {
      num: "02",
      title: "Framing to Spec",
      desc: "Framing built or verified to the manufacturer's exact spacing requirements to keep the warranty valid.",
    },
    {
      num: "03",
      title: "Hidden-Fastener Install",
      desc: "Boards installed with a hidden fastener system for a clean surface with no visible screw heads.",
    },
    {
      num: "04",
      title: "Trim & Warranty Registration",
      desc: "Fascia and edge trim installed, then your composite decking warranty registered with the manufacturer.",
    },
  ],
  materials: [
    {
      title: "Trex Composite Decking",
      desc: "One of the most established composite brands, available in multiple lines from entry-level to premium.",
    },
    {
      title: "TimberTech Composite Decking",
      desc: "Composite and capped-polymer boards with a range of wood-look finishes and a strong fade warranty.",
    },
    {
      title: "Hidden Fastener Systems",
      desc: "Clip-based fastening that leaves no visible screws on the deck surface for a cleaner finished look.",
    },
  ],
  faqs: [
    {
      q: "Is composite decking really maintenance-free?",
      a: "It doesn't need staining or sealing like wood, but it should be periodically cleaned with soap and water to prevent surface mildew, especially in shaded or humid areas. That's a much lighter maintenance load than annual wood staining.",
    },
    {
      q: "How does composite decking handle Pennsylvania winters?",
      a: "Both Trex and TimberTech are engineered for freeze-thaw cycles and won't rot, warp, or splinter the way wood can after repeated winters. Snow and ice should still be cleared with a plastic shovel rather than metal to protect the surface finish.",
    },
    {
      q: "What's the real cost difference between composite and pressure-treated wood?",
      a: "Composite typically costs 20 to 40 percent more upfront than pressure-treated wood, but avoids the recurring cost of annual staining and sealing wood requires — most homeowners find the total cost evens out or favors composite over a 10+ year horizon.",
    },
    {
      q: "Does composite decking get hot in direct sun?",
      a: "Composite can run warmer underfoot than lighter-colored wood in direct summer sun, particularly with darker color boards. Both Trex and TimberTech offer lighter color options and cooler-technology lines if this is a concern.",
    },
  ],
};
```

- [ ] **Step 4: Write `WOOD_DECKING_SERVICE`**

```ts
export const WOOD_DECKING_SERVICE: ServiceDetail = {
  slug: "wood-decking",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Wood Decking",
  metaTitle: "Wood Decking Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Cedar, pressure-treated, and hardwood decking installation in Bucks County, PA & South Jersey. Installed and finished to last. Get a free estimate today.",
  eyebrow: "DECKS · WOOD DECKING",
  heroDek:
    "Cedar, pressure-treated pine, and exotic hardwoods like ipe — installed and finished to last, with the natural look composite can't fully replicate.",
  heroImgLabel: "cedar wood decking — finished install",
  heroAlt: "Finished cedar wood decking installation on a home",
  introParagraphs: [
    "Wood decking remains a popular choice for homeowners who want the natural grain and warmth composite decking imitates but doesn't fully replace — and it costs less upfront than most composite systems, though it requires more ongoing maintenance.",
    "We install pressure-treated pine, the most common and budget-friendly option; cedar, which naturally resists rot and insects with a warmer tone; and exotic hardwoods like ipe, a dense, extremely durable Brazilian hardwood favored for high-end builds that can last 25+ years with proper care.",
    "Whichever species you choose, correct installation — proper board spacing for drainage and expansion, quality fasteners, and a finish applied at the right time after installation — determines how well the deck actually holds up through Pennsylvania and New Jersey winters and summers.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "3–7 days" },
    { label: "Species options", value: "PT pine, cedar, ipe" },
    { label: "Maintenance", value: "Annual stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting the natural grain and look of real wood",
    "Building on a budget where pressure-treated pine fits best",
    "Wanting cedar's natural rot and insect resistance",
    "Considering a premium hardwood like ipe for a high-end build",
    "Replacing composite decking with a wood alternative",
    "Building a deck you plan to stain a custom color",
  ],
  processSteps: [
    {
      num: "01",
      title: "Species Selection",
      desc: "Compare pressure-treated pine, cedar, and hardwood options against your budget and maintenance preference.",
    },
    {
      num: "02",
      title: "Framing & Permits",
      desc: "Structural framing built to code, with the required township permit pulled on your behalf.",
    },
    {
      num: "03",
      title: "Decking Install",
      desc: "Boards installed with correct spacing for drainage and seasonal expansion, using quality fasteners.",
    },
    {
      num: "04",
      title: "Finishing",
      desc: "Stain and sealer applied once the wood has properly cured, protecting it from day one of regular use.",
    },
  ],
  materials: [
    {
      title: "Pressure-Treated Pine",
      desc: "The most budget-friendly decking wood, chemically treated to resist rot and insect damage.",
    },
    {
      title: "Cedar Decking",
      desc: "A naturally rot- and insect-resistant softwood with a warm tone that ages gracefully.",
    },
    {
      title: "Ipe & Exotic Hardwoods",
      desc: "Dense, extremely durable Brazilian hardwoods favored for premium builds, with a 25+ year lifespan when maintained.",
    },
  ],
  faqs: [
    {
      q: "How long before I can stain new wood decking?",
      a: "Pressure-treated wood typically needs 2 to 3 months to dry out before staining, while kiln-dried cedar and hardwoods can often be finished sooner. We'll tell you the right timeline for your specific material during installation.",
    },
    {
      q: "Is ipe worth the extra cost over cedar or pressure-treated pine?",
      a: "Ipe costs significantly more than cedar or pine, but its density and natural durability mean it can outlast both by decades with proper maintenance. It's a premium choice best suited to homeowners planning to stay in the home long-term or prioritizing a high-end look.",
    },
    {
      q: "How much maintenance does wood decking really need?",
      a: "Most wood decking needs restaining and sealing every 1 to 3 years depending on species and sun exposure, plus periodic cleaning to prevent mildew. Cedar and ipe hold their finish somewhat longer than pressure-treated pine.",
    },
    {
      q: "Can wood decking be installed over existing footings and framing?",
      a: "If the existing structure passes inspection and is rated for the new decking's weight, yes. We always assess the frame first rather than assuming it's reusable.",
    },
  ],
};
```

- [ ] **Step 5: Write `RAILINGS_GUARDRAILS_SERVICE`**

```ts
export const RAILINGS_GUARDRAILS_SERVICE: ServiceDetail = {
  slug: "railings-guardrails",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Railings & Guardrails",
  metaTitle: "Deck Railings & Guardrails in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Cable, composite, wood & metal deck railing installation in Bucks County, PA & South Jersey, built to code. Get a free estimate today.",
  eyebrow: "DECKS · RAILINGS & GUARDRAILS",
  heroDek:
    "Cable, composite, wood, and metal railing systems built to code and matched to your deck's style — installed as a new build or a standalone upgrade.",
  heroImgLabel: "cable railing system — install detail",
  heroAlt: "Close-up of a cable railing system installed on a deck",
  introParagraphs: [
    "Railings and guardrails serve a safety-code function first — most townships in Bucks County and South Jersey require guardrails on any deck elevated above 30 inches, with specific requirements for height, baluster spacing, and load rating — but they're also one of the biggest visual elements of a deck's overall look.",
    "We install cable railing systems for an open, modern sightline; composite railings that match low-maintenance decking; traditional wood railings for a classic look; and metal railings for a more industrial or contemporary style. Each system is built to current code requirements, not just aesthetic preference.",
    "This is a common standalone upgrade too — plenty of homeowners replace failing or outdated wood railings on an otherwise sound deck without touching the decking itself, and we handle that as its own project just as often as we do it alongside a full deck build.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–2 days" },
    { label: "Materials", value: "Cable, wood, composite, metal" },
    { label: "Code compliance", value: "Built to current spec" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Railings that feel loose or wobble when leaned on",
    "Wood railings splintering or rotting at the posts",
    "Baluster spacing wider than current code allows",
    "Wanting a style upgrade — cable or metal instead of wood",
    "A deck railing failing a home inspection during a sale",
    "New deck construction needing code-compliant railings",
  ],
  processSteps: [
    {
      num: "01",
      title: "Style & Material Selection",
      desc: "Choose between cable, composite, wood, or metal railing systems for your deck's look and budget.",
    },
    {
      num: "02",
      title: "Code Review",
      desc: "We confirm height, spacing, and load requirements for your specific township before installing.",
    },
    {
      num: "03",
      title: "Post & Rail Install",
      desc: "Posts set with proper structural attachment, then rails, balusters or cable run installed.",
    },
    {
      num: "04",
      title: "Final Inspection",
      desc: "Confirm every run meets code spacing and load requirements before calling the job complete.",
    },
  ],
  materials: [
    {
      title: "Stainless Cable Railing",
      desc: "A low-profile, modern railing system that preserves an open view while meeting code guardrail requirements.",
    },
    {
      title: "Composite Railing Systems",
      desc: "Low-maintenance railings matched to Trex and TimberTech decking colors and profiles.",
    },
    {
      title: "Wood & Metal Railings",
      desc: "Traditional wood balusters or powder-coated metal railing systems for a classic or industrial look.",
    },
  ],
  faqs: [
    {
      q: "What's the current code requirement for deck railings?",
      a: "Most Bucks County and South Jersey townships require guardrails on any deck surface elevated 30 inches or more above grade, a minimum 36-inch railing height, and baluster spacing no wider than 4 inches. Specific requirements vary by municipality, and we verify the exact code for your township before installing.",
    },
    {
      q: "Can you replace just the railings without touching my deck boards?",
      a: "Yes, this is a common standalone project. We can replace railings on a deck whose boards are still in good condition, matching the new railing style to the existing deck.",
    },
    {
      q: "Is cable railing more expensive than traditional railings?",
      a: "Cable railing typically costs more than standard wood balusters due to the stainless steel cable and specialized hardware, but usually less than premium composite railing systems. We'll price all options for direct comparison.",
    },
    {
      q: "How much weight can a properly installed railing hold?",
      a: "Code-compliant guardrails are engineered to withstand a 200-pound lateral load at any point along the top rail, which is the standard safety requirement we build to on every install.",
    },
  ],
};
```

- [ ] **Step 6: Write `FENCING_SERVICE`**

```ts
export const FENCING_SERVICE: ServiceDetail = {
  slug: "fencing",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Fencing",
  metaTitle: "Fence Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Wood, vinyl & decorative fence installation in Bucks County, PA & South Jersey — privacy, pet, pool & property-line fencing. Get a free estimate today.",
  eyebrow: "DECKS · FENCING",
  heroDek:
    "Wood, vinyl, and decorative fencing for privacy, pets, pools, and property-line marking — installed by the same crew that handles your deck.",
  heroImgLabel: "privacy fencing — freshly installed",
  heroAlt: "Newly installed wood privacy fencing along a property line",
  introParagraphs: [
    "Fencing covers a range of needs — full privacy fencing along a property line, a shorter decorative fence around a garden bed, secure fencing for pets or a pool, or a boundary fence marking where your property ends. Each has different height, material, and code considerations.",
    "We install wood fencing for a classic, customizable look; vinyl fencing for a low-maintenance option that won't rot or need repainting; and decorative fencing for smaller accent applications like garden borders. Pool fencing has additional code requirements around height and self-closing gates that we build to exactly.",
    "We handle fence layout, including confirming property lines and any township setback requirements, before installation begins — getting this wrong is one of the most common (and expensive) fencing mistakes homeowners run into with other contractors.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–3 days" },
    { label: "Materials", value: "Wood, vinyl, decorative" },
    { label: "Layout", value: "Property line verified" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting privacy from neighboring properties",
    "Needing secure fencing for pets or young children",
    "Installing or replacing pool fencing to meet code",
    "Marking an unclear or disputed property line",
    "An existing fence that's leaning, rotting, or damaged",
    "Wanting decorative fencing around a garden or landscaped area",
  ],
  processSteps: [
    {
      num: "01",
      title: "Layout & Property Line Check",
      desc: "We confirm property lines and any township setback requirements before marking the fence layout.",
    },
    {
      num: "02",
      title: "Material & Style Selection",
      desc: "Choose between wood, vinyl, or decorative fencing styles and heights.",
    },
    {
      num: "03",
      title: "Post Setting & Install",
      desc: "Posts set to proper depth for stability, then panels or pickets installed along the confirmed layout.",
    },
    {
      num: "04",
      title: "Gate & Hardware",
      desc: "Gates installed and hung, including self-closing hardware where required for pool fencing.",
    },
  ],
  materials: [
    {
      title: "Wood Privacy & Picket Fencing",
      desc: "Pressure-treated and cedar fencing in privacy, picket, and shadowbox styles.",
    },
    {
      title: "Vinyl Fencing",
      desc: "Low-maintenance vinyl panels that won't rot, warp, or need repainting.",
    },
    {
      title: "Decorative & Pool Fencing",
      desc: "Aluminum and decorative fencing styles, including code-compliant self-closing pool gate hardware.",
    },
  ],
  faqs: [
    {
      q: "Do I need to survey my property line before installing a fence?",
      a: "A formal survey isn't always required, but we do confirm property boundaries and any township setback rules before installing to avoid a fence being built on a neighbor's property or violating local code.",
    },
    {
      q: "What are the code requirements for pool fencing?",
      a: "Most townships require pool fencing at least 4 feet high with self-closing, self-latching gate hardware, and no gaps large enough for a small child to pass through. We build to your specific township's exact requirement.",
    },
    {
      q: "How long does vinyl fencing last compared to wood?",
      a: "Vinyl fencing typically lasts 20 to 30 years with essentially no maintenance, while wood fencing generally needs restaining or repainting every few years and has a somewhat shorter typical lifespan depending on wood species and exposure.",
    },
    {
      q: "Can you match a new fence section to my existing fence?",
      a: "For repairs or extensions to an existing fence, we'll do our best to match material, style, and height, though exact color matching on weathered wood or discontinued vinyl profiles isn't always possible.",
    },
  ],
};
```

- [ ] **Step 7: Write `DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE`**

```ts
export const DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE: ServiceDetail = {
  slug: "deck-repair-structural-reinforcement",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Deck Repair & Structural Reinforcement",
  metaTitle: "Deck Repair & Structural Reinforcement in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Rotted board, joist, ledger & footing repair in Bucks County, PA & South Jersey. Real structural deck repairs, not just cosmetic fixes. Free estimate.",
  eyebrow: "DECKS · DECK REPAIR & STRUCTURAL REINFORCEMENT",
  heroDek:
    "Rotted board and joist replacement, ledger reattachment, and footing repair — for decks with real structural issues, not just cosmetic wear.",
  heroImgLabel: "deck structural repair — joist replacement",
  heroAlt: "Deck joist replacement during a structural repair project",
  introParagraphs: [
    "Structural deck repair addresses problems below the surface — rotted or undersized joists, a ledger board pulling away from the house, failing or heaving footings — that a cosmetic refinish won't fix and that pose a real safety risk if left alone. These are the failures behind most of the deck collapse incidents reported nationally.",
    "The ledger board attachment, where the deck connects to the house, is the single most common point of catastrophic failure on older decks, especially those built before current code required specific flashing and fastener spacing. We inspect this connection closely on every structural repair call.",
    "We assess the full structure — joists, beams, posts, footings, and the ledger connection — before recommending repairs, and we're direct about when a deck's structural problems are extensive enough that a rebuild is the safer and more cost-effective choice.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–3 days" },
    { label: "Focus", value: "Structural, not cosmetic" },
    { label: "Common fix", value: "Ledger, joist, footings" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "A deck that feels bouncy or springy when walked on",
    "Visible gaps between the ledger board and the house wall",
    "Rotted or soft joists, especially near the ledger connection",
    "A support post that's leaning, cracked, or sitting on a heaved footing",
    "Rusted, missing, or undersized structural fasteners",
    "A deck that's failed a home inspection for structural concerns",
  ],
  processSteps: [
    {
      num: "01",
      title: "Structural Inspection",
      desc: "Full assessment of joists, beams, posts, footings, and the ledger board connection to the house.",
    },
    {
      num: "02",
      title: "Repair Plan",
      desc: "A written scope covering exactly what's structurally compromised and what needs replacement or reinforcement.",
    },
    {
      num: "03",
      title: "Repair & Reinforcement",
      desc: "Joist sistering, ledger reattachment with proper flashing, or footing repair as the inspection requires.",
    },
    {
      num: "04",
      title: "Load Verification",
      desc: "We confirm the repaired structure meets current load requirements before returning the deck to use.",
    },
  ],
  materials: [
    {
      title: "Structural-Grade Lumber",
      desc: "Pressure-treated joists and framing lumber rated for the load and span of your specific deck.",
    },
    {
      title: "Ledger Flashing & Fasteners",
      desc: "Code-compliant flashing and structural fasteners at the house connection, the most common point of failure on older decks.",
    },
    {
      title: "Footing Repair Materials",
      desc: "Concrete and post base hardware to repair or reset footings that have heaved, cracked, or shifted.",
    },
  ],
  faqs: [
    {
      q: "How do I know if my deck's problems are structural or just cosmetic?",
      a: "A bouncy feel underfoot, visible gaps at the ledger board, or leaning posts are structural red flags that go beyond cosmetic wear. If you notice any of these, it's worth a structural inspection before continued regular use.",
    },
    {
      q: "Is a deck with structural problems actually dangerous?",
      a: "Yes, potentially. Ledger board failure is the leading cause of deck collapses, and it can happen suddenly under load — a party, furniture, or a hot tub — rather than gradually. We treat any ledger or joist concern as a priority inspection.",
    },
    {
      q: "Can you repair a deck instead of rebuilding it entirely?",
      a: "Often, yes — if the issue is contained to specific joists, the ledger connection, or a footing, targeted repair is both possible and more cost-effective than a full rebuild. We'll tell you honestly if the damage is too extensive for that to make sense.",
    },
    {
      q: "How much does structural deck repair typically cost compared to a rebuild?",
      a: "Targeted structural repair is almost always significantly less expensive than a full rebuild, since it addresses specific failure points rather than replacing the entire structure. Exact cost depends on what's found during inspection.",
    },
  ],
};
```

- [ ] **Step 8: Fill in the decks route file's `SERVICES` array**

In `src/app/decks/[service]/page.tsx`, replace the imports and `SERVICES` array:

```tsx
import {
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  WOOD_DECKING_SERVICE,
  RAILINGS_GUARDRAILS_SERVICE,
  FENCING_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
  DECKS_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
```

```tsx
const SERVICES = [
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  WOOD_DECKING_SERVICE,
  RAILINGS_GUARDRAILS_SERVICE,
  FENCING_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
];
```

- [ ] **Step 9: Build and verify**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build, 7 static deck service pages generated.

- [ ] **Step 10: Commit**

```bash
git add src/lib/constants.ts src/app/decks/[service]/page.tsx
git commit -m "content: add detail pages for all 7 deck services"
```

---

### Task 4: Siding services content (7 services)

**Files:**
- Modify: `src/lib/constants.ts` (append 7 new `ServiceDetail` consts after the decks services block)
- Modify: `src/app/siding/[service]/page.tsx` (fill in the `SERVICES` array)

**Interfaces:**
- Consumes: same `ServiceDetail` type as Tasks 2–3.
- Produces: `SIDING_REPLACEMENT_SERVICE`, `VINYL_SIDING_SERVICE`, `JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE`, `INSULATED_SIDING_SERVICE`, `WOOD_CEDAR_SHAKE_SIDING_SERVICE`, `SIDING_REPAIR_SERVICE`, `SOFFIT_FASCIA_TRIM_SERVICE`.

Source titles/descriptions (from `SIDING_SUB_SERVICES` in `src/lib/constants.ts:725-761`):
- 01 "Siding Replacement" — "Full tear-off and replacement of old, worn, or storm-damaged siding down to the sheathing."
- 02 "Vinyl Siding" — "Budget-friendly, low-maintenance vinyl siding in a wide range of colors and profiles."
- 03 "James Hardie Fiber-Cement Siding" — "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems."
- 04 "Insulated Siding" — "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home."
- 05 "Wood & Cedar Shake Siding" — "Classic and historic-style wood and cedar shake siding, installed and finished to last outdoors."
- 06 "Siding Repair" — "Targeted repair of cracked, loose, or storm-damaged panels without a full replacement."
- 07 "Soffit, Fascia & Trim" — "Soffit and fascia replacement and trim work, usually completed alongside your siding project."

Note: `hubHref` is `/siding` and `hubLabel` is `"Siding"` for all seven.

- [ ] **Step 1: Write `SIDING_REPLACEMENT_SERVICE`**

```ts
export const SIDING_REPLACEMENT_SERVICE: ServiceDetail = {
  slug: "siding-replacement",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Siding Replacement",
  metaTitle: "Siding Replacement in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Full tear-off siding replacement in Bucks County, PA & South Jersey. Vinyl, fiber-cement, and wood options. Full sheathing inspection included. Free estimate.",
  eyebrow: "SIDING · SIDING REPLACEMENT",
  heroDek:
    "A full tear-off replacement of old, worn, or storm-damaged siding down to the sheathing — with a full inspection of what's underneath before anything new goes up.",
  heroImgLabel: "full tear-off siding replacement — in progress",
  heroAlt: "Full tear-off siding replacement in progress on a residential home",
  introParagraphs: [
    "A siding replacement is a full tear-off of your home's existing siding down to the sheathing, followed by inspection and repair of anything found underneath, then installation of a new siding system — vinyl, fiber-cement, insulated, or wood, depending on what you choose.",
    "We do a complete tear-off on every replacement rather than installing new siding over old. This matters because siding failure often hides water damage or rot in the sheathing behind it, and installing over that problem just seals it in rather than fixing it. A tear-off is the only way to actually inspect and address what's there.",
    "We work across Bucks County, Philadelphia, and South Jersey helping homeowners choose the right siding system for their budget, home style, and maintenance preference, then install it as a complete system — not just panels nailed to whatever condition the sheathing happens to be in.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "3–7 days" },
    { label: "Includes", value: "Full sheathing inspection" },
    { label: "Materials", value: "Vinyl, Hardie, wood" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Siding that's cracked, warped, or visibly rotting across large sections",
    "Bubbling, peeling paint, or persistent moisture behind the siding",
    "Rising energy bills that point to failing insulation behind old siding",
    "Siding that's 20+ years old and showing widespread wear",
    "Visible mold, mildew, or soft spots on exterior walls",
    "Wanting to change your home's exterior look entirely",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Estimate",
      desc: "We assess the current siding and give a written, fixed-price quote, usually within 48 hours.",
    },
    {
      num: "02",
      title: "Material Selection",
      desc: "Choose your siding system, color, and profile from vinyl, fiber-cement, insulated, or wood options.",
    },
    {
      num: "03",
      title: "Tear-Off & Sheathing Repair",
      desc: "Complete removal of old siding, with any rot or water damage in the sheathing repaired before continuing.",
    },
    {
      num: "04",
      title: "Install & Walkthrough",
      desc: "New siding system installed to manufacturer spec, then a final walkthrough and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "Vinyl Siding",
      desc: "Budget-friendly, low-maintenance vinyl in a wide range of colors and profiles.",
    },
    {
      title: "James Hardie Fiber-Cement Siding",
      desc: "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems.",
    },
    {
      title: "Insulated Siding",
      desc: "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home.",
    },
  ],
  faqs: [
    {
      q: "Why do a full tear-off instead of installing new siding over the old?",
      a: "Installing over existing siding can trap moisture and hide rot or water damage in the sheathing. A full tear-off lets us inspect and repair the sheathing before anything new goes up, which is the only way to actually catch problems instead of sealing them in.",
    },
    {
      q: "How long does a siding replacement take?",
      a: "Most single-family homes are completed in three to seven days depending on square footage and material, with daily cleanup so the property stays livable throughout the project.",
    },
    {
      q: "Which siding material is the best value?",
      a: "Vinyl offers the lowest upfront cost with minimal maintenance. James Hardie fiber-cement costs more but resists fire, rot, and pests while holding paint longer. We'll walk through the tradeoffs for your specific home and budget.",
    },
    {
      q: "Do you handle insurance claims for storm-damaged siding?",
      a: "Yes — we document storm damage and can work directly with your insurance adjuster on claims involving damaged siding, similar to how we handle roofing storm claims.",
    },
  ],
};
```

- [ ] **Step 2: Write `VINYL_SIDING_SERVICE`**

```ts
export const VINYL_SIDING_SERVICE: ServiceDetail = {
  slug: "vinyl-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Vinyl Siding",
  metaTitle: "Vinyl Siding Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Budget-friendly, low-maintenance vinyl siding installation in Bucks County, PA & South Jersey. Wide range of colors and profiles. Free estimate today.",
  eyebrow: "SIDING · VINYL SIDING",
  heroDek:
    "Budget-friendly, low-maintenance vinyl siding in a wide range of colors and profiles — no painting, no rot, and a straightforward install.",
  heroImgLabel: "vinyl siding — finished install",
  heroAlt: "Finished vinyl siding installation on a residential home",
  introParagraphs: [
    "Vinyl siding remains the most common siding material for good reason — it's the most budget-friendly option, requires essentially no maintenance beyond occasional washing, never needs painting, and won't rot or attract wood-boring insects the way natural wood siding can.",
    "Modern vinyl siding has come a long way from older, thinner profiles — today's products offer thicker panels, more realistic wood-grain texturing, and a wider range of colors, including deeper tones that resist fading better than older vinyl formulations.",
    "We do a full tear-off before installing vinyl, inspecting and repairing the sheathing underneath, and install with proper nailing technique that allows the panels to expand and contract with temperature changes — a detail that affects how well vinyl performs over Pennsylvania and New Jersey's seasonal temperature swings.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "3–5 days" },
    { label: "Maintenance", value: "Minimal — occasional wash" },
    { label: "Cost", value: "Most budget-friendly option" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Wanting the most budget-friendly siding option",
    "Wood siding that needs constant repainting and maintenance",
    "Cracked, faded, or warped existing vinyl siding",
    "Wanting a wide range of color and profile choices",
    "A home that needs siding but has a limited project budget",
    "Preferring an exterior that never needs to be painted",
  ],
  processSteps: [
    {
      num: "01",
      title: "Color & Profile Selection",
      desc: "Choose from a wide range of vinyl colors, textures, and panel profiles.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Check",
      desc: "Full removal of old siding and inspection of the sheathing before installing anything new.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Panels installed with correct nailing technique to allow for proper seasonal expansion and contraction.",
    },
    {
      num: "04",
      title: "Trim & Walkthrough",
      desc: "Corner posts and trim finished out, then a final walkthrough with you.",
    },
  ],
  materials: [
    {
      title: "Double 4 & Double 5 Vinyl Panels",
      desc: "Standard clapboard-style vinyl siding profiles in a range of colors and thicknesses.",
    },
    {
      title: "Wood-Grain Textured Vinyl",
      desc: "Vinyl panels with a deeper wood-grain texture for a more natural look than smooth vinyl.",
    },
    {
      title: "Vinyl Trim & Corner Posts",
      desc: "Matching trim and corner post systems for a clean, finished edge around windows, doors, and corners.",
    },
  ],
  faqs: [
    {
      q: "How long does vinyl siding typically last?",
      a: "Quality vinyl siding, properly installed, typically lasts 20 to 40 years. Lifespan depends on product thickness, sun exposure, and installation quality — improperly nailed vinyl can warp prematurely regardless of product quality.",
    },
    {
      q: "Does vinyl siding fade over time?",
      a: "All vinyl fades somewhat with UV exposure, though darker colors historically fade more than lighter ones. Newer vinyl formulations include better UV-resistant pigments than older products, which we can discuss when selecting color.",
    },
    {
      q: "Can vinyl siding be installed in cold weather?",
      a: "Vinyl becomes more brittle in cold temperatures, so we generally avoid installation below certain temperature thresholds to prevent cracking during handling, and plan installation timing accordingly.",
    },
    {
      q: "Is vinyl siding a good choice for an older or historic home?",
      a: "It can be, especially with wood-grain textured profiles, though some historic districts have specific siding material requirements. We can help you check local guidelines before finalizing material choice.",
    },
  ],
};
```

- [ ] **Step 3: Write `JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE`**

```ts
export const JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE: ServiceDetail = {
  slug: "james-hardie-fiber-cement-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "James Hardie Fiber-Cement Siding",
  metaTitle: "James Hardie Fiber-Cement Siding in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Certified James Hardie fiber-cement siding installation in Bucks County, PA & South Jersey. Fire-, rot- & pest-resistant. Get a free estimate today.",
  eyebrow: "SIDING · JAMES HARDIE FIBER-CEMENT SIDING",
  heroDek:
    "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems — siding built to outlast vinyl by decades.",
  heroImgLabel: "James Hardie fiber-cement siding — finished install",
  heroAlt: "Finished James Hardie fiber-cement siding install in Bucks County, PA",
  introParagraphs: [
    "James Hardie fiber-cement siding is made from cement, sand, and cellulose fiber, engineered to resist the fire, rot, pest, and impact damage that both wood and vinyl siding are more vulnerable to. It holds paint significantly longer than wood, and won't warp, crack, or melt the way vinyl can under extreme heat.",
    "As James Hardie certified installers, we install their ColorPlus finished products and primed products to exact manufacturer specification — correct fastener spacing, proper flashing at joints, and specific gapping requirements that keep the product warranty intact. Hardie's warranty can be reduced or voided by incorrect installation, so certification matters here.",
    "It costs more upfront than vinyl, but for homeowners across Bucks County and South Jersey planning to stay in their home long-term, the combination of durability, curb appeal, and reduced repainting frequency makes it one of the strongest long-term value siding options available.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "5–7 days" },
    { label: "Certification", value: "James Hardie certified" },
    { label: "Resistance", value: "Fire, rot, pests, impact" },
    { label: "Warranty", value: "30-year limited (ColorPlus)" },
  ],
  signsList: [
    "Wanting maximum durability against fire, rot, and pests",
    "Vinyl siding that's cracked, melted, or warped from heat",
    "Wood siding needing frequent repainting and repair",
    "Wanting a premium, higher-end curb appeal upgrade",
    "Living in an area with elevated wildfire or pest concern",
    "Planning to stay in your home long-term and prioritizing durability",
  ],
  processSteps: [
    {
      num: "01",
      title: "Product & Color Selection",
      desc: "Choose between Hardie's ColorPlus pre-finished panels or primed panels for custom paint.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Inspection",
      desc: "Full removal of old siding and inspection of the sheathing before certified installation begins.",
    },
    {
      num: "03",
      title: "Certified Install",
      desc: "Panels installed to James Hardie's exact spec for fastener spacing, flashing, and gapping to keep the warranty valid.",
    },
    {
      num: "04",
      title: "Warranty Registration",
      desc: "Final walkthrough and registration of your James Hardie product warranty.",
    },
  ],
  materials: [
    {
      title: "HardiePlank Lap Siding",
      desc: "James Hardie's most popular product, a traditional lap siding profile available primed or in ColorPlus finishes.",
    },
    {
      title: "HardieShingle Siding",
      desc: "Fiber-cement shingle-style siding for a classic shake look with fiber-cement durability.",
    },
    {
      title: "HardieTrim Boards",
      desc: "Matching fiber-cement trim for a cohesive, durable finish around windows, doors, and corners.",
    },
  ],
  faqs: [
    {
      q: "Why does certification matter for James Hardie installation?",
      a: "James Hardie's extended warranty coverage is contingent on installation following their exact specifications — fastener type and spacing, flashing details, and panel gapping. Improper installation by a non-certified contractor can void or reduce that warranty even if the product itself is defect-free.",
    },
    {
      q: "How does ColorPlus finish compare to painting primed Hardie board?",
      a: "ColorPlus is a factory-applied, baked-on finish that carries its own extended color warranty and generally outlasts field-applied paint. Primed boards let you choose any paint color but will need repainting sooner than ColorPlus finishes.",
    },
    {
      q: "Is fiber-cement siding heavier than vinyl, and does that matter?",
      a: "Yes, fiber-cement is significantly heavier than vinyl, which is part of why it resists wind and impact damage better. It doesn't affect most homes' structural capacity but does require correct fastening technique, which certified installation ensures.",
    },
    {
      q: "How long does James Hardie siding typically last?",
      a: "James Hardie siding is engineered for a long service life, commonly performing well for 30 to 50 years with proper installation and maintenance, backed by a 30-year limited warranty on ColorPlus products.",
    },
  ],
};
```

- [ ] **Step 4: Write `INSULATED_SIDING_SERVICE`**

```ts
export const INSULATED_SIDING_SERVICE: ServiceDetail = {
  slug: "insulated-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Insulated Siding",
  metaTitle: "Insulated Siding Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Insulated siding with rigid foam backing installed in Bucks County, PA & South Jersey. Better energy efficiency, quieter home. Get a free estimate today.",
  eyebrow: "SIDING · INSULATED SIDING",
  heroDek:
    "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home — noticeable comfort gains through PA & NJ winters.",
  heroImgLabel: "insulated siding — panel and foam backing detail",
  heroAlt: "Close-up of insulated siding panel with rigid foam backing",
  introParagraphs: [
    "Insulated siding is a siding panel with a layer of rigid foam permanently laminated to its back, unlike standard siding which is installed with a separate air gap or no insulation at all. That continuous foam layer reduces thermal bridging — the heat loss that happens through wall studs even in a well-insulated home.",
    "For homeowners across Bucks County and South Jersey, this typically translates to a noticeable comfort difference in rooms with exterior walls, especially during winter, along with some reduction in heating and cooling costs. It also adds a modest amount of sound dampening, which matters on homes near busier roads.",
    "We install insulated vinyl and insulated composite systems as either a full replacement or as an upgrade during a standard siding replacement, sized and installed to maintain proper wall assembly moisture management alongside the added insulation value.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "3–5 days" },
    { label: "Benefit", value: "Reduced thermal bridging" },
    { label: "Bonus", value: "Some sound dampening" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Rooms near exterior walls that feel drafty or cold in winter",
    "Rising heating or cooling bills you'd like to address",
    "Wanting some sound dampening from a nearby road",
    "Planning a siding replacement and want to add insulation value",
    "An older home with minimal existing wall insulation",
    "Wanting a straighter, more even wall appearance vinyl backing can help provide",
  ],
  processSteps: [
    {
      num: "01",
      title: "Assessment & Selection",
      desc: "We review your home's current insulation and wall assembly to confirm insulated siding is a good fit.",
    },
    {
      num: "02",
      title: "Tear-Off & Prep",
      desc: "Full removal of old siding and sheathing inspection before installing the insulated system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Insulated panels installed with correct fastening to maintain the wall assembly's moisture management.",
    },
    {
      num: "04",
      title: "Trim & Walkthrough",
      desc: "Trim finished out, then a final walkthrough covering care and warranty details.",
    },
  ],
  materials: [
    {
      title: "Insulated Vinyl Siding",
      desc: "Vinyl panels with laminated rigid foam backing, combining vinyl's low maintenance with added thermal performance.",
    },
    {
      title: "Rigid Foam Insulation",
      desc: "Continuous foam backing that reduces thermal bridging at wall studs compared to standard siding installation.",
    },
    {
      title: "Moisture Management Wrap",
      desc: "Proper house wrap detailing to maintain correct wall assembly moisture control alongside the added insulation.",
    },
  ],
  faqs: [
    {
      q: "How much will insulated siding actually reduce my energy bills?",
      a: "The reduction varies by home, existing insulation levels, and climate, but most homeowners notice improved comfort more distinctly than a dramatic bill reduction. It's a meaningful upgrade, not a replacement for proper attic and wall insulation.",
    },
    {
      q: "Is insulated siding more expensive than standard siding?",
      a: "Yes, insulated siding typically costs more than standard siding of the same style due to the added foam backing material and manufacturing process. We'll price both so you can weigh the upfront cost against long-term comfort and efficiency gains.",
    },
    {
      q: "Does insulated siding require different installation than regular siding?",
      a: "Yes — proper installation needs to maintain the wall assembly's moisture management despite the added foam layer, which is a detail that matters for long-term performance and is part of why professional installation is worth it here specifically.",
    },
    {
      q: "Can insulated siding be installed over my home's existing insulation?",
      a: "It adds to your home's existing wall insulation rather than replacing it — it doesn't require removing insulation inside the wall cavity, just proper installation of the new exterior siding system.",
    },
  ],
};
```

- [ ] **Step 5: Write `WOOD_CEDAR_SHAKE_SIDING_SERVICE`**

```ts
export const WOOD_CEDAR_SHAKE_SIDING_SERVICE: ServiceDetail = {
  slug: "wood-cedar-shake-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Wood & Cedar Shake Siding",
  metaTitle: "Wood & Cedar Shake Siding in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Classic wood & cedar shake siding installation in Bucks County, PA & South Jersey. Historic-style finishes, installed to last. Get a free estimate today.",
  eyebrow: "SIDING · WOOD & CEDAR SHAKE SIDING",
  heroDek:
    "Classic and historic-style wood and cedar shake siding, installed and finished to last outdoors — the look many older Bucks County homes were built with.",
  heroImgLabel: "cedar shake siding — historic-style finish",
  heroAlt: "Cedar shake siding installed in a historic-style finish",
  introParagraphs: [
    "Wood and cedar shake siding gives a home a natural, textured look that vinyl and fiber-cement products can approximate but not fully replicate — which matters a lot on historic homes in Bucks County and older neighborhoods where matching the original material is often a priority, sometimes a requirement.",
    "Cedar shake in particular is naturally resistant to rot and insects due to the wood's natural oils, and weathers to an attractive silver-gray patina if left unfinished, or holds a stain well if a specific color is preferred. Traditional lap wood siding offers a similar natural look in a more classic clapboard profile.",
    "Wood siding requires more ongoing maintenance than vinyl or fiber-cement — periodic staining or sealing, and closer attention to moisture at joints and corners — but for homeowners restoring a historic property or specifically wanting that natural material, it remains the right choice.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "5–7 days" },
    { label: "Best for", value: "Historic & classic-style homes" },
    { label: "Maintenance", value: "Periodic stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Restoring or maintaining a historic-style home",
    "Wanting cedar shake's natural rot and insect resistance",
    "A township or HOA requiring a specific historic siding material",
    "Existing wood siding that's aged but you want to keep the material",
    "Wanting a natural, textured look vinyl can't fully replicate",
    "Replacing damaged sections of existing cedar shake",
  ],
  processSteps: [
    {
      num: "01",
      title: "Style & Finish Selection",
      desc: "Choose between traditional lap wood siding and cedar shake, plus stain or natural weathering preference.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Check",
      desc: "Full removal of old siding and inspection of sheathing before installing the new wood system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Panels or shakes installed with proper overlap and fastening for long-term weather resistance.",
    },
    {
      num: "04",
      title: "Finishing",
      desc: "Stain or sealer applied as chosen, or left to weather naturally for cedar shake's signature patina.",
    },
  ],
  materials: [
    {
      title: "Cedar Shake Shingles",
      desc: "Naturally rot- and insect-resistant cedar shakes, ideal for historic-style and classic New England-look homes.",
    },
    {
      title: "Traditional Lap Wood Siding",
      desc: "Classic clapboard-profile wood siding in a range of species and widths.",
    },
    {
      title: "Exterior Stains & Sealers",
      desc: "Weather-rated stains and sealers to protect wood siding through Pennsylvania and New Jersey seasons.",
    },
  ],
  faqs: [
    {
      q: "Does cedar shake need to be stained, or can it weather naturally?",
      a: "Both are valid — unstained cedar shake weathers to an attractive silver-gray patina over time, while staining preserves a specific color longer. We can install for either approach depending on your preference.",
    },
    {
      q: "Is wood siding required for historic homes in Bucks County?",
      a: "Requirements vary by township and whether a home is in a designated historic district. Some districts do mandate specific materials for street-facing elevations. We can help you check local requirements before finalizing material choice.",
    },
    {
      q: "How often does wood siding need to be restained?",
      a: "Most exterior wood siding needs restaining every 3 to 5 years depending on sun exposure and finish type, with closer attention needed at joints and corners where moisture exposure is highest.",
    },
    {
      q: "How does cedar shake siding compare in cost to vinyl or fiber-cement?",
      a: "Cedar shake typically costs more than vinyl and can be comparable to or more than premium fiber-cement, reflecting both material cost and more labor-intensive installation. We'll price it directly against other options for your project.",
    },
  ],
};
```

- [ ] **Step 6: Write `SIDING_REPAIR_SERVICE`**

```ts
export const SIDING_REPAIR_SERVICE: ServiceDetail = {
  slug: "siding-repair",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Siding Repair",
  metaTitle: "Siding Repair in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Fast siding repair for cracked, loose & storm-damaged panels in Bucks County, PA & South Jersey. No full replacement needed. Get a free estimate today.",
  eyebrow: "SIDING · SIDING REPAIR",
  heroDek:
    "Targeted repair of cracked, loose, or storm-damaged panels — without a full replacement, when the rest of your siding is still doing its job.",
  heroImgLabel: "storm-damaged siding repair — panel replacement",
  heroAlt: "Repair of storm-damaged siding panels on a home exterior",
  introParagraphs: [
    "Siding repair addresses specific damage — a section cracked by hail, panels loosened by wind, a spot damaged by a falling branch — without requiring a full replacement of siding that's otherwise still performing well.",
    "Most repair calls we get across Bucks County and South Jersey are storm-related: high wind loosening or tearing off panels, or hail cracking and denting vinyl and aluminum siding. We match replacement panels to your existing siding as closely as possible, though some color variation is normal on older siding due to sun fading.",
    "If a repair inspection reveals damage more extensive than what's visible — water intrusion behind the siding, widespread cracking across multiple elevations — we'll tell you directly and explain whether a full replacement makes more sense than continuing to patch sections.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "Same day–1 day" },
    { label: "Response time", value: "Often within 48 hrs" },
    { label: "Scope", value: "Written before work starts" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Cracked or dented siding panels after a hail event",
    "Panels loosened, bent, or torn off after high wind",
    "A section of siding damaged by a falling branch or debris",
    "Gaps or loose seams letting water behind the siding",
    "Isolated rot or damage on an otherwise sound siding system",
    "Damage discovered during a home inspection or insurance review",
  ],
  processSteps: [
    {
      num: "01",
      title: "Damage Assessment",
      desc: "We inspect the damaged area and check for hidden water intrusion behind the visible damage.",
    },
    {
      num: "02",
      title: "Written Scope & Price",
      desc: "A fixed price for the specific repair needed, before any work begins.",
    },
    {
      num: "03",
      title: "Repair",
      desc: "Damaged panels replaced and matched to existing siding as closely as possible.",
    },
    {
      num: "04",
      title: "Final Check",
      desc: "We confirm the repair is properly sealed and weathertight before calling the job complete.",
    },
  ],
  materials: [
    {
      title: "Matched Panel Replacement",
      desc: "We source replacement vinyl, fiber-cement, or wood panels matched as closely as possible to your existing siding.",
    },
    {
      title: "Flashing & Sealant",
      desc: "Proper flashing and sealant at repaired joints to keep water out of the wall assembly.",
    },
    {
      title: "Fastener Hardware",
      desc: "Correct fastener type and spacing for the repaired section to hold up under wind load.",
    },
  ],
  faqs: [
    {
      q: "Can you match the repair to my existing siding color exactly?",
      a: "We source the closest available match, but some color variation is normal since siding fades with sun exposure over time — a repaired section on older siding may be slightly more vibrant than the surrounding weathered panels.",
    },
    {
      q: "How do I know if I need a repair or a full replacement?",
      a: "If damage is contained to a specific area and the rest of your siding is in good condition, repair is the right call. If we find widespread wear or hidden water damage during inspection, we'll recommend replacement and explain exactly why.",
    },
    {
      q: "Do you work with insurance on storm-damaged siding claims?",
      a: "Yes — we document storm damage and can work directly with your insurance adjuster on siding claims, similar to how we handle roofing storm damage claims.",
    },
    {
      q: "How fast can you repair storm-damaged siding?",
      a: "We prioritize storm damage and can usually get a crew out within 48 hours across Bucks County and South Jersey, sooner after major storm events permitting.",
    },
  ],
};
```

- [ ] **Step 7: Write `SOFFIT_FASCIA_TRIM_SERVICE`**

```ts
export const SOFFIT_FASCIA_TRIM_SERVICE: ServiceDetail = {
  slug: "soffit-fascia-trim",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Soffit, Fascia & Trim",
  metaTitle: "Soffit, Fascia & Trim Installation in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Soffit, fascia & trim replacement in Bucks County, PA & South Jersey, alongside your siding project or as a standalone job. Get a free estimate today.",
  eyebrow: "SIDING · SOFFIT, FASCIA & TRIM",
  heroDek:
    "Soffit and fascia replacement and trim work, usually completed alongside your siding project — the finishing details that keep water and pests out of the roofline.",
  heroImgLabel: "soffit and fascia — finished install",
  heroAlt: "Freshly installed soffit and fascia along a home's roofline",
  introParagraphs: [
    "Soffit and fascia are the finishing pieces at your roofline — soffit covers the underside of the roof overhang and provides attic ventilation, while fascia is the vertical trim board that gutters attach to and that caps the roof edge. Both take direct weather exposure and are common points of rot and pest entry when damaged.",
    "We replace soffit and fascia most often as part of a siding project, since they're visually and functionally connected to the rest of the exterior, but it's also a common standalone repair when damage or wear is isolated to the roofline rather than the wall siding itself.",
    "Proper soffit ventilation actually matters beyond curb appeal — it's part of how your attic breathes, which affects moisture control and can extend your roof's lifespan by preventing trapped heat and humidity. We install vented soffit designed to work with your home's existing attic ventilation system.",
  ],
  quickFacts: [
    { label: "Typical timeline", value: "1–2 days" },
    { label: "Often paired with", value: "Siding or roofing projects" },
    { label: "Function", value: "Attic ventilation + trim" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Rotted, sagging, or missing sections of soffit or fascia",
    "Visible daylight or gaps at the roofline from inside the attic",
    "Pests or birds entering through damaged soffit",
    "Gutters pulling away due to failing fascia board",
    "Peeling paint or water staining along the roof edge",
    "Planning a siding or roofing project and want to finish the roofline too",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection",
      desc: "We check soffit, fascia, and attic ventilation together, since they function as one system.",
    },
    {
      num: "02",
      title: "Material Selection",
      desc: "Choose vinyl, aluminum, or wood trim to match your siding and gutter system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Damaged soffit and fascia removed and replaced, maintaining or improving attic ventilation.",
    },
    {
      num: "04",
      title: "Gutter Reattachment",
      desc: "Gutters reattached to new fascia, then a final walkthrough of the completed roofline.",
    },
  ],
  materials: [
    {
      title: "Vented Vinyl Soffit",
      desc: "Low-maintenance vented soffit panels that support proper attic airflow.",
    },
    {
      title: "Aluminum Fascia Wrap",
      desc: "Durable aluminum fascia covering, resistant to the rot that affects exposed wood trim.",
    },
    {
      title: "Matching Trim Systems",
      desc: "Trim coordinated with your siding and gutter color for a cohesive finished roofline.",
    },
  ],
  faqs: [
    {
      q: "Do I need to replace soffit and fascia at the same time as my siding?",
      a: "It's not required, but since they're visually connected and often show wear at similar ages, many homeowners choose to do both together. We can also handle soffit and fascia as a completely standalone project.",
    },
    {
      q: "Why does soffit ventilation matter?",
      a: "Vented soffit is part of your attic's intake airflow system, working with ridge or gable vents to move air through the attic space. Proper ventilation helps prevent trapped heat and moisture, which can shorten roof lifespan and contribute to ice damming in winter.",
    },
    {
      q: "What causes fascia to rot?",
      a: "Fascia takes direct water exposure from the roof edge and is where gutters attach, so any gutter overflow or leak accelerates rot. Aluminum fascia wrap eliminates this vulnerability compared to exposed painted wood.",
    },
    {
      q: "Can you repair just a small damaged section of soffit or fascia?",
      a: "Yes, this is a common standalone repair. We can address a specific damaged section without requiring a full roofline replacement, provided the surrounding material is still in good condition.",
    },
  ],
};
```

- [ ] **Step 8: Fill in the siding route file's `SERVICES` array**

In `src/app/siding/[service]/page.tsx`, replace the imports and `SERVICES` array:

```tsx
import {
  SIDING_REPLACEMENT_SERVICE,
  VINYL_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  INSULATED_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  SIDING_REPAIR_SERVICE,
  SOFFIT_FASCIA_TRIM_SERVICE,
  SIDING_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
```

```tsx
const SERVICES = [
  SIDING_REPLACEMENT_SERVICE,
  VINYL_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  INSULATED_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  SIDING_REPAIR_SERVICE,
  SOFFIT_FASCIA_TRIM_SERVICE,
];
```

- [ ] **Step 9: Build and verify**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build, 7 static siding service pages generated. Total across all three hubs should now be 21 static service detail pages.

- [ ] **Step 10: Commit**

```bash
git add src/lib/constants.ts src/app/siding/[service]/page.tsx
git commit -m "content: add detail pages for all 7 siding services"
```

---

### Task 5: Wire hub page "Learn more" links to the new detail pages

**Files:**
- Modify: `src/lib/hubConfigs.tsx:119-125` (roofing `hrefFor`)
- Modify: `src/lib/hubConfigs.tsx:174-179` (siding `hrefFor`)
- Modify: `src/lib/hubConfigs.tsx:230-235` (decks `hrefFor`)

**Interfaces:**
- Consumes: `SubService` type (existing), the `slug` values chosen in Tasks 2–4 (must match exactly — see slug list below).
- Produces: updated `hrefFor` functions in all three `HubPageConfig` objects that map every sub-service to its real detail page instead of falling back to `#estimate`.

Slug reference (num → slug, per hub):

Roofing: 01 `roof-replacement`, 02 `roof-repair`, 03 `asphalt-shingle-roofing`, 04 `metal-roofing`, 05 `flat-low-slope-roofing`, 06 `roof-inspections-storm-damage`, 07 `gutters-gutter-guards`.

Decks: 01 `custom-deck-construction`, 02 `deck-restoration-refinishing`, 03 `composite-decking`, 04 `wood-decking`, 05 `railings-guardrails`, 06 `fencing`, 07 `deck-repair-structural-reinforcement`.

Siding: 01 `siding-replacement`, 02 `vinyl-siding`, 03 `james-hardie-fiber-cement-siding`, 04 `insulated-siding`, 05 `wood-cedar-shake-siding`, 06 `siding-repair`, 07 `soffit-fascia-trim`.

- [ ] **Step 1: Update roofing `hrefFor`**

In `src/lib/hubConfigs.tsx`, replace:

```tsx
  subServices: {
    eyebrow: "ROOFING SERVICES",
    heading: "Every roofing job we take on, done by one crew.",
    items: ROOFING_SUB_SERVICES,
    hrefFor: (sub) =>
      sub.num === "01" ? "/roofing/roof-replacement" : "/roofing#estimate",
  },
```

with:

```tsx
  subServices: {
    eyebrow: "ROOFING SERVICES",
    heading: "Every roofing job we take on, done by one crew.",
    items: ROOFING_SUB_SERVICES,
    hrefFor: (sub) => `/roofing/${ROOFING_SERVICE_SLUGS[sub.num]}`,
  },
```

Add this lookup table near the top of the file, right after the `HubHeaderFooterVariant` type export (after line 32):

```tsx
const ROOFING_SERVICE_SLUGS: Record<string, string> = {
  "01": "roof-replacement",
  "02": "roof-repair",
  "03": "asphalt-shingle-roofing",
  "04": "metal-roofing",
  "05": "flat-low-slope-roofing",
  "06": "roof-inspections-storm-damage",
  "07": "gutters-gutter-guards",
};

const DECKS_SERVICE_SLUGS: Record<string, string> = {
  "01": "custom-deck-construction",
  "02": "deck-restoration-refinishing",
  "03": "composite-decking",
  "04": "wood-decking",
  "05": "railings-guardrails",
  "06": "fencing",
  "07": "deck-repair-structural-reinforcement",
};

const SIDING_SERVICE_SLUGS: Record<string, string> = {
  "01": "siding-replacement",
  "02": "vinyl-siding",
  "03": "james-hardie-fiber-cement-siding",
  "04": "insulated-siding",
  "05": "wood-cedar-shake-siding",
  "06": "siding-repair",
  "07": "soffit-fascia-trim",
};
```

- [ ] **Step 2: Update siding `hrefFor`**

Replace:

```tsx
  subServices: {
    eyebrow: "SIDING SERVICES",
    heading: "Every siding job we take on, done by one crew.",
    items: SIDING_SUB_SERVICES,
    hrefFor: () => "/siding#estimate",
  },
```

with:

```tsx
  subServices: {
    eyebrow: "SIDING SERVICES",
    heading: "Every siding job we take on, done by one crew.",
    items: SIDING_SUB_SERVICES,
    hrefFor: (sub) => `/siding/${SIDING_SERVICE_SLUGS[sub.num]}`,
  },
```

- [ ] **Step 3: Update decks `hrefFor`**

Replace:

```tsx
  subServices: {
    eyebrow: "DECK SERVICES",
    heading: "Every deck and fence job we take on, done by one crew.",
    items: DECKS_SUB_SERVICES,
    hrefFor: () => "/decks#estimate",
  },
```

with:

```tsx
  subServices: {
    eyebrow: "DECK SERVICES",
    heading: "Every deck and fence job we take on, done by one crew.",
    items: DECKS_SUB_SERVICES,
    hrefFor: (sub) => `/decks/${DECKS_SERVICE_SLUGS[sub.num]}`,
  },
```

- [ ] **Step 4: Build and verify**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build. All 21 service detail pages listed as static routes under `/roofing/[service]`, `/decks/[service]`, `/siding/[service]`.

- [ ] **Step 5: Spot-check the sub-service grids' hrefFor output**

Read `src/components/hub/HubPage.tsx` around the SUB-SERVICES section (`config.subServices.items.map(...)`, `config.subServices.hrefFor(sub)`) to confirm the `<Link>` there uses `hrefFor` correctly (it already does per prior work — this step is a re-verification, not a code change). Confirm no other file calls `hrefFor` with an assumption about the old `#estimate`-only behavior — grep for `hrefFor` usage:

Run: `cd "c:/main/Projects/TopLineExteriors" && grep -rn "hrefFor" src/`
Expected: only the three definitions in `hubConfigs.tsx` and the one call site in `HubPage.tsx`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/hubConfigs.tsx
git commit -m "feat: wire hub sub-service links to their real detail pages"
```

---

### Task 6: Full-site final verification

**Files:** none modified — verification only.

- [ ] **Step 1: Full production build**

Run: `cd "c:/main/Projects/TopLineExteriors" && npm run build`
Expected: clean build. Confirm the route summary lists 21 total service detail pages (7 roofing + 7 decks + 7 siding) plus the existing static/SSG pages, with no route conflicts or duplicate slugs.

- [ ] **Step 2: Grep for leftover placeholder or hardcoded hub references**

Run: `cd "c:/main/Projects/TopLineExteriors" && grep -n "roofing" src/components/service-detail/ServiceDetailPage.tsx`
Expected: no hardcoded "roofing" string remains in the shared component — everything should route through `hubVariant` / `service.hubLabel` / `service.hubHref`. If any hardcoded reference is found, fix it and rebuild.

- [ ] **Step 3: Confirm every ServiceDetail slug is unique within its hub**

Run: `cd "c:/main/Projects/TopLineExteriors" && grep -n "slug:" src/lib/constants.ts | grep -A0 -E "roof-|deck-|siding-|vinyl-|james-hardie|composite-|wood-|railings-|fencing|custom-deck|insulated-|cedar|soffit|metal-|flat-low|gutters-|asphalt-"`
Expected: 21 distinct slug lines, no duplicates within the same hub (duplicates across hubs are fine since routes are hub-scoped).

- [ ] **Step 4: Final commit if any fixes were made in this task**

```bash
git add -A
git commit -m "fix: cleanup after full service pages rollout verification"
```

(Skip this commit if Steps 1–3 found nothing to fix.)
