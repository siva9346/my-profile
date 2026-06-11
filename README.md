# Sivaprasath V — Portfolio

Professional portfolio for Sivaprasath V — Full Stack Developer & Generative AI Engineer.

**Live:** https://sivaprasath.dev

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom dark luxury design system)
- **Animations:** Framer Motion, Lenis smooth scroll
- **3D Scene:** Three.js + @react-three/fiber (animated gear hero)
- **SEO:** Next.js Metadata API + JSON-LD + next-sitemap

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```

## Adding Your Photo

Replace `/public/photo.jpg` with your headshot (400×400px square, JPG/WebP).

## Adding OG Image

Replace `/public/og-image.png` with a 1200×630px image.

## Environment Variables

```bash
cp .env.example .env.local
```

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://sivaprasath.dev` |

## Deploy to Vercel

1. Push repo to GitHub
2. [vercel.com/new](https://vercel.com/new) → import repo
3. Add `NEXT_PUBLIC_SITE_URL` env var
4. Deploy — zero config needed

## Project Structure

```
/app
  layout.tsx        — fonts (Inter + Space Grotesk), SEO metadata, JSON-LD
  page.tsx          — Lenis init, section assembly
  globals.css       — CSS variables, grain overlay, scrollbar, utility classes
/components
  /sections         — Hero, About, Skills, Experience, Projects, Education, Contact
  /ui               — GearScene (Three.js), NavBar, Footer, AnimatedCounter,
                      SkillCard, ProjectCard, TimelineItem, MarqueeRow,
                      CustomCursor, SocialIcons
/lib
  data.ts           — all resume content as typed TS (edit here to update content)
  animations.ts     — reusable Framer Motion variants
/public
  photo.jpg         — [REPLACE with your photo]
  og-image.png      — [REPLACE with OG image]
  sitemap.xml       — auto-generated at build
  robots.txt        — auto-generated at build
```

## Updating Content

All resume data lives in `/lib/data.ts`. Edit `personalInfo`, `experiences`, `projects`, or `skillCategories` — the entire site updates automatically.
