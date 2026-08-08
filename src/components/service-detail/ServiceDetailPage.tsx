import Image from "next/image";
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
  const hasMaterials = service.materials.length > 0;

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
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] 2xl:text-[52px]">
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
                  className="btn-shine inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill border border-line bg-transparent px-7 py-4 font-body text-[15px] font-bold text-text no-underline transition-[filter] duration-200 ease-out motion-safe:hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
            {service.heroImgSrc ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line">
                <Image
                  src={service.heroImgSrc}
                  alt={service.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <PlaceholderImage
                label={service.heroImgLabel}
                alt={service.heroAlt}
              />
            )}
          </Container>
        </section>

        {/* INTRO */}
        <section className="bg-paper" aria-labelledby="intro-heading">
          <Container className="grid grid-cols-1 gap-12 pb-14 2xl:pb-24 lg:grid-cols-[1fr_280px]">
            <Reveal>
            <h2
              id="intro-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
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
                  className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper px-5 py-4"
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
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="signs-heading">
          <div className="bg-alt rounded-[28px]">
          <Container className="py-12 2xl:py-[88px]">
            <Reveal>
            <h2
              id="signs-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
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
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-paper" aria-labelledby="process-heading">
          <Container className="py-14 2xl:py-24">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              HOW IT WORKS
            </p>
            <h2
              id="process-heading"
              className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
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
        {hasMaterials && (
          <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="materials-heading">
            <div className="bg-alt rounded-[28px]">
            <Container className="py-12 2xl:py-[88px]">
              <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                MATERIALS WE INSTALL
              </p>
              <h2
                id="materials-heading"
                className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
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
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-paper" aria-labelledby="faq-heading">
          <Container narrow className="py-14 2xl:py-24">
            <Reveal>
            <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-center font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
            >
              {service.title} questions.
            </h2>
            <span className="section-heading-rule is-centered mb-12" aria-hidden="true" />
            <FaqAccordion faqs={service.faqs} columns={1} />
            </Reveal>
          </Container>
        </section>

        {/* RELATED SERVICES */}
        <section
          className={hasMaterials ? "bg-paper" : "bg-paper px-4 py-4 sm:px-6"}
          aria-labelledby="related-heading"
        >
          <div className={hasMaterials ? undefined : "bg-alt rounded-[28px]"}>
          <Container className="py-12 2xl:py-[88px]">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              RELATED SERVICES
            </p>
            <h2
              id="related-heading"
              className={
                hasMaterials
                  ? "font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
                  : "font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
              }
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
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-ink" aria-labelledby="cta-heading">
          <Container className="py-14 2xl:py-24 text-center" maxWidthPx={700}>
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              GET STARTED
            </p>
            <h2
              id="cta-heading"
              className="mb-4 font-head text-[21px] font-bold uppercase leading-[1.12] text-white 2xl:text-[32px]"
            >
              Ready for your free {service.title.toLowerCase()} estimate?
            </h2>
            <p className="mb-8 font-body text-[17px] leading-[1.6] text-white/70">
              Tell us about your project on our {service.hubLabel.toLowerCase()} page and
              we&rsquo;ll get back to you with a written quote.
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
