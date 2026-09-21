import { services } from "@/lib/constants/services";
import { ServiceGroupCard } from "./ServiceGroupCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-28 px-5 py-16 sm:scroll-mt-28 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 max-w-2xl">
          <SectionIndex index="02" label="SERVICES" meta="WHAT I DO" />
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Services
          </h2>
        </Reveal>

        {/* items-start: without it, CSS grid's default `stretch` forces
            every card in a row to match its tallest sibling — the
            `flex-1` spacer inside ServiceGroupCard (between its tag pills
            and footer caption) then swallows that extra height as dead
            air before the footer, most visible next to the featured
            2-col-span card. Same root cause, same fix, as the documented
            one in PortfolioGrid.tsx. */}
        <Reveal className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {services.map((group) => (
            <ServiceGroupCard key={group.id} group={group} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
