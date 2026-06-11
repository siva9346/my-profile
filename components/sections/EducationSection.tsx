"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  return (
    <section
      id="section-education"
      style={{ minHeight: "80vh", background: "transparent", padding: "100px clamp(24px,8vw,120px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ marginBottom: 64 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
            05 / Education
          </p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            Education
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={staggerItem} className="glass-card" style={{ padding: "36px 40px", maxWidth: 700 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <GraduationCap size={24} color="var(--cyan)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{education.degree}</h3>
                <p style={{ fontSize: 15, color: "var(--cyan)", fontWeight: 600, marginBottom: 4 }}>{education.college}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{education.period}</span>
                  <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600 }}>Aggregate: {education.aggregate}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {education.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ color: "var(--cyan)", flexShrink: 0 }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
