import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECT_CASE_STUDIES, SITE_URL } from "@/lib/constants";
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

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;
  const jsonLd = [
    localBusinessSchema(pageUrl),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Projects", url: `${SITE_URL}/#projects` },
      { name: project.title, url: pageUrl },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="home" />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/#projects" },
          { label: project.title },
        ]}
      />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-paper">
          <Container className="grid grid-cols-1 items-center gap-14 pb-[88px] pt-11 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-[18px] font-body text-[13px] font-bold tracking-[.14em] text-accent">
                PROJECT SPOTLIGHT · {project.location.toUpperCase()}
              </p>
              <h1 className="mb-5 font-head text-[32px] font-bold leading-[1.08] tracking-[.01em] text-text sm:text-[40px] md:text-[52px]">
                {project.title}
              </h1>
              <p className="mb-[30px] max-w-[500px] font-body text-[17px] leading-[1.6] text-muted">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button href="/roofing#estimate" variant="primary">
                  Get a Free Roof Estimate
                </Button>
                <Button href={project.serviceHref} variant="secondary">
                  About This Service
                </Button>
              </div>
            </div>
            <PlaceholderImage
              label={project.heroImgLabel}
              alt={project.heroAlt}
            />
          </Container>
        </section>

        {/* PROJECT FACTS */}
        <section className="bg-paper" aria-labelledby="facts-heading">
          <Container className="pb-24">
            <Reveal>
            <h2 id="facts-heading" className="sr-only">
              Project Details
            </h2>
            <dl className="grid grid-cols-1 gap-5 rounded-card border border-line bg-paper-2 p-8 sm:grid-cols-2 lg:grid-cols-5">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="mb-1 font-body text-xs font-bold tracking-[.08em] text-muted">
                    {fact.label.toUpperCase()}
                  </dt>
                  <dd className="m-0 font-head text-lg font-bold text-text">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            </Reveal>
          </Container>
        </section>

        {/* PROJECT STORY */}
        <section className="bg-paper" aria-labelledby="story-heading">
          <Container narrow className="pb-24">
            <Reveal>
            <h2
              id="story-heading"
              className="mb-6 font-head text-[32px] font-bold uppercase text-text"
            >
              What we did
            </h2>
            <div className="max-w-[70ch]">
              {project.bodyParagraphs.map((paragraph, i) => (
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

        {/* GALLERY */}
        <section className="bg-alt" aria-labelledby="gallery-heading">
          <Container className="py-24">
            <Reveal>
            <h2
              id="gallery-heading"
              className="mb-11 font-head text-[32px] font-bold uppercase text-text"
            >
              Project photos
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {project.galleryImages.map((img) => (
                <PlaceholderImage
                  key={img.label}
                  label={img.label}
                  alt={img.alt}
                  aspect="aspect-[4/3]"
                />
              ))}
            </div>
            </Reveal>
          </Container>
        </section>

        {/* REVIEW */}
        <section className="bg-paper" aria-labelledby="review-heading">
          <Container narrow className="py-24">
            <Reveal>
            <h2 id="review-heading" className="sr-only">
              Client Review
            </h2>
            <div className="rounded-card border border-line bg-paper p-10 text-center shadow-card">
              <p className="mb-4 font-head text-lg font-bold text-accent">
                {project.review.stars}
              </p>
              <p className="mx-auto mb-5 max-w-[60ch] font-body text-lg leading-[1.6] text-text">
                &ldquo;{project.review.text}&rdquo;
              </p>
              <p className="font-body text-sm font-bold text-text">
                {project.review.name}
              </p>
              <p className="font-body text-xs font-medium text-muted">
                {project.review.meta}
              </p>
            </div>
            </Reveal>
          </Container>
        </section>

        {/* CTA */}
        <section
          id="estimate"
          className="scroll-mt-20 bg-alt"
          aria-labelledby="cta-heading"
        >
          <Container className="py-24 text-center">
            <Reveal>
            <h2
              id="cta-heading"
              className="mb-4 font-head text-[32px] font-bold uppercase text-text"
            >
              Have a similar project in mind?
            </h2>
            <p className="mx-auto mb-8 max-w-[60ch] font-body text-[17px] leading-[1.6] text-muted">
              Whether it&rsquo;s storm damage, a full replacement, or a
              repair, we&rsquo;ll walk your roof and give you a clear,
              written estimate.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button href="/roofing#estimate" variant="primary">
                Get a Free Roof Estimate
              </Button>
              <Button href="/#projects" variant="secondary">
                See More Projects
              </Button>
            </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
