import type {
  Faq,
  GalleryImage,
  Review,
  Stat,
  SubService,
  WhyItem,
} from "@/lib/constants";
import {
  DECKS_FAQS,
  DECKS_GALLERY,
  DECKS_REVIEWS,
  DECKS_STATS,
  DECKS_SUB_SERVICES,
  DECKS_WHY_ITEMS,
  PROCESS_STEPS,
  ROOFING_FAQS,
  ROOFING_GALLERY,
  ROOFING_REVIEWS,
  ROOFING_STATS,
  ROOFING_SUB_SERVICES,
  ROOFING_WHY_ITEMS,
  SIDING_FAQS,
  SIDING_GALLERY,
  SIDING_REVIEWS,
  SIDING_STATS,
  SIDING_SUB_SERVICES,
  SIDING_WHY_ITEMS,
  SITE_URL,
} from "@/lib/constants";

export type HubHeaderFooterVariant = "roofing" | "siding" | "decks";

export type HubPageConfig = {
  /** e.g. "roofing" — used for Header/Footer variant, canonical path, breadcrumb */
  slug: HubHeaderFooterVariant;
  breadcrumbLabel: string;
  pageUrl: string;

  metadata: {
    title: string;
    description: string;
  };

  hero: {
    eyebrow: string;
    heading: React.ReactNode;
    body: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImgLabel: string;
    heroAlt: string;
  };

  why: {
    eyebrow: string;
    heading: string;
    items: WhyItem[];
  };

  subServices: {
    eyebrow: string;
    heading: string;
    items: SubService[];
    /** Given a sub-service, return its "Learn more" href. */
    hrefFor: (sub: SubService) => string;
  };

  gallery: {
    heading: React.ReactNode;
    images: GalleryImage[];
  };

  stats: Stat[];

  reviews: {
    heading: string;
    items: Review[];
  };

  faqs: {
    eyebrow: string;
    items: Faq[];
  };

  estimate: {
    heading: string;
    projectPlaceholder: string;
    submitLabel: string;
  };
};

export const ROOFING_HUB_CONFIG: HubPageConfig = {
  slug: "roofing",
  breadcrumbLabel: "Roofing",
  pageUrl: `${SITE_URL}/roofing`,
  metadata: {
    title: "Roof Replacement & Repair in Bucks County, PA | TopLine Exteriors",
    description:
      "GAF & CertainTeed certified roof replacement, repair, and storm damage claims in Bucks County, PA & South Jersey. Lifetime workmanship warranty. Get a free estimate.",
  },
  hero: {
    eyebrow: "ROOFING",
    heading: (
      <>Roofs built to outlast the seasons in Bucks County &amp; South Jersey.</>
    ),
    body: "GAF and CertainTeed certified replacement, repair, and storm response — installed by our own crews, backed by a lifetime workmanship warranty.",
    primaryCtaLabel: "Get a Free Roof Estimate",
    secondaryCtaLabel: "See Roofing Services",
    heroImgLabel: "hero photo — finished roof replacement",
    heroAlt: "Finished roof replacement in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR ROOFING",
    heading:
      "Certified installs, our own crews, and a warranty that covers the labor too.",
    items: ROOFING_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "ROOFING SERVICES",
    heading: "Every roofing job we take on, done by one crew.",
    items: ROOFING_SUB_SERVICES,
    hrefFor: (sub) =>
      sub.num === "01" ? "/roofing/roof-replacement" : "/roofing#estimate",
  },
  gallery: {
    heading: (
      <>Roofing projects from around Bucks County &amp; South Jersey.</>
    ),
    images: ROOFING_GALLERY,
  },
  stats: ROOFING_STATS,
  reviews: {
    heading: "Roofing reviews — placeholder, swap before launch.",
    items: ROOFING_REVIEWS,
  },
  faqs: {
    eyebrow: "ROOFING FAQ",
    items: ROOFING_FAQS,
  },
  estimate: {
    heading: "Request your free roofing estimate.",
    projectPlaceholder: "Describe the roofing issue or project…",
    submitLabel: "Request My Free Roof Estimate",
  },
};

