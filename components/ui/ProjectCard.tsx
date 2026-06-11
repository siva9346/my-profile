"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Project } from "@/lib/data";
import { staggerItem } from "@/lib/animations";

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) translateZ(10px)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease";
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  const onMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.transition = "transform 0.15s ease";
  };

  return (
    <motion.div variants={staggerItem}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        className="glass-card p-6 h-full flex flex-col"
        style={{ transformStyle: "preserve-3d", cursor: "default" }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "#00D4FF" }}
            >
              {project.company}
            </span>
            {project.personal && (
              <span
                className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
              >
                <Star size={10} />
                Personal
              </span>
            )}
          </div>
          {project.featured && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "#00D4FF", color: "#050D1A" }}
            >
              Featured
            </span>
          )}
        </div>

        <h3
          className="font-heading font-bold text-xl mb-3 leading-tight"
          style={{ color: "#E8F4FD" }}
        >
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6B8CAE" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ border: "1px solid rgba(0,212,255,0.22)", color: "#00D4FF", background: "rgba(0,212,255,0.04)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: "#00D4FF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#00D4FF")}
        >
          View Project <ExternalLink size={13} />
        </a>
      </div>
    </motion.div>
  );
}
