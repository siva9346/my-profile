"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const scrollProgress = { value: 0 };
export const scrollRef = scrollProgress;

export function SceneLights() {
  const dyn1 = useRef<THREE.PointLight>(null);
  const dyn2 = useRef<THREE.PointLight>(null);
  const dyn3 = useRef<THREE.SpotLight>(null);

  useFrame(({ clock, camera }) => {
    const t  = clock.elapsedTime;
    const p  = scrollProgress.value;
    const cx = camera.position.x;
    const cz = camera.position.z;

    if (dyn1.current) {
      dyn1.current.position.set(cx + 8, 6, cz - 3);
      dyn1.current.color.setHSL(0.55 + p * 0.1, 1, 0.5);
      dyn1.current.intensity = 60 + Math.sin(t * 0.8) * 10;
    }
    if (dyn2.current) {
      dyn2.current.position.set(cx - 6, -2, cz - 5);
      dyn2.current.color.setHSL(0.6 + p * 0.05, 0.9, 0.5);
      dyn2.current.intensity = 40 + Math.sin(t * 0.6 + 1) * 8;
    }
    if (dyn3.current) {
      dyn3.current.position.set(cx, 15, cz);
      dyn3.current.target.position.set(cx, 0, cz - 10);
      dyn3.current.target.updateMatrixWorld();
      dyn3.current.intensity = 80 + p * 40;
    }
  });

  return (
    <>
      <ambientLight color="#001122" intensity={0.5} />
      <pointLight ref={dyn1} color="#00D4FF" intensity={60} distance={30} decay={2} />
      <pointLight ref={dyn2} color="#0055FF" intensity={40} distance={25} decay={2} />
      <spotLight  ref={dyn3} color="#00FFCC" intensity={80} angle={0.5} penumbra={1} distance={40} decay={2} castShadow={false} />
      {/* Static fill lights */}
      <pointLight position={[0, 5, 20]}   color="#00AACC" intensity={20} distance={30} />
      <pointLight position={[0, 3, -10]}  color="#003388" intensity={25} distance={25} />
      <pointLight position={[0, 2, -34]}  color="#00CCFF" intensity={35} distance={20} />
    </>
  );
}
