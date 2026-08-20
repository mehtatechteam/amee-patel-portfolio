"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { estimatorItems } from "@/lib/constants/pricing";
import { siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink, cn } from "@/lib/utils";

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function ProjectEstimator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const totalRef = useRef<HTMLSpanElement>(null);

  const chosen = useMemo(() => estimatorItems.filter((item) => selected.has(item.id)), [selected]);
  const total = useMemo(() => chosen.reduce((sum, item) => sum + item.price, 0), [chosen]);

  useGSAP(() => {
    if (!totalRef.current) return;
    gsap.fromTo(totalRef.current, { scale: 1.08 }, { scale: 1, duration: 0.3, ease: "power2.out" });
  }, [total]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const message =
    chosen.length === 0
      ? "Hi Amee, I'd like to get a quote for a design project."
      : `Hi Amee, I used your website estimator and I'm interested in:\n${chosen
          .map((item) => `• ${item.label} — ${formatINR(item.price)}`)
          .join("\n")}\n\nEstimated total: ${formatINR(total)}. Let's discuss!`;

  return (
    <div className="rounded-3xl bg-paper-raised p-8 sm:p-10">
      <h3 className="font-display text-xl font-semibold text-ink">Estimate your project</h3>
      <p className="mt-2 text-sm text-ink-soft">
        Select what you need for a quick ballpark — a real quote follows after we discuss specifics.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {estimatorItems.map((item) => {
          const active = selected.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-ink text-paper" : "bg-paper text-ink-soft hover:text-ink",
              )}
            >
              {item.label} <span className={active ? "text-paper/70" : "text-ink-faint"}>· {formatINR(item.price)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-ink/[0.06] pt-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Estimated total</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">
            <span ref={totalRef} className="inline-block">
              {formatINR(total)}
            </span>
          </p>
        </div>

        <a
          href={whatsappLink(siteMeta.whatsapp, message)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "rounded-full px-6 py-3.5 text-sm font-semibold transition-colors",
            chosen.length === 0
              ? "pointer-events-none bg-ink/10 text-ink-faint"
              : "bg-accent text-paper hover:bg-ink",
          )}
          aria-disabled={chosen.length === 0}
        >
          Book via WhatsApp with this estimate
        </a>
      </div>
    </div>
  );
}
