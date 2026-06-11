"use client";

import { marqueeSkills } from "@/lib/data";

export default function MarqueeRow() {
  const doubled = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 w-24 h-full z-10" style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
      <div className="absolute right-0 top-0 w-24 h-full z-10" style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />
      <div className="flex gap-6 w-max" style={{ animation: "marquee 32s linear infinite" }}>
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="text-sm font-medium whitespace-nowrap px-4 py-2 rounded-full cursor-default transition-all duration-200"
            style={{
              border: "1px solid rgba(0,212,255,0.18)",
              color: "#6B8CAE",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#00D4FF";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B8CAE";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.18)";
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
