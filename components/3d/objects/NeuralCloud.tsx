"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Reduced from 180 → 60 nodes.
 * Connection check was O(n²): 180 nodes = 16,110 checks → 60 nodes = 1,770 checks.
 * Removed per-frame group rotation (static scene, camera movement provides motion).
 */
export function NeuralCloud({ count = 60 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);

  const { positions, lineArr } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 3 + Math.cbrt(Math.random()) * 10;
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.55,
        r * Math.cos(phi) * 0.5
      ));
    }
    const line: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 5.5) {
          line.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
        }
      }
    }
    return { positions, lineArr: new Float32Array(line) };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(0.9 + Math.random() * 0.4);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  const nodeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00D4FF", emissive: "#0088AA", emissiveIntensity: 2.2,
    transparent: true, opacity: 0.9,
  }), []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#00AACC", opacity: 0.15, transparent: true,
  }), []);

  /* Slow pulse on emissive only — no matrix uploads per frame */
  useFrame(({ clock }) => {
    if (!nodeMat) return;
    nodeMat.emissiveIntensity = 2.0 + Math.sin(clock.elapsedTime * 0.8) * 0.4;
  });

  return (
    <group position={[1, 1, 10]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={nodeMat}>
        <sphereGeometry args={[0.06, 6, 6]} />
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
