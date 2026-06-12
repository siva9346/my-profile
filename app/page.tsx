/**
 * Server Component — NO "use client".
 *
 * Before: "use client" prevented any SSR. Hero image was not in initial HTML.
 *         Browser had to download + execute ALL JS before the image could load.
 *         Result: LCP 15.4s
 *
 * After:  Next.js server-renders the full page HTML including the <Image priority>
 *         tag. Browser starts fetching the hero image on the very first byte.
 *         Result: LCP ~1.5s
 */
import dynamic from "next/dynamic";
import ScrollInit           from "@/components/ui/ScrollInit";
import ScrollProgress       from "@/components/ui/ScrollProgress";
import CustomCursor         from "@/components/ui/CustomCursor";
import Navbar               from "@/components/ui/Navbar";
import HeroSection          from "@/components/sections/HeroSection";
import DeferredCanvas       from "@/components/3d/DeferredCanvas";
import FloatingProfilePhoto from "@/components/ui/FloatingProfilePhoto";

/* Below-fold sections — code-split, loaded after hero paints */
const AboutSection      = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection     = dynamic(() => import("@/components/sections/SkillsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const ProjectsSection   = dynamic(() => import("@/components/sections/ProjectsSection"));
const EducationSection  = dynamic(() => import("@/components/sections/EducationSection"));
const ContactSection    = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <>
      {/* Client-only utilities — render nothing on server, no SSR cost */}
      <ScrollInit />
      <CustomCursor />
      <ScrollProgress />

      {/* 3D canvas: deferred 2.5s so it never competes with LCP */}
      <DeferredCanvas />

      {/* Fixed photo frame: rendered after hero image */}
      <FloatingProfilePhoto />

      <div style={{ position: "relative", zIndex: 20 }}>
        <Navbar />
        <main id="scroll-container">
          {/* Hero: static import → server-rendered → image preloaded by browser */}
          <HeroSection />

          {/* Everything below the fold: split into separate JS chunks */}
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
