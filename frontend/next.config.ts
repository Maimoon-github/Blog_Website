import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ────────────────────────────────────────────────────
  // Allow Next.js <Image> to load from the Django media server.
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },

  // ─── Turbopack root (Next.js 15+ top-level key, not under experimental) ────
  turbopack: {
    root: process.cwd(),
  },

  // ─── Allow HMR from LAN devices (e.g., phone / tablet on same network) ─────
  allowedDevOrigins: ["192.168.100.12"],
};

export default nextConfig;