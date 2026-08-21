"use client";

import { useState } from "react";
import { contact, siteMeta } from "@/lib/constants/site-copy";
import { services } from "@/lib/constants/services";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AvailabilityBadge } from "@/components/motifs/AvailabilityBadge";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";
import { Icon } from "@/lib/icons";
import { whatsappLink, cn } from "@/lib/utils";

// Condensed labels for the topic pills — same 5 real service categories
// from lib/constants/services.ts (not an invented shortlist), just
// shortened to fit a chip; the full titles ("All Types of Packaging
// Design") are too long for one.
const topicLabels: Record<string, string> = {
  packaging: "Packaging",
  literature: "Brand Literature",
  branding: "Local Branding",
  digital: "Digital & Social",
  custom: "Custom Design",
};

// The service group titles are full section headings ("All Types of
// Packaging Design") and read badly dropped into "I'm interested in a
// ___ project" — confirmed live ("a All Types of Packaging Design
// project"). These are natural lowercase noun phrases for that sentence
// specifically, not a new set of categories.
const topicMessagePhrase: Record<string, string> = {
  packaging: "packaging design",
  literature: "brand literature",
  branding: "local branding & advertising",
  digital: "digital & social media",
  custom: "custom design",
};

export function ContactSection() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const message = topicId
    ? `Hi Amee, I'm interested in discussing a ${topicMessagePhrase[topicId]} project.`
    : siteMeta.whatsappMessage;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteMeta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-28 sm:scroll-mt-28 sm:px-8 sm:py-36">
      <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-ink px-10 py-16 text-center text-paper sm:px-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
        <RegistrationMark className="absolute top-6 left-6 text-paper/20" />
        <RegistrationMark className="absolute top-6 right-6 text-paper/20" />
        <RegistrationMark className="absolute bottom-6 left-6 text-paper/20" />
        <RegistrationMark className="absolute right-6 bottom-6 text-paper/20" />

        <div className="relative flex justify-center">
          <AvailabilityBadge />
        </div>

        <h2 className="relative mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {contact.heading}
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-paper/60">
          {contact.body}
        </p>

        <div className="relative mt-9">
          <p className="font-spec text-[11px] tracking-wide text-paper/40 uppercase">
            What can I help you design? <span className="normal-case text-paper/30">(optional)</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {services.map((group) => {
              const active = topicId === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTopicId(active ? null : group.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-accent bg-accent text-paper"
                      : "border-paper/15 text-paper/70 hover:border-paper/30 hover:text-paper",
                  )}
                >
                  <Icon name={group.icon} width={14} height={14} className="shrink-0" />
                  {topicLabels[group.id]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <a
              href={whatsappLink(siteMeta.whatsapp, message)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-paper transition-transform duration-300 hover:scale-[1.03]"
            >
              Message on WhatsApp
            </a>
          </MagneticButton>
          <MagneticButton>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              {copied ? "Copied!" : siteMeta.email}
            </button>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
