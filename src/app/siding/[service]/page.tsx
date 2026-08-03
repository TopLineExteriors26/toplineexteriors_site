import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail/ServiceDetailPage";
import {
  SIDING_REPLACEMENT_SERVICE,
  VINYL_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  INSULATED_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  SIDING_REPAIR_SERVICE,
  SOFFIT_FASCIA_TRIM_SERVICE,
  SIDING_SUB_SERVICES,
  SITE_URL,
} from "@/lib/constants";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const SERVICES = [
  SIDING_REPLACEMENT_SERVICE,
  VINYL_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  INSULATED_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  SIDING_REPAIR_SERVICE,
  SOFFIT_FASCIA_TRIM_SERVICE,
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
      canonical: `/siding/${service.slug}`,
    },
  };
}

export default async function SidingServiceDetailPage({
  params,
}: ServicePageProps) {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/siding/${service.slug}`;
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
        hubVariant="siding"
        allServices={SIDING_SUB_SERVICES}
      />
    </>
  );
}
