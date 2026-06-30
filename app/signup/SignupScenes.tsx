"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./signup.module.css";

type Scene = {
  src: string;
  alt: string;
};

const SCENES: Scene[] = [
  { src: "/hero/woman-phone.webp", alt: "Business owner taking a call beside her laptop" },
  { src: "/hero/man-counter.png", alt: "Shop owner in an apron smiling at the counter" },
  { src: "/hero/team-laptop.jpg", alt: "Small team reviewing a project together on a laptop" },
  { src: "/hero/woman-tablet.png", alt: "Founder reviewing packaging swatches on a tablet" },
  { src: "/hero/woman-box.jpg", alt: "Business owner holding a packed shipping box" },
];

const INTERVAL_MS = 4200;

export function SignupScenes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const scene = SCENES[index];

  return (
    <div className={styles.scenes}>
      <div className={styles.sceneCard}>
        <AnimatePresence>
          <motion.img
            key={scene.src}
            src={scene.src}
            alt={scene.alt}
            className={styles.sceneImage}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>

      <div className={styles.sceneDots} aria-hidden>
        {SCENES.map((dotScene, dotIndex) => (
          <span
            key={dotScene.src}
            className={`${styles.sceneDot} ${dotIndex === index ? styles.sceneDotActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
