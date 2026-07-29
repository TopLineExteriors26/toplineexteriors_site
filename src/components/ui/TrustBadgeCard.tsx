import type { TrustBadge } from "@/lib/constants";

export function TrustBadgeCard({ value, label }: TrustBadge) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-line border-l-[3px] border-l-accent bg-paper px-[22px] py-5">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M4 10.5 L8 14.5 L16 5.5"
            stroke="#fff"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div className="font-head text-base font-bold text-text">
          {value}
        </div>
        <div className="font-body text-xs font-medium text-muted">
          {label}
        </div>
      </div>
    </div>
  );
}
