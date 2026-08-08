import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhyCard } from "@/components/ui/WhyCard";
import { ProjectPhotoCarousel } from "@/components/ui/ProjectPhotoCarousel";
import {
  PROCESS_STEPS,
  PROJECT_CASE_STUDIES,
  SITE_URL,
  whyItemsForTrade,
} from "@/lib/constants";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECT_CASE_STUDIES.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_CASE_STUDIES.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECT_CASE_STUDIES.find((p) => p.slug === slug);
  if (!project) notFound();

  const whyItems = whyItemsForTrade(project.trade);

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: project.serviceLabel, url: `${SITE_URL}${project.hubHref}` },
      { name: project.title, url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant={project.trade} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: project.serviceLabel, href: project.hubHref },
          { label: project.title },
        ]}
      />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-paper">
          <Container className="pb-[88px] pt-11">
            <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.14em] text-accent">
                  PROJECT SPOTLIGHT · {project.serviceLabel.toUpperCase()}
                </p>
                <h1 className="font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] 2xl:text-[52px]">
                  {project.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-3.5">
                <Button href={`${project.hubHref}#estimate`} variant="primary">
                  Get a Free Estimate
                </Button>
                <Button href={project.hubHref} variant="secondary">
                  See All {project.serviceLabel}
                </Button>
              </div>
            </div>

            <ProjectPhotoCarousel photos={project.photos} />
          </Container>
        </section>

        {/* WHY TOPLINE */}
        <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="why-heading">
          <div className="bg-alt rounded-[28px]">
            <Container className="py-14 2xl:py-24">
              <Reveal>
                <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                  WHY TOPLINE EXTERIORS
                </p>
                <h2
                  id="why-heading"
                  className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
                >
                  Built by our own crew, backed by our name.
                </h2>
                <span className="section-heading-rule mb-11" aria-hidden="true" />
              </Reveal>
              <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {whyItems.map((item) => (
                  <WhyCard key={item.title} {...item} />
                ))}
              </Reveal>
              <Reveal className="mt-11 flex justify-center">
                <Button href={`${project.hubHref}#estimate`} variant="primary">
                  Get a Free Estimate
                </Button>
              </Reveal>
            </Container>
          </div>
        </section>

        {/* ABOUT THIS PROJECT */}
        <section className="bg-paper" aria-labelledby="about-heading">
          <Container className="grid grid-cols-1 gap-12 pt-12 pb-14 2xl:pt-20 2xl:pb-24 lg:grid-cols-[1fr_280px]">
            <Reveal>
              <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                ABOUT THIS PROJECT
              </p>
              <h2
                id="about-heading"
                className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text 2xl:text-[32px]"
              >
                {project.serviceLabel} work built to last.
              </h2>
              <span className="section-heading-rule mb-6" aria-hidden="true" />
              <div className="max-w-[70ch]">
                {project.aboutParagraphs.map((paragraph, i) => (
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
              {project.facts.map((fact) => (
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

        {/* GALLERY */}
        {project.photos.length > 1 && (
          <section className="bg-paper px-4 py-4 sm:px-6" aria-labelledby="gallery-heading">
            <div className="bg-alt rounded-[28px]">
              <Container className="py-14 2xl:py-24">
                <Reveal>
                  <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
                    FULL GALLERY
                  </p>
                  <h2
                    id="gallery-heading"
                    className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
                  >
                    Every photo from this project.
                  </h2>
                  <span className="section-heading-rule mb-11" aria-hidden="true" />
                </Reveal>
                <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.photos.map((photo) => (
                    <div
                      key={photo.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-card border border-white/10"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Reveal>
                <Reveal className="mt-11 flex justify-center">
                  <Button href={`${project.hubHref}#estimate`} variant="primary">
                    Get a Free Estimate
                  </Button>
                </Reveal>
              </Container>
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
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
          </Container>
        </section>

        {/* CTA */}
        <section
          id="estimate"
          className="scroll-mt-20 bg-paper px-4 py-4 sm:px-6"
          aria-labelledby="cta-heading"
        >
          <div className="bg-alt rounded-[28px]">
            <Container className="py-14 2xl:py-24 text-center">
              <Reveal>
                <h2
                  id="cta-heading"
                  className="font-head text-[21px] font-bold uppercase leading-[1.12] text-text bg-alt-heading 2xl:text-[32px]"
                >
                  Have a similar project in mind?
                </h2>
                <span className="section-heading-rule is-centered mb-4" aria-hidden="true" />
                <p className="mx-auto mb-8 max-w-[60ch] font-body text-[17px] leading-[1.6] text-muted bg-alt-muted">
                  Tell us about your project and we&rsquo;ll walk you through
                  a written estimate — no pressure, no surprises.
                </p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Button href={`${project.hubHref}#estimate`} variant="primary">
                    Get a Free Estimate
                  </Button>
                  <Button
                    href={project.hubHref}
                    variant="secondary"
                    className="bg-alt-btn-secondary"
                  >
                    See More {project.serviceLabel} Work
                  </Button>
                </div>
              </Reveal>
            </Container>
          </div>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
