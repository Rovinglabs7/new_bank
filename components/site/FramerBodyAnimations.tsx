"use client";

import { useEffect } from "react";
import { initFramerScrollAnimations } from "@/lib/framer-scroll-animations";

/** Attaches scroll animations to the server-rendered .framer-static-body block. */
export function FramerBodyAnimations() {
  useEffect(() => {
    const root = document.querySelector(".framer-static-body");
    if (root instanceof HTMLElement) {
      return initFramerScrollAnimations(root);
    }
  }, []);

  return null;
}
