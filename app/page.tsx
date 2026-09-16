import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/motifs/Marquee";
import { AboutSection } from "@/components/about/AboutSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PharmaSpecializationSection } from "@/components/pharma/PharmaSpecializationSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { WhyPartnerSection } from "@/components/trust/WhyPartnerSection";
import { ContactSection } from "@/components/contact/ContactSection";

const tickerItems = [
  "PACKAGING DESIGN",
  "PHARMACEUTICAL & AYURVEDIC CARTONS",
  "PRINT-READY PERFECTION",
  "10+ YEARS EXPERIENCE",
  "EXACT BLEEDS & DIELINES",
  "BRAND IDENTITY & LOGOS",
  "BROCHURES & CATALOGS",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 1. Home / Animated Creative Hero Slider */}
        <Hero />

        {/* Ticker marquee */}
        <Marquee items={tickerItems} />

        {/* 2. About Me */}
        <AboutSection />

        {/* 3. Services */}
        <ServicesSection />

        {/* 3.5. Pharmaceutical & Healthcare Packaging specialization */}
        <PharmaSpecializationSection />

        {/* 4. Portfolio / Archive */}
        <PortfolioSection />

        {/* 5. Process (From Brief to Print) */}
        <ProcessSection />

        {/* 6. Why Partner With Me */}
        <WhyPartnerSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Sticky WhatsApp Floating Action Button at Bottom-Right */}
      <StickyWhatsApp />

      <Footer />
    </>
  );
}
