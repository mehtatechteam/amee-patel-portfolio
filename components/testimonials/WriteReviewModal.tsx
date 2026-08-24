"use client";

import { useState } from "react";
import { siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink } from "@/lib/utils";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview?: (review: {
    name: string;
    company: string;
    project: string;
    content: string;
    rating: number;
  }) => void;
}

export function WriteReviewModal({ isOpen, onClose, onAddReview }: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("Packaging Design");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;

    if (onAddReview) {
      onAddReview({
        name,
        company: company || "Independent Client",
        project,
        content,
        rating,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setCompany("");
      setContent("");
      onClose();
    }, 2200);
  };

  const reviewMessage = `*New Client Review for Amee Patel*\n\n⭐ Rating: ${rating}/5 Stars\n👤 Client: ${name} (${company || "N/A"})\n📦 Project: ${project}\n\n📝 Review:\n"${content}"`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-paper p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-paper-raised text-ink-soft hover:text-ink transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-10 text-center animate-scale-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl">
              ✓
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">Thank You So Much!</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Your review has been received and added to our client wall. We truly value your feedback!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <span className="font-spec text-[11px] font-bold tracking-wider text-accent uppercase">
                Client Review Corner
              </span>
              <h3 id="write-review-title" className="mt-1 font-display text-2xl font-bold text-ink">
                Share Your Experience
              </h3>
              <p className="mt-1 text-xs text-ink-soft">
                Worked with Amee? Leave your genuine feedback on print quality, design, and delivery.
              </p>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} star`}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <span
                      className={
                        (hoverRating || rating) >= star ? "text-amber-500" : "text-zinc-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
                <span className="ml-2 font-display text-sm font-bold text-ink">
                  {hoverRating || rating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Client Name & Company */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Organic Amla"
                  className="w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Project Category */}
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1">
                Project Designed
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              >
                <option value="Packaging Design">Packaging Design (Box / Bottle / Label)</option>
                <option value="Brand Literature">Brand Literature (Brochure / Catalog / Visual Book)</option>
                <option value="Brand Identity & Logo">Brand Identity & Logo Design</option>
                <option value="Social Media & Marketing">Social Media & Marketing Graphics</option>
                <option value="Custom Print Project">Custom Print Project</option>
              </select>
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1">
                Your Review <span className="text-accent">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How was the print readiness, turnaround time, communication, and visual outcome?"
                className="w-full rounded-xl border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-accent transition-colors text-center"
              >
                Submit Review
              </button>
              <a
                href={whatsappLink(siteMeta.whatsapp, reviewMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors text-center"
              >
                <span>💬 Send via WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
