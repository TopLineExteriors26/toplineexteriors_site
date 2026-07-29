import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { TrustBadgeCard } from "@/components/ui/TrustBadgeCard";
import { WhyCard } from "@/components/ui/WhyCard";
import { StatBlock } from "@/components/ui/StatBlock";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { Reveal } from "@/components/ui/Reveal";
import {
  CITIES,
  HOME_FAQS,
  HOME_REVIEWS,
  HOME_STATS,
  HOME_WHY_ITEMS,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  SITE_URL,
  TRUST_BADGES,
} from "@/lib/constants";
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
        {/* HERO */}
        <section className="bg-paper">
          <Container className="grid grid-cols-1 items-center gap-14 pb-0 pt-16 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.12em] text-accent">
                BUCKS COUNTY, PA · SOUTH JERSEY · GREATER PHILADELPHIA
              </p>
              <h1 className="mb-[22px] font-head text-[32px] font-bold leading-[1.12] tracking-[.005em] text-text sm:text-[40px] md:text-[52px]">
                Roofing, Decks &amp; Siding trusted by homeowners across Bucks
                County.
              </h1>
              <p className="mb-[34px] max-w-[500px] font-body text-lg leading-[1.6] text-muted">
                Licensed, insured, and on the job year-round. Roof
                replacements, custom decks, and siding installed by our own
                crews — no subcontractors, no surprises on the invoice.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href="/#estimate" variant="primary">
                  Get a Free Roof Estimate
                </Button>
                <Button href="/#projects" variant="secondary">
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <PlaceholderImage
                label="hero photo — finished roof + home exterior"
                alt="Finished roof and home exterior in Bucks County, PA"
                className="bg-paper-2"
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

          {/* TRUST BADGES */}
          <Container className="pb-16 pt-14">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {TRUST_BADGES.map((badge) => (
                <TrustBadgeCard key={badge.label} {...badge} />
              ))}
            </div>
          </Container>
        </section>

        {/* WHY TOPLINE */}
        <section className="bg-paper" aria-labelledby="why-heading">
          <Container className="py-24">
            <Reveal>
              <div className="mx-auto mb-12 max-w-[640px] text-center">
                <p className="mb-2.5 font-body text-xs font-bold tracking-[.14em] text-accent">
                  WHY TOPLINE EXTERIORS
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[32px] font-bold leading-[1.3] text-text"
                >
                  Licensed &amp; insured across PA and NJ, with 15+ years
                  building and protecting homes in this region.
                </h2>
                <span className="section-heading-rule is-centered" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {HOME_WHY_ITEMS.map((item) => (
                  <WhyCard key={item.title} {...item} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="services-heading"
        >
          <Container className="pb-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              OUR SERVICES
            </p>
            <h2
              id="services-heading"
              className="max-w-[640px] font-head text-[34px] font-bold uppercase text-text"
            >
              Three trades. One crew you can trust with all of them.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col overflow-hidden rounded-card border border-line"
                >
                  <div className="h-1 bg-accent" />
                  <PlaceholderImage
                    label={service.imgLabel}
                    alt={`${service.title} — ${service.imgLabel}`}
                    aspect="aspect-[16/10]"
                    rounded={false}
                  />
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
                    <Link
                      href={service.href}
                      className="mt-5 font-body text-[13px] font-bold text-accent no-underline"
                    >
                      Explore {service.title} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-alt" aria-labelledby="process-heading">
          <Container className="py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              HOW IT WORKS
            </p>
            <h2
              id="process-heading"
              className="font-head text-[34px] font-bold uppercase text-text"
            >
              From estimate to warranty, in four steps.
            </h2>
            <span className="section-heading-rule mb-14" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
            </Reveal>
          </Container>
        </section>

        {/* STATS */}
        <section className="bg-ink text-white">
          <Container className="py-14">
            <Reveal className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
              {HOME_STATS.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </Reveal>
          </Container>
        </section>

        {/* RECENT PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="projects-heading"
        >
          <Container className="py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              RECENT PROJECTS
            </p>
            <h2
              id="projects-heading"
              className="font-head text-[34px] font-bold uppercase text-text"
            >
              A few from around the region.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-3 [grid-auto-rows:160px] md:grid-cols-4">
              {PROJECTS.map((project) =>
                project.slug ? (
                  <Link
                    key={project.label}
                    href={`/projects/${project.slug}`}
                    style={{
                      gridColumn: `span ${project.colSpan}`,
                      gridRow: `span ${project.rowSpan}`,
                    }}
                    aria-label={`View project: ${project.label}`}
                    className="flex items-end rounded-card border border-line bg-[repeating-linear-gradient(135deg,rgba(0,0,0,.06)_0_10px,rgba(0,0,0,.02)_10px_20px)] p-3.5 no-underline transition-[filter] duration-150 ease-out hover:brightness-95"
                  >
                    <span className="rounded-[7px] bg-paper px-2 py-1 font-mono text-[11px] text-muted">
                      {project.label} →
                    </span>
                  </Link>
                ) : (
                  <div
                    key={project.label}
                    style={{
                      gridColumn: `span ${project.colSpan}`,
                      gridRow: `span ${project.rowSpan}`,
                    }}
                    role="img"
                    aria-label={project.label}
                    className="flex items-end rounded-card border border-line bg-[repeating-linear-gradient(135deg,rgba(0,0,0,.06)_0_10px,rgba(0,0,0,.02)_10px_20px)] p-3.5"
                  >
                    <span className="rounded-[7px] bg-paper px-2 py-1 font-mono text-[11px] text-muted">
                      {project.label}
                    </span>
                  </div>
                )
              )}
            </div>
            </Reveal>
          </Container>
        </section>

        {/* REVIEWS */}
        <section className="overflow-hidden bg-alt" aria-labelledby="reviews-heading">
          <Container className="py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              WHAT HOMEOWNERS SAY
            </p>
            <h2
              id="reviews-heading"
              className="font-head text-[34px] font-bold uppercase text-text"
            >
              Placeholder reviews — swap in real ones before launch.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <ReviewCarousel reviews={HOME_REVIEWS} mode="slide" />
            </Reveal>
          </Container>
        </section>

        {/* SERVICE AREA */}
        <section className="bg-paper" aria-labelledby="service-area-heading">
          <Container className="py-24">
            <Reveal className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
            <div>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                SERVICE AREA
              </p>
              <h2
                id="service-area-heading"
                className="font-head text-[34px] font-bold uppercase text-text"
              >
                Proudly serving Bucks County &amp; the greater region.
              </h2>
              <span className="section-heading-rule mb-5" aria-hidden="true" />
              <p className="mb-6 max-w-[440px] font-body text-[15px] leading-[1.7] text-muted">
                From Levittown out through Bucks County, into Philadelphia,
                and across the river into South Jersey — if it&rsquo;s on
                this list, we&rsquo;re already working nearby.
              </p>
              <ul className="flex flex-wrap gap-2.5 p-0">
                {CITIES.map((city) => (
                  <li
                    key={city}
                    className="rounded-pill border border-line px-4 py-2 font-body text-[13px] font-semibold text-text"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderImage label="service-area map" alt="Map of TopLine Exteriors' service area" />
            </Reveal>
          </Container>
        </section>

        {/* FAQ */}
        <section className="bg-alt" aria-labelledby="faq-heading">
          <Container narrow className="py-24">
            <Reveal>
            <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-center font-head text-[34px] font-bold uppercase text-text"
            >
              Questions homeowners ask us.
            </h2>
            <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
            <FaqAccordion faqs={HOME_FAQS} />
            </Reveal>
          </Container>
        </section>

        {/* ESTIMATE FORM */}
        <section id="estimate" className="scroll-mt-20 bg-paper" aria-labelledby="estimate-heading">
          <Container className="py-24" maxWidthPx={900}>
            <Reveal>
            <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
              GET STARTED
            </p>
            <h2
              id="estimate-heading"
              className="text-center font-head text-[34px] font-bold uppercase text-text"
            >
              Request your free estimate.
            </h2>
            <span className="section-heading-rule is-centered mb-9" aria-hidden="true" />
            <EstimateForm showServiceChips />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer variant="home" />
    </>
  );
}
