import type { SVGProps } from "react";

/**
 * Hand-authored line icons — replaces raw emoji (📦 📰 🚀 💻 ✨ 🖋️ 🖨️ 📣) that
 * rendered as full-color platform glyphs, breaking the site's single-accent
 * design discipline (see app/globals.css). Same stroke convention as the
 * carousel's prev/next arrows (components/portfolio/PortfolioCarousel.tsx):
 * stroke=currentColor, strokeWidth=1.75, round caps/joins, no fill.
 */

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8l9-5 9 5-9 5-9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

export function IconDocument(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h9l3 3v15H6V3Z" />
      <path d="M15 3v3h3" />
      <path d="M9 12h6M9 16h6M9 8h2" />
    </svg>
  );
}

export function IconMegaphone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l2 6h2l-1-6h4l6 4V5l-6 4H6a2 2 0 0 0-2 2Z" />
      <path d="M11 9V5" />
    </svg>
  );
}

export function IconMonitor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function IconSparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  );
}

export function IconPen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1-4L16 5l3 3L8 19l-4 1Z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

export function IconPrinter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9V3h12v6" />
      <rect x="4" y="9" width="16" height="8" rx="1.5" />
      <path d="M6 17v4h12v-4" />
    </svg>
  );
}

export function IconCapsule(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

export function IconMap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4 3 6.5v13L9 17l6 3 6-2.5v-13L15 7 9 4Z" />
      <path d="M9 4v13M15 7v13" />
    </svg>
  );
}

export function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7 14h3M7 17h3M14 14h3M14 17h3" />
    </svg>
  );
}

export function IconWave(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 13.5v-8a1.5 1.5 0 0 1 3 0v6" />
      <path d="M11.5 11.5v-1a1.5 1.5 0 0 1 3 0v1.5" />
      <path d="M14.5 12v-.5a1.5 1.5 0 0 1 3 0V13" />
      <path d="M17.5 13v1a1.5 1.5 0 0 1 3 0v2.5c0 3.31-2.69 6-6 6h-2a6 6 0 0 1-5-2.7L4.8 15.9a1.4 1.4 0 0 1 .5-2 1.42 1.42 0 0 1 1.8.35L8.5 16" />
    </svg>
  );
}

export function IconDielineFold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h16v16H4z" strokeDasharray="2.5 2.5" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

export function IconTrifold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6v13l6.5-2.5V4L3 6Z" />
      <path d="M9.5 4v12.5l5 2V6.5l-5-2.5Z" />
      <path d="M14.5 6.5v14L21 18V5l-6.5 1.5Z" />
    </svg>
  );
}

export function IconPenAnchor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18C8 10 14 8 20 6" />
      <rect x="2.5" y="16.5" width="3" height="3" />
      <rect x="18.5" y="4.5" width="3" height="3" />
      <path d="M10 12.5l3-2" />
      <circle cx="10" cy="12.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHalftone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="6" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="6" cy="13.5" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="14" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="19.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="19.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconWaxSeal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c.6 1.2 1.7 1.8 2.9 1.4.4 1.3 1.4 2 2.7 1.9.1 1.3.9 2.2 2.1 2.5-.6 1.2-.5 2.3.4 3.2-.9.9-1 2-.4 3.2-1.2.3-2 1.2-2.1 2.5-1.3-.1-2.3.6-2.7 1.9-1.2-.4-2.3.2-2.9 1.4-.6-1.2-1.7-1.8-2.9-1.4-.4-1.3-1.4-2-2.7-1.9-.1-1.3-.9-2.2-2.1-2.5.6-1.2.5-2.3-.4-3.2.9-.9 1-2 .4-3.2 1.2-.3 2-1.2 2.1-2.5 1.3.1 2.3-.6 2.7-1.9.6.4 1.7-.2 2.9-1.4Z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

export const iconMap = {
  box: IconBox,
  document: IconDocument,
  megaphone: IconMegaphone,
  monitor: IconMonitor,
  sparkle: IconSparkle,
  pen: IconPen,
  printer: IconPrinter,
  capsule: IconCapsule,
  pin: IconPin,
  map: IconMap,
  calendar: IconCalendar,
  wave: IconWave,
  dielineFold: IconDielineFold,
  trifold: IconTrifold,
  penAnchor: IconPenAnchor,
  halftone: IconHalftone,
  waxSeal: IconWaxSeal,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
}
