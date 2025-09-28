import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.tailwindcss.com",
      "https://cdn.jsdelivr.net/npm/chart.js",
      "fonts.googleapis.com",
      "fonts.gstatic.com",
    ],
  },
  distDir: "docs"
};

export default nextConfig;
