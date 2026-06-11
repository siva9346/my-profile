"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function createGearShape(
  outerR: number,
  innerR: number,
  numTeeth: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const toothAngle = (Math.PI * 2) / numTeeth;

  for (let i = 0; i < numTeeth; i++) {
    const a0 = toothAngle * i - toothAngle / 4;
    const a1 = toothAngle * i;
    const a2 = toothAngle * i + toothAngle / 4;
    const a3 = toothAngle * (i + 0.5) - toothAngle / 4;
    const a4 = toothAngle * (i + 0.5);
    const a5 = toothAngle * (i + 0.5) + toothAngle / 4;

    if (i === 0) {
      shape.moveTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    } else {
      shape.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    }
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
  phaseOffset?: number;
  teeth?: number;
}

function Gear({ position, scale, speed, phaseOffset = 0, teeth = 12 }: GearProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const gearGeometry = useMemo(() => {
    const shape = createGearShape(1, 0.72, teeth);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.22,
      bevelEnabled: false,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, [teeth]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8A415",
        metalness: 0.9,
        roughness: 0.1,
        emissive: "#2A1E00",
        emissiveIntensity: 0.35,
      }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        state.clock.elapsedTime * speed + phaseOffset;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={gearGeometry}
      material={material}
    />
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#D4AF37" size={0.055} transparent opacity={0.55} />
    </points>
  );
}

function Scene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#FFD700" />
      <directionalLight position={[-5, -4, 3]} intensity={0.5} color="#D4AF37" />
      <pointLight position={[0, 0, 4]} intensity={0.9} color="#FFD700" />

      <Particles />

      {/* Centre gear */}
      <Gear
        position={[0, 0, 0]}
        scale={isMobile ? 1.2 : 1.8}
        speed={0.28}
        teeth={16}
      />
      {/* Top-right */}
      <Gear
        position={isMobile ? [2.1, 1.5, -1] : [3.2, 2.25, -1]}
        scale={isMobile ? 0.8 : 1.1}
        speed={-0.52}
        phaseOffset={Math.PI / 16}
        teeth={12}
      />
      {/* Bottom-left */}
      <Gear
        position={isMobile ? [-2.1, -1.5, -0.5] : [-3.2, -2.25, -0.5]}
        scale={isMobile ? 0.75 : 1.05}
        speed={-0.52}
        phaseOffset={0}
        teeth={12}
      />
      {/* Small accent */}
      <Gear
        position={isMobile ? [1.8, -1.6, -1] : [2.8, -2.5, -1]}
        scale={isMobile ? 0.5 : 0.65}
        speed={1.05}
        phaseOffset={Math.PI / 8}
        teeth={8}
      />
    </>
  );
}

export default function GearScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
