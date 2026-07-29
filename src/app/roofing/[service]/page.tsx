import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { Reveal } from "@/components/ui/Reveal";
import { ROOF_REPLACEMENT_SERVICE, SITE_URL } from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const SERVICES = [ROOF_REPLACEMENT_SERVICE];

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
      <Header variant="roofing" />

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
                <Button href="#estimate" variant="primary">
                  Get a Free Estimate
                </Button>
                <Button href="#faq" variant="secondary">
                  Common Questions
                </Button>
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
          <Container narrow className="pb-24">
            <Reveal>
            <h2
              id="intro-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              What is a {service.title.toLowerCase()}?
            </h2>
            <span className="section-heading-rule mb-6" aria-hidden="true" />
            <div className="max-w-[70ch]">
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
          </Container>
        </section>

        {/* SIGNS YOU NEED THIS */}
        <section className="bg-alt" aria-labelledby="signs-heading">
          <Container narrow className="py-[88px]">
            <Reveal>
            <h2
              id="signs-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              Signs you may need a {service.title.toLowerCase()}
            </h2>
            <span className="section-heading-rule mb-8" aria-hidden="true" />
            <ul className="grid grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {service.signsList.map((sign) => (
                <li
                  key={sign}
                  className="flex gap-3 rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-5 font-body text-sm leading-[1.6] text-text"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
                  >
                    !
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
            </Reveal>
          </Container>
        </section>

        {/* MATERIALS */}
        <section className="bg-alt" aria-labelledby="materials-heading">
          <Container className="py-[88px]">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              MATERIALS WE INSTALL
            </p>
            <h2
              id="materials-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              Manufacturer-certified systems, not generic materials.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
            </div>
            </Reveal>
          </Container>
        </section>

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
            <FaqAccordion faqs={service.faqs} />
            </Reveal>
          </Container>
        </section>

        {/* RELATED SERVICES */}
        <section className="bg-alt" aria-labelledby="related-heading">
          <Container className="py-[88px]">
            <Reveal>
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              RELATED SERVICES
            </p>
            <h2
              id="related-heading"
              className="font-head text-[32px] font-bold uppercase text-text"
            >
              Other roofing services you may need.
            </h2>
            <span className="section-heading-rule mb-11" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {service.relatedServices.map((related) => (
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
            </div>
            </Reveal>
          </Container>
        </section>

        {/* ESTIMATE FORM */}
        <section
          id="estimate"
          className="scroll-mt-20 bg-paper"
          aria-labelledby="estimate-heading"
        >
          <Container className="py-24" maxWidthPx={800}>
            <Reveal>
            <p className="mb-3 text-center font-body text-xs font-bold tracking-[.14em] text-accent">
              GET STARTED
            </p>
            <h2
              id="estimate-heading"
              className="text-center font-head text-[32px] font-bold uppercase text-text"
            >
              Request your free {service.title.toLowerCase()} estimate.
            </h2>
            <span className="section-heading-rule is-centered mb-8" aria-hidden="true" />
            <EstimateForm
              projectPlaceholder={`Describe your ${service.title.toLowerCase()} project or issue…`}
              submitLabel={`Request My Free ${service.title} Estimate`}
            />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant="roofing" />
    </>
  );
}
