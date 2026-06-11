"use client";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={1.8}
        mipmapBlur
        radius={0.85}
      />
      <Vignette
        offset={0.35}
        darkness={0.65}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
