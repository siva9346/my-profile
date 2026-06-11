"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

/* ─────────────────────────────────────────
   1. NEURAL NETWORK — nodes + connections
───────────────────────────────────────── */
function NeuralNetwork({ mouse, isMobile }: { mouse: MouseRef; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef  = useRef<THREE.InstancedMesh>(null);
  const dummy    = useMemo(() => new THREE.Object3D(), []);
  const count    = isMobile ? 25 : 60;

  const { positions, lineArr } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = Math.cbrt(Math.random()) * 5;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) * 0.55
        )
      );
    }
    const line: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 2.5) {
          line.push(positions[i].x, positions[i].y, positions[i].z);
          line.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }
    return { positions, lineArr: new Float32Array(line) };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  const nodeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00D4FF",
        emissive: "#00AACC",
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#00D4FF", opacity: 0.22, transparent: true }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0008;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.05;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.2,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={nodeMat}>
        <sphereGeometry args={[0.04, 8, 8]} />
      </instancedMesh>
      {lineArr.length > 0 && (
        <lineSegments material={lineMat}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={lineArr}
              count={lineArr.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
        </lineSegments>
      )}
    </group>
  );
}

/* ─────────────────────────────────────────
   2. HOLOGRAPHIC RINGS
───────────────────────────────────────── */
const RINGS = [
  { args: [4.5, 0.015, 16, 120] as [number,number,number,number], pos: [2, 0.5, -4]  as [number,number,number], rot: [Math.PI/3, 0.3, 0]   as [number,number,number], color: "#00D4FF", op: 0.3,  dz:  0.0015 },
  { args: [6,   0.010, 16, 120] as [number,number,number,number], pos: [-1,-1, -6]   as [number,number,number], rot: [Math.PI/4,-0.5, 0.2] as [number,number,number], color: "#0088FF", op: 0.2,  dz: -0.001  },
  { args: [3,   0.020, 16, 120] as [number,number,number,number], pos: [4,  2,  -3]  as [number,number,number], rot: [0.8, 0.4, 0]         as [number,number,number], color: "#00FFCC", op: 0.25, dx:  0.002  },
  { args: [8,   0.008, 16, 120] as [number,number,number,number], pos: [-3, 0,  -8]  as [number,number,number], rot: [Math.PI/2, 0, 0.1]   as [number,number,number], color: "#0066CC", op: 0.15, dz:  0.0005 },
] as const;

function Ring({ data }: { data: typeof RINGS[number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: data.op,
        side: THREE.DoubleSide,
      }),
    [data.color, data.op]
  );
  useFrame(() => {
    if (!ref.current) return;
    if ("dz" in data) ref.current.rotation.z += (data as any).dz;
    if ("dx" in data) ref.current.rotation.x += (data as any).dx;
  });
  return (
    <mesh ref={ref} position={data.pos} rotation={data.rot} material={mat}>
      <torusGeometry args={data.args} />
    </mesh>
  );
}

