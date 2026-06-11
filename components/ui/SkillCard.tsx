"use client";

interface SkillCardProps {
  name: string;
  color?: string;
}

export default function SkillCard({ name, color = "var(--cyan)" }: SkillCardProps) {
  return (
    <span
      className="skill-tag"
      style={{ borderColor: `${color}33`, color }}
    >
      {name}
    </span>
  );
}
