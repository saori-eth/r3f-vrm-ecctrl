"use client";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { useVRMloader } from "@/hooks/useVRMLoader";
import { useClips } from "@/hooks/useClips";

interface AvatarProps {
  animation: string;
}

export const Avatar = (props: AvatarProps) => {
  const avatar = useVRMloader("/avatar/avatar.vrm");
  const clips = useClips(avatar);
  const { ref, mixer, actions } = useAnimations(clips, avatar.scene);
  const [prevAnim, setPrevAnim] = useState<string | null>(null);

  useEffect(() => {
    actions.idle?.play();
    setPrevAnim("idle");
  }, [actions]);

  useFrame((_, delta) => {
    const { animation } = props;
    const newAction = actions[animation];
    if (newAction && prevAnim !== animation) {
      if (prevAnim) {
        const prevAction = actions[prevAnim];
        if (!prevAction) return;
        newAction.reset().play();
        prevAction.crossFadeTo(newAction, 0.5, false);
      } else {
        newAction?.play();
      }
      setPrevAnim(animation);
    }
    avatar.update(delta);
    mixer.update(delta);
  });

  return <primitive object={avatar.scene} position={[0, -0.9, 0]} ref={ref} />;
};
