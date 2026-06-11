"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ChevronDown, Download } from "lucide-react";
import { personalInfo, typewriterRoles } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

const HeroScene = dynamic(() => import("@/components/ui/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 gear-fallback" />,
});

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const typeSeq = typewriterRoles.flatMap((r) => [r, 2200]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Three.js scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Deep vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,13,26,0.25) 0%, rgba(5,13,26,0.65) 55%, rgba(5,13,26,0.92) 100%)",
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" />

      {/* Hero content — centered */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
        {/* Left: text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={
            prefersReduced
              ? {}
              : { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } } }
          }
          className="flex-1 text-center md:text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00D4FF" }}
          >
            Hello, World 👋
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold leading-tight mb-5"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.02em",
              color: "#E8F4FD",
            }}
          >
            I&apos;m{" "}
            <span className="heading-gradient">{personalInfo.name}</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mb-6 font-heading font-semibold text-center"
            style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "#00D4FF", minHeight: "2em" }}
          >
            <TypeAnimation
              sequence={typeSeq as (string | number)[]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-center mx-auto max-w-lg mb-10 leading-relaxed"
            style={{ fontSize: "16px", color: "#6B8CAE" }}
          >
            Building production-grade{" "}
            <span style={{ color: "#E8F4FD" }}>React.js & Next.js</span> applications and{" "}
            <span style={{ color: "#E8F4FD" }}>LLM-powered AI</span> products that ship at scale.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-teal font-heading"
            >
              View My Work
            </button>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-outline-teal font-heading"
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-110 animate-pulse"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2), transparent)" }}
            />
            <div
              className="relative w-full h-full rounded-full overflow-hidden photo-glow"
              style={{ border: "2px solid rgba(0,212,255,0.3)" }}
            >
              <Image
                src="/images/5.jpeg"
                alt="Sivaprasath V — Full Stack Developer & Generative AI Engineer"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "#3A5570" }}>
          Scroll
        </span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "#00D4FF" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
