import { processSteps } from "@/lib/constants/process";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIndex } from "@/components/motifs/SectionIndex";
import { RegistrationMark } from "@/components/motifs/RegistrationMark";

export function ProcessSection() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionIndex index="03" label="PROCESS" meta="FROM BRIEF TO PRINT" />
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            From Brief to Print
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-4" delay={0.1}>
          {processSteps.map((step) => (
            <div key={step.index} className="relative bg-paper p-8">
              <RegistrationMark className="absolute top-6 right-6" />
              <span className="font-spec text-sm font-bold text-accent">{step.index}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
