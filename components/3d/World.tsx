"use client";
import { ParticleField }  from "./objects/ParticleField";
import { NeuralCloud }    from "./objects/NeuralCloud";
import { EnergyRings }    from "./objects/EnergyRings";
import { DataStreams }    from "./objects/DataStreams";
import { CityTowers }     from "./objects/CityTowers";
import { HoloPanels }     from "./objects/HoloPanels";
import { ContactGlobe }   from "./objects/ContactGlobe";
import { SceneLights }    from "./objects/SceneLights";
import { GroundGrid }     from "./objects/GroundGrid";
import { CameraController } from "./CameraController";
import { PostProcessing }   from "./PostProcessing";

export function World() {
  return (
    <>
      <SceneLights />
      <fog attach="fog" args={["#020A16", 40, 130]} />
      <fogExp2 attach="fog" color="#020A16" density={0.008} />
      <ParticleField count={4500} />
      <NeuralCloud   count={160}  />
      <EnergyRings />
      <DataStreams  />
      <CityTowers  />
      <GroundGrid  />
      <HoloPanels  />
      <ContactGlobe />
      <PostProcessing />
      <CameraController />
    </>
  );
}
