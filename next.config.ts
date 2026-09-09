import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's managed image optimization (/_next/image) is returning 402
  // Payment Required site-wide -- account has exhausted its optimization
  // quota (confirmed: raw files under /public serve fine directly, only
  // the transform proxy fails). Bypassing next/image's optimizer entirely
  // so it renders a plain <img> against the original file instead of
  // routing through the blocked paid pipeline.
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/work", destination: "/#portfolio", permanent: true },
      { source: "/portfolio", destination: "/#portfolio", permanent: true },
      { source: "/process", destination: "/#process", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/trust", destination: "/#trust", permanent: true },
      { source: "/reviews", destination: "/#trust", permanent: true },
    ];
  },
};

export default nextConfig;
