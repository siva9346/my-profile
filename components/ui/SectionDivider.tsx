"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative h-20 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{
          opacity,
          scaleX,
          background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
          height: "1px",
          width: "100%",
          maxWidth: "56rem",
          transformOrigin: "left",
        }}
      />
      <motion.div
        style={{
          opacity,
          position: "absolute",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#00D4FF",
          boxShadow: "0 0 12px rgba(0,212,255,0.8)",
        }}
      />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#00D4FF",
          }}
          animate={{ x: ["-40vw", "40vw"], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
        />
      ))}
    </div>
  );
}
