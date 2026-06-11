import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050D1A",
        "bg-secondary": "#071224",
        "bg-tertiary": "#0C1E35",
        "accent-teal": "#00D4FF",
        "accent-gold": "#C9A84C",
        "accent-glow": "#00FFFF",
        "text-primary": "#E8F4FD",
        "text-muted": "#6B8CAE",
        "text-subtle": "#3A5570",
        "border-subtle": "rgba(0,212,255,0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #050D1A 0%, #071A2E 50%, #0A1628 100%)",
        "teal-gradient": "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",
        "heading-gradient": "linear-gradient(135deg, #E8F4FD 0%, #00D4FF 100%)",
      },
      boxShadow: {
        "teal-glow": "0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.1)",
        "teal-glow-strong": "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      animation: {
        "pulse-teal": "pulseTeal 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 10s linear infinite",
        "spin-slow-rev": "spinRev 12s linear infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        pulseTeal: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,212,255,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(0,212,255,0)" },
        },
        spinRev: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
