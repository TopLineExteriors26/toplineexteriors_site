"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Starting handle position, 0–100 */
  initial?: number;
  className?: string;
};

/**
 * Draggable before/after wipe. The BEFORE image sits on top and is clipped
 * from the right; a native range input is the only control, so it works with
 * keyboard, touch and screen readers for free.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  initial = 48,
  className = "",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(initial);
  const id = useId();

  return (
    <div className={`relative h-[520px] overflow-hidden rounded-2xl ${className}`}>
      <Image src={after} alt={afterAlt} fill sizes="100vw" className="object-cover" priority={false} />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="100vw" className="object-cover" />
      </div>

      <div
        aria-hidden
        className="absolute inset-y-0 w-[3px] bg-brand-500"
        style={{ left: `calc(${pos}% - 1.5px)` }}
      />

      <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3.5 py-2 text-xs font-bold tracking-[0.14em] text-white">
        BEFORE
      </span>
      <span className="absolute right-5 top-5 rounded-full bg-brand-500 px-3.5 py-2 text-xs font-bold tracking-[0.14em] text-white">
        AFTER
      </span>

      <label htmlFor={id} className="sr-only">
        Reveal the finished roof
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba-range absolute inset-x-0 top-1/2 h-[34px] w-full -translate-y-1/2 cursor-ew-resize"
      />
    </div>
  );
}
