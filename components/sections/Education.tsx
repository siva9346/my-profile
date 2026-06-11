"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { fadeUp, scaleIn, viewportConfig } from "@/lib/animations";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          Academic Background
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-14 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Education
        </motion.h2>

        <motion.div
          variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card p-10 md:p-14 text-center relative overflow-hidden">
            {/* Background gear watermark */}
            <div className="absolute -right-12 -bottom-12 w-52 h-52 pointer-events-none opacity-[0.04]">
              <svg viewBox="0 0 200 200" fill="none" stroke="#00D4FF" strokeWidth="3" className="w-full h-full animate-spin-slow">
                <circle cx="100" cy="100" r="88" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i / 12) * Math.PI * 2;
                  return (
                    <line key={i}
                      x1={100 + Math.cos(a) * 70} y1={100 + Math.sin(a) * 70}
                      x2={100 + Math.cos(a) * 88} y2={100 + Math.sin(a) * 88}
                      strokeWidth="6"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="24" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                <GraduationCap size={22} style={{ color: "#00D4FF" }} />
              </div>
              <motion.svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="6"
                className="w-8 h-8 opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  return (
                    <line key={i}
                      x1={50 + Math.cos(a) * 28} y1={50 + Math.sin(a) * 28}
                      x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="18" />
              </motion.svg>
            </div>

            <h3
              className="font-heading font-bold mb-2"
              style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#E8F4FD" }}
            >
              {education.degree}
            </h3>
            <p className="font-semibold text-lg mb-1" style={{ color: "#00D4FF" }}>
              {education.institution}
            </p>
            <p className="text-sm mb-7" style={{ color: "#3A5570" }}>{education.period}</p>

            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <span className="text-sm" style={{ color: "#6B8CAE" }}>CGPA</span>
              <span className="font-heading font-extrabold text-2xl heading-gradient">{education.cgpa}</span>
            </div>

            <div style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }} className="pt-6">
              <p className="text-base italic" style={{ color: "#6B8CAE" }}>&ldquo;{education.tagline}&rdquo;</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
