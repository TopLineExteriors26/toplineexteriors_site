import type { WhyItem } from "@/lib/constants";

export function WhyCard({ title, desc }: WhyItem) {
  return (
    <div className="rounded-card border border-line bg-paper p-6 text-center shadow-card">
      <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-paper-2">
        <div className="h-3.5 w-3.5 rounded-[3px] bg-accent" />
      </div>
      <div className="mb-2 font-body text-base font-bold text-text">
        {title}
      </div>
      <div className="font-body text-[13px] leading-[1.6] text-muted">
        {desc}
      </div>
    </div>
  );
}
