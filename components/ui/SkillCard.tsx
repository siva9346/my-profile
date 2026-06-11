"use client";

import { motion } from "framer-motion";
import { Monitor, Brain, Server, Cloud, LucideIcon } from "lucide-react";
import { SkillCategory } from "@/lib/data";
import { staggerItem } from "@/lib/animations";

type IconKey = "Monitor" | "Brain" | "Server" | "Cloud";
const iconMap: Record<IconKey, LucideIcon> = { Monitor, Brain, Server, Cloud };

export default function SkillCard({ category }: { category: SkillCategory }) {
  const Icon: LucideIcon = iconMap[category.icon as IconKey] ?? Monitor;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <Icon size={17} style={{ color: "#00D4FF" }} />
        </div>
        <h3 className="font-heading font-semibold text-lg" style={{ color: "#E8F4FD" }}>
          {category.title}
        </h3>
      </div>

      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm" style={{ color: "#6B8CAE" }}>{skill.name}</span>
              <span className="text-xs font-medium" style={{ color: "#00D4FF" }}>{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#0C1E35" }}>
              <motion.div
                className="skill-bar-fill h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
