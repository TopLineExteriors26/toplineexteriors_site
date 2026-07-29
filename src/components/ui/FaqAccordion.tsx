"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/constants";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  faqs: Faq[];
};

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const isOddLast = faqs.length % 2 === 1;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        const isLastOdd = isOddLast && i === faqs.length - 1;

        return (
          <div
            key={faq.q}
            className={cn(
              "overflow-hidden rounded-card border border-line border-l-[3px] border-l-accent bg-paper",
              isLastOdd && "md:col-span-2"
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-[22px] text-left"
              >
                <span className="font-body text-base font-bold text-text">
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 flex-none items-center justify-center rounded-full font-body text-[15px] font-bold",
                    isOpen
                      ? "bg-accent text-white"
                      : "border-[1.5px] border-accent text-accent"
                  )}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="border-t border-line px-6 pb-6 pt-[18px] font-body text-sm leading-[1.7] text-muted"
              >
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
