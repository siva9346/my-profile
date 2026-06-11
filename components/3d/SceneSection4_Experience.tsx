"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Timeline Tunnel ── */
function TimelineTunnel() {
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3( 0,  0, -5),
    new THREE.Vector3( 1,  2, -7),
    new THREE.Vector3(-1,  3, -9),
    new THREE.Vector3( 0,  4,-12),
  ]), []);

  const tubeGeo  = useMemo(() => new THREE.TubeGeometry(curve, 100, 0.8, 8, false), [curve]);
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#001122", side: THREE.BackSide, transparent: true, opacity: 0.3 }), []);
  const wireMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#00D4FF", wireframe: true, transparent: true, opacity: 0.15 }), []);

  useFrame(() => {
    if (innerRef.current) innerRef.current.rotation.z += 0.0005;
  });

  /* Ring markers at t = 0.25, 0.55, 0.85 */
  const rings = useMemo(() => [0.25, 0.55, 0.85].map((t) => {
    const pt  = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);
    return { pos: pt, tan };
  }), [curve]);

  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00D4FF", transparent: true, opacity: 0.5, side: THREE.DoubleSide }), []);

  return (
    <group>
      <mesh ref={innerRef} geometry={tubeGeo} material={solidMat} />
      <mesh ref={wireRef}  geometry={tubeGeo} material={wireMat}  />
      {rings.map((r, i) => (
        <mesh
          key={i}
          position={[r.pos.x, r.pos.y, r.pos.z]}
          material={ringMat}
          rotation={[
            Math.atan2(r.tan.y, r.tan.z),
            0,
            Math.atan2(r.tan.x, r.tan.z),
          ]}
        >
          <torusGeometry args={[0.9, 0.02, 16, 48]} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Floating particles around tunnel ── */
function TunnelParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const count   = 60;

  const base = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const depth = -5 - (i / count) * 7;
      return { angle, r: 1.2 + Math.random() * 0.5, y: depth, offset: Math.random() * Math.PI * 2 };
    }), []);

  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00D4FF", transparent: true, opacity: 0.6 }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    base.forEach((b, i) => {
      const a = b.angle + t * 0.3;
      dummy.position.set(Math.cos(a) * b.r, b.y + Math.sin(t * 0.5 + b.offset) * 0.2, Math.sin(a) * b.r * 0.3);
      dummy.scale.setScalar(0.6);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={mat}>
      <sphereGeometry args={[0.04, 6, 6]} />
    </instancedMesh>
  );
}

export function SceneSection4_Experience() {
  return (
    <group>
      <TimelineTunnel />
      <TunnelParticles />
    </group>
  );
}
