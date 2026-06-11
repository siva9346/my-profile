"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PANEL_DATA: { pos: [number,number,number]; rot: [number,number,number]; size: [number,number]; offset: number }[] = [
  { pos: [-5,  1.5, -4], rot: [ 0.2,  0.5,  0.1], size: [2, 1.3], offset: 0.0 },
  { pos: [-2, -1.0, -5], rot: [-0.1, -0.3,  0.2], size: [3, 1.3], offset: 1.1 },
  { pos: [-4, -2.5, -6], rot: [ 0.3,  0.4, -0.1], size: [2, 1.3], offset: 2.3 },
  { pos: [-7,  0.5, -5], rot: [-0.2,  0.3,  0.3], size: [2, 1.3], offset: 0.7 },
  { pos: [-3,  2.5, -4], rot: [ 0.1, -0.4,  0.2], size: [3, 1.3], offset: 1.8 },
];

function HoloCard({ pos, rot, size, offset }: typeof PANEL_DATA[number]) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x001830,
    metalness: 0.1,
    roughness: 0,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    transmission: 0.85,
    thickness: 0.3,
  }), []);

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#00D4FF", transparent: true, opacity: 0.6 }), []);

  const planeGeo = useMemo(() => new THREE.PlaneGeometry(...size), [size]);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(planeGeo), [planeGeo]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !edgesRef.current) return;
    const t = clock.elapsedTime;
    const newY = pos[1] + Math.sin(t + offset) * 0.15;
    meshRef.current.position.y  = newY;
    edgesRef.current.position.y = newY;
    meshRef.current.rotation.y  += 0.002;
    edgesRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z  += 0.001;
    edgesRef.current.rotation.z += 0.001;
  });

  return (
    <>
      <mesh ref={meshRef} position={pos} rotation={rot} geometry={planeGeo} material={glassMat} />
      <lineSegments ref={edgesRef} position={pos} rotation={rot} geometry={edgesGeo} material={edgeMat} />
    </>
  );
}

/* ── Ambient particles ── */
function ProjectParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const count   = 80;
  const base    = useMemo(() =>
    Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 12 - 4,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4 - 5
    )), []);

  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00AAFF", transparent: true, opacity: 0.5 }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    base.forEach((b, i) => {
      dummy.position.set(b.x, b.y + Math.sin(t * 0.5 + i) * 0.1, b.z);
      dummy.scale.setScalar(0.7);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={mat}>
      <sphereGeometry args={[0.025, 6, 6]} />
    </instancedMesh>
  );
}

export function SceneSection5_Projects() {
  return (
    <group>
      {PANEL_DATA.map((p, i) => <HoloCard key={i} {...p} />)}
      <ProjectParticles />
    </group>
  );
}
