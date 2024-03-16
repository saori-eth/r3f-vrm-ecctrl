import { KeyboardControls } from "@react-three/drei";
import Ecctrl from "ecctrl";
import { Avatar } from "./Avatar";
import { useInput } from "@/hooks/useInput";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";

const keyboardMap = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "leftward", keys: ["KeyA"] },
  { name: "rightward", keys: ["KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
];

export const Player = () => {
  const [animation, setAnimation] = useState("idle");
  const input = useInput();
  const playerRef = useRef<any>(null);

  useFrame((_, delta) => {
    const controls = input.current;

    if (controls.w || controls.a || controls.s || controls.d) {
      if (controls.shift) {
        if (animation !== "run") setAnimation("run");
      } else {
        if (animation !== "walk") setAnimation("walk");
      }
    } else {
      if (animation !== "idle") setAnimation("idle");
    }
  });

  return (
    <KeyboardControls map={keyboardMap}>
      <group position={[0, 5, 0]}>
        <Ecctrl>
          <group ref={playerRef}>
            <Avatar animation={animation} />
          </group>
        </Ecctrl>
      </group>
    </KeyboardControls>
  );
};
