"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── DNA Double Helix ── */
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const strandCount = 30;

  const { strand1, strand2, bridgeArr } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    for (let i = 0; i < strandCount; i++) {
      const t = (i / strandCount) * Math.PI * 4;
      const y = (i / strandCount) * 6 - 3;
      s1.push(new THREE.Vector3(Math.cos(t) * 0.8, y, Math.sin(t) * 0.8));
      s2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8));
    }
    const bridge: number[] = [];
    for (let i = 0; i < strandCount; i += 3) {
      bridge.push(s1[i].x, s1[i].y, s1[i].z, s2[i].x, s2[i].y, s2[i].z);
    }
    return { strand1: s1, strand2: s2, bridgeArr: new Float32Array(bridge) };
  }, [strandCount]);

  const mat1 = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00D4FF", emissive: "#0066AA", emissiveIntensity: 2, transparent: true, opacity: 0.9 }), []);
  const mat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00FFCC", emissive: "#00AA88", emissiveIntensity: 2, transparent: true, opacity: 0.9 }), []);
  const bridgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#00AACC", opacity: 0.3, transparent: true }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group ref={groupRef} position={[-3, 0, -4]}>
      {strand1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={[pos.x, pos.y, pos.z]} material={i % 2 === 0 ? mat1 : mat2}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
      ))}
      {strand2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={[pos.x, pos.y, pos.z]} material={i % 2 === 0 ? mat2 : mat1}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
      ))}
      {bridgeArr.length > 0 && (
        <lineSegments material={bridgeMat}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={bridgeArr} count={bridgeArr.length / 3} itemSize={3} />
          </bufferGeometry>
        </lineSegments>
      )}
    </group>
  );
}

/* ── Floating Data Particles ── */
function DataParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const count   = 150;

  const basePositions = useMemo(() =>
    Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4 - 4
    )), []);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00AAFF", emissive: "#0066AA", emissiveIntensity: 2, transparent: true, opacity: 0.7 }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    basePositions.forEach((base, i) => {
      dummy.position.set(base.x, base.y + Math.sin(t + i) * 0.12, base.z);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={mat}>
      <sphereGeometry args={[0.02, 6, 6]} />
    </instancedMesh>
  );
}

export function SceneSection2_About() {
  return (
    <group>
      <DNAHelix />
      <DataParticles />
    </group>
  );
}
