"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function Logo({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (dark) {
    return (
      <Link
        href="/"
        onClick={handleClick}
        className="flex items-center no-underline"
        aria-label="TopLine Exteriors home"
      >
        <Image
          src="/logo-full.png"
          alt="TopLine Exteriors"
          width={1448}
          height={1086}
          className={cn("h-10 w-auto opacity-90 brightness-0 invert", className)}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center no-underline"
      aria-label="TopLine Exteriors home"
    >
      <Image
        src="/logo-full.png"
        alt="TopLine Exteriors"
        width={1448}
        height={1086}
        priority
        className={cn("h-16 w-auto", className)}
      />
    </Link>
  );
}
