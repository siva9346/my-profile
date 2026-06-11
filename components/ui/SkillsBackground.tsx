"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SHAPES = [
  { geo: "icosahedron", pos: [-4.5, 2, -3] as [number, number, number], speed: [0.001, 0.002, 0.001] },
  { geo: "octahedron",  pos: [4.2, -1.5, -4] as [number, number, number], speed: [0.002, 0.001, 0.003] },
  { geo: "tetrahedron", pos: [-2, -2.5, -3.5] as [number, number, number], speed: [0.003, 0.001, 0.002] },
  { geo: "icosahedron", pos: [2.5, 2.5, -4] as [number, number, number], speed: [0.002, 0.003, 0.001] },
  { geo: "octahedron",  pos: [-4, -0.5, -5] as [number, number, number], speed: [0.001, 0.002, 0.004] },
  { geo: "tetrahedron", pos: [4, 1, -3.5] as [number, number, number], speed: [0.004, 0.001, 0.002] },
] as const;

function WireShape({
  geo,
  position,
  speed,
}: {
  geo: "icosahedron" | "octahedron" | "tetrahedron";
  position: [number, number, number];
  speed: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    if (geo === "icosahedron") return new THREE.IcosahedronGeometry(0.9, 0);
    if (geo === "octahedron")  return new THREE.OctahedronGeometry(0.8, 0);
    return new THREE.TetrahedronGeometry(0.9, 0);
  }, [geo]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00D4FF",
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    []
  );

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += speed[0];
    ref.current.rotation.y += speed[1];
    ref.current.rotation.z += speed[2];
  });

  return <mesh ref={ref} position={position} geometry={geometry} material={material} />;
}

export default function SkillsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
        {SHAPES.map((s, i) => (
          <WireShape key={i} geo={s.geo} position={s.pos} speed={[...s.speed]} />
        ))}
      </Canvas>
    </div>
  );
}
