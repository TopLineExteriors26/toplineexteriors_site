"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ReviewCarouselProps = {
  reviews: Review[];
  /** "slide": one card at a time, continuous (Home). "paginate": groups of 3 per page on desktop, one per page on mobile (hub pages). */
  mode: "slide" | "paginate";
  autoAdvanceMs?: number;
  /** "lg" gives the card more padding and bigger stars — used where a page shows a single, unpaginated set of 3 (hub pages). Defaults to the original size. */
  cardSize?: "default" | "lg";
};

function ReviewCard({ review, size = "default" }: { review: Review; size?: "default" | "lg" }) {
  const isLg = size === "lg";
  return (
    <div
      className={cn(
        "h-full rounded-card border border-line border-l-[3px] border-l-accent bg-paper",
        isLg ? "p-10" : "p-8"
      )}
    >
      <div
        className={cn(
          "font-head font-bold text-accent",
          isLg ? "mb-5 text-2xl" : "mb-3.5 text-lg"
        )}
      >
        {review.stars}
      </div>
      <p
        className={cn(
          "font-body leading-[1.6] text-text",
          isLg ? "mb-6 text-base" : "mb-5 text-sm"
        )}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div className={cn("font-body font-bold text-text", isLg ? "text-base" : "text-[13px]")}>
        {review.name}
      </div>
      <div className={cn("font-body font-medium text-muted", isLg ? "text-sm" : "text-xs")}>
        {review.meta}
      </div>
    </div>
  );
}

const PAGE_SIZE_DESKTOP = 3;
const PAGE_SIZE_MOBILE = 1;

export function ReviewCarousel({
  reviews,
  mode,
  autoAdvanceMs,
  cardSize = "default",
}: ReviewCarouselProps) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP);

  useEffect(() => {
    if (mode !== "paginate") return;
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setPageSize(query.matches ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [mode]);

  const pages =
    mode === "paginate"
      ? Array.from({ length: Math.ceil(reviews.length / pageSize) }, (_, i) =>
          reviews.slice(i * pageSize, i * pageSize + pageSize)
        )
      : reviews.map((r) => [r]);
  const pageCount = pages.length;
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [pageSize]);

  const goPrev = () => setIndex((i) => (i + pageCount - 1) % pageCount);
  const goNext = () => setIndex((i) => (i + 1) % pageCount);

  const [dragOffset, setDragOffset] = useState(0);
  const dragState = useRef<{ startX: number; pointerId: number } | null>(null);
  const SWIPE_THRESHOLD_PX = 40;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragState.current = { startX: e.clientX, pointerId: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    setDragOffset(e.clientX - dragState.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    const delta = e.clientX - dragState.current.startX;
    dragState.current = null;
    setDragOffset(0);
    if (delta <= -SWIPE_THRESHOLD_PX) goNext();
    else if (delta >= SWIPE_THRESHOLD_PX) goPrev();
  };

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
        <div
          className="touch-pan-y overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className="-mx-3.5 flex"
            style={{
              transform:
                mode === "slide"
                  ? `translateX(calc(-${index} * var(--review-slide-width) + ${dragOffset}px))`
                  : `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
              transition: dragState.current
                ? "none"
                : mode === "paginate"
                  ? "transform .5s cubic-bezier(.65,0,.35,1)"
                  : "transform .4s ease",
            }}
          >
            {mode === "slide"
              ? reviews.map((review) => (
                  <div
                    key={review.name + review.meta}
                    className="box-border flex-none px-3.5 [--review-slide-width:100%] sm:[--review-slide-width:50%] xl:[--review-slide-width:33.333%]"
                    style={{ width: "var(--review-slide-width)" }}
                  >
                    <ReviewCard review={review} size={cardSize} />
                  </div>
                ))
              : pages.map((page, pageIdx) => (
                  <div key={pageIdx} className="box-border w-full flex-none px-3.5">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {page.map((review) => (
                        <ReviewCard key={review.name + review.meta} review={review} size={cardSize} />
                      ))}
                    </div>
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
