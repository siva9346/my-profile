"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectsSection() {
  return (
    <section
      id="section-projects"
      style={{ minHeight: "120vh", background: "transparent", padding: "100px clamp(24px,8vw,120px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ marginBottom: 64 }}>
          <p style={{ color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
            04 / Projects
          </p>
          <h2 className="heading-gradient" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={staggerItem}
              className="glass-card"
              style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16, cursor: "default" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: 11, color: p.personal ? "var(--gold)" : "var(--cyan)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {p.company}
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginTop: 4, lineHeight: 1.3 }}>{p.title}</h3>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                      <GitHubIcon />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, flex: 1 }}>{p.description}</p>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 8, borderTop: "1px solid rgba(0,212,255,0.08)" }}>
                {p.stack.map((s) => (
                  <span key={s} className="skill-tag" style={{ fontSize: 11, padding: "2px 8px" }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
