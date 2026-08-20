import { siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink } from "@/lib/utils";
import { LiveClock } from "@/components/motifs/LiveClock";
import { BackToTop } from "./BackToTop";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
];

export function Footer() {
  return (
    <footer className="border-t border-line/40 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-semibold">
            {siteMeta.name}
            <span className="text-accent">.</span>
          </div>
          <p className="mt-2 text-sm text-paper/60">
            {siteMeta.title} — {siteMeta.location}
          </p>
          <p className="mt-3 font-spec text-xs tracking-wide text-paper/40 uppercase">
            Ahmedabad, India · <LiveClock />
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/40 uppercase">Navigation</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/40 uppercase">Direct Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/70">
            <li>
              <a
                href={whatsappLink(siteMeta.whatsapp, siteMeta.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {siteMeta.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteMeta.email}`} className="transition-colors hover:text-accent">
                {siteMeta.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-paper/10 px-5 py-6 sm:px-8">
        <p className="text-xs text-paper/55">
          © {new Date().getFullYear()} {siteMeta.name}. All work shown remains the property of its
          respective brand owners.
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
