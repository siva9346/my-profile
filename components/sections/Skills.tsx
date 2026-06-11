"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SkillCard from "@/components/ui/SkillCard";
import MarqueeRow from "@/components/ui/MarqueeRow";

const SkillsBackground = dynamic(() => import("@/components/ui/SkillsBackground"), { ssr: false, loading: () => null });

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* 3D wireframe geometry background */}
      <Suspense fallback={null}>
        <SkillsBackground />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          What I Work With
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-4 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Tech Arsenal
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center max-w-xl mx-auto mb-12 text-base"
          style={{ color: "#6B8CAE" }}
        >
          From pixel-perfect frontends to scalable AI pipelines — tools I ship with daily.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="mb-14"
        >
          <MarqueeRow />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {skillCategories.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
