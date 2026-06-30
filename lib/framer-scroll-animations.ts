import { animate, inView } from "framer-motion/dom";

/**
 * Scroll-triggered section reveals for static Framer HTML (no CDN hydration).
 */
export function initFramerScrollAnimations(root: HTMLElement): () => void {
  const sections = root.querySelectorAll<HTMLElement>(
    '[data-framer-root] > div[data-framer-name$="-s"]'
  );

  const cleanups: Array<() => void> = [];

  sections.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";

    const stop = inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, y: 0 },
          {
            duration: 0.65,
            delay: Math.min(index * 0.05, 0.35),
            ease: [0.22, 1, 0.36, 1],
          }
        );
      },
      { amount: 0.12, margin: "0px 0px -8% 0px" }
    );

    if (typeof stop === "function") cleanups.push(stop);
  });

  // CSS @keyframes marquees / loops inside embedded <style> blocks keep running
  root.querySelectorAll<HTMLElement>("[data-framer-name='Scroll']").forEach((el) => {
    el.style.animationPlayState = "running";
  });

  return () => cleanups.forEach((fn) => fn());
}
