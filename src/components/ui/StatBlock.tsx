import type { Stat } from "@/lib/constants";

export function StatBlock({ value, label }: Stat) {
  return (
    <div className="text-center">
      <div className="font-head text-[28px] font-bold text-accent 2xl:text-[40px]">
        {value}
      </div>
      <div className="mt-1.5 font-body text-[13px] font-medium text-white/65">
        {label}
      </div>
    </div>
  );
}
