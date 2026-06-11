import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sivaprasath V — Full Stack & Generative AI Developer",
  description:
    "Full Stack Developer & AI Engineer with 3+ years building production React.js, Next.js, and LLM-powered applications. Expert in OpenAI, LangChain, FastAPI, and AWS.",
  keywords: [
    "React.js developer",
    "Generative AI engineer",
    "Next.js",
    "LangChain",
    "FastAPI",
    "portfolio",
    "Coimbatore",
    "Full Stack Developer",
    "LLM Integration",
  ],
  authors: [{ name: "Sivaprasath V" }],
  creator: "Sivaprasath V",
  metadataBase: new URL("https://sivaprasath.dev"),
  alternates: {
    canonical: "https://sivaprasath.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sivaprasath.dev",
    title: "Sivaprasath V — Full Stack & Generative AI Developer",
    description:
      "Full Stack Developer & AI Engineer with 3+ years building production React.js, Next.js, and LLM-powered applications.",
    siteName: "Sivaprasath V Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sivaprasath V — Full Stack Developer & Generative AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sivaprasath V — Full Stack & Generative AI Developer",
    description:
      "Full Stack Developer & AI Engineer with 3+ years building production React.js, Next.js, and LLM-powered applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sivaprasath V",
  url: "https://sivaprasath.dev",
  email: "sivavelmurugan8@gmail.com",
  jobTitle: "Full Stack Developer & Generative AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Vigo Retail",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kongu Engineering College",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Generative AI",
    "LangChain",
    "FastAPI",
    "AWS",
  ],
  sameAs: [
    "https://linkedin.com/in/sivaprasath-v",
    "https://github.com/sivaprasath-v",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased" style={{ background: "#050D1A", color: "#E8F4FD" }}>
        {children}
      </body>
    </html>
  );
}
