"use client";

import { useState } from "react";
import type { GalleryImage } from "@/lib/constants";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/cn";

type GalleryCarouselProps = {
  images: GalleryImage[];
};

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const count = images.length;
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => (i + count - 1) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="-mx-3.5 flex [--gallery-slide-width:100%] sm:[--gallery-slide-width:50%] xl:[--gallery-slide-width:33.333%]"
            style={{
              transform: `translateX(calc(-${index} * var(--gallery-slide-width)))`,
              transition: "transform .4s ease",
            }}
          >
            {images.map((image) => (
              <div
                key={image.label}
                className="box-border flex-none px-3.5"
                style={{ width: "var(--gallery-slide-width)" }}
              >
                <PlaceholderImage
                  label={image.label}
                  alt={image.alt}
                  aspect="aspect-[4/3]"
                />
                <p className="mt-3 font-body text-[13px] leading-[1.4] text-muted">
                  {image.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-[-22px] top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper font-body text-base font-bold text-text shadow-arrow sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-[-22px] top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper font-body text-base font-bold text-text shadow-arrow sm:flex"
            >
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-7 flex justify-center gap-2.5">
          {images.map((image, i) => (
            <button
              key={image.label}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
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
