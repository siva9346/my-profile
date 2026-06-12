"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_STATES = [
  { id: "hero",       image: "/images/5.jpeg", ringColor: "#00D4FF", glowColor: "rgba(0,212,255,0.35)",  glowFar: "rgba(0,100,255,0.2)",   ringSpeed: "10s", ringStyle: "solid",  label: "Full Stack Developer",        labelColor: "#00D4FF", scale: 1,    orbitColor: "#00D4FF" },
  { id: "about",      image: "/images/1.jpeg", ringColor: "#00FFCC", glowColor: "rgba(0,255,204,0.3)",   glowFar: "rgba(0,150,120,0.15)",  ringSpeed: "18s", ringStyle: "solid",  label: "3+ Years Experience",         labelColor: "#00FFCC", scale: 0.95, orbitColor: "#00FFCC" },
  { id: "skills",     image: "/images/3.jpeg", ringColor: "#0055FF", glowColor: "rgba(0,85,255,0.35)",   glowFar: "rgba(0,50,200,0.2)",    ringSpeed: "4s",  ringStyle: "dashed", label: "10+ Technologies",            labelColor: "#4488FF", scale: 0.90, orbitColor: "#0055FF" },
  { id: "experience", image: "/images/4.jpeg", ringColor: "#7B2FFF", glowColor: "rgba(123,47,255,0.35)", glowFar: "rgba(80,20,200,0.2)",   ringSpeed: "14s", ringStyle: "solid",  label: "Vigo Retail · Sense7ai",      labelColor: "#AA77FF", scale: 1.02, orbitColor: "#7B2FFF" },
  { id: "projects",   image: "/images/6.jpeg", ringColor: "#00D4FF", glowColor: "rgba(0,212,255,0.4)",   glowFar: "rgba(0,100,255,0.25)",  ringSpeed: "7s",  ringStyle: "solid",  label: "5 Key Projects",              labelColor: "#00D4FF", scale: 1,    orbitColor: "#00FFCC" },
  { id: "education",  image: "/images/1.jpeg", ringColor: "#C9A84C", glowColor: "rgba(201,168,76,0.3)",  glowFar: "rgba(150,100,30,0.15)", ringSpeed: "12s", ringStyle: "solid",  label: "B.E. Mechanical Engineering", labelColor: "#C9A84C", scale: 0.92, orbitColor: "#C9A84C" },
  { id: "contact",    image: "/images/5.jpeg", ringColor: "#00FFCC", glowColor: "rgba(0,255,204,0.35)",  glowFar: "rgba(0,180,140,0.2)",   ringSpeed: "16s", ringStyle: "solid",  label: "Available for Opportunities",  labelColor: "#00FFCC", scale: 1,    orbitColor: "#00D4FF" },
] as const;

type SectionState = typeof SECTION_STATES[number];

