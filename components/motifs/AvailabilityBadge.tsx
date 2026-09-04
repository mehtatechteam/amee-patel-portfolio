import { cn } from "@/lib/utils";

/** Real status, not a fabricated "X clients this month" style claim —
 * just an honest "currently taking projects" signal. */
export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-1.5 text-xs font-medium", className)}>
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for new projects
    </span>
  );
}
