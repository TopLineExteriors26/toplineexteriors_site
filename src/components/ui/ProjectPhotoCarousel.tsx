"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectPhoto = {
  src: string;
  alt: string;
};

type ProjectPhotoCarouselProps = {
  photos: ProjectPhoto[];
};

export function ProjectPhotoCarousel({ photos }: ProjectPhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  const goNext = () => setIndex((i) => (i + 1) % count);
  const goPrev = () => setIndex((i) => (i + count - 1) % count);

  const next = photos[(index + 1) % count];
  const showSecond = count > 1;

  return (
    <div>
      <div
        className={
          showSecond
            ? "grid grid-cols-1 gap-4 sm:grid-cols-[1.6fr_1fr]"
            : "grid grid-cols-1"
        }
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line">
          {photos.map((photo, i) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="(min-width: 640px) 55vw, 100vw"
              className={`object-cover transition-opacity duration-300 ease-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          ))}
        </div>

        {showSecond && (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-card border border-line sm:block">
            <Image
              src={next.src}
              alt={next.alt}
              fill
              sizes="35vw"
              className="object-cover transition-opacity duration-300 ease-out"
            />
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="flex h-11 w-11 items-center justify-center rounded-input border border-line bg-paper text-text transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-body text-sm text-muted">
            <span className="font-bold text-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="flex h-11 w-11 items-center justify-center rounded-input border border-line bg-paper text-text transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
