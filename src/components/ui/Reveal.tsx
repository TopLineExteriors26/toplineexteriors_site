"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
  /** Cascade direct children in with a staggered delay instead of animating as one block. */
  stagger?: boolean;
};

export function Reveal({ children, className, as = "div", stagger = false }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement | null>}
      className={cn(
        stagger ? "reveal-stagger" : "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out",
        isVisible
          ? cn(stagger ? "is-visible" : null, "opacity-100 translate-y-0")
          : cn(!stagger && "opacity-0 translate-y-6 motion-reduce:opacity-100"),
        className
      )}
    >
      {children}
    </Tag>
  );
}
