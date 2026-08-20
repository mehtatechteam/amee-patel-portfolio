import { cn } from "@/lib/utils";

/** A rubber-stamp-style circular trust badge — rotated slightly, dashed
 * ring, condensed caps text — reads as an ink-stamp mark rather than a
 * flat icon. Used in the trust section for real, sourced claims only. */
export function StampBadge({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-28 w-28 shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-accent/60 text-center",
        className,
      )}
    >
      <p className="px-3 font-spec text-[9px] leading-tight font-bold tracking-wide text-accent uppercase">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
