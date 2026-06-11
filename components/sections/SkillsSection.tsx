"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { skills, marqueeSkills } from "@/lib/data";

const ALL_SKILLS = [
  { category: "Frontend",   items: skills.frontend, color: "#00D4FF" },
  { category: "AI & LLMs",  items: skills.ai,       color: "#00FFCC" },
  { category: "Backend",    items: skills.backend,   color: "#0088FF" },
  { category: "Cloud",      items: skills.cloud,     color: "#C9A84C" },
];

export default function SkillsSection() {
  const marquee = [...marqueeSkills, ...marqueeSkills];

  return (
    <section
      id="section-skills"
      style={{ minHeight: "100vh", background: "transparent", padding: "100px 0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,8vw,120px)" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ marginBottom: 64 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
            02 / Skills
          </p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            Technical Skills
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}
          className="skills-grid"
        >
          {ALL_SKILLS.map((cat) => (
            <motion.div
              key={cat.category}
              variants={staggerItem}
              className="glass-card"
              style={{ padding: 28 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 3, height: 20, background: cat.color, borderRadius: 2, display: "inline-block" }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "0.04em" }}>
                  {cat.category}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="skill-tag"
                    style={{ borderColor: `${cat.color}33`, color: cat.color }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ marginTop: 64, overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,#fff 10%,#fff 90%,transparent)" }}>
        <div
          style={{
            display: "flex",
            gap: 32,
            width: "max-content",
            animation: "marquee 30s linear infinite",
            paddingLeft: 32,
          }}
        >
          {marquee.map((s, i) => (
            <span
              key={i}
              style={{
                whiteSpace: "nowrap",
                color: "var(--text-muted)",
                fontSize: 14,
                fontWeight: 500,
                opacity: 0.5,
                padding: "4px 0",
              }}
            >
              {s} <span style={{ color: "var(--cyan)", marginLeft: 8 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
