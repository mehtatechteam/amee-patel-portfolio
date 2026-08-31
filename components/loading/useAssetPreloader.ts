"use client";

import { useEffect, useState } from "react";

/**
 * Gates the loading screen on real preload work — the hero collage images
 * (what's actually above the fold) plus web font loading — never a fake
 * timer. Waiting for all 15 portfolio images would make the loader
 * pointlessly slow; only first-paint-critical assets are awaited here.
 */
const PRELOAD_IMAGES = [
  "/portfolio/packaging/lilaura-car-freshener-lavender.png",
  "/portfolio/packaging/madburgs-burger-box.png",
  "/portfolio/packaging/medween-pharma-box.png",
];

export function useAssetPreloader() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Scoped per effect run (not a ref) so React Strict Mode's dev-only
    // double-invoke can't let a superseded run's stragglers keep
    // incrementing a shared counter past `total` (was showing 175%+).
    let doneCount = 0;
    const total = PRELOAD_IMAGES.length + 1; // +1 for document.fonts.ready

    function tick() {
      if (cancelled) return;
      doneCount += 1;
      setProgress(Math.round((doneCount / total) * 100));
    }

    const imagePromises = PRELOAD_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            tick();
            resolve();
          };
          img.onerror = () => {
            tick();
            resolve();
          };
          img.src = src;
        }),
    );

    const fontsPromise = Promise.resolve(document.fonts?.ready).then(() => tick());

    Promise.all([...imagePromises, fontsPromise]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { progress, ready };
}
