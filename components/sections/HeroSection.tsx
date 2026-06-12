"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

// ssr:false — library injects a <style> via document.createElement at
// module-evaluation time, which doesn't run on the server.
const TypeAnimation = dynamic(
  () => import("react-type-animation").then((m) => ({ default: m.TypeAnimation })),
  { ssr: false }
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
};

const sectionStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "transparent",
  position: "relative",
  display: "flex",
  alignItems: "center",
  paddingTop: 80,
  paddingBottom: 40,
  paddingLeft: "clamp(24px,8vw,120px)",
  paddingRight: "clamp(24px,8vw,120px)",
  overflowX: "hidden",
};

export default function HeroSection() {
  const seq = personalInfo.roles.flatMap((r) => [r, 2000]) as (string | number)[];

  return (
    <section id="section-hero" style={sectionStyle}>
      <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hero-content"
          style={{ display: "flex", flexDirection: "column", gap: 22 }}
        >

          {/* 1 — Availability badge */}
          <motion.div variants={item}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: 999, padding: "6px 16px",
              fontSize: 12, color: "var(--cyan)", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#00D4FF", display: "inline-block",
                animation: "pulseGlow 2s ease-in-out infinite",
              }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* 2 — Profile image: always in DOM (reserves layout space on mobile).
               CSS class hides it on desktop. */}
          <div className="hero-mobile-image">
            <div style={{
              width: 160, height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(0,212,255,0.5)",
              boxShadow: "0 0 40px rgba(0,212,255,0.25), 0 0 80px rgba(0,212,255,0.1)",
              position: "relative",
              flexShrink: 0,
            }}>
              <Image
                src="/images/5.jpeg"
                alt={personalInfo.name}
                fill
                priority
                sizes="160px"
                style={{ objectFit: "cover", objectPosition: "center 12%" }}
              />
              <div style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,212,255,0.022) 3px,rgba(0,212,255,0.022) 4px)",
              }} />
            </div>
          </div>

          {/* 3 — Name */}
          <motion.h1 variants={item} style={{
            fontSize: "clamp(36px,5vw,68px)", fontWeight: 800,
            lineHeight: 1.08, letterSpacing: "-1.5px",
            fontFamily: "var(--font-space)", color: "var(--text)",
            marginTop: 0,
          }}>
            {personalInfo.name}
          </motion.h1>

          {/* 4 — Animated role */}
          <motion.div variants={item} style={{
            fontSize: "clamp(18px,2vw,26px)", fontWeight: 600, minHeight: 36,
          }}>
            <span style={{ color: "var(--text-muted)" }}>I&rsquo;m a </span>
            <TypeAnimation
              sequence={seq}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              cursor={false}
              style={{ color: "var(--cyan)" }}
            />
          </motion.div>

          {/* 5 — Description */}
          <motion.p variants={item} style={{
            color: "var(--text-muted)", fontSize: "clamp(13px,1.3vw,16px)",
            lineHeight: 1.85, maxWidth: 500,
          }}>
            {personalInfo.bio}
          </motion.p>

          {/* 6 — Stats */}
          <motion.div variants={item} className="hero-stats" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {personalInfo.stats.map((s) => (
              <div key={s.label}>
                <div style={{
                  fontSize: "clamp(22px,2.6vw,36px)", fontWeight: 800,
                  color: "var(--cyan)", fontFamily: "var(--font-space)", lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11, color: "var(--text-muted)",
                  fontWeight: 500, marginTop: 4, letterSpacing: "0.04em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* 7 — CTA buttons */}
          <motion.div variants={item} className="hero-actions" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => document.querySelector("#section-projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a href={personalInfo.resume} download="Sivaprasath_V_Resume.pdf" className="btn-outline">
              <Download size={16} /> Resume
            </a>
          </motion.div>

          {/* 8 — Social icons */}
          <motion.div variants={item} className="hero-social" style={{ display: "flex", gap: 14 }}>
            {[
              { href: personalInfo.github,   Icon: GitHubIcon   },
              { href: personalInfo.linkedin, Icon: LinkedInIcon },
            ].map(({ href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Icon />
              </a>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        opacity: 0.4,
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--cyan), transparent)", animation: "floatY 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
