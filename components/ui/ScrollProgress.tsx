"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ transformOrigin: "left", transform: "scaleX(0)" }}
    />
  );
}
