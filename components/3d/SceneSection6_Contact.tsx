"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);

  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#001840", metalness: 0.3, roughness: 0.7, transparent: true, opacity: 0.6,
  }), []);
  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#003366", wireframe: true, transparent: true, opacity: 0.3,
  }), []);

  useFrame(() => {
    if (solidRef.current) solidRef.current.rotation.y += 0.0015;
    if (wireRef.current)  wireRef.current.rotation.y  += 0.0015;
  });

  return (
    <>
      <mesh ref={solidRef} position={[0, 0, -8]} material={solidMat}>
        <sphereGeometry args={[2.5, 32, 32]} />
      </mesh>
      <mesh ref={wireRef} position={[0, 0, -8]} material={wireMat}>
        <sphereGeometry args={[2.55, 16, 16]} />
      </mesh>
    </>
  );
}

function GlobeDots() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const count   = 15;

  const dotPositions = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      pts.push(new THREE.Vector3(
        2.52 * Math.sin(phi) * Math.cos(theta),
        2.52 * Math.sin(phi) * Math.sin(theta),
        2.52 * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00D4FF", emissive: "#0088AA", emissiveIntensity: 3,
    transparent: true, opacity: 0.95,
  }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const cosA = Math.cos(t * 0.0015);
    const sinA = Math.sin(t * 0.0015);
    dotPositions.forEach((p, i) => {
      dummy.position.set(
        p.x * cosA - p.z * sinA,
        p.y,
        p.x * sinA + p.z * cosA - 8
      );
      dummy.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.3);
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

function ConnectionArcs() {
  const { arcs, mat } = useMemo(() => {
    const mat   = new THREE.LineBasicMaterial({ color: "#00D4FF", transparent: true, opacity: 0.3 });
    const arcs: THREE.BufferGeometry[] = [];

    const pts: THREE.Vector3[] = Array.from({ length: 14 }, () => {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      return new THREE.Vector3(
        2.52 * Math.sin(phi) * Math.cos(theta),
        2.52 * Math.sin(phi) * Math.sin(theta),
        2.52 * Math.cos(phi) - 8
      );
    });

    const pairs = [[0,3],[1,4],[2,5],[3,6],[7,9],[8,11]];
    pairs.forEach(([a, b]) => {
      if (!pts[a] || !pts[b]) return;
      const mid = new THREE.Vector3().addVectors(pts[a], pts[b]).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(3.5);
      mid.z -= 8;
      const curve = new THREE.QuadraticBezierCurve3(pts[a], mid, pts[b]);
      const curvePoints = curve.getPoints(20);
      const geo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      arcs.push(geo);
    });

    return { arcs, mat };
  }, []);

  return (
    <>
      {arcs.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, mat)} />
      ))}
    </>
  );
}

export function SceneSection6_Contact() {
  return (
    <group>
      <Globe />
      <GlobeDots />
      <ConnectionArcs />
    </group>
  );
}