export const SIDING_HUB_CONFIG: HubPageConfig = {
  slug: "siding",
  breadcrumbLabel: "Siding",
  pageUrl: `${SITE_URL}/siding`,
  metadata: {
    title: "Siding Replacement & Repair in Bucks County, PA | TopLine Exteriors",
    description:
      "Vinyl, James Hardie fiber-cement, insulated, and wood siding installed in Bucks County, PA & South Jersey. Full tear-off, storm repair. Get a free estimate.",
  },
  hero: {
    eyebrow: "SIDING",
    heading: (
      <>Siding that locks out the weather in Bucks County &amp; South Jersey.</>
    ),
    body: "Vinyl, insulated, James Hardie fiber-cement, and wood siding — full tear-off installs by our own crews, backed by a workmanship warranty.",
    primaryCtaLabel: "Get a Free Siding Estimate",
    secondaryCtaLabel: "See Siding Services",
    heroImgLabel: "hero photo — finished fiber-cement siding install",
    heroAlt: "Finished fiber-cement siding install in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR SIDING",
    heading:
      "Certified installs, a full tear-off on every job, and a warranty that covers the labor too.",
    items: SIDING_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "SIDING SERVICES",
    heading: "Every siding job we take on, done by one crew.",
    items: SIDING_SUB_SERVICES,
    hrefFor: () => "/siding#estimate",
  },
  gallery: {
    heading: <>Siding projects from around Bucks County &amp; South Jersey.</>,
    images: SIDING_GALLERY,
  },
  stats: SIDING_STATS,
  reviews: {
    heading: "Siding reviews — placeholder, swap before launch.",
    items: SIDING_REVIEWS,
  },
  faqs: {
    eyebrow: "SIDING FAQ",
    items: SIDING_FAQS,
  },
  estimate: {
    heading: "Request your free siding estimate.",
    projectPlaceholder: "Describe your siding project or issue…",
    submitLabel: "Request My Free Siding Estimate",
  },
};

export const DECKS_HUB_CONFIG: HubPageConfig = {
  slug: "decks",
  breadcrumbLabel: "Decks",
  pageUrl: `${SITE_URL}/decks`,
  metadata: {
    title:
      "Custom Deck Building & Fencing in Bucks County, PA | TopLine Exteriors",
    description:
      "Custom deck construction, restoration, composite & wood decking, railings, and fencing in Bucks County, PA & South Jersey. Licensed & insured. Get a free estimate.",
  },
  hero: {
    eyebrow: "DECKS",
    heading: (
      <>
        Custom decks and fencing built to handle Bucks County &amp; South
        Jersey seasons.
      </>
    ),
    body: "Composite and wood decks, railings, and fencing designed and built by our own crews — permits handled, no subcontractors, backed by our workmanship warranty.",
    primaryCtaLabel: "Get a Free Deck Estimate",
    secondaryCtaLabel: "See Deck Services",
    heroImgLabel: "hero photo — finished composite deck build",
    heroAlt: "Finished composite deck build in Bucks County, PA",
  },
  why: {
    eyebrow: "WHY TOPLINE FOR DECKS",
    heading:
      "Built to code, in the material you want, by a crew that stands behind the work.",
    items: DECKS_WHY_ITEMS,
  },
  subServices: {
    eyebrow: "DECK SERVICES",
    heading: "Every deck and fence job we take on, done by one crew.",
    items: DECKS_SUB_SERVICES,
    hrefFor: () => "/decks#estimate",
  },
  gallery: {
    heading: (
      <>
        Deck &amp; fencing projects from around Bucks County &amp; South
        Jersey.
      </>
    ),
    images: DECKS_GALLERY,
  },
  stats: DECKS_STATS,
  reviews: {
    heading: "Deck & fence reviews — placeholder, swap before launch.",
    items: DECKS_REVIEWS,
  },
  faqs: {
    eyebrow: "DECKS FAQ",
    items: DECKS_FAQS,
  },
  estimate: {
    heading: "Request your free deck estimate.",
    projectPlaceholder: "Describe your deck or fencing project…",
    submitLabel: "Request My Free Deck Estimate",
  },
};

export { PROCESS_STEPS };
