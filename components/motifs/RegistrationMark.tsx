import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A print-production registration/crop mark — thin crosshair in a circle,
 * used sparingly at card corners as a print-craft accent, not clutter. */
export function RegistrationMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={cn("text-ink/25", className)}
      style={style}
      aria-hidden
    >
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
