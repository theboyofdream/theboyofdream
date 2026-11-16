import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the komorebi-lab static build at the clean URL /komorebi
      { source: "/komorebi", destination: "/komorebi/index.html" },
    ];
  },
  images: {
    domains: [
      "cdn.tailwindcss.com",
      "https://cdn.jsdelivr.net/npm/chart.js",
      "fonts.googleapis.com",
      "fonts.gstatic.com"
    ],
  }
};

export default nextConfig;
