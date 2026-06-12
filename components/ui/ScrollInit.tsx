"use client";
import { useEffect } from "react";

/* Extracted from page.tsx so page.tsx can be a Server Component */
export default function ScrollInit() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    import("@/lib/scrollSetup").then(({ initScroll }) => {
      lenis = initScroll();
    });

    return () => { lenis?.destroy(); };
  }, []);

  return null;
}
