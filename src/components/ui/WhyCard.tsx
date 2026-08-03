import type { WhyIcon, WhyItem } from "@/lib/constants";

const ICONS: Record<WhyIcon, React.ReactNode> = {
  shield: (
    <path
      d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" stroke="var(--color-accent)" strokeWidth="2" />
      <path
        d="M9 14l-2 7 5-2.5 5 2.5-2-7"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  stamp: (
    <>
      <path
        d="M9 4h6l1 5-1 5H9L8 9l1-5z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 20l1.2-4.5A2 2 0 019.13 14h5.74a2 2 0 011.93 1.5L18 20"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  tag: (
    <>
      <path
        d="M20 12.5L12.5 20a1.5 1.5 0 01-2.12 0l-6.38-6.38a1.5 1.5 0 010-2.12L11.5 4H19a1 1 0 011 1v7.5z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="8.5" r="1.25" fill="var(--color-accent)" />
    </>
  ),
  umbrella: (
    <>
      <path
        d="M12 3c4.97 0 9 3.58 9 8H3c0-4.42 4.03-8 9-8z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 11v8" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 19a2 2 0 01-4 0"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" stroke="var(--color-accent)" strokeWidth="2" />
      <path d="M9 4V3.5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 3.5V4" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 11.5l2 2 4-4.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12l8 4.5 8-4.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16.5L12 21l8-4.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  weight: (
    <>
      <path d="M4 20V9l8-5 8 5v11" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20h16" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 20v-6a3 3 0 016 0v6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function WhyCard({ title, desc, icon }: WhyItem) {
  return (
    <div className="rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-6 text-center">
      <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-paper-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {ICONS[icon]}
        </svg>
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
