import type { Metadata } from "next";
import { Bricolage_Grotesque, Archivo, Space_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// PLACEHOLDER — docs/client-requirements.md flags the production domain as
// still unconfirmed. Update this the moment a real domain is chosen; until
// then, absolute OG/Twitter image URLs below resolve against this fake
// host and won't actually load when scraped by Slack/WhatsApp/etc.
const SITE_URL = "https://ameepatel.design";

const title = "Amee Patel — Graphic Designer | Print-Ready Packaging, Branding & Print Design";
const description =
  "Freelance graphic designer with 10+ years of experience in pharmaceutical & food packaging, branding, brochures, and print-ready design. Based in India, working with clients worldwide.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Amee Patel — Graphic Designer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/portfolio/packaging/madburgs-burger-box.png",
        width: 1402,
        height: 1122,
        alt: "Madburgs burger box packaging design by Amee Patel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/packaging/madburgs-burger-box.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${archivo.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <SmoothScrollProvider>
          <LoadingScreen />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
