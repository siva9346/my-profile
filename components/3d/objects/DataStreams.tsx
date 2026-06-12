"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STREAM_PATHS = [
  [[-25, 8, 40], [-10, 2, 18], [5, -3, 0], [20, 1, -18]],
  [[20, 6, 38],  [5, -1, 20],  [-8, 3, 5], [-18, -2, -12]],
  [[-18, -2, 30],[0, 4, 15],   [12, -1, -2],[22, 2, -20]],
  [[15, -5, 35], [-5, 6, 18],  [-15, 0, 2], [0, -3, -16]],
  [[-22, 3, 25], [8, -4, 10],  [18, 2, -5], [-10, 4, -22]],
  [[10, 8, 28],  [-12, -2, 12],[0, 5, -3],  [15, -1, -25]],
];

const COLORS = ["#00D4FF", "#00AAFF", "#00FFCC", "#0088FF", "#00D4FF", "#00CCAA"];

function Stream({ path, color, offset }: { path: number[][]; color: string; offset: number }) {
  const meshRef  = useRef<THREE.Mesh>(null);

  const { geo, mat } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(path.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const geo   = new THREE.TubeGeometry(curve, 64, 0.018, 4, false);
    const mat   = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75 });
    return { geo, mat };
  }, [path, color]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.elapsedTime * 0.15 + offset) % 1;
    mat.opacity = 0.3 + Math.abs(Math.sin(t * Math.PI)) * 0.5;
  });

  return <mesh ref={meshRef} geometry={geo} material={mat} />;
}

export function DataStreams() {
  return (
    <>
      {STREAM_PATHS.map((p, i) => (
        <Stream key={i} path={p} color={COLORS[i % COLORS.length]} offset={i * 0.18} />
      ))}
    </>
  );
}
