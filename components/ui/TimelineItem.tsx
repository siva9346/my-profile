"use client";

import { motion } from "framer-motion";
import { Experience } from "@/lib/data";
import { slideLeft, slideRight } from "@/lib/animations";

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
        <span className="font-heading font-bold text-lg" style={{ color: "#00D4FF" }}>
          {experience.company}
        </span>
        <span className="text-xs whitespace-nowrap mt-1" style={{ color: "#3A5570" }}>
          {experience.period}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-medium text-sm" style={{ color: "#E8F4FD" }}>{experience.role}</span>
        {experience.type === "intern" && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
          >
            Intern
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#6B8CAE" }}>
            <span className="mt-1.5 shrink-0" style={{ color: "#00D4FF" }}>▹</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const isLeft = index % 2 === 0;
  const vp = { once: true, margin: "-80px" as const };

  return (
    <div className="relative flex items-start gap-0 md:gap-8">
      {/* Desktop left */}
      <motion.div
        variants={isLeft ? slideLeft : { hidden: { opacity: 0 }, visible: { opacity: 0 } }}
        initial="hidden" whileInView="visible" viewport={vp}
        className={`hidden md:block w-[calc(50%-2rem)] ${!isLeft ? "opacity-0 pointer-events-none" : ""}`}
      >
        {isLeft && <ExperienceCard experience={experience} />}
      </motion.div>

      {/* Dot */}
      <div className="relative z-10 flex-shrink-0 mt-5">
        <div
          className="w-4 h-4 rounded-full animate-pulse-teal"
          style={{
            background: "#00D4FF",
            border: "2px solid var(--bg-primary)",
            boxShadow: "0 0 10px rgba(0,212,255,0.6)",
          }}
        />
      </div>

      {/* Desktop right */}
      <motion.div
        variants={!isLeft ? slideRight : { hidden: { opacity: 0 }, visible: { opacity: 0 } }}
        initial="hidden" whileInView="visible" viewport={vp}
        className={`hidden md:block w-[calc(50%-2rem)] ${isLeft ? "opacity-0 pointer-events-none" : ""}`}
      >
        {!isLeft && <ExperienceCard experience={experience} />}
      </motion.div>

      {/* Mobile */}
      <motion.div
        variants={slideRight} initial="hidden" whileInView="visible" viewport={vp}
        className="md:hidden flex-1"
      >
        <ExperienceCard experience={experience} />
      </motion.div>
    </div>
  );
}
