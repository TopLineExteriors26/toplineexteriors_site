import type { Metadata } from "next";
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
import {
  PROCESS_STEPS,
  ROOFING_FAQS,
  ROOFING_GALLERY,
  ROOFING_REVIEWS,
  ROOFING_STATS,
  ROOFING_SUB_SERVICES,
  ROOFING_WHY_ITEMS,
  SITE_URL,
} from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Roof Replacement & Repair in Bucks County, PA | TopLine Exteriors",
  description:
    "GAF & CertainTeed certified roof replacement, repair, and storm damage claims in Bucks County, PA & South Jersey. Lifetime workmanship warranty. Get a free estimate.",
  alternates: {
    canonical: "/roofing",
  },
};

export default function RoofingHub() {
  const pageUrl = `${SITE_URL}/roofing`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    faqPageSchema(ROOFING_FAQS),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Roofing", url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="roofing" />

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
              Roofing
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
                ROOFING
              </p>
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] md:text-[52px]">
                Roofs built to outlast the seasons in Bucks County &amp; South
                Jersey.
              </h1>
              <p className="mb-[30px] max-w-[500px] font-body text-[17px] leading-[1.6] text-muted">
                GAF and CertainTeed certified replacement, repair, and storm
                response — installed by our own crews, backed by a lifetime
                workmanship warranty.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href="/roofing#estimate" variant="primary">
                  Get a Free Roof Estimate
                </Button>
                <Button href="/roofing#subservices" variant="secondary">
                  See Roofing Services
                </Button>
              </div>
            </div>
            <div className="relative">
              <PlaceholderImage
                label="hero photo — finished roof replacement"
                alt="Finished roof replacement in Bucks County, PA"
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
                WHY TOPLINE FOR ROOFING
              </p>
              <h2
                id="why-heading"
                className="font-head text-[32px] font-bold leading-[1.3] text-text"
              >
                Certified installs, our own crews, and a warranty that covers
                the labor too.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ROOFING_WHY_ITEMS.map((item) => (
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
              ROOFING SERVICES
            </p>
            <h2
              id="subservices-heading"
              className="mb-11 max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
            >
              Every roofing job we take on, done by one crew.
            </h2>
            <div className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
              {ROOFING_SUB_SERVICES.map((sub) => (
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
                    href={
                      sub.num === "01"
                        ? "/roofing/roof-replacement"
                        : "/roofing#estimate"
                    }
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
              Roofing projects from around Bucks County &amp; South Jersey.
            </h2>
            <GalleryCarousel images={ROOFING_GALLERY} />
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
              className="mb-[52px] font-head text-[32px] font-bold uppercase text-text"
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
              {ROOFING_STATS.map((stat) => (
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
              className="mb-11 font-head text-[34px] font-bold uppercase text-text"
            >
              Roofing reviews — placeholder, swap before launch.
            </h2>
            <ReviewCarousel
              reviews={ROOFING_REVIEWS}
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
              ROOFING FAQ
            </p>
            <h2
              id="faq-heading"
              className="mb-12 text-center font-head text-[32px] font-bold uppercase text-text"
            >
              Questions we hear most.
            </h2>
            <FaqAccordion faqs={ROOFING_FAQS} />
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
              Request your free roofing estimate.
            </h2>
            <EstimateForm
              projectPlaceholder="Describe the roofing issue or project…"
              submitLabel="Request My Free Roof Estimate"
            />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant="roofing" />
    </>
  );
}
