"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_DATA = [
  { pos: [ 2,  1, 34] as [number,number,number], rot: [Math.PI/3,  0.2,  0  ] as [number,number,number], r: 9,  tube: 0.012, col: "#00D4FF", spd:  0.0018, op: 0.35 },
  { pos: [-3,  2, 25] as [number,number,number], rot: [Math.PI/4, -0.1,  0.3] as [number,number,number], r: 12, tube: 0.008, col: "#0088FF", spd: -0.0012, op: 0.22 },
  { pos: [ 4, -1, 15] as [number,number,number], rot: [0.35,       0,    0.1] as [number,number,number], r: 7,  tube: 0.018, col: "#00FFCC", spd:  0.0025, op: 0.28 },
  { pos: [-2,  3,  5] as [number,number,number], rot: [Math.PI/2,  0,    0.2] as [number,number,number], r: 10, tube: 0.010, col: "#00AAFF", spd: -0.002,  op: 0.30 },
  { pos: [ 3,  0, -6] as [number,number,number], rot: [Math.PI/3,  0.4,  0  ] as [number,number,number], r: 8,  tube: 0.015, col: "#00D4FF", spd:  0.0015, op: 0.25 },
  { pos: [-1,  2,-16] as [number,number,number], rot: [0.6,       -0.2,  0  ] as [number,number,number], r: 11, tube: 0.009, col: "#0055FF", spd: -0.001,  op: 0.20 },
  { pos: [ 5, -2,-24] as [number,number,number], rot: [Math.PI/4,  0.3,  0.1] as [number,number,number], r: 7,  tube: 0.014, col: "#00FFCC", spd:  0.002,  op: 0.22 },
  { pos: [-4,  1,-31] as [number,number,number], rot: [Math.PI/5, -0.1,  0.2] as [number,number,number], r: 9,  tube: 0.010, col: "#00CCFF", spd: -0.0018, op: 0.18 },
] as const;

function Ring({ d }: { d: typeof RING_DATA[number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: d.col, transparent: true, opacity: d.op, side: THREE.DoubleSide,
  }), [d.col, d.op]);

  useFrame(() => { if (ref.current) ref.current.rotation.z += d.spd; });

  return (
    <mesh ref={ref} position={d.pos} rotation={d.rot} material={mat}>
      <torusGeometry args={[d.r, d.tube, 16, 128]} />
    </mesh>
  );
}

export function EnergyRings() {
  return <>{RING_DATA.map((d, i) => <Ring key={i} d={d} />)}</>;
}
