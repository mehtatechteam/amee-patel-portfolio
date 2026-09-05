import Image from "next/image";

/**
 * The same real 3D-box treatment already shipped in the Hero ("Folded
 * Carton" mode) — a CSS 3D-transformed box with the real product photo on
 * the front face — extracted here so every portfolio item can use it too.
 * The front face is the real, unaltered photo; the side panel is the same
 * generic barcode/print-line silhouette used in the Hero (no digits, no
 * per-product claim) rather than an invented back/side design, since no
 * source photo shows those faces of the real product.
 */
export function Product3DBox({ src, title }: { src: string; title: string }) {
  return (
    <div className="flex w-full items-center justify-center py-6" style={{ perspective: 1200 }}>
      <div
        className="relative mx-auto w-full max-w-[17rem]"
        style={{
          aspectRatio: "1 / 1.35",
          transform: "rotateY(-12deg) rotateX(4deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-xl border border-black/10 bg-[#f7f5ee] shadow-2xl"
          style={{ transform: "translateZ(24px)", backfaceVisibility: "hidden" }}
        >
          <Image src={src} alt={title} fill sizes="280px" className="h-full w-full object-contain p-2" />
          <div aria-hidden className="pointer-events-none absolute top-3 inset-x-0 h-0.5 border-t border-dashed border-ink/25" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full w-14 overflow-hidden rounded-r-lg border-y border-r border-black/15 bg-gradient-to-r from-[#ebe7db] to-[#d3cdbc] p-2 shadow-[inset_2px_0_4px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.15)]"
          style={{ transform: "rotateY(90deg) translateZ(6px)", transformOrigin: "right center" }}
        >
          <div className="absolute inset-y-0 left-0 w-px bg-white/40" />
          <div className="flex h-full flex-col justify-between py-4 opacity-45">
            <div className="h-1.5 w-full bg-ink/25 rounded-xs" />
            <div className="h-1.5 w-3/4 bg-ink/25 rounded-xs" />
            <div className="h-1.5 w-1/2 bg-ink/25 rounded-xs" />
            <div className="mt-auto flex h-8 w-full items-stretch justify-center gap-[1.5px]">
              {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
                <div key={i} className="bg-ink" style={{ width: w, opacity: 0.55 }} />
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 inset-x-2 h-7 rounded-full bg-ink/20 blur-md"
          style={{ transform: "rotateX(75deg) translateZ(-20px)" }}
        />
      </div>
    </div>
  );
}
