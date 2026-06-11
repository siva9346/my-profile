"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Download, ChevronDown, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #050D1A 0%, #071A2E 50%, #0A1628 100%)",
      }}
    />
  ),
});

const TYPE_ROLES = [
  "LLM Integration Specialist",   2000,
  "React.js Expert",               2000,
  "Generative AI Engineer",        2000,
  "RAG Pipeline Architect",        2000,
  "Full Stack Developer",          2000,
] as (string | number)[];

/* ─── Corner bracket ─── */
function Bracket({
  top, bottom, left, right,
  delay = 0,
}: {
  top?: number | string; bottom?: number | string;
  left?: number | string; right?: number | string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top, bottom, left, right,
        width: 22,
        height: 22,
        borderTop:    top    !== undefined ? "2px solid #00D4FF" : undefined,
        borderBottom: bottom !== undefined ? "2px solid #00D4FF" : undefined,
        borderLeft:   left   !== undefined ? "2px solid #00D4FF" : undefined,
        borderRight:  right  !== undefined ? "2px solid #00D4FF" : undefined,
      }}
    />
  );
}

/* ─── Profile photo with orbiting rings ─── */
function ProfileImage({ mobile }: { mobile?: boolean }) {
  const size = mobile ? 200 : undefined;

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "relative",
        width: size ?? "clamp(280px, 32vw, 460px)",
        height: size ?? "clamp(280px, 32vw, 460px)",
      }}
    >
      {/* Glow aura */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-15%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,100,255,0.08) 50%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Outer spinning ring — 110% */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "110%", height: "110%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: "100%", height: "100%",
            borderRadius: "50%",
            border: "1.5px solid rgba(0,212,255,0.15)",
            borderTopColor: "#00D4FF",
            animation: "spinRing 12s linear infinite",
          }}
        />
      </div>

      {/* Middle ring — 105% */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "105%", height: "105%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: "100%", height: "100%",
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.1)",
            borderRightColor: "#00FFCC",
            animation: "spinRingRev 8s linear infinite",
          }}
        />
      </div>

      {/* The actual image */}
      <div
        style={{
          width: "100%", height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(0,212,255,0.4)",
          boxShadow:
            "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(0,100,255,0.2), inset 0 0 40px rgba(0,212,255,0.05)",
        }}
      >
        <Image
          src="/images/5.jpeg"
          alt="Sivaprasath V — Full Stack Developer & Generative AI Engineer"
          fill
          priority
          className="object-cover object-top"
          style={{ borderRadius: "50%" }}
        />
      </div>

      {/* Holographic corner brackets */}
      <Bracket top={-6}    left={-6}  delay={0}   />
      <Bracket top={-6}    right={-6} delay={0.5} />
      <Bracket bottom={-6} left={-6}  delay={1.0} />
      <Bracket bottom={-6} right={-6} delay={1.5} />
    </motion.div>
  );
}

