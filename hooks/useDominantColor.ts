"use client";

import { useEffect, useState } from "react";

const cache = new Map<string, string>();

/**
 * Samples a small downscaled copy of the real image to get its actual
 * average color — not an invented per-product color ("lavender = violet"),
 * a real value read from the real asset. Used for the ambient glow behind
 * portfolio cards. Returns null until computed (first paint has no glow,
 * same "don't diverge from SSR" caution used elsewhere in this codebase —
 * this only ever runs client-side, after mount).
 */
export function useDominantColor(src: string) {
  const [color, setColor] = useState<string | null>(cache.get(src) ?? null);

  useEffect(() => {
    if (cache.has(src)) {
      const cached = cache.get(src)!;
      queueMicrotask(() => {
        setColor(cached);
      });
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        const size = 12;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let r = 0;
        let g = 0;
        let b = 0;
        const count = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        // "r, g, b" (no wrapper) so callers can build either rgb(...) or
        // rgba(..., alpha) from the same cached value.
        const value = `${r}, ${g}, ${b}`;
        cache.set(src, value);
        setColor(value);
      } catch {
        // Canvas can throw on a cross-origin/tainted image — the glow is
        // purely decorative, so silently skip it rather than surface an
        // error for a cosmetic feature.
      }
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return color;
}
