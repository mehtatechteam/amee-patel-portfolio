import { services } from "@/lib/constants/services";
import { ServiceGroupCard } from "./ServiceGroupCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";

export function ServicesSection() {
  return (
    <section id="services" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <SectionIndex index="02" label="SERVICES" meta="WHAT I DO" />
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Services
          </h2>
        </Reveal>

        <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {services.map((group) => (
            <ServiceGroupCard key={group.id} group={group} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
