"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { personalInfo, skills } from "@/lib/data";

const CATS = [
  { label: "Frontend",  items: skills.frontend },
  { label: "AI & LLMs", items: skills.ai       },
  { label: "Backend",   items: skills.backend   },
  { label: "Cloud",     items: skills.cloud     },
];

export default function AboutSection() {
  return (
    <section id="section-about" style={{ minHeight: "100vh", background: "transparent", padding: "clamp(60px,8vw,100px) clamp(24px,8vw,120px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ marginBottom: 56 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12, marginBottom: 10 }}>01 / About</p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>About Me</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 800 }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>
                I&rsquo;m a Full Stack Developer and Generative AI Engineer with 3+ years of experience shipping production-grade web applications. I specialise in building React/Next.js frontends and Python backends powered by large language models.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.9 }}>
                My background in Mechanical Engineering gives me a systems-thinking mindset — I approach software the same way: modular, efficient, and built to last.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Location", personalInfo.location], ["Email", personalInfo.email], ["Phone", personalInfo.phone]].map(([k, v]) => (
                <motion.div key={k} variants={staggerItem} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--cyan)", fontWeight: 600, fontSize: 12, minWidth: 72, letterSpacing: "0.04em" }}>{k}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{v}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {CATS.map((cat) => (
                <motion.div key={cat.label} variants={staggerItem}>
                  <p style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{cat.label}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {cat.items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
