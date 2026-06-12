"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { World } from "./World";

export default function WorldCanvas() {
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 45], fov: 58, near: 0.1, far: 160 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          powerPreference: "high-performance",
        }}
        dpr={[1, dpr]}
        frameloop="always"
        style={{ background: "#020A16" }}
      >
        <World />
      </Canvas>
    </div>
  );
}
