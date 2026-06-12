"use client";
import { useMemo } from "react";
import * as THREE from "three";

export function GroundGrid() {
  const { geo, mat } = useMemo(() => {
    const pts: number[] = [];
    // x-axis lines
    for (let x = -35; x <= 35; x += 2.5) {
      pts.push(x, -10, -45,  x, -10, 55);
    }
    // z-axis lines
    for (let z = -45; z <= 55; z += 2.5) {
      pts.push(-35, -10, z,  35, -10, z);
    }
    const arr = new Float32Array(pts);
    const g   = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const m = new THREE.LineBasicMaterial({ color: "#001133", transparent: true, opacity: 0.35 });
    return { geo: g, mat: m };
  }, []);

  return <primitive object={new THREE.LineSegments(geo, mat)} />;
}
