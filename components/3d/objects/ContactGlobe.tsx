"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DOT_COUNT = 20;

function Globe() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#001840", metalness: 0.3, roughness: 0.7, transparent: true, opacity: 0.65 }), []);
  const wireMat  = useMemo(() => new THREE.MeshBasicMaterial({ color: "#003366", wireframe: true, transparent: true, opacity: 0.3 }), []);
  useFrame(() => {
    if (solidRef.current) solidRef.current.rotation.y += 0.0018;
    if (wireRef.current)  wireRef.current.rotation.y  += 0.0018;
  });
  return (
    <>
      <mesh ref={solidRef} material={solidMat}><sphereGeometry args={[3, 32, 32]} /></mesh>
      <mesh ref={wireRef}  material={wireMat} ><sphereGeometry args={[3.06, 20, 20]} /></mesh>
    </>
  );
}

function GlobeRing() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00D4FF", transparent: true, opacity: 0.3, side: THREE.DoubleSide }), []);
  useFrame(() => { if (ref.current) ref.current.rotation.z += 0.003; });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0.4, 0]} material={mat}>
      <torusGeometry args={[3.8, 0.012, 16, 128]} />
    </mesh>
  );
}

function CityDots() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const dotData = useMemo(() => Array.from({ length: DOT_COUNT }, (_, i) => {
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    return { x: 3.05 * Math.sin(phi) * Math.cos(theta), y: 3.05 * Math.sin(phi) * Math.sin(theta), z: 3.05 * Math.cos(phi), ph: i * 0.7 };
  }), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00D4FF", emissive: "#0088AA", emissiveIntensity: 4 }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const ca = Math.cos(t * 0.0018), sa = Math.sin(t * 0.0018);
    dotData.forEach((d, i) => {
      dummy.position.set(d.x * ca - d.z * sa, d.y, d.x * sa + d.z * ca);
      dummy.scale.setScalar(1 + Math.abs(Math.sin(t * 1.5 + d.ph)) * 0.5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DOT_COUNT]} material={mat}>
      <sphereGeometry args={[0.05, 6, 6]} />
    </instancedMesh>
  );
}

export function ContactGlobe() {
  return (
    <group position={[0, 0, -34]}>
      <Globe />
      <GlobeRing />
      <CityDots />
      <pointLight color="#00D4FF" intensity={30} distance={20} />
    </group>
  );
}
