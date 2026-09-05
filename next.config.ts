import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false, // Force enable for hackathon demo
});

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default withPWA(nextConfig);

