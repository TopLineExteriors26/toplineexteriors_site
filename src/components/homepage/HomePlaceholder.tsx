type HomePlaceholderProps = {
  caption: string;
  className?: string;
};

/**
 * Neutral placeholder for a not-yet-supplied homepage photo slot.
 * TODO(client): replace every HomePlaceholder usage with a real photo per
 * README § Images before launch.
 */
export function HomePlaceholder({ caption, className = "" }: HomePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={`flex items-center justify-center bg-sand-100 ${className}`}
    >
      <span className="px-6 text-center font-mono text-[11px] leading-[1.4] text-sand-500">
        [ {caption} ]
      </span>
    </div>
  );
}
