"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { initScroll } from "@/lib/scrollSetup";

import ScrollProgress  from "@/components/ui/ScrollProgress";
import CustomCursor    from "@/components/ui/CustomCursor";
import Navbar          from "@/components/ui/Navbar";
import HeroSection     from "@/components/sections/HeroSection";
import AboutSection    from "@/components/sections/AboutSection";
import SkillsSection   from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection  from "@/components/sections/ContactSection";

const MasterCanvas = dynamic(() => import("@/components/3d/MasterCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  useEffect(() => {
    const lenis = initScroll();
    return () => { lenis.destroy(); };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <MasterCanvas />

      <div style={{ position: "relative", zIndex: 20 }}>
        <Navbar />
        <main id="scroll-container">
          <HeroSection />
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
