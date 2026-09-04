import { siteMeta } from "@/lib/constants/site-copy";
import { whatsappLink } from "@/lib/utils";
import { LiveClock } from "@/components/motifs/LiveClock";
import { Icon } from "@/lib/icons";
import { BackToTop } from "./BackToTop";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#pharma", label: "Pharma" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#trust", label: "Trust" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line/40 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl font-semibold">
            {siteMeta.name}
            <span className="text-accent">.</span>
          </div>
          <p className="mt-2 text-sm text-paper/70">
            {siteMeta.title}
          </p>
          <p className="mt-1 text-xs text-paper/50">
            Available 100% Remotely Worldwide & Local Studio in Ahmedabad.
          </p>
          <p className="mt-3 font-spec text-xs tracking-wide text-paper/60 uppercase">
            Ahmedabad, India · <LiveClock />
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/60 uppercase">Design Studio</p>
          <div className="mt-3 text-xs leading-relaxed text-paper/70 flex flex-col gap-1">
            <p className="font-semibold text-paper/90">{siteMeta.officeAddress.line1}</p>
            <p>{siteMeta.officeAddress.line2}</p>
            <p>{siteMeta.officeAddress.area}</p>
            <a
              href={siteMeta.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
            >
              <Icon name="pin" width={13} height={13} className="shrink-0" />
              <span>View on Google Maps →</span>
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-paper/60 uppercase">Navigation</p>
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
          <p className="text-xs font-semibold tracking-wide text-paper/60 uppercase">Direct Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/70">
            <li>
              <a
                href={whatsappLink(siteMeta.whatsapp, siteMeta.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent flex items-center gap-2"
              >
                <span>WhatsApp: {siteMeta.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteMeta.email}`} className="transition-colors hover:text-accent">
                Email: {siteMeta.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-paper/10 px-5 py-6 sm:px-8 sm:pr-24">
        <p className="text-xs text-paper/55">
          © {new Date().getFullYear()} {siteMeta.name}. All work shown remains the property of its
          respective brand owners.
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
