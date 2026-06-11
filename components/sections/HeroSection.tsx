"use client";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Download, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const typeSeq = personalInfo.roles.flatMap((r) => [r, 2000]);

  return (
    <section
      id="section-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "transparent",
        padding: "0 clamp(24px,8vw,120px)",
        paddingTop: 80,
      }}
    >
      {/* Desktop: text left, image right */}
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Content — left 55% */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            flex: "0 0 55%",
            maxWidth: "55%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          className="hero-content"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 13,
                color: "var(--cyan)",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              fontFamily: "var(--font-space)",
            }}
          >
            <span style={{ color: "var(--text)" }}>{personalInfo.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600, minHeight: 40 }}>
            <span style={{ color: "var(--text-muted)" }}>I&rsquo;m a{" "}</span>
            <TypeAnimation
              sequence={typeSeq as (string | number)[]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{ color: "var(--cyan)" }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(14px,1.5vw,16px)",
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* Stats */}
          <motion.div variants={item} style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {personalInfo.stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-space)" }}>
                  {s.value}
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => document.querySelector("#section-projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a
              href={personalInfo.resume}
              download="Sivaprasath_V_Resume.pdf"
              className="btn-outline"
            >
              <Download size={16} /> Download Resume
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={item} style={{ display: "flex", gap: 16 }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <GitHubIcon />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <LinkedInIcon />
            </a>
          </motion.div>
        </motion.div>

        {/* Profile image — absolute right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            scale:   { duration: 0.8, delay: 0.4 },
            y:       { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: 1 },
          }}
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className="hero-image-wrapper"
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              inset: "-10%",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "var(--cyan)",
              animation: "spinRing 14s linear infinite",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          {/* Mid ring */}
          <div
            style={{
              position: "absolute",
              inset: "-5%",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderRightColor: "var(--teal)",
              animation: "spinRingRev 9s linear infinite",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />
          {/* Glow aura */}
          <div
            style={{
              position: "absolute",
              inset: "-15%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
              animation: "pulseGlow 3s ease-in-out infinite alternate",
              pointerEvents: "none",
            }}
          />
          {/* Photo */}
          <div
            style={{
              width: "clamp(260px,32vw,440px)",
              height: "clamp(260px,32vw,440px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(0,212,255,0.5)",
              boxShadow: "0 0 60px rgba(0,212,255,0.25), 0 0 120px rgba(0,100,255,0.15)",
              position: "relative",
            }}
          >
            <Image
              src={personalInfo.photo}
              alt={personalInfo.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
              priority
              sizes="(max-width:768px) 200px, clamp(260px,32vw,440px)"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Scroll</span>
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, var(--cyan), transparent)",
            animation: "floatY 2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-content {
            flex: unset !important;
            max-width: 100% !important;
            align-items: center;
            text-align: center;
            padding-top: 240px !important;
          }
          .hero-image-wrapper {
            position: absolute !important;
            top: 100px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
          }
          .hero-image-wrapper > div:last-child {
            width: 180px !important;
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
}
