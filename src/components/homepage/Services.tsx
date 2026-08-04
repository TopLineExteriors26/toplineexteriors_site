import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/homepage/Reveal";
import { HomePlaceholder } from "@/components/homepage/HomePlaceholder";
import { HOMEPAGE_IMAGES } from "@/content/homepage";
import { HOME_REDESIGN_SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section className="flex flex-col gap-8 px-5 py-[60px] sm:px-8 lg:px-10">
      <Reveal as="div" className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-500">
            What we do
          </span>
          <h2 className="font-display text-display-md leading-none tracking-[-0.03em] text-graphite-950">
            Three trades. One crew.
          </h2>
        </div>
        <p className="max-w-[380px] text-[17px] leading-relaxed text-graphite-500">
          Same team from estimate to final walkthrough, so nothing gets lost between trades.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {HOME_REDESIGN_SERVICES.map((service, i) => {
          const image = HOMEPAGE_IMAGES[service.imageSlot];
          return (
            <Reveal key={service.title} as="div" index={i}>
              <Link
                href={service.href}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-sand-200 bg-white transition-shadow duration-200 hover:shadow-home-card"
              >
                <div className="relative m-3 h-[230px] overflow-hidden rounded-[14px]">
                  {image.src ? (
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <HomePlaceholder caption={image.caption} className="h-full w-full" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[27px] font-bold tracking-[-0.02em] text-graphite-950">
                      {service.title}
                    </h3>
                    <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand-50 text-[15px] font-bold text-brand-500">
                      →
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-graphite-500">{service.body}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {service.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full bg-sand-100 px-3.5 py-1.5 text-[13px] font-semibold text-sand-600"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
