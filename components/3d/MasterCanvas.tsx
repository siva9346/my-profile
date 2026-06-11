"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { SceneSection1_Hero }       from "./SceneSection1_Hero";
import { SceneSection2_About }      from "./SceneSection2_About";
import { SceneSection3_Skills }     from "./SceneSection3_Skills";
import { SceneSection4_Experience } from "./SceneSection4_Experience";
import { SceneSection5_Projects }   from "./SceneSection5_Projects";
import { SceneSection6_Contact }    from "./SceneSection6_Contact";
import { PostProcessing }           from "./PostProcessing";

export default function MasterCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1]}
        frameloop="always"
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight color="#001122" intensity={0.6} />
        <SceneSection1_Hero />
        <SceneSection2_About />
        <SceneSection3_Skills />
        <SceneSection4_Experience />
        <SceneSection5_Projects />
        <SceneSection6_Contact />
        <PostProcessing />
        <CameraRig />
      </Canvas>
    </div>
  );
}
