"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger inside a grid: 0, 1, 2… → 0ms, 90ms, 180ms */
  index?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fade + 26px rise once, when the element enters the viewport.
 * Renders visible-by-default on the server so content is never hidden
 * if JS fails; the hidden class is applied only after mount.
 */
export function Reveal({ children, index = 0, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety: never leave content invisible.
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const state = !armed || shown ? "reveal-in" : "reveal-init";

  return (
    <Tag
      ref={ref as never}
      className={`${armed ? "reveal-init" : ""} ${state} ${className}`.trim()}
      style={armed && !shown ? { transitionDelay: `${index * 90}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
