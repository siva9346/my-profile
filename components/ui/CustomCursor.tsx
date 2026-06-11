"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    };

    const over = () => cursorRef.current?.classList.add("hovering");
    const out  = () => cursorRef.current?.classList.remove("hovering");

    document.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
