"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PANELS = [
  { pos: [-7,  2, -12] as [number,number,number], rot: [0.2,  0.6,  0.1] as [number,number,number], size: [3.5, 2.2] as [number,number], off: 0.0 },
  { pos: [ 6, -1, -14] as [number,number,number], rot: [-0.1,-0.5,  0.2] as [number,number,number], size: [2.8, 3.5] as [number,number], off: 1.3 },
  { pos: [-4, -3, -16] as [number,number,number], rot: [0.4,  0.3, -0.1] as [number,number,number], size: [3.0, 2.0] as [number,number], off: 2.6 },
  { pos: [ 8,  3, -18] as [number,number,number], rot: [-0.2, 0.4,  0.3] as [number,number,number], size: [2.5, 3.2] as [number,number], off: 0.8 },
  { pos: [-9,  1, -20] as [number,number,number], rot: [0.1, -0.6,  0.2] as [number,number,number], size: [3.2, 2.5] as [number,number], off: 1.9 },
  { pos: [ 4, -4, -22] as [number,number,number], rot: [0.3,  0.4, -0.2] as [number,number,number], size: [2.8, 2.0] as [number,number], off: 3.2 },
  { pos: [-3,  4, -24] as [number,number,number], rot: [-0.3, 0.5,  0.1] as [number,number,number], size: [3.5, 2.5] as [number,number], off: 0.5 },
  { pos: [ 7,  0, -26] as [number,number,number], rot: [0.2, -0.3,  0.3] as [number,number,number], size: [2.5, 3.0] as [number,number], off: 2.1 },
] as const;

function Panel({ d }: { d: typeof PANELS[number] }) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x001830, metalness: 0.05, roughness: 0,
    transparent: true, opacity: 0.18, side: THREE.DoubleSide,
    transmission: 0.88, thickness: 0.4,
  }), []);
  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#00D4FF", transparent: true, opacity: 0.55,
  }), []);

  const planeGeo = useMemo(() => new THREE.PlaneGeometry(...d.size), [d.size]);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(planeGeo), [planeGeo]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const newY = d.pos[1] + Math.sin(t * 0.5 + d.off) * 0.2;
    if (meshRef.current)  { meshRef.current.position.y  = newY; meshRef.current.rotation.y  += 0.0018; }
    if (edgesRef.current) { edgesRef.current.position.y = newY; edgesRef.current.rotation.y += 0.0018; }
  });

  return (
    <>
      <mesh     ref={meshRef}  position={d.pos} rotation={d.rot} geometry={planeGeo} material={glassMat} />
      <lineSegments ref={edgesRef} position={d.pos} rotation={d.rot} geometry={edgesGeo} material={edgeMat} />
    </>
  );
}

export function HoloPanels() {
  return <>{PANELS.map((d, i) => <Panel key={i} d={d} />)}</>;
}
