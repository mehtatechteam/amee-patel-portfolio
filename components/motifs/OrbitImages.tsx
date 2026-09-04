import Image from "next/image";
import { portfolioItems } from "@/lib/constants/portfolio";
import { cn } from "@/lib/utils";

// Real, already-shipped portfolio photos — not placeholders — picked for
// visual variety (different categories) rather than any ranking.
const ORBIT_SLUGS = [
  "organic-amla-powder",
  "medween-pharma-box",
  "lilaura-lavender",
  "paracetamol-tablets-blue",
  "kenheal-healthcare-wellness",
];

/**
 * Classic CSS orbit: one continuously-rotating ring positions each item
 * around a circle via a static per-item angle + translateX, then an inner
 * div per item counter-rotates at the same duration/reverse direction so
 * the thumbnail itself stays upright. Pure CSS animation (see
 * .orbit-ring/.orbit-item-counter in globals.css) — no JS per-frame work.
 */
export function OrbitImages({
  size = 220,
  duration = 26,
  className,
}: {
  size?: number;
  duration?: number;
  className?: string;
}) {
  const images = ORBIT_SLUGS.map((slug) => portfolioItems.find((item) => item.slug === slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
  const radius = size / 2 - 28;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }} aria-hidden>
      <div
        className="orbit-ring absolute inset-0"
        style={{ "--orbit-duration": `${duration}s` } as React.CSSProperties}
      >
        {images.map((item, i) => {
          const angle = (360 / images.length) * i;
          return (
            <div
              key={item.slug}
              className="absolute top-1/2 left-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
            >
              <div
                className="orbit-item-counter -translate-x-1/2 -translate-y-1/2"
                style={{ "--orbit-duration": `${duration}s` } as React.CSSProperties}
              >
                <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-paper shadow-md">
                  <Image src={item.src} alt={item.client} width={44} height={44} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
    </div>
  );
}
