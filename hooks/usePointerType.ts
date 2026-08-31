"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether the primary input is a fine, hover-capable pointer
 * (mouse/trackpad) vs. touch. Same SSR-safe pattern as useReducedMotion:
 * the initial value MUST match what the server renders (false — SSR has
 * no `window`), even though the real value is knowable synchronously via
 * matchMedia. Reading it eagerly in the initializer would diverge from
 * the SSR output on any fine-pointer device, causing a hydration
 * mismatch. The real value is applied post-mount instead, which is safe
 * because hydration only checks the first render.
 */
export function usePointerType() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above: must diverge from SSR default after mount, not during the lazy initializer.
    setIsFinePointer(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return { isFinePointer };
}
