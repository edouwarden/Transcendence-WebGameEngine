import type { NextConfig } from "next";
import withPWA from "next-pwa";

const devOrigins = (process.env.DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wining",
        destination: "/winning",
        permanent: true,
      },
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  turbopack: {},
  allowedDevOrigins: [
    process.env.FRONT_HOST,
    "localhost",
    "127.0.0.1",
    ...devOrigins,
  ].filter(Boolean) as string[],
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  scope: "/",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
  ],
})(nextConfig);
