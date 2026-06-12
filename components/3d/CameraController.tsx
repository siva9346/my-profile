"use client";
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollRef } from "./objects/SceneLights";

/* ── Camera path: hero (z=45) → contact (z=-33) ── */
const CAMERA_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0,  3,  45),
  new THREE.Vector3(-4,  5,  36),
  new THREE.Vector3( 3,  2,  26),
  new THREE.Vector3(-2,  1,  16),
  new THREE.Vector3( 4, -1,   7),
  new THREE.Vector3(-3,  3,  -2),
  new THREE.Vector3( 2,  5, -12),
  new THREE.Vector3(-2,  2, -22),
  new THREE.Vector3( 1,  1, -28),
  new THREE.Vector3( 0,  2, -33),
], false, "catmullrom", 0.5);

const LOOKAT_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0,  0,  12),
  new THREE.Vector3(-1,  0,   8),
  new THREE.Vector3( 1,  0,   2),
  new THREE.Vector3(-1, -1,  -4),
  new THREE.Vector3( 2, -3, -10),
  new THREE.Vector3(-1,  0, -18),
  new THREE.Vector3( 0,  0, -26),
  new THREE.Vector3( 0,  0, -34),
  new THREE.Vector3( 0,  0, -38),
  new THREE.Vector3( 0, -1, -40),
], false, "catmullrom", 0.5);

export function CameraController() {
  const { camera } = useThree();
  const mouse      = useRef({ x: 0, y: 0 });
  const lookAt     = useRef(new THREE.Vector3(0, 0, 12));
  const targetPos  = useRef(new THREE.Vector3(0, 3, 45));

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.value = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const p = Math.max(0, Math.min(1, scrollRef.value));
    const d = Math.min(delta * 2.5, 1);

    const camPoint  = CAMERA_CURVE.getPointAt(p);
    const lookPoint = LOOKAT_CURVE.getPointAt(p);

    // Mouse parallax offset
    camPoint.x += mouse.current.x * 0.7;
    camPoint.y -= mouse.current.y * 0.4;

    targetPos.current.lerp(camPoint,  d * 0.6);
    camera.position.lerp(targetPos.current, 0.08);

    lookAt.current.lerp(lookPoint, d * 0.4);
    camera.lookAt(lookAt.current);
  });

  return null;
}
