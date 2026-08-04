import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  BUSINESS_LEGAL_NAME,
  DECKS_SUB_SERVICES,
  EMAIL,
  HIC_LICENSE,
  HOME_REDESIGN_FOOTER_LINKS,
  NJ_HIC_LICENSE,
  PHONE_DISPLAY,
  ROOFING_SUB_SERVICES,
  SERVICE_AREA_BLURB,
  SIDING_SUB_SERVICES,
  type SubService,
} from "@/lib/constants";

type FooterVariant = "home" | "roofing" | "decks" | "siding";

type FooterProps = {
  variant?: FooterVariant;
};

const SERVICE_HUB_CONFIG: Record<
  Exclude<FooterVariant, "home">,
  { heading: string; subServices: SubService[] }
> = {
  roofing: { heading: "ROOFING SERVICES", subServices: ROOFING_SUB_SERVICES },
  decks: { heading: "DECK SERVICES", subServices: DECKS_SUB_SERVICES },
  siding: { heading: "SIDING SERVICES", subServices: SIDING_SUB_SERVICES },
};

export function Footer({ variant = "home" }: FooterProps) {
  const year = new Date().getFullYear();
  const isHub = variant !== "home";
  const hubConfig = isHub ? SERVICE_HUB_CONFIG[variant] : null;

  if (!isHub) {
    return (
      <footer className="px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-6 rounded-[22px] bg-graphite-900 px-10 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo dark />
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {HOME_REDESIGN_FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-semibold text-graphite-100 no-underline hover:text-brand-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-right text-[13px] leading-normal text-graphite-300">
            {BUSINESS_LEGAL_NAME}
            <br />
            {HIC_LICENSE} · {NJ_HIC_LICENSE}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-graphite-900 text-white">
      <Container
        className="grid grid-cols-1 gap-10 pb-8 pt-16 sm:grid-cols-2 md:pt-[72px] lg:grid-cols-[1.3fr_1fr_1fr]"
      >
        <div>
          <div className="mb-[18px]">
            <Logo dark />
          </div>
          <div className="text-sm leading-[1.8] text-graphite-200">
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
            <br />
            {SERVICE_AREA_BLURB}
          </div>
        </div>

        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[.06em] text-white/90">
            {hubConfig?.heading}
          </div>
          {hubConfig?.subServices.map((s) => (
            <div key={s.title} className="py-1 text-[13px] text-graphite-200">
              {s.title}
            </div>
          ))}
        </div>

        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[.06em] text-white/90">
            COMPANY
          </div>
          <Link href="/" className="block py-1.5 text-sm text-graphite-200 no-underline">
            Home
          </Link>
          <div className="py-1.5 text-sm text-graphite-200">About</div>
          <div className="py-1.5 text-sm text-graphite-200">Contact</div>
        </div>
      </Container>

      <div className="border-t border-graphite-700">
        <Container className="flex flex-wrap justify-between gap-2 py-6 text-xs text-graphite-300">
          <span>
            © {year} {BUSINESS_LEGAL_NAME}. {HIC_LICENSE}. Licensed &amp;
            insured.
          </span>
        </Container>
      </div>
    </footer>
  );
}
