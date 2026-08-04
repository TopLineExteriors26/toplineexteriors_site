import { Reveal } from "@/components/homepage/Reveal";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { HOME_REDESIGN_FORM_STEPS } from "@/lib/constants";

export function EstimateSection() {
  return (
    <section
      id="estimate"
      className="scroll-mt-20 grid grid-cols-1 items-start gap-10 px-5 pb-10 pt-15 sm:px-8 lg:grid-cols-2 lg:gap-15 lg:px-10"
    >
      <Reveal as="div" className="flex flex-col gap-6">
        <h2 className="font-display text-display-lg leading-[0.98] tracking-[-0.035em] text-graphite-950">
          Tell us what&rsquo;s wrong. We&rsquo;ll price it.
        </h2>
        <p className="max-w-[470px] text-[19px] leading-relaxed text-graphite-500">
          Two minutes now, a real number within 48 hours — no sales visit required just to get a
          range.
        </p>
        <div className="flex flex-col gap-3 pt-1.5">
          {HOME_REDESIGN_FORM_STEPS.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3.5 rounded-[14px] bg-sand-100 px-[18px] py-4"
            >
              <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-brand-500 text-[13px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-base font-semibold text-graphite-900">{step}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="div" index={1}>
        <EstimateForm
          variant="redesign"
          showServiceChips
          projectPlaceholder="Leak over the kitchen since the last storm…"
          submitLabel="Request my free estimate"
        />
      </Reveal>
    </section>
  );
}
