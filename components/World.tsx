"use client";

import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Player } from "./Player";
import { Suspense } from "react";
import { Ground } from "./Ground";
export const World = () => {
  return (
    <>
      <Suspense>
        <Environment background={true} files="skybox/sky.hdr" />
        <ambientLight intensity={0.5} />
        <Physics timeStep="vary">
          {/* Player needs to be above ground */}
          <Player />
          {/* Ground */}
          <Ground />
        </Physics>
      </Suspense>
    </>
  );
};
