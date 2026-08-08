"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { NavDropdownPanel } from "@/components/layout/NavDropdownPanel";

const CLOSE_DELAY_MS = 180;

type HeaderNavLinkProps = {
  link: NavLink;
  isActive: boolean;
  dropdownItems?: NavLink[];
  linkRef: (el: HTMLAnchorElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick?: () => void;
};

export function HeaderNavLink({
  link,
  isActive,
  dropdownItems,
  linkRef,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: HeaderNavLinkProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    onMouseEnter();
    if (!dropdownItems) return;
    clearCloseTimeout();
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    if (!dropdownItems) return;
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={linkRef}
        href={link.href}
        onClick={onLinkClick}
        className={cn(
          "relative z-10 block whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] font-semibold no-underline transition-colors duration-150 ease-out hover:text-brand-500",
          isActive ? "text-brand-500" : "text-graphite-700"
        )}
      >
        {link.label}
      </Link>

      {dropdownItems ? (
        <NavDropdownPanel
          heading={link.label}
          href={link.href}
          items={dropdownItems}
          isOpen={isDropdownOpen}
          onLinkClick={() => setIsDropdownOpen(false)}
        />
      ) : null}
    </div>
  );
}
