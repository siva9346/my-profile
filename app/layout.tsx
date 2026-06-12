import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: true,
});

const SITE_URL = "https://sivaprasath.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Sivaprasath V — Full Stack Developer & Generative AI Engineer",
    template: "%s | Sivaprasath V",
  },
  description:
    "Sivaprasath V is a Full Stack Developer & Generative AI Engineer based in Coimbatore, India. 3+ years building React.js, Next.js, FastAPI, LangChain, and OpenAI-powered applications at Vigo Retail and Sense7ai.",

  keywords: [
    "Sivaprasath V",
    "Sivaprasath",
    "sivaprasathai",
    "Sivaprasath portfolio",
    "Sivaprasath developer",
    "Full Stack Developer Coimbatore",
    "Generative AI Engineer India",
    "React.js developer",
    "Next.js developer",
    "LangChain developer",
    "FastAPI developer",
    "OpenAI developer",
    "AI portfolio",
    "Vigo Retail developer",
    "Sense7ai",
    "siva9346",
    "Full Stack AI Engineer",
    "Python developer India",
    "LLM engineer",
  ],

  authors:   [{ name: "Sivaprasath V", url: SITE_URL }],
  creator:   "Sivaprasath V",
  publisher: "Sivaprasath V",

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

  /* Custom meta tags that Next.js doesn't generate natively */
  other: {
    "publisher":             "Sivaprasath V",
    "author":                "Sivaprasath V",
    "robots":                "index, follow",
    "googlebot":             "index, follow",
    "revisit-after":         "7 days",
    "language":              "English",
    "geo.region":            "IN-TN",
    "geo.placename":         "Coimbatore",
    "msapplication-TileColor": "#050D1A",
    "theme-color":           "#050D1A",
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title:       "Sivaprasath V — Full Stack Developer & Generative AI Engineer",
    description: "Sivaprasath V — 3+ years shipping production-grade AI and web applications at Vigo Retail and Sense7ai. Expert in React, Next.js, FastAPI, and LangChain.",
    url:         SITE_URL,
    siteName:    "Sivaprasath V",
    type:        "profile",
    locale:      "en_US",
    images: [
      {
        url:    `${SITE_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    "Sivaprasath V — Full Stack Developer & Generative AI Engineer",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Sivaprasath V — Full Stack Developer & AI Engineer",
    description: "3+ years building production AI and web applications.",
    creator:     "@sivaprasath",
    images:      [`${SITE_URL}/og-image.png`],
  },
};

/* ── Structured data (JSON-LD) ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name:        "Sivaprasath V",
      givenName:   "Sivaprasath",
      familyName:  "V",
      jobTitle:    "Full Stack Developer & Generative AI Engineer",
      description: "Full Stack Developer and Generative AI Engineer with 3+ years of experience building React, Next.js, FastAPI, and LLM-powered applications.",
      email:       "sivavelmurugan8@gmail.com",
      telephone:   "+91 63855 99822",
      url:         SITE_URL,
      image:       `${SITE_URL}/images/5.jpeg`,
      address: {
        "@type":           "PostalAddress",
        addressLocality:   "Coimbatore",
        addressRegion:     "Tamil Nadu",
        addressCountry:    "IN",
      },
      sameAs: [
        "https://www.linkedin.com/in/sivaprasathai/",
        "https://github.com/siva9346",
        SITE_URL,
      ],
      knowsAbout: [
        "React.js", "Next.js", "TypeScript", "JavaScript",
        "Python", "FastAPI", "LangChain", "OpenAI API",
        "Generative AI", "Large Language Models", "RAG",
        "AWS", "Docker", "PostgreSQL", "MongoDB",
      ],
      worksFor: [
        { "@type": "Organization", name: "Vigo Retail" },
        { "@type": "Organization", name: "Sense7ai"    },
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name:   "B.E. Mechanical Engineering",
      },
    },
    {
      "@type": "ProfilePage",
      "@id":   SITE_URL,
      name:    "Sivaprasath V — Portfolio",
      url:     SITE_URL,
      description:
        "Official portfolio of Sivaprasath V, Full Stack Developer and Generative AI Engineer.",
      mainEntity: { "@id": `${SITE_URL}/#person` },
      breadcrumb: {
        "@type":           "BreadcrumbList",
        itemListElement: [
          {
            "@type":    "ListItem",
            position:   1,
            name:       "Sivaprasath V",
            item:       SITE_URL,
          },
        ],
      },
    },
    {
      "@type":    "WebSite",
      "@id":      `${SITE_URL}/#website`,
      url:        SITE_URL,
      name:       "Sivaprasath V",
      publisher:  { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preconnect to font CDN for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "#050D1A" }}>
        {/*
          Hidden H1 that is always in the static HTML — ensures Google sees the
          name even before JS executes. The visible H1 inside HeroSection is
          rendered by React, but this guarantees crawlability.
        */}
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Sivaprasath V — Full Stack Developer &amp; Generative AI Engineer
        </h1>
        {children}
      </body>
    </html>
  );
}
