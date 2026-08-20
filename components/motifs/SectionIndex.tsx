import { CMYKSwatch } from "./CMYKSwatch";

/** Editorial section header: "[ 01 // WORK ]" index label + a metadata
 * tag, in the spec-sheet monospace face. Purely a visual/wayfinding motif —
 * the numbering is presentational, not a real document reference. */
export function SectionIndex({ index, label, meta }: { index: string; label: string; meta: string }) {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
      <span className="font-spec text-xs uppercase tracking-widest text-ink-faint">
        {`[ ${index} // ${label} ]`}
      </span>
      <div className="flex items-center gap-3">
        <span className="hidden font-spec text-xs uppercase tracking-widest text-accent sm:inline">
          {meta}
        </span>
        <CMYKSwatch />
      </div>
    </div>
  );
}