/* ─── Inline stat item ─── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-heading font-extrabold"
        style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "#00D4FF" }}
      >
        {value}
      </span>
      <span className="text-xs mt-0.5" style={{ color: "#6B8CAE" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Scroll indicator ─── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.7 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
    >
      <span
        className="font-heading"
        style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#3A5570" }}
      >
        SCROLL
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={18} style={{ color: "#00D4FF" }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero content (left pane) ─── */
function HeroContent() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: 0.3 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center"
      style={{
        paddingLeft: "clamp(24px, 6vw, 96px)",
        paddingTop: "80px",
        paddingBottom: "40px",
        width: "100%",
        maxWidth: "640px",
      }}
    >
      {/* Badge pill */}
      <motion.div variants={item} className="mb-5 self-start">
        <span
          className="font-heading text-xs tracking-widest"
          style={{
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.28)",
            borderRadius: "100px",
            padding: "6px 16px",
            color: "#00D4FF",
            letterSpacing: "0.15em",
            display: "inline-block",
          }}
        >
          FULL STACK · AI ENGINEER · LLM SPECIALIST
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        variants={item}
        className="font-heading font-extrabold mb-4 leading-tight"
        style={{
          fontSize: "clamp(42px, 6.5vw, 88px)",
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #E8F4FD 30%, #00D4FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        I&apos;m {personalInfo.name}
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        variants={item}
        className="font-heading font-medium mb-5"
        style={{
          fontSize: "clamp(18px, 2.5vw, 28px)",
          color: "#00D4FF",
          minHeight: "1.4em",
        }}
      >
        <TypeAnimation
          sequence={TYPE_ROLES}
          wrapper="span"
          speed={55}
          repeat={Infinity}
          cursor
        />
      </motion.div>

      {/* Description */}
      <motion.p
        variants={item}
        className="mb-6 leading-relaxed"
        style={{
          maxWidth: "520px",
          fontSize: "clamp(14px, 1.5vw, 17px)",
          color: "#7BA7C4",
          lineHeight: 1.75,
        }}
      >
        Building production-grade{" "}
        <span style={{ color: "#E8F4FD" }}>React.js & Next.js</span> applications and{" "}
        <span style={{ color: "#E8F4FD" }}>LLM-powered AI</span> products that ship at scale.
        Specialized in OpenAI, LangChain, RAG Pipelines, and enterprise automation.
      </motion.p>

      {/* Stats row */}
      <motion.div
        variants={item}
        className="flex items-center gap-6 mb-8"
      >
        <StatItem value="3+" label="Years Experience" />
        <div style={{ width: 1, height: 36, background: "rgba(0,212,255,0.2)" }} />
        <StatItem value="4" label="Domains" />
        <div style={{ width: 1, height: 36, background: "rgba(0,212,255,0.2)" }} />
        <StatItem value="10K+" label="Resumes Processed" />
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-4 mb-6"
      >
        <button
          onClick={() =>
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            background: "linear-gradient(135deg, #00AADD 0%, #0066FF 100%)",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 15,
            padding: "14px 32px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(0,180,255,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 50px rgba(0,180,255,0.6)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0,180,255,0.35)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View My Work
        </button>

        <a
          href={personalInfo.resumeUrl}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "1.5px solid rgba(0,212,255,0.5)",
            color: "#00D4FF",
            fontWeight: 600,
            fontSize: 15,
            padding: "14px 32px",
            borderRadius: 8,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,212,255,0.1)";
            e.currentTarget.style.borderColor = "#00D4FF";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(0,212,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Download size={15} />
          Download Resume
        </a>
      </motion.div>

      {/* Social icons */}
      <motion.div variants={item} className="flex items-center gap-3">
        {[
          { href: personalInfo.linkedin,          Icon: LinkedInIcon, label: "LinkedIn" },
          { href: personalInfo.github,            Icon: GitHubIcon,   label: "GitHub"   },
          { href: `mailto:${personalInfo.email}`, Icon: Mail,         label: "Email"    },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: 36, height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(0,212,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#7BA7C4",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#00D4FF";
              e.currentTarget.style.borderColor = "#00D4FF";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,212,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7BA7C4";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Icon size={16} />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN HERO SECTION ─── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #050D1A 0%, #071A2E 50%, #0A1628 100%)",
      }}
    >
      {/* ── 3D fullscreen canvas ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroCanvas />
      </div>

      {/* ── Subtle vignette overlay ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,13,26,0.5) 70%, rgba(5,13,26,0.85) 100%)",
        }}
      />

      {/* ── Grain ── */}
      <div className="grain-overlay" />

      {/* ── DESKTOP LAYOUT: text left + photo right absolute ── */}
      <div
        style={{ position: "relative", zIndex: 10, height: "100vh" }}
        className="hidden md:flex items-stretch"
      >
        {/* Left: text content */}
        <div className="flex-1 flex items-center">
          <HeroContent />
        </div>

        {/* Right: absolute photo */}
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <ProfileImage />
        </div>
      </div>

      {/* ── MOBILE LAYOUT: stacked ── */}
      <div
        style={{ position: "relative", zIndex: 10, height: "100vh", overflowY: "auto" }}
        className="md:hidden flex flex-col items-center justify-start pt-20 pb-8 px-6 gap-0"
      >
        {/* Photo first on mobile */}
        <div className="mb-6">
          <ProfileImage mobile />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center text-center w-full"
          style={{ maxWidth: 360 }}
        >
          {/* Badge */}
          <span
            className="font-heading text-xs tracking-widest mb-4"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.28)",
              borderRadius: "100px",
              padding: "5px 14px",
              color: "#00D4FF",
              letterSpacing: "0.1em",
              display: "inline-block",
            }}
          >
            Full Stack · AI Engineer
          </span>

          <h1
            className="font-heading font-extrabold mb-3 leading-tight"
            style={{
              fontSize: "clamp(32px, 9vw, 52px)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #E8F4FD 30%, #00D4FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            I&apos;m {personalInfo.name}
          </h1>

          <div
            className="font-heading font-medium mb-4"
            style={{ fontSize: "clamp(15px, 4vw, 20px)", color: "#00D4FF", minHeight: "1.4em" }}
          >
            <TypeAnimation sequence={TYPE_ROLES} wrapper="span" speed={55} repeat={Infinity} />
          </div>

          <p className="text-sm mb-5 leading-relaxed" style={{ color: "#7BA7C4" }}>
            Building production-grade React.js & LLM-powered AI products that ship at scale.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-5 mb-6 flex-wrap justify-center">
            <StatItem value="3+" label="Years" />
            <div style={{ width: 1, height: 30, background: "rgba(0,212,255,0.2)" }} />
            <StatItem value="4" label="Domains" />
            <div style={{ width: 1, height: 30, background: "rgba(0,212,255,0.2)" }} />
            <StatItem value="10K+" label="Users" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: 300 }}>
            <button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #00AADD 0%, #0066FF 100%)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 24px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(0,180,255,0.35)",
              }}
            >
              View My Work
            </button>
            <a
              href={personalInfo.resumeUrl}
              download
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                border: "1.5px solid rgba(0,212,255,0.5)",
                color: "#00D4FF",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 24px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              <Download size={14} /> Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
