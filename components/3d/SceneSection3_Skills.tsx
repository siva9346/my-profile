"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Circuit Grid ── */
function CircuitBoard() {
  const gridMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#003355", opacity: 0.4, transparent: true }), []);

  const gridPositions = useMemo(() => {
    const pts: number[] = [];
    const size = 10, step = 0.5;
    for (let x = -size; x <= size; x += step) {
      pts.push(x, 0, -size,  x, 0, size);
    }
    for (let z = -size; z <= size; z += step) {
      pts.push(-size, 0, z,  size, 0, z);
    }
    return new Float32Array(pts);
  }, []);

  return (
    <lineSegments position={[4, -2, -6]} rotation={[0.15, 0, 0]} material={gridMat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={gridPositions} count={gridPositions.length / 3} itemSize={3} />
      </bufferGeometry>
    </lineSegments>
  );
}

/* ── Pulsing Node Grid ── */
function PulsingNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let x = -5; x <= 5; x += 2) {
      for (let z = -5; z <= 5; z += 2) {
        pts.push(new THREE.Vector3(x + 4, -2, z - 6));
      }
    }
    return pts;
  }, []);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00D4FF", emissive: "#0088CC", emissiveIntensity: 0.5, transparent: true, opacity: 0.8 }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      const scale = 0.5 + Math.abs(Math.sin(t * 2 + i)) * 1.5;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    (mat as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(t * 1.5) * 0.3;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]} material={mat}>
      <sphereGeometry args={[0.03, 6, 6]} />
    </instancedMesh>
  );
}

/* ── Floating Tech Cubes ── */
const CUBE_DATA: [number,number,number,number][] = [
  [2,  1.5, -4,  0.7],
  [5,  0.5, -5,  1.1],
  [7,  2.0, -3,  0.4],
  [3, -1.0, -6,  1.8],
  [6, -0.5, -4,  0.9],
  [4,  2.5, -5,  1.3],
  [8,  0.0, -5,  0.6],
  [1,  1.0, -3,  2.0],
];

function TechCubes() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const mat  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00D4FF", wireframe: true, transparent: true, opacity: 0.4 }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const [bx, by, bz, offset] = CUBE_DATA[i];
      mesh.position.set(bx, by + Math.sin(t * 0.8 + offset) * 0.3, bz);
      mesh.rotation.y += 0.01;
    });
  });

  return (
    <>
      {CUBE_DATA.map((d, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[d[0], d[1], d[2]]} material={mat}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
        </mesh>
      ))}
    </>
  );
}

export function SceneSection3_Skills() {
  return (
    <group>
      <CircuitBoard />
      <PulsingNodes />
      <TechCubes />
    </group>
  );
}
