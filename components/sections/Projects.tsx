"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-medium text-xs tracking-[0.25em] uppercase mb-3 text-center"
          style={{ color: "#00D4FF" }}
        >
          What I&apos;ve Built
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="font-heading font-extrabold text-center mb-4 heading-gradient"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Featured Work
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center max-w-xl mx-auto mb-14 text-base"
          style={{ color: "#6B8CAE" }}
        >
          Production systems that power real businesses — from AI compliance tools to retail platforms.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
