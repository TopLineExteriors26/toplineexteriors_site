import Link from "next/link";
import { cn } from "@/lib/cn";
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
        <section className="bg-alt" aria-labelledby="why-heading">
          <Container className="py-24">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[640px] text-center">
                <p className="mb-2.5 font-body text-xs font-bold tracking-[.14em] text-accent">
                  {config.why.eyebrow}
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[32px] font-bold leading-[1.3] text-text bg-alt-heading"
                >
                  {config.why.heading}
                </h2>
                <span className="section-heading-rule is-centered" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.why.items.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </Reveal>
          </Container>
        </section>

        {/* SUB-SERVICES */}
        <section
          id="subservices"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="subservices-heading"
        >
          <Container className="pt-20 pb-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                {config.subServices.eyebrow}
              </p>
              <h2
                id="subservices-heading"
                className="max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
              >
                {config.subServices.heading}
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="flex flex-col overflow-hidden rounded-card border border-line bg-paper">
              {config.subServices.items.map((sub, i) => (
                <Link
                  key={sub.title}
                  href={config.subServices.hrefFor(sub)}
                  className={cn(
                    "flex flex-col gap-4 p-6 no-underline transition-colors duration-150 ease-out hover:bg-paper-2 sm:flex-row sm:items-center sm:gap-6 sm:p-7",
                    i > 0 && "border-t border-line"
                  )}
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
                  <span className="whitespace-nowrap font-body text-[13px] font-bold text-accent">
                    Learn more →
                  </span>
                </Link>
              ))}
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
                className="max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
              >
                {config.gallery.heading}
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
              <GalleryCarousel images={config.gallery.images} />
            </Reveal>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-alt" aria-labelledby="process-heading">
          <Container className="pt-[88px] pb-10">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                HOW IT WORKS
              </p>
              <h2
                id="process-heading"
                className="font-head text-[32px] font-bold uppercase text-text bg-alt-heading"
              >
                From estimate to warranty, in four steps.
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step) => (
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
            <Reveal stagger className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 text-center lg:grid-cols-4">
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
                className="font-head text-[32px] font-bold uppercase text-text"
              >
                {config.reviews.heading}
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
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
                className="text-center font-head text-[32px] font-bold uppercase text-text bg-alt-heading"
              >
                Questions we hear most.
              </h2>
              <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
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
                className="text-center font-head text-[32px] font-bold uppercase text-text"
              >
                {config.estimate.heading}
              </h2>
              <span className="section-heading-rule is-centered mb-8" aria-hidden="true" />
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
