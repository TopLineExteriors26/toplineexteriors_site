"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import {
  DECKS_NAV_LINKS,
  HOME_NAV_LINKS,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  ROOFING_NAV_LINKS,
  SIDING_NAV_LINKS,
} from "@/lib/constants";
import { cn } from "@/lib/cn";

type HeaderVariant = "home" | "roofing" | "decks" | "siding";

type HeaderProps = {
  variant?: HeaderVariant;
};

const NAV_LINKS_BY_VARIANT: Record<HeaderVariant, typeof HOME_NAV_LINKS> = {
  home: HOME_NAV_LINKS,
  roofing: ROOFING_NAV_LINKS,
  decks: DECKS_NAV_LINKS,
  siding: SIDING_NAV_LINKS,
};

const ESTIMATE_HREF_BY_VARIANT: Record<HeaderVariant, string> = {
  home: "/#estimate",
  roofing: "/roofing#estimate",
  decks: "/decks#estimate",
  siding: "/siding#estimate",
};

export function Header({ variant = "home" }: HeaderProps) {
  const pathname = usePathname();
  const links = NAV_LINKS_BY_VARIANT[variant];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:px-10">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 xl:flex xl:gap-[22px]"
        >
          {links.map((link) => {
            const isActive =
              link.href !== "/" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "whitespace-nowrap font-body text-sm font-semibold no-underline transition-colors duration-150 ease-out hover:text-accent",
                  isActive ? "text-accent" : "text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-none items-center gap-4 xl:flex">
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="whitespace-nowrap font-body text-[15px] font-bold text-text no-underline"
          >
            {PHONE_DISPLAY}
          </a>
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            className="whitespace-nowrap rounded-pill bg-accent px-5 py-[11px] font-body text-[13px] font-bold tracking-[.02em] text-white no-underline transition-[filter] duration-150 ease-out hover:brightness-95"
          >
            Free Estimate
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <a
            href={`tel:${PHONE_DIGITS}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-text no-underline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.9 21 3 14.1 3 5.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 1.7Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </a>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-text"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none">
              {isMenuOpen ? (
                <path
                  d="M4 4l12 12M16 4 4 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 ease-out xl:hidden",
          isMenuOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-3 sm:px-8">
          {links.map((link) => {
            const isActive =
              link.href !== "/" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "border-b border-line py-3 font-body text-base font-semibold no-underline last:border-b-0",
                  isActive ? "text-accent" : "text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            onClick={closeMenu}
            className="mt-4 w-full whitespace-nowrap rounded-pill bg-accent px-5 py-3 text-center font-body text-[15px] font-bold tracking-[.02em] text-white no-underline"
          >
            Free Estimate
          </Link>
        </nav>
      </div>
    </header>
  );
}
