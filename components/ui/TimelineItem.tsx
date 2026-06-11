"use client";
import type { Experience } from "@/lib/data";

export default function TimelineItem({ exp }: { exp: Experience }) {
  return (
    <div className="glass-card" style={{ padding: "24px 28px", marginBottom: 24 }}>
      <h3 style={{ color: "var(--text)", fontWeight: 700, fontSize: 18 }}>{exp.role}</h3>
      <p style={{ color: "var(--cyan)", fontSize: 14, marginBottom: 4 }}>{exp.company}</p>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>{exp.period} · {exp.location}</p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {exp.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
            <span style={{ color: "var(--cyan)" }}>▸</span>{b}
          </li>
        ))}
      </ul>
    </div>
  );
}
