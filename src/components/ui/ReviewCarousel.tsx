"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ReviewCarouselProps = {
  reviews: Review[];
  /** "slide": one card at a time, continuous (Home). "paginate": groups of 3 per page (Roofing hub). */
  mode: "slide" | "paginate";
  autoAdvanceMs?: number;
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="h-full rounded-card border border-line border-l-[3px] border-l-accent bg-paper p-8">
      <div className="mb-3.5 font-head text-lg font-bold text-accent">
        {review.stars}
      </div>
      <p className="mb-5 font-body text-sm leading-[1.6] text-text">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="font-body text-[13px] font-bold text-text">
        {review.name}
      </div>
      <div className="font-body text-xs font-medium text-muted">
        {review.meta}
      </div>
    </div>
  );
}

export function ReviewCarousel({
  reviews,
  mode,
  autoAdvanceMs,
}: ReviewCarouselProps) {
  const pages =
    mode === "paginate"
      ? [reviews.slice(0, 3), reviews.slice(3, 6)].filter((p) => p.length > 0)
      : reviews.map((r) => [r]);
  const pageCount = pages.length;
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goPrev = () => setIndex((i) => (i + pageCount - 1) % pageCount);
  const goNext = () => setIndex((i) => (i + 1) % pageCount);

  useEffect(() => {
    if (!autoAdvanceMs) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % pageCount);
    }, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvanceMs, pageCount]);

  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex",
              mode === "slide" &&
                "-mx-3.5 [--review-slide-width:100%] sm:[--review-slide-width:50%] xl:[--review-slide-width:33.333%]"
            )}
            style={{
              transform:
                mode === "slide"
                  ? `translateX(calc(-${index} * var(--review-slide-width)))`
                  : `translateX(-${index * 100}%)`,
              transition:
                mode === "paginate"
                  ? "transform .5s cubic-bezier(.65,0,.35,1)"
                  : "transform .4s ease",
            }}
          >
            {mode === "slide"
              ? reviews.map((review) => (
                  <div
                    key={review.name + review.meta}
                    className="box-border flex-none px-3.5"
                    style={{ width: "var(--review-slide-width)" }}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))
              : pages.map((page, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="grid w-full flex-none grid-cols-1 gap-6 box-border sm:grid-cols-3"
                  >
                    {page.map((review) => (
                      <ReviewCard key={review.name + review.meta} review={review} />
                    ))}
                  </div>
                ))}
          </div>
        </div>

        {pageCount > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous reviews"
              className="absolute left-[-22px] top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-arrow transition-transform duration-150 ease-out hover:scale-105 hover:brightness-95 sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next reviews"
              className="absolute right-[-22px] top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-arrow transition-transform duration-150 ease-out hover:scale-105 hover:brightness-95 sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-7 flex justify-center gap-2.5">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review page ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-[9px] w-[9px] rounded-full border-none p-0",
                i === index ? "bg-accent" : "bg-line"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