export default function FloatingProfilePhoto() {
  const [active,  setActive]  = useState<SectionState>(SECTION_STATES[0]);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    /* Strictly > 768 so there is no overlap with HeroSection's mobile photo
       which uses < 769. At exactly 768px only the mobile photo shows. */
    const checkDesktop = () => setDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const elements = SECTION_STATES.map((s) => ({
      state: s,
      el: document.querySelector(`#section-${s.id}`) as Element | null,
    }));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = elements.find((e) => e.el === entry.target);
            if (found) setActive(found.state);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach(({ el }) => { if (el) io.observe(el); });
    return () => {
      window.removeEventListener("resize", checkDesktop);
      io.disconnect();
    };
  }, []);

  if (!desktop) return null;

  const s = active;
  const isPulse  = (s.ringSpeed as string) === "0s";
  const outerAnim = isPulse ? "pulseRing 2.5s ease-in-out infinite"
                            : `spin ${s.ringSpeed} linear infinite`;
  const innerSpeed = isPulse ? "2s" : `${parseFloat(s.ringSpeed) * 2}s`;
  const innerAnim  = isPulse ? `pulseRing ${innerSpeed} ease-in-out 0.5s infinite`
                             : `spinRev ${innerSpeed} linear infinite`;

  const brackets: React.CSSProperties[] = [
    { top: -6,    left: -6,   borderTop:    `2.5px solid ${s.ringColor}`, borderLeft:   `2.5px solid ${s.ringColor}` },
    { top: -6,    right: -6,  borderTop:    `2.5px solid ${s.ringColor}`, borderRight:  `2.5px solid ${s.ringColor}` },
    { bottom: -6, left: -6,   borderBottom: `2.5px solid ${s.ringColor}`, borderLeft:   `2.5px solid ${s.ringColor}` },
    { bottom: -6, right: -6,  borderBottom: `2.5px solid ${s.ringColor}`, borderRight:  `2.5px solid ${s.ringColor}` },
  ];

  return (
    <div
      style={{
        position: "fixed",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 30,
        pointerEvents: "none",
        width: "clamp(240px, 26vw, 380px)",
        height: "clamp(240px, 26vw, 380px)",
      }}
    >
      {/* Continuous float — outer wrapper never re-mounts */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* Glow aura — color transitions via CSS */}
        <div style={{
          position: "absolute",
          width: "130%", height: "130%",
          top: "-15%", left: "-15%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${s.glowColor} 0%, ${s.glowFar} 45%, transparent 70%)`,
          animation: "pulseRing 3s ease-in-out infinite alternate",
          transition: "background 0.7s ease",
          pointerEvents: "none",
        }} />

        {/* Outer spinning ring */}
        <div style={{
          position: "absolute",
          width: "112%", height: "112%",
          top: "-6%", left: "-6%",
          borderRadius: "50%",
          border: `1.5px ${s.ringStyle} transparent`,
          borderTopColor: s.ringColor,
          opacity: 0.7,
          animation: outerAnim,
          transition: "border-color 0.7s ease",
          pointerEvents: "none",
        }} />

        {/* Inner counter ring */}
        <div style={{
          position: "absolute",
          width: "108%", height: "108%",
          top: "-4%", left: "-4%",
          borderRadius: "50%",
          border: `1px solid ${s.orbitColor}`,
          opacity: 0.3,
          animation: innerAnim,
          transition: "border-color 0.7s ease",
          pointerEvents: "none",
        }} />

        {/* Holographic corner brackets */}
        {brackets.map((bs, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 22, height: 22,
            animation: `blink 2.5s ease-in-out ${i * 0.6}s infinite`,
            transition: "border-color 0.7s ease",
            pointerEvents: "none",
            ...bs,
          }} />
        ))}

        {/* Photo circle — frame stays, only image cross-fades inside */}
        <motion.div
          animate={{ scale: s.scale }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{
            position: "relative",
            width: "100%", height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${s.ringColor}`,
            boxShadow: `0 0 50px ${s.glowColor}, 0 0 100px ${s.glowFar}, inset 0 0 30px rgba(0,0,0,0.35)`,
            transition: "border-color 0.7s ease, box-shadow 0.7s ease",
          }}
        >
          {/* Only the image cross-fades — everything else stays mounted */}
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: "easeInOut" as const }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={s.image}
                alt="Sivaprasath V"
                fill
                priority={s.id === "hero"}
                style={{ objectFit: "cover", objectPosition: "center 15%" }}
                sizes="clamp(240px,26vw,380px)"
              />
            </motion.div>
          </AnimatePresence>

          {/* Scan lines — always on top */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,212,255,0.022) 3px,rgba(0,212,255,0.022) 4px)",
            pointerEvents: "none",
          }} />
        </motion.div>

        {/* Section label below the circle */}
        <div style={{
          position: "absolute",
          bottom: -42,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 11,
                letterSpacing: "0.13em",
                color: s.labelColor,
                fontWeight: 600,
                textTransform: "uppercase",
                transition: "color 0.5s ease",
                textAlign: "center",
              }}
            >
              {s.label}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
