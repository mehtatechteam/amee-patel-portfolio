"use client";

import { useState } from "react";
import { whyPartner, siteMeta } from "@/lib/constants/site-copy";
import { testimonials as initialTestimonials, Testimonial } from "@/lib/constants/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { StampBadge } from "@/components/motifs/StampBadge";
import { WriteReviewModal } from "@/components/testimonials/WriteReviewModal";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { Icon } from "@/lib/icons";

const cardExtras = [
  { badge: "Est. 2001", footer: "Parth Offset (2001–2012) · Freelance (2012–Present)" },
  { badge: "Print-Ready", tags: ["Exact Bleed", "Exact Dimensions", "Color Profiles"] },
  { badge: "Direct & Friendly" },
] as const;

const cardClass =
  "flex flex-col justify-between rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-16px_rgba(29,29,31,0.3)]";

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
    <section id="trust" className="relative scroll-mt-28 bg-paper-raised px-5 py-8 sm:scroll-mt-28 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionIndex index="06" label="TRUST" meta="WHY PARTNER WITH ME" />
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {whyPartner.heading}
          </h2>
        </Reveal>

        {/* 3 Pillar Cards */}
        {/* items-start: same fix as ServicesSection/PortfolioGrid — without
            it, grid's default stretch forces all 3 pillar cards to match
            the tallest one, and each card's `justify-between` flex then
            stretches a big empty gap before its footer, worst on the
            middle "Print-Ready Guarantee" card which has the least body
            content. */}
        <Reveal className="mt-10 grid items-start gap-6 sm:grid-cols-3" delay={0.1}>
          <div className={cardClass}>
            <div>
              {/* Heading sits at the same top offset as the other two
                  cards (was previously pushed down by the "10+" stat
                  rendered above it, breaking the row's heading baseline —
                  the stat still gets prominent display, just below the
                  body copy instead of above the heading). */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{expertise.title}</h3>
                <StampBadge label={cardExtras[0].badge} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{expertise.body}</p>
              <span className="mt-4 block font-display text-4xl font-semibold text-accent">{yearsStat.value}</span>
            </div>
            <p className="mt-6 border-t border-line/60 pt-4 font-spec text-xs text-ink-soft">
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
              <p className="font-spec text-[11px] tracking-wide text-ink-soft uppercase">Included in every file</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cardExtras[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-paper-raised px-2.5 py-1 font-spec text-[10px] font-medium text-ink-soft uppercase"
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
        <div className="mt-16 border-t border-line/70 pt-12">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1 font-spec text-[11px] font-normal tracking-wide text-ink uppercase">
                    <span className="text-accent">★</span> 5.0 Google Rating · Verified Studio
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
                  <Icon name="pen" width={15} height={15} className="shrink-0" />
                  <span>Write a Review</span>
                </button>
                <a
                  href={siteMeta.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-paper-raised"
                >
                  <Icon name="pin" width={15} height={15} className="shrink-0" />
                  <span>Studio Location</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Testimonial Carousel — swaps the previous static 2-col grid
              (all reviews stacked, growing with every submission) for the
              same drag/snap/dot carousel language as the hero poster and
              portfolio: one review at a time, a fixed footprint regardless
              of how many reviews exist. */}
          <Reveal className="mt-8" delay={0.15}>
            <TestimonialCarousel reviews={reviewList} />
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
