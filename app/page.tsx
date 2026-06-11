"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

const SectionDivider = dynamic(() => import("@/components/ui/SectionDivider"), { ssr: false });

export default function Home() {
  useEffect(() => {
    let lenis: any;
    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.08, duration: 1.2, smoothWheel: true, syncTouch: false });
      const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    };
    init();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <NavBar />
      <main>
        <HeroSection />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <About />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <Skills />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <Experience />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <Projects />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <Education />
        <Suspense fallback={null}><SectionDivider /></Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
