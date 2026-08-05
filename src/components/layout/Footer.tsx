import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
  EMAIL,
  FOOTER_CITIES,
  HIC_LICENSE,
  NJ_HIC_LICENSE,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  SERVICE_AREA_BLURB,
} from "@/lib/constants";
import {
  DECKS_HUB_CONFIG,
  ROOFING_HUB_CONFIG,
  SIDING_HUB_CONFIG,
  navDropdownItemsFor,
  type HubHeaderFooterVariant,
} from "@/lib/hubConfigs";

type FooterVariant = "home" | HubHeaderFooterVariant;

type FooterProps = {
  variant?: FooterVariant;
};

const HUB_LINKS: Record<HubHeaderFooterVariant, { heading: string; href: string }> = {
  roofing: { heading: "Roofing Services", href: "/roofing" },
  decks: { heading: "Deck & Fence Services", href: "/decks" },
  siding: { heading: "Siding Services", href: "/siding" },
};

const SERVICE_COLUMNS: Record<HubHeaderFooterVariant, { label: string; href: string }[]> = {
  roofing: navDropdownItemsFor(ROOFING_HUB_CONFIG),
  decks: navDropdownItemsFor(DECKS_HUB_CONFIG),
  siding: navDropdownItemsFor(SIDING_HUB_CONFIG),
};

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks & Fencing", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Our Work", href: "/#projects" },
  { label: "Get an Estimate", href: "/#estimate" },
];

export function Footer({ variant = "home" }: FooterProps) {
  const year = new Date().getFullYear();
  const isHub = variant !== "home";
  const estimateHref = isHub ? `/${variant}#estimate` : "/#estimate";

  return (
    <footer className="bg-graphite-900 text-white">
      <Container className="grid grid-cols-1 gap-10 pb-10 pt-16 sm:grid-cols-2 md:pt-[72px] lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {/* BRAND + CONTACT */}
        <div>
          <div className="mb-6 inline-block rounded-2xl bg-white px-6 py-5">
            <Logo className="h-14 sm:h-16" />
          </div>
          <p className="mb-5 max-w-[280px] font-body text-sm leading-[1.7] text-graphite-200">
            Licensed &amp; insured roofing, deck, and siding contractor
            serving Bucks County, PA and South Jersey. Our own crews, no
            subcontractors.
          </p>
          <div className="flex flex-col gap-2 font-body text-sm text-graphite-200">
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="font-bold text-white no-underline hover:text-brand-400"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-graphite-200 no-underline hover:text-brand-400"
            >
              {EMAIL}
            </a>
            <span>{SERVICE_AREA_BLURB}</span>
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            SERVICES
          </div>
          {isHub ? (
            <nav aria-label="Services" className="flex flex-col">
              {SERVICE_COLUMNS[variant].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-1.5 font-body text-sm text-graphite-200 no-underline hover:text-brand-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <nav aria-label="Services" className="flex flex-col">
              {(Object.keys(HUB_LINKS) as HubHeaderFooterVariant[]).map((key) => (
                <Link
                  key={key}
                  href={HUB_LINKS[key].href}
                  className="py-1.5 font-body text-sm text-graphite-200 no-underline hover:text-brand-400"
                >
                  {HUB_LINKS[key].heading}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* COMPANY */}
        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            COMPANY
          </div>
          <nav aria-label="Company" className="flex flex-col">
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-1.5 font-body text-sm text-graphite-200 no-underline hover:text-brand-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* SERVICE AREA */}
        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            SERVICE AREA
          </div>
          <ul className="m-0 flex flex-col gap-1.5 p-0 font-body text-sm text-graphite-200">
            {FOOTER_CITIES.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <Link
            href={estimateHref}
            className="mt-4 inline-block font-body text-[13px] font-bold text-accent no-underline hover:text-brand-400"
          >
            Get a Free Estimate →
          </Link>
        </div>
      </Container>

      <div className="border-t border-graphite-700">
        <Container className="flex flex-col flex-wrap items-center justify-between gap-3 py-6 text-center font-body text-xs text-graphite-300 sm:flex-row sm:text-left">
          <span>
            © {year} {BUSINESS_LEGAL_NAME}. All rights reserved. {HIC_LICENSE}{" "}
            · {NJ_HIC_LICENSE}.
          </span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="text-graphite-300 no-underline hover:text-brand-400">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <span>{BUSINESS_NAME}</span>
          </span>
        </Container>
      </div>
    </footer>
  );
}
