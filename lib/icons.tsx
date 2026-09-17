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

// Real software logotypes for the "Tool Kit" pills — solid-fill brand
// marks (path data from Simple Icons, MIT-licensed), not the hand-drawn
// stroke icons above. currentColor only: the card is single-accent/ink
// throughout, so these stay monochrome rather than each tool's own brand
// color, matching that discipline instead of breaking it.
const brandBase: SVGProps<SVGSVGElement> = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

export function IconCorelDraw(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...brandBase} {...props}>
      <path d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536.072 4.145 3.847 11.191 6.397 13.455 0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0Zm2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013 2.547-2.264 6.324-9.31 6.396-13.455-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0Zm-1.38.019a1.088 1.088 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984.268-4.677-.688-7.674-2.219-8.501a1.088 1.088 0 0 0-.555-.144ZM7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2.503.457-5.777-6.548-6.386-12.699-.291-2.323.39-4.9 2.986-6.66Zm9.966 0c2.595 1.76 3.276 4.337 2.985 6.66-.608 6.151-6.888 13.156-6.386 12.699 1.398-1.205 6.103-6.88 6.987-12.2.888-5.316-3.586-7.159-3.586-7.159Zm-6.815 20.78L10.647 24h2.599l.488-2.154h-3.566Z" />
    </svg>
  );
}

export function IconPhotoshop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...brandBase} {...props}>
      <path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.46-.7-.57zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.899c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.391 11.65c-.399.56-.959.98-1.609 1.22-.68.25-1.43.34-2.25.34-.24 0-.4 0-.5-.01s-.24-.01-.43-.01v3.209c.01.07-.04.131-.11.141H5.52c-.08 0-.12-.041-.12-.131V6.42c0-.07.03-.11.1-.11.17 0 .33 0 .56-.01.24-.01.49-.01.76-.02s.56-.01.87-.02c.31-.01.61-.01.91-.01.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.149.42.229.85.229 1.3.001.86-.199 1.57-.6 2.13zm7.091 3.89c-.28.4-.671.709-1.12.891-.49.209-1.09.318-1.811.318-.459 0-.91-.039-1.359-.129-.35-.061-.7-.17-1.02-.32-.07-.039-.121-.109-.111-.189v-1.74c0-.029.011-.07.041-.09.029-.02.06-.01.09.01.39.23.8.391 1.24.49.379.1.779.15 1.18.15.38 0 .65-.051.83-.141.16-.07.27-.24.27-.42 0-.141-.08-.27-.24-.4-.16-.129-.489-.279-.979-.471-.51-.18-.979-.42-1.42-.719-.31-.221-.569-.51-.761-.85-.159-.32-.239-.67-.229-1.021 0-.43.12-.84.341-1.21.25-.4.619-.72 1.049-.92.469-.239 1.059-.349 1.769-.349.41 0 .83.03 1.24.09.3.04.59.12.86.23.039.01.08.05.1.09.01.04.02.08.02.12v1.63c0 .04-.02.08-.05.1-.09.02-.14.02-.18 0-.3-.16-.62-.27-.96-.34-.37-.08-.74-.13-1.12-.13-.2-.01-.41.02-.601.07-.129.03-.24.1-.31.2-.05.08-.08.18-.08.27s.04.18.101.26c.09.11.209.2.34.27.229.12.47.23.709.33.541.18 1.061.43 1.541.73.33.209.6.49.789.83.16.318.24.67.23 1.029.011.471-.129.94-.389 1.331z" />
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
  coreldraw: IconCorelDraw,
  photoshop: IconPhotoshop,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
}
