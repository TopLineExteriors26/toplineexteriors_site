import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <Link
        href="/"
        className="flex items-baseline gap-[9px] no-underline"
        aria-label="TopLine Exteriors home"
      >
        <span className="font-head text-2xl font-bold uppercase tracking-[.01em] text-white">
          TopLine
        </span>
        <span className="font-body text-xs font-semibold uppercase tracking-[.2em] text-accent">
          Exteriors
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center no-underline" aria-label="TopLine Exteriors home">
      <Image
        src="/logo-full.png"
        alt="TopLine Exteriors"
        width={1448}
        height={1086}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
