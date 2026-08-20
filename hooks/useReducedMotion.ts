"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors OS "prefers-reduced-motion". Some consumers (e.g. HeroSceneGate)
 * use this to decide whether to render an entire subtree, so the initial
 * value MUST match what the server renders (false — SSR has no `window`)
 * even though the real client value is knowable synchronously via
 * matchMedia. Reading it eagerly in the initializer would diverge from the
 * SSR output whenever a visitor's OS actually prefers reduced motion,
 * causing a hydration mismatch. The real value is applied post-mount
 * instead, which is safe because hydration only checks the first render.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above: must diverge from SSR default after mount, not during the lazy initializer.
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
