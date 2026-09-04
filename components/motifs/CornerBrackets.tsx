/**
 * Four small L-shaped corner ticks — a technical-drawing/CAD-sheet cue
 * (like the corner marks on an architectural drawing sheet), used on the
 * "Swiss precision" half of the site (Pharma, Process) to read distinctly
 * from the warmer rounded cards used on the "Giobi" half (About, Trust).
 * Pure CSS borders, no SVG needed for a shape this simple.
 */
export function CornerBrackets({ className }: { className?: string }) {
  const base = "absolute h-3 w-3 border-ink/25";
  return (
    <div aria-hidden className={className}>
      <span className={`${base} top-3 left-3 border-t border-l`} />
      <span className={`${base} top-3 right-3 border-t border-r`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} right-3 bottom-3 border-r border-b`} />
    </div>
  );
}
