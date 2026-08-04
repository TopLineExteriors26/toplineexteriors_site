import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { TrustStrip } from "@/components/homepage/TrustStrip";
import { Services } from "@/components/homepage/Services";
import { BeforeAfterSection } from "@/components/homepage/BeforeAfterSection";
import { Reviews } from "@/components/homepage/Reviews";
import { EstimateSection } from "@/components/homepage/EstimateSection";
import { HOME_FAQS, SITE_URL } from "@/lib/constants";
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
  // NOTE: FAQPage schema references HOME_FAQS even though the FAQ section
  // is no longer rendered on this page (redesign spec has no FAQ section).
  // TODO(client/seo): confirm this doesn't violate structured-data visible-
  // content requirements, or move FAQs to their own page/section.
  const jsonLd = [localBusinessSchema(SITE_URL), faqPageSchema(HOME_FAQS)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="home" />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Services />
        <BeforeAfterSection />
        <Reviews />
        <EstimateSection />
      </main>
      <Footer variant="home" />
    </>
  );
}
