import Link from "next/link";
import type { NavLink } from "@/lib/constants";
import { cn } from "@/lib/cn";

type NavDropdownPanelProps = {
  heading: string;
  href: string;
  items: NavLink[];
  isOpen: boolean;
  onLinkClick?: () => void;
};

export function NavDropdownPanel({
  heading,
  href,
  items,
  isOpen,
  onLinkClick,
}: NavDropdownPanelProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-40 w-[440px] pt-3 transition-all duration-150 ease-out",
        isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-nav">
        <span
          aria-hidden="true"
          className="absolute left-6 top-0 h-[3px] w-10 rounded-full bg-brand-500"
        />

        <div className="border-b border-sand-100 px-6 pb-4 pt-6">
          <p className="font-body text-[11px] font-bold uppercase tracking-[.1em] text-brand-500">
            {heading} Services
          </p>
        </div>

        <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-2 gap-y-1 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className="group/item flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold leading-snug text-graphite-900 no-underline transition-colors duration-150 ease-out hover:bg-brand-50 hover:text-brand-600"
            >
              <span>{item.label}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="flex-none -translate-x-1 text-brand-500 opacity-0 transition-all duration-150 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>

        <Link
          href={href}
          onClick={onLinkClick}
          className="flex items-center justify-between gap-2 border-t border-sand-100 bg-sand-50 px-6 py-3.5 text-sm font-bold text-graphite-900 no-underline transition-colors duration-150 ease-out hover:text-brand-600"
        >
          View all {heading} services
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
