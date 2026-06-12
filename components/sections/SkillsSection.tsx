"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { skills, marqueeSkills } from "@/lib/data";

const ALL_SKILLS = [
  { category: "Frontend",  items: skills.frontend, color: "#00D4FF" },
  { category: "AI & LLMs", items: skills.ai,       color: "#00FFCC" },
  { category: "Backend",   items: skills.backend,   color: "#0088FF" },
  { category: "Cloud",     items: skills.cloud,     color: "#C9A84C" },
];

export default function SkillsSection() {
  const marquee = [...marqueeSkills, ...marqueeSkills];

  // Server and initial client both render "1fr 1fr" — no hydration mismatch.
  // After mount, switch to single column on mobile so cards stack properly
  // regardless of whether the CSS media query is cached by the browser.
  const [cols, setCols] = useState("1fr 1fr");
  useEffect(() => {
    const update = () => setCols(window.innerWidth <= 768 ? "1fr" : "1fr 1fr");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="section-skills" style={{ minHeight: "100vh", background: "transparent", padding: "clamp(60px,8vw,100px) 0 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingLeft: "clamp(24px,8vw,120px)", paddingRight: "clamp(24px,8vw,120px)" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig} style={{ marginBottom: 56 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12, marginBottom: 10 }}>02 / Skills</p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>Technical Skills</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ display: "grid", gridTemplateColumns: cols, gap: 24 }}
          className="skills-grid"
        >
          {ALL_SKILLS.map((cat) => (
            <motion.div key={cat.category} variants={staggerItem} className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ width: 3, height: 18, background: cat.color, borderRadius: 2 }} />
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em" }}>{cat.category}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map((s) => <span key={s} className="skill-tag" style={{ borderColor: `${cat.color}33`, color: cat.color }}>{s}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ marginTop: 64, overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,#fff 8%,#fff 92%,transparent)" }}>
        <div style={{ display: "flex", gap: 28, width: "max-content", animation: "marquee 28s linear infinite", paddingLeft: 28 }}>
          {marquee.map((s, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", color: "var(--text-muted)", fontSize: 13, fontWeight: 500, opacity: 0.5 }}>
              {s} <span style={{ color: "var(--cyan)", marginLeft: 6 }}>·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
