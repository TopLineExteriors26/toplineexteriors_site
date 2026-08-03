import Link from "next/link";
import type { NavLink } from "@/lib/constants";
import { cn } from "@/lib/cn";

type NavDropdownPanelProps = {
  items: NavLink[];
  isOpen: boolean;
  onLinkClick?: () => void;
};

export function NavDropdownPanel({
  items,
  isOpen,
  onLinkClick,
}: NavDropdownPanelProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-40 w-[420px] rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6 shadow-card transition-all duration-150 ease-out",
        isOpen
          ? "translate-y-2 opacity-100"
          : "pointer-events-none translate-y-0 opacity-0"
      )}
    >
      <div className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-8 gap-y-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className="font-body text-sm font-semibold leading-snug text-text no-underline transition-colors duration-150 ease-out hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
