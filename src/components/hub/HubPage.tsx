import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhyCard } from "@/components/ui/WhyCard";
import { StatBlock } from "@/components/ui/StatBlock";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { Reveal } from "@/components/ui/Reveal";
import type { HubPageConfig } from "@/lib/hubConfigs";
import { PROCESS_STEPS } from "@/lib/hubConfigs";
import {
  CITIES,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  PROJECT_CASE_STUDIES,
  SITE_URL,
} from "@/lib/constants";
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
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] 2xl:text-[52px]">
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
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line">
                <Image
                  src={config.hero.heroImgSrc}
                  alt={config.hero.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 flex items-center gap-3.5 rounded-card border border-line bg-white px-[22px] py-[18px] text-text shadow-card">
                <div className="font-head text-[28px] font-bold text-accent">
                  4.9★
                </div>
                <div className="font-body text-[13px] font-medium leading-[1.3] text-muted">
                  Rated on
                  <br />
                  Google
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WHY */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="why-heading">
          <div className="bg-alt rounded-[28px]">
          <Container className="py-14 2xl:py-24">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[640px] text-center">
                <p className="mb-2.5 font-body text-xs font-bold tracking-[.14em] text-accent">
                  {config.why.eyebrow}
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[21px] font-bold leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
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
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-paper" aria-labelledby="gallery-heading">
          <Container className="pt-12 pb-14 2xl:pt-20 2xl:pb-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                {config.gallery.eyebrow ?? "RECENT WORK"}
              </p>
              <h2
                id="gallery-heading"
                className="max-w-[680px] font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
              >
                {config.gallery.heading}
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal
              stagger
              className={cn(
                "grid grid-cols-1 gap-6",
                config.gallery.layout === "featured"
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {config.gallery.images
                .slice(0, config.gallery.layout === "featured" ? 2 : 6)
                .map((image) => {
                  const title = image.label.split("—")[0].trim();
                  const project = PROJECT_CASE_STUDIES.find(
                    (p) => p.photos[0]?.src === image.src
                  );
                  const cardClassName = cn(
                    "group relative overflow-hidden rounded-card border border-line shadow-card transition-shadow duration-300 ease-out hover:shadow-home-card",
                    config.gallery.layout === "featured"
                      ? "aspect-[4/5] sm:aspect-[4/4.5]"
                      : "aspect-[5/6] sm:aspect-[4/5] lg:aspect-[4/4.5]"
                  );
                  const cardContent = (
                    <>
                      {image.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={
                            config.gallery.layout === "featured"
                              ? "(min-width: 640px) 50vw, 100vw"
                              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          }
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        />
                      ) : (
                        <PlaceholderImage
                          label={image.label}
                          alt={image.alt}
                          aspect="aspect-[4/3]"
                          rounded={false}
                          bordered={false}
                          className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        />
                      )}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-graphite-950/5 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <span
                          aria-hidden="true"
                          className="mb-3 block h-[3px] w-9 rounded-full bg-brand-500"
                        />
                        <p className="font-head text-lg font-bold uppercase leading-[1.2] text-white sm:text-xl">
                          {title}
                        </p>
                        <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[.08em] text-white/70">
                          View project
                        </p>
                      </div>
                    </>
                  );

                  return project ? (
                    <Link
                      key={image.label}
                      href={`/projects/${project.slug}`}
                      aria-label={`View project: ${title}`}
                      className={cardClassName}
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={image.label} className={cardClassName}>
                      {cardContent}
                    </div>
                  );
                })}
            </Reveal>
            <Reveal className="mt-11 flex justify-center">
              <Button href={`/${config.slug}#estimate`} variant="primary">
                See Your Project Here — Get an Estimate
              </Button>
            </Reveal>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="process-heading">
          <div className="bg-alt rounded-[28px]">
          <Container className="pt-12 pb-10 2xl:pt-[88px]">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                HOW IT WORKS
              </p>
              <h2
                id="process-heading"
                className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
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
          </div>
        </section>

        {/* SUB-SERVICES */}
        <section
          id="subservices"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="subservices-heading"
        >
          <Container className="pt-12 pb-14 2xl:pt-20 2xl:pb-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                {config.subServices.eyebrow}
              </p>
              <h2
                id="subservices-heading"
                className="max-w-[680px] font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
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
            <Reveal className="mt-11 flex flex-wrap items-center justify-center gap-3.5 text-center">
              <Button href={`/${config.slug}#estimate`} variant="primary">
                {config.hero.primaryCtaLabel}
              </Button>
              <a
                href={`tel:${PHONE_DIGITS}`}
                className="btn-shine inline-flex items-center justify-center whitespace-nowrap rounded-pill border border-line bg-transparent px-7 py-4 font-body text-[15px] font-bold text-text no-underline transition-[filter] duration-200 ease-out motion-safe:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Call {PHONE_DISPLAY}
              </a>
            </Reveal>
          </Container>
        </section>

        {/* SERVICE AREA */}
        <section className="bg-paper" aria-labelledby="service-area-heading">
          <Container className="py-14 2xl:py-24">
            <Reveal className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-14">
            <div className="order-1 md:col-start-1 md:row-start-1">
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                SERVICE AREA
              </p>
              <h2
                id="service-area-heading"
                className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
              >
                Proudly serving Bucks County &amp; the greater region.
              </h2>
              <span className="section-heading-rule mb-5" aria-hidden="true" />
              <p className="mb-6 max-w-[440px] font-body text-[15px] leading-[1.7] text-muted">
                From Levittown out through Bucks County, into Philadelphia,
                and across the river into South Jersey — if it&rsquo;s on
                this list, we&rsquo;re already working nearby.
              </p>
            </div>
            <div className="order-3 md:col-start-1 md:row-start-2">
              <ul className="mb-8 flex flex-wrap gap-2.5 p-0">
                {CITIES.map((city) => (
                  <li
                    key={city}
                    className="rounded-pill border border-line px-4 py-2 font-body text-[13px] font-semibold text-text"
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <Button href={`/${config.slug}#estimate`} variant="primary">
                Check If We Serve Your Area
              </Button>
            </div>
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-card border border-line md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:aspect-auto md:h-[600px]">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1hn3phBKJz6D3u_o7lwTPpIFiSK75L30&ehbc=2E312F&z=9"
                title="TopLine Exteriors service area map"
                loading="lazy"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 border-0 md:hidden"
              />
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1hn3phBKJz6D3u_o7lwTPpIFiSK75L30&ehbc=2E312F"
                title="TopLine Exteriors service area map"
                loading="lazy"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 border-0 md:block"
              />
            </div>
            </Reveal>
          </Container>
        </section>

        {/* REVIEWS */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="reviews-heading">
          <div className="bg-alt overflow-hidden rounded-[28px]">
          <Container className="py-14 2xl:py-24">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                WHAT HOMEOWNERS SAY
              </p>
              <h2
                id="reviews-heading"
                className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
              >
                {config.reviews.heading}
              </h2>
              <span className="section-heading-rule mb-11" aria-hidden="true" />
              <ReviewCarousel
                reviews={config.reviews.items}
                mode="paginate"
                cardSize="lg"
              />
              <div className="mt-11 flex justify-center">
                <Button href={`/${config.slug}#estimate`} variant="primary">
                  {config.hero.primaryCtaLabel}
                </Button>
              </div>
            </Reveal>
          </Container>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper" aria-labelledby="faq-heading">
          <Container className="py-14 2xl:py-24">
            <Reveal>
            <div className="text-center">
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              {config.faqs.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
            >
              Questions we hear most.
            </h2>
            <span className="section-heading-rule is-centered mb-11" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col items-start gap-6 rounded-card border border-line p-8">
              <div>
                <h3 className="mb-2 font-head text-2xl font-bold text-text">
                  Still have questions? We&rsquo;re here to help.
                </h3>
                <p className="font-body text-sm leading-[1.6] text-muted">
                  Call us directly or request a free estimate — we&rsquo;ll walk you through it.
                </p>
              </div>
              <div className="flex flex-col gap-3.5 self-stretch">
                <Button href={`/${config.slug}#estimate`} variant="primary">
                  {config.hero.primaryCtaLabel}
                </Button>
                <a
                  href={`tel:${PHONE_DIGITS}`}
                  className="btn-shine inline-flex items-center justify-center whitespace-nowrap rounded-pill border border-line bg-transparent px-7 py-4 font-body text-[15px] font-bold text-text no-underline transition-[filter] duration-200 ease-out motion-safe:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div>
              <FaqAccordion faqs={config.faqs.items} columns={1} />
            </div>
            </div>
            </Reveal>
          </Container>
        </section>

        {/* ESTIMATE FORM */}
        <section
          id="estimate"
          className="scroll-mt-20 bg-graphite-900"
          aria-labelledby="estimate-heading"
        >
          <Container className="py-14 2xl:py-24">
            <Reveal className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_1.3fr]">
              <div className="flex flex-col items-start gap-6 rounded-card border border-white/10 bg-white/5 p-8">
                <div>
                  <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-brand-400">
                    GET STARTED
                  </p>
                  <h2
                    id="estimate-heading"
                    className="mb-2 font-head text-[21px] font-bold uppercase leading-[1.12] text-white 2xl:text-[32px]"
                  >
                    {config.estimate.heading}
                  </h2>
                  <p className="font-body text-sm leading-[1.6] text-graphite-100">
                    Tell us about your project and we&rsquo;ll follow up with
                    a written quote.
                  </p>
                </div>
                <div className="flex flex-col gap-3.5 self-stretch">
                  <a
                    href={`tel:${PHONE_DIGITS}`}
                    className="btn-shine inline-flex items-center justify-center whitespace-nowrap rounded-pill border border-white/30 bg-transparent px-7 py-4 font-body text-[15px] font-bold text-white no-underline transition-[filter] duration-200 ease-out motion-safe:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
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
