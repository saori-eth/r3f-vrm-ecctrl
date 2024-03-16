"use client";
import { Canvas } from "@react-three/fiber";
import { Loader, Stats } from "@react-three/drei";
import { World } from "./World";

const Experience = () => {
  return (
    <>
      <Loader />
      <Canvas
        camera={{ position: [2, 2, 2] }}
        className="bg-gray-900"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") {
            (e.target as HTMLCanvasElement).requestPointerLock();
          }
        }}
      >
        <World />
      </Canvas>
    </>
  );
};

export default Experience;