import type { Metadata } from "next";
import Image from "next/image";
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
import { EstimateForm } from "@/components/ui/EstimateForm";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import {
  CITIES,
  HOME_FAQS,
  HOME_REVIEWS,
  HOME_STATS,
  HOME_WHY_ITEMS,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  SITE_URL,
} from "@/lib/constants";
import { faqPageSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "TopLine Exteriors | Roofing, Decks & Siding in Bucks County, PA & South Jersey",
  description:
    "Licensed & insured roofing, deck, and siding contractor with 5+ years serving Bucks County, PA, Philadelphia, and South Jersey. Get a free estimate today.",
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
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-graphite-900">
          <Image
            src="/main_hero.webp"
            alt="Finished roof and home exterior in Bucks County, PA"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full min-h-[560px] object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-graphite-950/90 via-graphite-950/70 to-graphite-950/25"
          />

          <Container className="relative flex min-h-[560px] flex-col justify-center gap-14 pb-20 pt-[152px] md:pb-28 md:pt-[188px]">
            <div className="max-w-[620px]">
              <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.12em] text-brand-400">
                BUCKS COUNTY, PA · SOUTH JERSEY · GREATER PHILADELPHIA
              </p>
              <h1 className="mb-[22px] font-head text-[32px] font-bold leading-[1.12] tracking-[.005em] text-white sm:text-[40px] 2xl:text-[52px]">
                Roofing, Decks &amp; Siding trusted by homeowners across Bucks
                County.
              </h1>
              <p className="mb-[34px] max-w-[500px] font-body text-lg leading-[1.6] text-graphite-100">
                Licensed, insured, and on the job year-round. Roof
                replacements, custom decks, and siding installed by our own
                crews — no subcontractors, no surprises on the invoice.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex flex-wrap gap-3.5">
                  <Button href="/#estimate" variant="primary">
                    Get a Free Roof Estimate
                  </Button>
                  <Button
                    href="/#projects"
                    variant="secondary"
                    className="border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                  >
                    View Our Work
                  </Button>
                </div>
                <div className="flex items-center gap-2.5 font-body text-sm font-semibold text-white">
                  <span className="font-head text-lg font-bold text-brand-400">
                    4.9★
                  </span>
                  Rated on Google
                </div>
              </div>
            </div>
          </Container>
      </section>
      <main className="flex-1">
        {/* SERVICES */}
        <section
          id="services"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="services-heading"
        >
          <Container className="pt-12 pb-14 2xl:pt-20 2xl:pb-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              OUR SERVICES
            </p>
            <h2
              id="services-heading"
              className="max-w-[640px] font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
            >
              Three trades. One crew you can trust with all of them.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex flex-col overflow-hidden rounded-card border border-line no-underline transition-[box-shadow,border-color] duration-200 ease-out hover:border-accent/40 hover:shadow-home-card"
                >
                  <div className="h-1 bg-accent" />
                  {service.imgSrc ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={service.imgSrc}
                        alt={`${service.title} — ${service.imgLabel}`}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage
                      label={service.imgLabel}
                      alt={`${service.title} — ${service.imgLabel}`}
                      aspect="aspect-[16/10]"
                      rounded={false}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <p className="mb-1.5 font-body text-[13px] font-bold text-accent">
                      {service.num}
                    </p>
                    <h3 className="mb-2.5 font-head text-[22px] font-bold uppercase text-text">
                      {service.title}
                    </h3>
                    <p className="mb-4 font-body text-sm leading-[1.6] text-muted">
                      {service.desc}
                    </p>
                    {service.bullets.map((bullet) => (
                      <p
                        key={bullet}
                        className="border-t border-line py-1.5 font-body text-[13px] font-medium text-text"
                      >
                        — {bullet}
                      </p>
                    ))}
                    <span className="mt-5 font-body text-[13px] font-bold text-accent">
                      Explore {service.title}{" "}
                      <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </Reveal>
            <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3.5 text-center">
              <Button href="/#estimate" variant="primary">
                Get a Free Estimate
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

        {/* WHY TOPLINE */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="why-heading">
          <div className="bg-alt rounded-[28px]">
          <Container className="pt-14 pb-12 2xl:pt-24 2xl:pb-20">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[640px] text-center">
                <p className="mb-2.5 font-body text-xs font-bold tracking-[.14em] text-accent">
                  WHY TOPLINE EXTERIORS
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[21px] font-bold leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
                >
                  Licensed &amp; insured across PA and NJ, with 5+ years
                  building and protecting homes in this region.
                </h2>
                <span className="section-heading-rule is-centered" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOME_WHY_ITEMS.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </Reveal>
            <Reveal stagger className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 text-center lg:grid-cols-4">
              {HOME_STATS.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </Reveal>
          </Container>
          </div>
        </section>

        {/* RECENT PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="projects-heading"
        >
          <Container className="py-14 2xl:py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              RECENT PROJECTS
            </p>
            <h2
              id="projects-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
            >
              A few from around the region.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <Link
                  key={project.label}
                  href={project.href}
                  aria-label={`View project: ${project.label}`}
                  className={cn(
                    "group relative aspect-[16/10] overflow-hidden rounded-card border border-line shadow-card no-underline transition-shadow duration-300 ease-out hover:shadow-home-card",
                    project.featured && "sm:aspect-auto sm:row-span-2"
                  )}
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/75 via-graphite-950/10 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span
                      aria-hidden="true"
                      className="mb-3 block h-[3px] w-9 rounded-full bg-brand-500"
                    />
                    <p className="font-head text-lg font-bold uppercase leading-[1.2] text-white sm:text-xl">
                      {project.label}
                    </p>
                    <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[.08em] text-white/70">
                      View project
                    </p>
                  </div>
                </Link>
              ))}
            </Reveal>
            <Reveal className="mt-12 flex justify-center">
              <Button href="/#estimate" variant="primary">
                Start Your Project
              </Button>
            </Reveal>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="process-heading">
          <div className="bg-alt rounded-[28px]">
          <Container className="py-14 2xl:py-24">
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
            <span className="section-heading-rule mb-14" aria-hidden="true" />
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
          </Container>
          </div>
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
              <Button href="/#estimate" variant="primary">
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
              Real feedback from homeowners across the region.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <ReviewCarousel reviews={HOME_REVIEWS} mode="paginate" autoAdvanceMs={6000} />
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
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
            >
              Questions homeowners ask us.
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
                <Button href="/#estimate" variant="primary">
                  Get a Free Roof Estimate
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
              <FaqAccordion faqs={HOME_FAQS} columns={1} />
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
                    Request your free estimate.
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
              <EstimateForm showServiceChips />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer variant="home" />
    </>
  );
}