function HoloRings({ isMobile }: { isMobile: boolean }) {
  const rings = isMobile ? RINGS.slice(0, 2) : RINGS;
  return (
    <>
      {rings.map((r, i) => (
        <Ring key={i} data={r} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   3. FLOATING GLASS PANELS
───────────────────────────────────────── */
const PANELS = [
  { pos: [-5,  2,  -5], rot: [ 0.3, 0.5,  0.1], size: [2, 3] as [number,number], offset: 0.0  },
  { pos: [ 5, -1,  -4], rot: [-0.2,-0.3,  0.2], size: [3, 2] as [number,number], offset: 1.1  },
  { pos: [-3, -3,  -6], rot: [ 0.5, 0.2, -0.1], size: [2, 3] as [number,number], offset: 2.3  },
  { pos: [ 4,  3,  -7], rot: [-0.3, 0.4,  0.3], size: [3, 2] as [number,number], offset: 0.7  },
  { pos: [-6,  0,  -3], rot: [ 0.1,-0.5,  0.2], size: [2, 3] as [number,number], offset: 1.8  },
  { pos: [ 2, -4,  -5], rot: [ 0.4, 0.3, -0.2], size: [3, 2] as [number,number], offset: 3.0  },
];

function GlassPanel({
  pos, rot, size, offset,
}: { pos: number[]; rot: number[]; size: [number,number]; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x001830,
        metalness: 0.1,
        roughness: 0.05,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      }),
    []
  );
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = pos[1] + Math.sin(t + offset) * 0.3;
    ref.current.rotation.z += 0.0008;
  });
  return (
    <mesh
      ref={ref}
      position={pos as [number,number,number]}
      rotation={rot as [number,number,number]}
      material={mat}
    >
      <planeGeometry args={size} />
    </mesh>
  );
}

function GlassPanels({ isMobile }: { isMobile: boolean }) {
  const panels = isMobile ? PANELS.slice(0, 3) : PANELS;
  return (
    <>
      {panels.map((p, i) => (
        <GlassPanel key={i} {...p} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   4. BACKGROUND ICOSAHEDRON
───────────────────────────────────────── */
function BackgroundIco() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#001840",
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      }),
    []
  );
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.0003;
    ref.current.rotation.y += 0.0004;
  });
  return (
    <mesh ref={ref} position={[0, 0, -12]} material={mat}>
      <icosahedronGeometry args={[7, 1]} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   5. CIRCUIT GRID (moving tunnel floor)
───────────────────────────────────────── */
function CircuitGrid() {
  const ref = useRef<THREE.LineSegments>(null);
  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({ color: "#00D4FF", opacity: 0.06, transparent: true }),
    []
  );
  const positions = useMemo(() => {
    const pts: number[] = [];
    // Z-direction lines (along X axis, spaced every 2 units in Z)
    for (let z = -10; z <= 10; z += 2) {
      pts.push(-20, -4, z,  20, -4, z);
    }
    // X-direction lines (along Z axis, spaced every 2 units in X)
    for (let x = -10; x <= 10; x += 2) {
      pts.push(x, -4, -20,  x, -4, 20);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.z += 0.005;
    if (ref.current.position.z > 2) ref.current.position.z -= 2;
  });

  return (
    <lineSegments ref={ref} material={mat}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
    </lineSegments>
  );
}

/* ─────────────────────────────────────────
   6. FLOATING DATA CUBES
───────────────────────────────────────── */
const CUBE_POSITIONS: [number,number,number][] = [
  [-4,  1.5, -3], [3.5,  2, -4], [-2.5, -2, -5], [ 5, -1.5, -3],
  [-5, -0.5, -6], [1.5,  3, -5], [ 4,   -3, -6], [-3,  2.5, -4],
];

function DataCubes({ isMobile }: { isMobile: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0044AA",
        transparent: true,
        opacity: 0.4,
        emissive: "#0022FF",
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.2,
      }),
    []
  );
  const cubes = isMobile ? CUBE_POSITIONS.slice(0, 4) : CUBE_POSITIONS;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y = CUBE_POSITIONS[i][1] + Math.sin(t * 0.8 + i) * 0.004 * 60 * 0.05;
      mesh.rotation.x += 0.005 * (i % 3 === 0 ? 1 : -1);
      mesh.rotation.y += 0.008;
    });
  });

  return (
    <>
      {cubes.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={pos}
          material={mat}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
        </mesh>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   7. LIGHTS
───────────────────────────────────────── */
function Lights() {
  return (
    <>
      <ambientLight color="#001122" intensity={0.8} />
      <spotLight position={[ 5,  8,  2]} color="#00D4FF" intensity={80}  angle={0.25} penumbra={0.8} distance={20} />
      <spotLight position={[-5,  6, -2]} color="#0055FF" intensity={60}  angle={0.3}  penumbra={1.0} distance={18} />
      <spotLight position={[ 0, -5,  4]} color="#00FFCC" intensity={40}  angle={0.4}  penumbra={1.0} distance={15} />
    </>
  );
}

/* ─────────────────────────────────────────
   8. CAMERA RIG — drift + mouse parallax
───────────────────────────────────────── */
function CameraRig({ mouse, isMobile }: { mouse: MouseRef; isMobile: boolean }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    if (isMobile) return;
    const t = clock.elapsedTime;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 1.5 + Math.sin(t * 0.05) * 0.8,
      0.025
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.current.y * 1.0 + Math.cos(t * 0.04) * 0.5,
      0.025
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─────────────────────────────────────────
   9. SCENE ASSEMBLER
───────────────────────────────────────── */
function Scene({ mouse }: { mouse: MouseRef }) {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <Lights />
      <BackgroundIco />
      <CircuitGrid />
      <HoloRings isMobile={isMobile} />
      <GlassPanels isMobile={isMobile} />
      <NeuralNetwork mouse={mouse} isMobile={isMobile} />
      <DataCubes isMobile={isMobile} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={2.0}
          mipmapBlur
          radius={0.8}
        />
        <Vignette eskil={false} offset={0.3} darkness={0.6} />
      </EffectComposer>

      <CameraRig mouse={mouse} isMobile={isMobile} />
    </>
  );
}

/* ─────────────────────────────────────────
   CANVAS — exported with dynamic import wrapper
───────────────────────────────────────── */
export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * -2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
      }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}
