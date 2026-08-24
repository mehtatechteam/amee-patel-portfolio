import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
