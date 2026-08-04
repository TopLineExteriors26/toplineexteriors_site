import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/homepage/Reveal";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import {
  HOME_REDESIGN_EYEBROW,
  HOME_REDESIGN_HERO_LINES,
  HOME_REDESIGN_LEDE,
  HOME_REDESIGN_SECONDARY_CTA,
  HOME_REDESIGN_REPLY_STAT,
  HOME_REDESIGN_REPLY_CAPTION,
} from "@/lib/constants";

export function Hero() {
  const hero = HOMEPAGE_IMAGES.hero;

  return (
    <section className="grid grid-cols-1 items-center gap-12 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:px-10">
      <Reveal className="flex flex-col gap-[26px]" as="div">
        <div className="inline-flex w-fit items-center gap-2.5 self-start rounded-full bg-brand-50 px-4 py-2.5">
          <span className="size-[7px] rounded-full bg-brand-500" aria-hidden="true" />
          <span className="text-[13px] font-bold tracking-[0.06em] text-brand-700">
            {HOME_REDESIGN_EYEBROW}
          </span>
        </div>

        <h1 className="[text-wrap:balance] font-display text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.035em] text-graphite-950 lg:text-display-xl">
          {HOME_REDESIGN_HERO_LINES[0]}
          <br />
          {HOME_REDESIGN_HERO_LINES[1]}
          <br />
          <span className="text-brand-500">{HOME_REDESIGN_HERO_LINES[2]}</span>
        </h1>

        <p className="max-w-[540px] text-xl leading-relaxed text-graphite-500">
          {HOME_REDESIGN_LEDE}
        </p>

        <div className="flex flex-wrap gap-3.5 pt-1.5">
          <Link
            href="/#estimate"
            className="rounded-lg bg-brand-500 px-8 py-5 text-[17px] font-bold text-white shadow-home-cta transition-colors hover:bg-brand-600"
          >
            Get my free estimate →
          </Link>
          <Link
            href="/#projects"
            className="rounded-lg border border-sand-300 px-7 py-[19px] text-[17px] font-semibold text-graphite-900 transition-colors hover:bg-sand-100"
          >
            {HOME_REDESIGN_SECONDARY_CTA}
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-[17px] text-brand-500" aria-hidden="true">★★★★★</span>
            <span className="text-[15px] text-graphite-500">
              <span className="font-bold text-graphite-950">4.9</span> · 180+ Google reviews
            </span>
          </div>
          <span className="hidden h-[22px] w-px bg-sand-200 sm:block" aria-hidden="true" />
          <span className="text-[15px] text-graphite-500">
            Licensed in <span className="font-bold text-graphite-950">PA &amp; NJ</span>
          </span>
        </div>
      </Reveal>

      <Reveal className="relative" as="div" index={1}>
        {hero.src ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            width={720}
            height={600}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-[380px] w-full rounded-xl object-cover lg:h-[600px]"
          />
        ) : (
          <HomePlaceholder caption={hero.caption} className="h-[380px] w-full rounded-xl lg:h-[600px]" />
        )}

        <div className="relative mt-4 flex items-center gap-5 rounded-xl bg-graphite-900 p-6 shadow-float lg:absolute lg:-bottom-[18px] lg:-left-[22px] lg:mt-0">
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-display-sm text-white">{HOME_REDESIGN_REPLY_STAT.value}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite-200">
              {HOME_REDESIGN_REPLY_STAT.label}
            </span>
          </div>
          <span className="h-10 w-px bg-graphite-700" aria-hidden="true" />
          <p className="max-w-[170px] text-sm leading-[1.45] text-graphite-100">
            {HOME_REDESIGN_REPLY_CAPTION}
          </p>
        </div>

        <div className="absolute -left-[18px] -top-3.5 hidden h-[54px] w-auto rounded-lg bg-white px-3 py-2 shadow-[0_8px_22px_rgb(20_20_20/0.12)] lg:block">
          <Image
            src="/logo-full.png"
            alt=""
            width={1448}
            height={1086}
            className="h-full w-auto"
          />
        </div>
      </Reveal>
    </section>
  );
}
