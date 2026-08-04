import { Reveal } from "@/components/homepage/Reveal";
import { BeforeAfter } from "@/components/homepage/BeforeAfter";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import {
  HOME_REDESIGN_BA_ASIDE,
  HOME_REDESIGN_BA_HEADLINE_LINES,
  HOME_REDESIGN_BA_STATS,
} from "@/lib/constants";

export function BeforeAfterSection() {
  const before = HOMEPAGE_IMAGES.beforeAfterBefore;
  const after = HOMEPAGE_IMAGES.beforeAfterAfter;
  const hasBothPhotos = Boolean(before.src && after.src);

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-[30px] rounded-2xl bg-graphite-900 p-6 lg:p-12">
        <Reveal as="div" className="flex flex-col gap-[30px] lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
          <div className="flex flex-col gap-3.5">
            <span className="w-fit rounded-full bg-brand-500/15 px-3.5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-400">
              Drag the handle
            </span>
            <h2 className="font-display text-display-md leading-none tracking-[-0.03em] text-white">
              {HOME_REDESIGN_BA_HEADLINE_LINES[0]}
              <br />
              {HOME_REDESIGN_BA_HEADLINE_LINES[1]}
            </h2>
          </div>
          <p className="max-w-[340px] text-base leading-relaxed text-graphite-200">
            {HOME_REDESIGN_BA_ASIDE}
          </p>
        </Reveal>

        <Reveal as="div" index={1}>
          {hasBothPhotos && before.src && after.src ? (
            <BeforeAfter
              before={before.src}
              after={after.src}
              beforeAlt={before.alt}
              afterAlt={after.alt}
              className="h-[300px] md:h-[520px]"
            />
          ) : (
            <div className="grid h-[300px] grid-cols-2 gap-1 overflow-hidden rounded-2xl md:h-[520px]">
              <HomePlaceholder caption={before.caption} className="h-full w-full" />
              <HomePlaceholder caption={after.caption} className="h-full w-full" />
            </div>
          )}
        </Reveal>

        <Reveal as="div" index={2} className="grid grid-cols-2 gap-[18px] lg:grid-cols-4">
          {HOME_REDESIGN_BA_STATS.map((stat) => (
            <div key={stat.label} className="rounded-[14px] bg-white/[0.06] p-[22px]">
              <div className="font-display text-display-sm leading-none text-brand-500">{stat.value}</div>
              <div className="mt-1 text-sm text-graphite-200">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
