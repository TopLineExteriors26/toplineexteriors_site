import { cn } from "@/lib/cn";

type PlaceholderImageProps = {
  label: string;
  alt: string;
  aspect?: string;
  className?: string;
  rounded?: boolean;
  bordered?: boolean;
};

export function PlaceholderImage({
  label,
  alt,
  aspect = "aspect-[4/3]",
  className,
  rounded = true,
  bordered = true,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        aspect,
        "flex w-full items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(0,0,0,.05)_0_10px,rgba(0,0,0,.02)_10px_20px)]",
        bordered && "border border-line",
        rounded && "rounded-card",
        className
      )}
    >
      <span className="px-6 text-center font-mono text-[13px] leading-[1.4] text-muted">
        {label}
      </span>
    </div>
  );
}
