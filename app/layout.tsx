import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Archivo, Space_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/lib/constants/site";
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

// Title kept under ~60 chars and description under ~155 — both were
// previously long enough that Google would truncate them mid-word in
// search snippets (77 and 195 chars respectively).
const title = "Amee Patel — Graphic Designer | Packaging & Print Design";
const description =
  "Freelance graphic designer with 10+ years in pharmaceutical & food packaging, branding, and print-ready design. Based in Ahmedabad, India.";
const keywords = [
  "graphic designer Ahmedabad",
  "packaging design India",
  "pharmaceutical packaging design",
  "print-ready design",
  "brand identity design",
  "brochure design",
  "carton dieline design",
  "freelance graphic designer India",
];

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Amee Patel — Graphic Designer",
  },
  description,
  keywords,
  metadataBase: new URL(SITE_URL),
  applicationName: "Amee Patel — Graphic Designer",
  authors: [{ name: "Amee Patel", url: SITE_URL }],
  creator: "Amee Patel",
  publisher: "Amee Patel",
  category: "Graphic Design",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Amee Patel — Graphic Designer",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1d1f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${bricolage.variable} ${archivo.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <StructuredData />
        <SmoothScrollProvider>
          <LoadingScreen />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
