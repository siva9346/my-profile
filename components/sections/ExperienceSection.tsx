"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section
      id="section-experience"
      style={{ minHeight: "120vh", background: "transparent", padding: "100px clamp(24px,8vw,120px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ marginBottom: 64 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
            03 / Experience
          </p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            Work Experience
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 2,
            background: "linear-gradient(to bottom,var(--cyan),transparent)",
            borderRadius: 1,
          }} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{ display: "flex", flexDirection: "column", gap: 48, paddingLeft: 48 }}
          >
            {experience.map((exp) => (
              <motion.div key={exp.id} variants={staggerItem} style={{ position: "relative" }}>
                {/* Dot */}
                <div style={{
                  position: "absolute",
                  left: -48 - 5,
                  top: 10,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: exp.current ? "var(--cyan)" : "var(--bg-3)",
                  border: "2px solid var(--cyan)",
                  boxShadow: exp.current ? "0 0 12px rgba(0,212,255,0.6)" : "none",
                }} />

                <div className="glass-card" style={{ padding: "28px 32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{exp.role}</h3>
                      <p style={{ fontSize: 15, color: "var(--cyan)", fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>{exp.period}</p>
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{exp.location}</p>
                      {exp.current && (
                        <span style={{
                          display: "inline-block",
                          marginTop: 8,
                          background: "rgba(0,212,255,0.12)",
                          border: "1px solid rgba(0,212,255,0.3)",
                          color: "var(--cyan)",
                          borderRadius: 999,
                          padding: "2px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}>
                          CURRENT
                        </span>
                      )}
                    </div>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: 12, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
                        <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 3 }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
