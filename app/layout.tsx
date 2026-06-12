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

const SITE_URL = "https://sivaprasathv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Sivaprasath V — Full Stack Developer, AI Engineer & Software Engineer",
    template: "%s | Sivaprasath V",
  },
  description:
    "Sivaprasath V (Siva Prasath) is a Full Stack Developer, AI Engineer & Software Engineer based in Coimbatore, India. 3+ years building React.js, Next.js, FastAPI, LangChain, and OpenAI-powered applications at Vigo Retail and Sense7ai. Official portfolio of Sivaprasath.",

  keywords: [
    // Exact name + role phrases the user wants to rank for
    "Sivaprasath",
    "Sivaprasath V",
    "Sivaprasath AI Engineer",
    "Sivaprasath Software Engineer",
    "Sivaprasath Portfolio",
    "Sivaprasath Full Stack Developer",
    "Sivaprasath Generative AI Engineer",
    "Sivaprasath developer",
    // Two-word spelling variants
    "Siva Prasath",
    "Siva Prasath V",
    "Siva Prasath AI Engineer",
    "Siva Prasath Software Engineer",
    "Siva Prasath Portfolio",
    "Siva Prasath developer",
    // Profile / social handles
    "sivaprasathai",
    "siva9346",
    // Role keywords
    "Full Stack Developer & Generative AI Engineer",
    "Full Stack Developer Coimbatore",
    "AI Engineer Coimbatore",
    "Software Engineer Coimbatore",
    "Generative AI Engineer India",
    "Full Stack AI Engineer",
    "LLM engineer India",
    "AI engineer portfolio India",
    // Tech stack
    "React.js developer",
    "Next.js developer",
    "LangChain developer",
    "FastAPI developer",
    "OpenAI developer",
    "Python developer India",
    // Company / brand
    "Vigo Retail developer",
    "Sense7ai",
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
    title:       "Sivaprasath V — Full Stack Developer, AI Engineer & Software Engineer Portfolio",
    description: "Sivaprasath V (Siva Prasath) — Full Stack Developer, AI Engineer & Software Engineer. 3+ years shipping production React, Next.js, FastAPI, and LangChain applications at Vigo Retail and Sense7ai.",
    url:         SITE_URL,
    siteName:    "Sivaprasath V — Portfolio",
    type:        "profile",
    locale:      "en_US",
    images: [
      {
        url:    `${SITE_URL}/images/5.jpeg`,
        width:  1200,
        height: 630,
        alt:    "Sivaprasath V — Full Stack Developer, AI Engineer & Software Engineer",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Sivaprasath V — Full Stack Developer, AI Engineer & Software Engineer",
    description: "Sivaprasath V (Siva Prasath) — 3+ years building production AI and web applications. Portfolio of a Full Stack Developer & AI Engineer from Coimbatore.",
    creator:     "@sivaprasath",
    images:      [`${SITE_URL}/images/5.jpeg`],
  },
};

/* ── Structured data (JSON-LD) ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name:          "Sivaprasath V",
      alternateName: ["Siva Prasath", "Siva Prasath V", "Sivaprasath"],
      givenName:     "Sivaprasath",
      familyName:    "V",
      jobTitle:      "Full Stack Developer & Generative AI Engineer",
      hasOccupation: [
        { "@type": "Occupation", "name": "Full Stack Developer" },
        { "@type": "Occupation", "name": "AI Engineer"         },
        { "@type": "Occupation", "name": "Software Engineer"   },
        { "@type": "Occupation", "name": "Generative AI Engineer" },
      ],
      description: "Sivaprasath V is a Full Stack Developer, AI Engineer, and Software Engineer with 3+ years of experience building React, Next.js, FastAPI, and LLM-powered applications. Portfolio at sivaprasathv.vercel.app.",
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
      name:    "Sivaprasath V — Portfolio | Full Stack Developer, AI Engineer & Software Engineer",
      url:     SITE_URL,
      description:
        "Official portfolio of Sivaprasath V (Siva Prasath) — Full Stack Developer, AI Engineer & Software Engineer from Coimbatore, India.",
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

        {/* Entity disambiguation — tells Google these profiles belong to the same person */}
        <link rel="me" href="https://www.linkedin.com/in/sivaprasathai/" />
        <link rel="me" href="https://github.com/siva9346" />
      </head>
      <body style={{ background: "#050D1A" }}>
        {/*
          Hidden H1 that is always in the static HTML — ensures Google sees the
          name even before JS executes. The visible H1 inside HeroSection is
          rendered by React, but this guarantees crawlability.
        */}
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Sivaprasath V — Full Stack Developer, AI Engineer &amp; Software Engineer Portfolio
        </h1>
        {children}
      </body>
    </html>
  );
}
