import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  BUSINESS_LEGAL_NAME,
  DECKS_SUB_SERVICES,
  EMAIL,
  FOOTER_CITIES,
  FOOTER_SERVICES,
  HIC_LICENSE,
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

  return (
    <footer className="bg-ink text-white">
      <Container
        className={`grid gap-10 pb-8 pt-16 md:pt-[72px] ${
          isHub
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
        }`}
      >
        <div>
          <div className="mb-[18px]">
            <Logo dark />
          </div>
          <div className="font-body text-sm leading-[1.8] text-white/65">
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
            <br />
            {SERVICE_AREA_BLURB}
          </div>
        </div>

        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            {hubConfig ? hubConfig.heading : "SERVICES"}
          </div>
          {hubConfig
            ? hubConfig.subServices.map((s) => (
                <div
                  key={s.title}
                  className="py-1 font-body text-[13px] text-white/60"
                >
                  {s.title}
                </div>
              ))
            : FOOTER_SERVICES.map((s) => (
                <div
                  key={s}
                  className="py-1.5 font-body text-sm text-white/65"
                >
                  {s}
                </div>
              ))}
        </div>

        {variant === "home" && (
          <div>
            <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
              SERVICE AREA
            </div>
            {FOOTER_CITIES.map((city) => (
              <div
                key={city}
                className="py-1.5 font-body text-sm text-white/65"
              >
                {city}
              </div>
            ))}
          </div>
        )}

        <div>
          <div className="mb-4 font-body text-[13px] font-bold tracking-[.06em] text-white/90">
            COMPANY
          </div>
          <Link
            href="/"
            className="block py-1.5 font-body text-sm text-white/65 no-underline"
          >
            Home
          </Link>
          <div className="py-1.5 font-body text-sm text-white/65">About</div>
          <div className="py-1.5 font-body text-sm text-white/65">
            Contact
          </div>
          {variant === "home" && (
            <Link
              href="/privacy"
              className="block py-1.5 font-body text-sm text-white/65 no-underline"
            >
              Privacy Policy
            </Link>
          )}
        </div>
      </Container>

      <div className="border-t border-white/[.14]">
        <Container className="flex flex-wrap justify-between gap-2 py-6 font-body text-xs text-white/45">
          <span>
            © {year} {BUSINESS_LEGAL_NAME}. {HIC_LICENSE}. Licensed &amp;
            insured.
          </span>
        </Container>
      </div>
    </footer>
  );
}
