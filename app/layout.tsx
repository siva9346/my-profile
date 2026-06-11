import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sivaprasath V — Full Stack & Generative AI Developer",
  description:
    "Full Stack Developer & AI Engineer with 3+ years building React.js, Next.js, and LLM-powered applications. Expert in OpenAI, LangChain, FastAPI, and AWS.",
  keywords: [
    "React.js developer",
    "Generative AI engineer",
    "Next.js",
    "LangChain",
    "FastAPI",
    "AI portfolio",
    "Coimbatore",
    "Sivaprasath V",
  ],
  authors: [{ name: "Sivaprasath V" }],
  openGraph: {
    title: "Sivaprasath V — Full Stack & AI Engineer",
    description: "3+ years building production AI and web applications",
    url: "https://sivaprasath.dev",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@sivaprasath" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sivaprasath V",
  jobTitle: "Full Stack Developer & AI Engineer",
  email: "sivavelmurugan8@gmail.com",
  telephone: "+91 63855 99822",
  url: "https://sivaprasath.dev",
  sameAs: [
    "https://linkedin.com/in/sivaprasathai",
    "https://github.com/siva9346",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "#050D1A" }}>{children}</body>
    </html>
  );
}
