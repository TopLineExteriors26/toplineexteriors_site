import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <Link href="/" className="flex items-center no-underline" aria-label="TopLine Exteriors home">
        <Image
          src="/logo-full.png"
          alt="TopLine Exteriors"
          width={1448}
          height={1086}
          className="h-10 w-auto opacity-90 invert"
        />
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
