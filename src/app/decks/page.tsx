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
  DECKS_FAQS,
  DECKS_GALLERY,
  DECKS_REVIEWS,
  DECKS_STATS,
  DECKS_SUB_SERVICES,
  DECKS_WHY_ITEMS,
  PROCESS_STEPS,
  SITE_URL,
} from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Custom Deck Building & Fencing in Bucks County, PA | TopLine Exteriors",
  description:
    "Custom deck construction, restoration, composite & wood decking, railings, and fencing in Bucks County, PA & South Jersey. Licensed & insured. Get a free estimate.",
  alternates: {
    canonical: "/decks",
  },
};

export default function DecksHub() {
  const pageUrl = `${SITE_URL}/decks`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    faqPageSchema(DECKS_FAQS),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Decks", url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="decks" />

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
              Decks
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
                DECKS
              </p>
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] md:text-[52px]">
                Custom decks and fencing built to handle Bucks County &amp;
                South Jersey seasons.
              </h1>
              <p className="mb-[30px] max-w-[500px] font-body text-[17px] leading-[1.6] text-muted">
                Composite and wood decks, railings, and fencing designed and
                built by our own crews — permits handled, no subcontractors,
                backed by our workmanship warranty.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href="/decks#estimate" variant="primary">
                  Get a Free Deck Estimate
                </Button>
                <Button href="/decks#subservices" variant="secondary">
                  See Deck Services
                </Button>
              </div>
            </div>
            <div className="relative">
              <PlaceholderImage
                label="hero photo — finished composite deck build"
                alt="Finished composite deck build in Bucks County, PA"
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
                WHY TOPLINE FOR DECKS
              </p>
              <h2
                id="why-heading"
                className="font-head text-[32px] font-bold leading-[1.3] text-text"
              >
                Built to code, in the material you want, by a crew that
                stands behind the work.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DECKS_WHY_ITEMS.map((item) => (
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
              DECK SERVICES
            </p>
            <h2
              id="subservices-heading"
              className="mb-11 max-w-[680px] font-head text-[32px] font-bold uppercase text-text"
            >
              Every deck and fence job we take on, done by one crew.
            </h2>
            <div className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
              {DECKS_SUB_SERVICES.map((sub) => (
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
                    href="/decks#estimate"
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
              Deck &amp; fencing projects from around Bucks County &amp; South
              Jersey.
            </h2>
            <GalleryCarousel images={DECKS_GALLERY} />
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
              {DECKS_STATS.map((stat) => (
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
              Deck &amp; fence reviews — placeholder, swap before launch.
            </h2>
            <ReviewCarousel
              reviews={DECKS_REVIEWS}
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
              DECKS FAQ
            </p>
            <h2
              id="faq-heading"
              className="mb-12 text-center font-head text-[32px] font-bold uppercase text-text"
            >
              Questions we hear most.
            </h2>
            <FaqAccordion faqs={DECKS_FAQS} />
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
              Request your free deck estimate.
            </h2>
            <EstimateForm
              projectPlaceholder="Describe your deck or fencing project…"
              submitLabel="Request My Free Deck Estimate"
            />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant="decks" />
    </>
  );
}
