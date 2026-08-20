import { cn } from "@/lib/utils";

const inks = [
  { name: "C", className: "bg-cyan" },
  { name: "M", className: "bg-magenta" },
  { name: "Y", className: "bg-yellow" },
  { name: "K", className: "bg-ink" },
];

/**
 * A small CMYK color-separation swatch — four ink dots, the literal
 * production process behind print/packaging work. Used as a recurring
 * print-shop motif (nav, section headers, About spec card), not a random
 * decorative gradient.
 */
export function CMYKSwatch({ size = "sm", className }: { size?: "sm" | "md"; className?: string }) {
  const dot = size === "sm" ? "h-2 w-2" : "h-3 w-3";
  return (
    <div className={cn("flex items-center gap-1", className)} aria-hidden>
      {inks.map((ink) => (
        <span key={ink.name} className={cn("rounded-full", dot, ink.className)} />
      ))}
    </div>
  );
}
