"use client";

import { useEffect, useRef, useState } from "react";

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
  const doneCount = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const total = PRELOAD_IMAGES.length + 1; // +1 for document.fonts.ready

    function tick() {
      doneCount.current += 1;
      if (!cancelled) setProgress(Math.round((doneCount.current / total) * 100));
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
