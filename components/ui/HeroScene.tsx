"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Gear shape via ExtrudeGeometry ── */
function buildGearShape(outerR: number, innerR: number, teeth: number): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = step * i - step / 4;
    const a1 = step * i;
    const a2 = step * i + step / 4;
    const a3 = step * (i + 0.5) - step / 4;
    const a4 = step * (i + 0.5);
    const a5 = step * (i + 0.5) + step / 4;
    if (i === 0) shape.moveTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    else shape.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    shape.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
    shape.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    shape.lineTo(Math.cos(a3) * innerR, Math.sin(a3) * innerR);
    shape.lineTo(Math.cos(a4) * innerR, Math.sin(a4) * innerR);
    shape.lineTo(Math.cos(a5) * innerR, Math.sin(a5) * innerR);
  }
  shape.closePath();
  return shape;
}

interface GearProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase?: number;
  teeth?: number;
  color?: string;
}

function Gear({ position, scale, speed, phase = 0, teeth = 14, color = "#00D4FF" }: GearProps) {
  const ref = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const shape = buildGearShape(1, 0.72, teeth);
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.24, bevelEnabled: false });
    g.center();
    return g;
  }, [teeth]);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.85,
        roughness: 0.15,
        emissive: color,
        emissiveIntensity: 0.25,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed + phase;
  });

  return <mesh ref={ref} position={position} scale={scale} geometry={geo} material={mat} />;
}

/* ── Floating particle field ── */
function Particles({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 600 : 2000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.015} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── Gear point lights ── */
function GearLights() {
  return (
    <>
      <pointLight position={[-3, 0, -2]} color="#00D4FF" intensity={2} distance={8} />
      <pointLight position={[0, 0, -3]}  color="#00D4FF" intensity={2} distance={8} />
      <pointLight position={[3, 0, -2]}  color="#00D4FF" intensity={2} distance={8} />
    </>
  );
}

function Scene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;
  const s = isMobile ? 0.6 : 1;

  return (
    <>
      <ambientLight color="#0C2040" intensity={0.5} />
      <directionalLight color="#00D4FF" intensity={1.5} position={[5, 5, 5]} />
      <GearLights />

      <Particles isMobile={isMobile} />

      {/* Left gear */}
      <Gear position={[-3 * s, 0, -2]} scale={1.4 * s} speed={0.003 * 60}  teeth={16} />
      {/* Centre gear — counter-rotates */}
      <Gear position={[0, 0, -3]}      scale={1.0 * s} speed={-0.003 * 60} teeth={12} color="#C9A84C" />
      {/* Right gear */}
      <Gear position={[3 * s, 0, -2]}  scale={1.4 * s} speed={0.003 * 60}  teeth={16} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={1.5} mipmapBlur />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        enableRotate={false}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]} style={{ background: "transparent" }}>
      <Scene />
    </Canvas>
  );
}
