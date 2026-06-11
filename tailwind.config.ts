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
        "bg-primary":    "#050D1A",
        "bg-secondary":  "#071224",
        "bg-tertiary":   "#0C1E35",
        "accent-teal":   "#00D4FF",
        "accent-gold":   "#C9A84C",
        "text-primary":  "#E8F4FD",
        "text-muted":    "#6B8CAE",
      },
      fontFamily: {
        inter:   ["var(--font-inter)",  "sans-serif"],
        space:   ["var(--font-space)",  "sans-serif"],
      },
      keyframes: {
        marquee:    { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spinRing:   { to:   { transform: "rotate(360deg)" } },
        spinRingRev:{ to:   { transform: "rotate(-360deg)" } },
        pulseGlow:  {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.05)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee:     "marquee 30s linear infinite",
        "spin-ring": "spinRing 14s linear infinite",
        "spin-rev":  "spinRingRev 9s linear infinite",
        "pulse-glow":"pulseGlow 3s ease-in-out infinite",
        float:       "floatY 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
