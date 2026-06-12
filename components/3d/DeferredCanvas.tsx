"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

/*
 * THREE.js/R3F parsing blocks the main thread for ~900ms.
 * Deferring the mount by 2.5s keeps it off the critical path:
 *   - LCP element (hero image) loads and paints before THREE starts
 *   - TBT window (0–5s after FCP) shrinks dramatically
 */
const WorldCanvas = dynamic(() => import("./WorldCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 2500);
    return () => clearTimeout(id);
  }, []);

  return mounted ? <WorldCanvas /> : null;
}
