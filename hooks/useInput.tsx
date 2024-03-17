"use client";

import { useEffect, useRef } from "react";

export function useInput() {
  const input = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
  });

  useEffect(() => {
    const updateInputState = (e: KeyboardEvent, state: boolean) => {
      const keyMap: { [key: string]: keyof typeof input.current } = {
        w: "w",
        W: "w",
        s: "s",
        S: "s",
        a: "a",
        A: "a",
        d: "d",
        D: "d",
        " ": "space",
        Shift: "shift",
      };
      const inputKey = keyMap[e.key];
      if (inputKey) input.current[inputKey] = state;
    };

    const handleKeyDown = (e: KeyboardEvent) => updateInputState(e, true);
    const handleKeyUp = (e: KeyboardEvent) => updateInputState(e, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
}
