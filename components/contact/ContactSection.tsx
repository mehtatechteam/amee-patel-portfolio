import { contact, siteMeta } from "@/lib/constants/site-copy";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AvailabilityBadge } from "@/components/motifs/AvailabilityBadge";
import { whatsappLink } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-28 sm:px-8 sm:py-36">
      <Reveal className="mx-auto max-w-4xl rounded-[2.5rem] bg-ink px-10 py-16 text-center text-paper sm:px-16 sm:py-20">
        <div className="flex justify-center">
          <AvailabilityBadge />
        </div>

        <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-paper/60">
          {contact.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <a
              href={whatsappLink(siteMeta.whatsapp, siteMeta.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-paper transition-transform duration-300 hover:scale-[1.03]"
            >
              Message on WhatsApp
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`mailto:${siteMeta.email}`}
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              {siteMeta.email}
            </a>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
