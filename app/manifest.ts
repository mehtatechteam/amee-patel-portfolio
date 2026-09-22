import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amee Patel — Graphic Designer",
    short_name: "Amee Patel",
    description:
      "Freelance graphic designer specializing in pharmaceutical & print-ready packaging, brand identity, and brochures. Based in Ahmedabad, India — working worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfa",
    theme_color: "#1d1d1f",
    lang: "en",
    categories: ["business", "design", "portfolio"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
