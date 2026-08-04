"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { HeaderNavLink } from "@/components/layout/HeaderNavLink";
import {
  DECKS_NAV_LINKS,
  HOME_NAV_LINKS,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  ROOFING_NAV_LINKS,
  SIDING_NAV_LINKS,
  type NavLink,
} from "@/lib/constants";
import {
  DECKS_HUB_CONFIG,
  ROOFING_HUB_CONFIG,
  SIDING_HUB_CONFIG,
  navDropdownItemsFor,
} from "@/lib/hubConfigs";
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

const DROPDOWN_ITEMS_BY_HREF: Record<string, NavLink[]> = {
  "/roofing": navDropdownItemsFor(ROOFING_HUB_CONFIG),
  "/decks": navDropdownItemsFor(DECKS_HUB_CONFIG),
  "/siding": navDropdownItemsFor(SIDING_HUB_CONFIG),
};

export function Header({ variant = "home" }: HeaderProps) {
  const pathname = usePathname();
  const links = NAV_LINKS_BY_VARIANT[variant];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState<{ left: string; width: string }>({
    left: "0px",
    width: "0px",
  });
  const [activeStyle, setActiveStyle] = useState<{ left: string; width: string }>({
    left: "0px",
    width: "0px",
  });

  const activeIndex = links.findIndex(
    (link) => link.href !== "/" && pathname.startsWith(link.href)
  );

  // Each nav item wraps its <Link> in its own `position: relative` div (needed
  // so the dropdown panel can anchor under just that item), which makes that
  // wrapper the link's offsetParent. That means `link.offsetLeft` is relative
  // to the individual item, not the <nav> — always ~0. Measure via
  // getBoundingClientRect() against the nav container instead.
  const measureAgainstNav = (el: HTMLAnchorElement) => {
    const nav = navRef.current;
    if (!nav) return null;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return { left: `${elRect.left - navRect.left}px`, width: `${elRect.width}px` };
  };

  useEffect(() => {
    if (hoveredIndex === null) return;
    const el = linkRefs.current[hoveredIndex];
    if (!el) return;
    const style = measureAgainstNav(el);
    if (style) setHoverStyle(style);
  }, [hoveredIndex]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const el = linkRefs.current[activeIndex];
    if (!el) return;
    const style = measureAgainstNav(el);
    if (style) setActiveStyle(style);
  }, [activeIndex, links]);

  const activeIndicatorOpacity = activeIndex < 0 ? 0 : 1;

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-[padding,background-color] duration-300 ease-out",
        isScrolled ? "xl:bg-transparent xl:px-4 xl:pt-3" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between gap-4 border border-transparent bg-white transition-[max-width,padding,border-radius,box-shadow] duration-300 ease-out",
          isScrolled
            ? "xl:max-w-[1080px] xl:rounded-full xl:border-sand-200 xl:px-6 xl:py-1.5 xl:shadow-nav"
            : "max-w-[1440px] rounded-full border-sand-200 px-6 py-2 shadow-nav sm:px-8 lg:px-10"
        )}
      >
        <Logo />

        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden items-center xl:flex"
        >
          <div
            className="pointer-events-none absolute top-0 h-[34px] rounded-full bg-sand-100 transition-all duration-300 ease-out"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-[2px] h-[2px] bg-brand-500 transition-all duration-300 ease-out"
            style={{ ...activeStyle, opacity: activeIndicatorOpacity }}
          />

          {links.map((link, index) => {
            const isActive = index === activeIndex;
            return (
              <HeaderNavLink
                key={link.label}
                link={link}
                isActive={isActive}
                dropdownItems={DROPDOWN_ITEMS_BY_HREF[link.href]}
                linkRef={(el) => {
                  linkRefs.current[index] = el;
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() =>
                  setHoveredIndex((current) => (current === index ? null : current))
                }
              />
            );
          })}
        </nav>

        <div className="hidden flex-none items-center gap-4 xl:flex">
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="whitespace-nowrap text-[17px] font-bold text-graphite-900 no-underline"
          >
            {PHONE_DISPLAY}
          </a>
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            className="whitespace-nowrap rounded-full bg-brand-500 px-6 py-3.5 text-[15px] font-bold text-white no-underline transition-colors duration-150 ease-out hover:bg-brand-600"
          >
            Free Estimate
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <a
            href={`tel:${PHONE_DIGITS}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand-200 text-graphite-900 no-underline"
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
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand-200 text-graphite-900"
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
          "overflow-hidden rounded-b-2xl border-t border-sand-200 bg-white transition-[max-height] duration-300 ease-out xl:hidden",
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
                  "min-h-[44px] border-b border-sand-200 py-3 text-base font-semibold no-underline last:border-b-0",
                  isActive ? "text-brand-500" : "text-graphite-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ESTIMATE_HREF_BY_VARIANT[variant]}
            onClick={closeMenu}
            className="mt-4 min-h-[44px] w-full whitespace-nowrap rounded-full bg-brand-500 px-5 py-3 text-center text-[15px] font-bold text-white no-underline"
          >
            Free Estimate
          </Link>
        </nav>
      </div>
    </header>
  );
}
