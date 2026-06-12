/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ── Image optimisation ── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000, // 1 year
  },

  /* ── Bundle optimisation — tree-shake large packages ── */
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "gsap",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  /* ── Remove console.* in production builds ── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ── HTTP response headers ── */
  async headers() {
    return [
      {
        /* Immutable cache for static assets — production only.
           In dev, chunks don't get new content hashes on every recompile,
           so immutable caching causes browsers to run stale JS against fresh
           server HTML, producing hydration mismatches. */
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-store",
          },
        ],
      },
      {
        /* Long cache for public images */
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Security + performance headers for all pages */
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control",   value: "on"          },
          { key: "X-Content-Type-Options",   value: "nosniff"     },
          { key: "X-Frame-Options",          value: "SAMEORIGIN"  },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
