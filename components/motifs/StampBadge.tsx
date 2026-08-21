import { cn } from "@/lib/utils";

/** Compact proof-point pill — a single short, real claim. Previously a
 * 112px dashed-ring "stamp" with 9px text; shrunk to a pill that hugs its
 * content so it reads as a tag, not an oversized placeholder graphic.
 * Used in the trust section for real, sourced claims only. */
export function StampBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full bg-accent-soft px-3 py-1.5 font-spec text-[10px] font-bold tracking-wide text-accent uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}
