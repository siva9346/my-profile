"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Mechanical Gear ── */
function Gear({ position, speed, scale = 1 }: { position: [number,number,number]; speed: number; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.2 * scale, 0.06 * scale, 16, 48), [scale]);
  const discGeo = useMemo(() => new THREE.CylinderGeometry(1.0 * scale, 1.0 * scale, 0.08 * scale, 48), [scale]);
  const toothGeo = useMemo(() => new THREE.CylinderGeometry(0.08 * scale, 0.08 * scale, 0.3 * scale, 6), [scale]);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00D4FF",
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#004466",
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.85,
  }), []);

  const toothCount = 12;
  const toothPositions = useMemo(() => {
    return Array.from({ length: toothCount }, (_, i) => {
      const angle = (i / toothCount) * Math.PI * 2;
      return { x: Math.cos(angle) * 1.2 * scale, z: Math.sin(angle) * 1.2 * scale, angle };
    });
  }, [scale, toothCount]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.z += speed;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={ringGeo} material={mat} />
      <mesh geometry={discGeo} material={mat} rotation={[Math.PI / 2, 0, 0]} />
      {toothPositions.map((t, i) => (
        <mesh key={i} geometry={toothGeo} material={mat}
          position={[t.x, 0.15 * scale, t.z]}
          rotation={[Math.PI / 2, t.angle, 0]}
        />
      ))}
    </group>
  );
}

/* ── Neural Network ── */
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef  = useRef<THREE.InstancedMesh>(null);
  const dummy    = useMemo(() => new THREE.Object3D(), []);
  const count    = 50;

  const { positions, lineArr } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = Math.cbrt(Math.random()) * 4;
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) * 0.5
      ));
    }
    const line: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 2.0) {
          line.push(positions[i].x, positions[i].y, positions[i].z);
          line.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }
    return { positions, lineArr: new Float32Array(line) };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  const nodeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00D4FF", emissive: "#0088AA", emissiveIntensity: 3, transparent: true, opacity: 0.9,
  }), []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#00AACC", opacity: 0.2, transparent: true }), []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0006;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={nodeMat}>
        <sphereGeometry args={[0.05, 8, 8]} />
      </instancedMesh>
      {lineArr.length > 0 && (
        <lineSegments material={lineMat}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={lineArr} count={lineArr.length / 3} itemSize={3} />
          </bufferGeometry>
        </lineSegments>
      )}
    </group>
  );
}

/* ── Holographic Rings ── */
function HoloRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (r1.current) r1.current.rotation.z += 0.0012;
    if (r2.current) r2.current.rotation.z -= 0.0008;
    if (r3.current) r3.current.rotation.x += 0.0015;
  });

  return (
    <>
      <mesh ref={r1} position={[1, 0, -5]} rotation={[Math.PI/3, 0.3, 0]}>
        <torusGeometry args={[5, 0.012, 16, 128]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r2} position={[-2, 0, -8]} rotation={[Math.PI/4, 0, 0.2]}>
        <torusGeometry args={[7, 0.008, 16, 128]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r3} position={[3, 2, -3]}>
        <torusGeometry args={[3.5, 0.018, 16, 128]} />
        <meshBasicMaterial color="#00FFCC" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

export function SceneSection1_Hero() {
  return (
    <group>
      <Gear position={[-3, 0, -1]} speed={ 0.004} scale={1} />
      <Gear position={[ 0, 0, -2]} speed={-0.004} scale={0.75} />
      <Gear position={[ 3, 0, -1]} speed={ 0.004} scale={1} />
      <NeuralNetwork />
      <HoloRings />
    </group>
  );
}
