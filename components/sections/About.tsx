"use client";

import { motion, useReducedMotion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportConfig } from "@/lib/animations";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          Who I Am
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-16 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Stats grid */}
          <motion.div
            variants={prefersReduced ? {} : staggerContainer}
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={prefersReduced ? {} : slideLeft}
                className="glass-card p-6 text-center"
                whileHover={prefersReduced ? {} : { y: -5 }}
              >
                <p
                  className="font-heading font-extrabold mb-2 heading-gradient"
                  style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm" style={{ color: "#6B8CAE" }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={prefersReduced ? {} : slideRight}
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="space-y-5"
          >
            <p className="leading-relaxed text-base" style={{ color: "#6B8CAE" }}>
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["React.js", "Next.js", "OpenAI", "LangChain", "FastAPI", "AWS"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00D4FF",
                    background: "rgba(0,212,255,0.05)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm" style={{ color: "#6B8CAE" }}>
                Available for select freelance projects
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
