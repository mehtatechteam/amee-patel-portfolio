"use client";

import { useState } from "react";
import { whyPartner, siteMeta } from "@/lib/constants/site-copy";
import { testimonials as initialTestimonials, Testimonial } from "@/lib/constants/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { StampBadge } from "@/components/motifs/StampBadge";
import { WriteReviewModal } from "@/components/testimonials/WriteReviewModal";

const cardExtras = [
  { badge: "Est. 2001", footer: "Parth Offset (2001–2012) · Freelance (2012–Present)" },
  { badge: "Print-Ready", tags: ["Exact Bleeds", "Exact Dimensions", "Color Profiles"] },
  { badge: "Direct & Friendly" },
] as const;

const cardClass =
  "flex flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]";

export function WhyPartnerSection() {
  const [expertise, printReady, approachable] = whyPartner.items;
  const [yearsStat, revisionsStat, advanceStat] = whyPartner.stats;
  const [reviewList, setReviewList] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = (newReview: {
    name: string;
    company: string;
    project: string;
    content: string;
    rating: number;
  }) => {
    const initials = newReview.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const colors = ["bg-amber-600", "bg-emerald-600", "bg-sky-600", "bg-purple-600", "bg-rose-600"];
    const avatarBg = colors[Math.floor(Math.random() * colors.length)];

    const item: Testimonial = {
      id: `user-${Date.now()}`,
      name: newReview.name,
      role: "Client",
      company: newReview.company,
      project: newReview.project,
      content: newReview.content,
      rating: newReview.rating,
      date: "Just now",
      verified: true,
      source: "Verified Client",
      avatarBg,
      initials: initials || "CL",
    };

    setReviewList((prev) => [item, ...prev]);
  };

  return (
    <section className="bg-paper-raised px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionIndex index="05" label="TRUST" meta="WHY PARTNER WITH ME" />
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {whyPartner.heading}
          </h2>
        </Reveal>

        {/* 3 Pillar Cards */}
        <Reveal className="mt-16 grid gap-6 sm:grid-cols-3" delay={0.1}>
          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-4xl font-semibold text-accent">{yearsStat.value}</span>
                <StampBadge label={cardExtras[0].badge} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{expertise.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{expertise.body}</p>
            </div>
            <p className="mt-6 border-t border-line/60 pt-4 font-spec text-xs text-ink-faint">
              {cardExtras[0].footer}
            </p>
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{printReady.title}</h3>
                <StampBadge label={cardExtras[1].badge} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{printReady.body}</p>
            </div>
            <div className="mt-6 border-t border-line/60 pt-4">
              <p className="font-spec text-[11px] tracking-wide text-ink-faint uppercase">Included in every file</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cardExtras[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-paper-raised px-2.5 py-1 font-spec text-[10px] font-medium text-ink-faint uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{approachable.title}</h3>
                <StampBadge label={cardExtras[2].badge} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{approachable.body}</p>
            </div>
            <div className="mt-6 flex gap-6 border-t border-line/60 pt-4">
              <div>
                <p className="font-display text-2xl font-semibold text-accent">{revisionsStat.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{revisionsStat.label}</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-accent">{advanceStat.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{advanceStat.label}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Client Reviews & Testimonials Corner */}
        <div className="mt-28 border-t border-line/70 pt-20">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 font-spec text-[11px] font-bold text-amber-700 uppercase">
                    <span className="text-amber-500">★</span> 5.0 Google Rating · Verified Studio
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Client Reviews & Testimonials Corner
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                  Real feedback from pharma manufacturers, real estate developers, and brand owners across India & worldwide.
                </p>
              </div>

              {/* Action Buttons: Write a Review & Google Profile */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-md transition-all hover:bg-accent hover:shadow-lg"
                >
                  <span>✍️ Write a Review</span>
                </button>
                <a
                  href={siteMeta.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-paper-raised"
                >
                  <span>📍 Studio Location</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Testimonial Cards Grid */}
          <Reveal className="mt-12 grid gap-6 md:grid-cols-2" delay={0.15}>
            {reviewList.map((t) => (
              <div
                key={t.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <div>
                  {/* Top Bar: Stars + Source / Project Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                        {[...Array(t.rating)].map((_, idx) => (
                          <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-display text-xs font-bold text-ink">{t.rating}.0</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-spec text-[9px] font-bold text-emerald-700 uppercase">
                        ✓ {t.source}
                      </span>
                      <span className="rounded-full bg-paper-raised px-2.5 py-0.5 font-spec text-[9px] font-semibold text-ink-faint uppercase">
                        {t.project}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                </div>

                {/* Client Profile Footer */}
                <div className="mt-7 flex items-center justify-between border-t border-line/60 pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${t.avatarBg}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-soft">
                        {t.role} · <span className="font-semibold text-ink">{t.company}</span>
                      </p>
                    </div>
                  </div>
                  <span className="font-spec text-[10px] text-ink-faint">{t.date}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Interactive Write Review Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </section>
  );
}
