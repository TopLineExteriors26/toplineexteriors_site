import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  maxWidthPx?: number;
};

export function Container({
  children,
  className,
  narrow,
  maxWidthPx,
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", !maxWidthPx && (narrow ? "max-w-[1000px]" : "max-w-[1440px]"), className)}
      style={maxWidthPx ? { maxWidth: maxWidthPx } : undefined}
    >
      {children}
    </div>
  );
}
