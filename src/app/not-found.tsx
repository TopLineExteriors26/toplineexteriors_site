import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for couldn't be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header variant="home" />
      <main className="flex-1">
        <section className="bg-paper">
          <Container className="flex flex-col items-center py-24 text-center md:py-32">
            <p className="mb-4 font-head text-6xl font-bold text-accent md:text-7xl">
              404
            </p>
            <h1 className="mb-4 max-w-[20ch] font-head text-3xl font-bold text-text md:text-4xl">
              We couldn&rsquo;t find that page.
            </h1>
            <p className="mb-10 max-w-[55ch] font-body text-base leading-[1.6] text-muted md:text-lg">
              The page you&rsquo;re looking for may have been moved or no
              longer exists. Let&rsquo;s get you back on track — or straight
              to a free estimate.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button href="/" variant="primary">
                Back to Homepage
              </Button>
              <Button href="/#estimate" variant="secondary">
                Get a Free Estimate
              </Button>
            </div>

            <nav
              aria-label="Popular pages"
              className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-line pt-10"
            >
              <Link
                href="/roofing"
                className="font-body text-sm font-semibold text-text no-underline hover:text-accent"
              >
                Roofing
              </Link>
              <Link
                href="/decks"
                className="font-body text-sm font-semibold text-text no-underline hover:text-accent"
              >
                Decks
              </Link>
              <Link
                href="/siding"
                className="font-body text-sm font-semibold text-text no-underline hover:text-accent"
              >
                Siding
              </Link>
              <Link
                href="/#projects"
                className="font-body text-sm font-semibold text-text no-underline hover:text-accent"
              >
                Recent Projects
              </Link>
              <Link
                href="/#estimate"
                className="font-body text-sm font-semibold text-text no-underline hover:text-accent"
              >
                Contact
              </Link>
            </nav>
          </Container>
        </section>
      </main>
      <Footer variant="home" />
    </>
  );
}
