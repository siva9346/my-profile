"use client";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

/*
 * Reduced: 80→28 towers, 240→56 windows.
 * CRITICAL FIX: removed useFrame that updated 240 window matrices every frame.
 *   Before: instanceMatrix.needsUpdate = true each frame = GPU buffer upload 60×/s
 *   After:  windows are static, set once in useEffect
 */
const TOWER_COUNT  = 28;
const WINDOW_COUNT = 56;

export function CityTowers() {
  const towerRef  = useRef<THREE.InstancedMesh>(null);
  const windowRef = useRef<THREE.InstancedMesh>(null);
  const dummy     = useMemo(() => new THREE.Object3D(), []);

  const towers = useMemo(() =>
    Array.from({ length: TOWER_COUNT }, () => ({
      x: (Math.random() - 0.5) * 50,
      z: Math.random() * 38 - 32,
      w: 0.3 + Math.random() * 0.5,
      h: 1.5 + Math.random() * 9,
      d: 0.3 + Math.random() * 0.5,
    })), []);

  const windowData = useMemo(() =>
    Array.from({ length: WINDOW_COUNT }, () => {
      const t = towers[Math.floor(Math.random() * TOWER_COUNT)];
      return {
        x: t.x + (Math.random() - 0.5) * t.w,
        y: -10 + t.h * Math.random(),
        z: t.z + (Math.random() - 0.5) * t.d,
        s: 0.035 + Math.random() * 0.05,
      };
    }), [towers]);

  const towerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#001122", metalness: 0.8, roughness: 0.2,
    emissive: "#001133", emissiveIntensity: 0.25,
    transparent: true, opacity: 0.88,
  }), []);

  const windowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00AAFF", transparent: true, opacity: 0.75,
  }), []);

  useEffect(() => {
    if (towerRef.current) {
      towers.forEach((t, i) => {
        dummy.position.set(t.x, -10 + t.h / 2, t.z);
        dummy.scale.set(t.w, t.h, t.d);
        dummy.updateMatrix();
        towerRef.current!.setMatrixAt(i, dummy.matrix);
      });
      towerRef.current.instanceMatrix.needsUpdate = true;
    }
    if (windowRef.current) {
      windowData.forEach((w, i) => {
        dummy.position.set(w.x, w.y, w.z);
        dummy.scale.setScalar(w.s);
        dummy.updateMatrix();
        windowRef.current!.setMatrixAt(i, dummy.matrix);
      });
      windowRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [towers, windowData, dummy]);

  return (
    <>
      <instancedMesh ref={towerRef} args={[undefined, undefined, TOWER_COUNT]} material={towerMat}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <instancedMesh ref={windowRef} args={[undefined, undefined, WINDOW_COUNT]} material={windowMat}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <mesh position={[0, -10.05, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 65]} />
        <meshBasicMaterial color="#000811" transparent opacity={0.95} />
      </mesh>
    </>
  );
}
