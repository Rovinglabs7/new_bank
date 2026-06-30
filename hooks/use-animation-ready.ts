"use client";

import { useEffect, useState } from "react";

/** False on server + first client paint; true after mount — keeps motion SSR-safe. */
export function useAnimationReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
