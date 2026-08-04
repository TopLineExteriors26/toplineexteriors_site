import { Reveal } from "@/components/homepage/Reveal";
import { HOME_REDESIGN_REVIEWS } from "@/lib/constants";

export function Reviews() {
  return (
    <section className="grid grid-cols-1 gap-[22px] px-5 pb-5 pt-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
      {HOME_REDESIGN_REVIEWS.map((review, i) => (
        <Reveal key={review.attribution} as="div" index={i} className="flex flex-col gap-3.5 rounded-xl bg-sand-100 p-7">
          <span className="text-base text-brand-500" aria-hidden="true">★★★★★</span>
          <p className="text-[17px] leading-snug text-graphite-900">&ldquo;{review.quote}&rdquo;</p>
          <span className="text-sm font-bold text-sand-600">{review.attribution}</span>
        </Reveal>
      ))}
    </section>
  );
}
