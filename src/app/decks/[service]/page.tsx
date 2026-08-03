import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail/ServiceDetailPage";
import {
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  WOOD_DECKING_SERVICE,
  RAILINGS_GUARDRAILS_SERVICE,
  FENCING_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
  DECKS_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const SERVICES = [
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  WOOD_DECKING_SERVICE,
  RAILINGS_GUARDRAILS_SERVICE,
  FENCING_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
];

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
      canonical: `/decks/${service.slug}`,
    },
  };
}

export default async function DecksServiceDetailPage({
  params,
}: ServicePageProps) {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/decks/${service.slug}`;
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
      <ServiceDetailPage
        service={service}
        hubVariant="decks"
        allServices={DECKS_SUB_SERVICES}
      />
    </>
  );
}
