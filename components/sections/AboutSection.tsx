"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { personalInfo, skills } from "@/lib/data";

const SKILL_CATEGORIES = [
  { label: "Frontend",    items: skills.frontend },
  { label: "AI & LLMs",  items: skills.ai       },
  { label: "Backend",    items: skills.backend   },
  { label: "Cloud",      items: skills.cloud     },
];

export default function AboutSection() {
  return (
    <section
      id="section-about"
      style={{ minHeight: "100vh", background: "transparent", padding: "100px clamp(24px,8vw,120px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ marginBottom: 64 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
            01 / About
          </p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            About Me
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="about-grid">
          {/* Left — bio */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.9 }}>
              I&rsquo;m a Full Stack Developer and Generative AI Engineer based in Coimbatore, Tamil Nadu. With 3+ years of
              experience shipping production-grade web applications, I specialise in building React/Next.js frontends
              and Python backends powered by large language models.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.9 }}>
              My background in Mechanical Engineering gives me a systems-thinking mindset — I approach software the
              same way: modular, efficient, and built to last. Whether it&rsquo;s a RAG pipeline for compliance teams or a
              real-time inventory platform for MSMEs, I care deeply about the product, not just the code.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Location", personalInfo.location],
                ["Email",    personalInfo.email],
                ["Phone",    personalInfo.phone],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ color: "var(--cyan)", fontWeight: 600, fontSize: 13, minWidth: 70 }}>{k}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — skills grid */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {SKILL_CATEGORIES.map((cat) => (
              <motion.div key={cat.label} variants={staggerItem}>
                <p style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  {cat.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.items.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
