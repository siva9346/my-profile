"use client";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card" style={{ padding: 24 }}>
      <h3 style={{ color: "var(--text)", fontWeight: 700, marginBottom: 8 }}>{project.title}</h3>
      <p style={{ color: "var(--cyan)", fontSize: 13, marginBottom: 12 }}>{project.company}</p>
      <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        {project.stack.map((s) => (
          <span key={s} className="skill-tag" style={{ fontSize: 11 }}>{s}</span>
        ))}
      </div>
    </motion.div>
  );
}
