"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Faq } from "@/lib/constants";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  faqs: Faq[];
  columns?: 1 | 2;
};

export function FaqAccordion({ faqs, columns = 2 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const isOddLast = columns === 2 && faqs.length % 2 === 1;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-stagger grid grid-cols-1 items-start gap-5",
        columns === 2 && "md:grid-cols-2",
        isVisible && "is-visible"
      )}
    >
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
                    "flex h-7 w-7 flex-none items-center justify-center rounded-full font-body text-[15px] font-bold transition-[transform,background-color,color] duration-200 ease-out",
                    isOpen
                      ? "rotate-180 bg-accent text-white"
                      : "border-[1.5px] border-accent text-accent"
                  )}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="border-t border-line px-6 pb-6 pt-[18px] font-body text-sm leading-[1.7] text-muted">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
