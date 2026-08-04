import { Reveal } from "@/components/homepage/Reveal";
import { HOME_REDESIGN_TRUST_BRANDS, HOME_REDESIGN_TRUST_LABEL } from "@/lib/constants";

export function TrustStrip() {
  return (
    <section className="px-5 py-[34px] sm:px-8 lg:px-10">
      <Reveal
        as="div"
        className="flex flex-col gap-4 overflow-x-auto rounded-xl bg-sand-100 px-6 py-[22px] sm:flex-row sm:items-center sm:justify-between lg:px-[30px]"
      >
        <span className="whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.14em] text-sand-500">
          {HOME_REDESIGN_TRUST_LABEL}
        </span>
        <div className="flex snap-x gap-3 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {HOME_REDESIGN_TRUST_BRANDS.map((brand) => (
            <span
              key={brand}
              className="shrink-0 snap-start rounded-lg bg-white px-6 py-3 text-[15px] font-bold text-graphite-700"
            >
              {brand}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
