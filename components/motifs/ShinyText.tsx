import { cn } from "@/lib/utils";

/**
 * Gradient sweep clipped to text (see .shiny-text in globals.css). Pure
 * CSS, no animation library — the sweep speed/colors are custom
 * properties so callers can override without new class variants.
 */
export function ShinyText({
  text,
  speed = 3,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={{ "--shiny-duration": `${speed}s` } as React.CSSProperties}
    >
      {text}
    </span>
  );
}
