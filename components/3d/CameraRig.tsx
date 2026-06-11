"use client";
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const CAMERA_SHOTS = [
  { pos: [0,  0, 10] as const, lookAt: [0,  0, 0] as const, section: "hero"       },
  { pos: [-2, 2,  8] as const, lookAt: [0,  1, 0] as const, section: "about"      },
  { pos: [ 4, 0, 12] as const, lookAt: [0,  0, 0] as const, section: "skills"     },
  { pos: [ 0,-3,  7] as const, lookAt: [0,  2,-5] as const, section: "experience" },
  { pos: [-5, 3,  9] as const, lookAt: [0,  0, 0] as const, section: "projects"   },
  { pos: [ 0, 1, 14] as const, lookAt: [0,  0, 0] as const, section: "contact"    },
];

export function CameraRig() {
  const { camera } = useThree();
  const proxy = useRef({ x: 0, y: 0, z: 10, lx: 0, ly: 0, lz: 0, mx: 0, my: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      proxy.current.mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      proxy.current.my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const triggers: ScrollTrigger[] = [];
    CAMERA_SHOTS.forEach((shot) => {
      const id = `#section-${shot.section}`;
      const el = document.querySelector(id);
      if (!el) return;

      const tween = () => {
        gsap.to(proxy.current, {
          x: shot.pos[0], y: shot.pos[1], z: shot.pos[2],
          lx: shot.lookAt[0], ly: shot.lookAt[1], lz: shot.lookAt[2],
          duration: 2.0,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      triggers.push(
        ScrollTrigger.create({
          trigger: id,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: tween,
          onEnterBack: tween,
        })
      );
    });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const lookAtVec  = useRef(new THREE.Vector3());
  const targetPos  = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const p = proxy.current;
    const d = Math.min(delta * 3, 1);

    targetPos.current.set(
      p.x + p.mx * 0.8,
      p.y + p.my * 0.5,
      p.z
    );
    camera.position.lerp(targetPos.current, d);

    lookAtVec.current.lerp(new THREE.Vector3(p.lx, p.ly, p.lz), d);
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
