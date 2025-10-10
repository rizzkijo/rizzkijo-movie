import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  output: 'standalone', // IMPORTANT for Docker prod image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // TMDB path pattern (aman: bisa '/**' kalau ragu)
      },
    ],
    formats: ['image/avif', 'image/webp'], // opsional
  },
} satisfies NextConfig;

const withPWAFunc = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/, /dynamic-css-manifest\.json$/],

  // --- Optional: bikin cache agresif untuk gambar TMDB ---
  runtimeCaching: [
    {
      urlPattern: ({ url }: { url: URL }) => url.hostname === 'image.tmdb.org',
      handler: 'CacheFirst',
      options: {
        cacheName: 'tmdb-images',
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30 hari
      },
    },
  ],
});

export default withPWAFunc(baseConfig) as NextConfig;
