import {
  BUSINESS_LEGAL_NAME,
  CITIES,
  EMAIL,
  PHONE_DIGITS,
  SITE_URL,
} from "@/lib/constants";
import type { Faq } from "@/lib/constants";

const areaServed = Array.from(
  new Set(CITIES.map((city) => city.split(",")[0].trim()))
).map((name) => ({ "@type": "City", name }));

export function localBusinessSchema(pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_LEGAL_NAME,
    url: pageUrl,
    telephone: `+1${PHONE_DIGITS}`,
    email: EMAIL,
    priceRange: "$$",
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Levittown",
      addressRegion: "PA",
      postalCode: "19055",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.1548,
      longitude: -74.8288,
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: params.serviceType,
    provider: {
      "@type": "RoofingContractor",
      name: BUSINESS_LEGAL_NAME,
      telephone: `+1${PHONE_DIGITS}`,
    },
    areaServed,
  };
}
