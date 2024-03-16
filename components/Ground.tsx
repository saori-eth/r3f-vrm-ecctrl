import { RigidBody } from "@react-three/rapier";

export const Ground = () => {
  return (
    <RigidBody type="fixed">
      <mesh>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
};
