import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/motifs/Marquee";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { WhyPartnerSection } from "@/components/trust/WhyPartnerSection";
import { AboutSection } from "@/components/about/AboutSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ContactSection } from "@/components/contact/ContactSection";

const tickerItems = [
  "PACKAGING DESIGN",
  "PHARMACEUTICAL & FOOD",
  "PRINT-READY PERFECTION",
  "10+ YEARS EXPERIENCE",
  "PRINT-READY GUARANTEE",
  "BRAND IDENTITY",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee items={tickerItems} />
        <PortfolioSection />
        <ServicesSection />
        <ProcessSection />
        <WhyPartnerSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
