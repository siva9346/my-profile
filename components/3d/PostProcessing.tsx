"use client";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/*
 * Bloom removed: it required mipmapBlur + 3 render passes per frame.
 * On mobile/integrated GPUs this was the primary GPU bottleneck.
 * Vignette kept — single-pass, negligible cost.
 */
export function PostProcessing() {
  return (
    <EffectComposer>
      <Vignette
        offset={0.3}
        darkness={0.65}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
