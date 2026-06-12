"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface SectionPhotoProps {
  src: string;
  alt: string;
  side?: "left" | "right";
  size?: number;
  shape?: "circle" | "rect";
}

export default function SectionPhoto({
  src,
  alt,
  side = "right",
  size = 320,
  shape = "rect",
}: SectionPhotoProps) {
  const radius = shape === "circle" ? "50%" : 16;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "right" ? 60 : -60, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" as const }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: shape === "circle" ? "50%" : 22,
          background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
          animation: "pulseGlow 3s ease-in-out infinite alternate",
        }}
      />
      {/* Spinning border ring (top only) */}
      {shape === "circle" && (
        <>
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            border: "1.5px solid transparent",
            borderTopColor: "var(--cyan)",
            animation: "spinRing 10s linear infinite",
            opacity: 0.7,
          }} />
          <div style={{
            position: "absolute", inset: -6, borderRadius: "50%",
            border: "1px solid transparent",
            borderRightColor: "var(--teal)",
            animation: "spinRingRev 7s linear infinite",
            opacity: 0.4,
          }} />
        </>
      )}
      {/* Gradient border frame */}
      <div
        style={{
          position: "absolute", inset: -1.5, borderRadius: radius,
          background: "linear-gradient(135deg, rgba(0,212,255,0.6), transparent 50%, rgba(0,100,255,0.5))",
        }}
      />
      {/* Photo */}
      <div
        style={{
          position: "relative",
          width: "100%", height: "100%",
          borderRadius: radius,
          overflow: "hidden",
          border: "1px solid rgba(0,212,255,0.25)",
          boxShadow: "0 0 40px rgba(0,212,255,0.15), 0 0 80px rgba(0,100,255,0.1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: "center 15%" }}
          sizes={`${size}px`}
        />
        {/* Scan-line overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,212,255,0.025) 3px,rgba(0,212,255,0.025) 4px)",
            pointerEvents: "none",
          }}
        />
        {/* Tinted overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(0,30,60,0.25) 0%, transparent 60%, rgba(0,80,120,0.15) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Corner brackets (holographic accent) */}
      {shape === "rect" && (
        <>
          {[
            { top: -4, left: -4,   borderTop: "2px solid #00D4FF", borderLeft:  "2px solid #00D4FF" },
            { top: -4, right: -4,  borderTop: "2px solid #00D4FF", borderRight: "2px solid #00D4FF" },
            { bottom: -4, left: -4,  borderBottom: "2px solid #00D4FF", borderLeft:  "2px solid #00D4FF" },
            { bottom: -4, right: -4, borderBottom: "2px solid #00D4FF", borderRight: "2px solid #00D4FF" },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 20, height: 20,
                animation: `bracketBlink 2s ease-in-out ${i * 0.5}s infinite`,
                ...style,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
