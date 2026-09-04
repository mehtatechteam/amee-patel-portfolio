"use client";

import dynamic from "next/dynamic";

// Physics + WASM (rapier) can't run server-side — dynamic import with
// ssr:false requires a Client Component boundary, which AboutSection
// itself doesn't need otherwise, hence this thin gate.
const Lanyard = dynamic(() => import("./Lanyard").then((m) => m.Lanyard), { ssr: false });

export function LanyardGate({ className }: { className?: string }) {
  return <Lanyard className={className} />;
}
