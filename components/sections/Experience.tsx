"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { fadeUp, viewportConfig } from "@/lib/animations";
import TimelineItem from "@/components/ui/TimelineItem";

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          Where I&apos;ve Worked
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-16 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Work Experience
        </motion.h2>

        <div className="relative">
          {/* Desktop vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.35) 15%, rgba(0,212,255,0.35) 85%, transparent)" }}
          />
          {/* Mobile left line */}
          <div
            className="md:hidden absolute left-2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.25) 10%, rgba(0,212,255,0.25) 90%, transparent)" }}
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
