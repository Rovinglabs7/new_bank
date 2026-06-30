"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./signup.module.css";

type Scene = {
  label: string;
  detail: string;
  gradient: string;
};

const SCENES: Scene[] = [
  {
    label: "Coffee Collective",
    detail: "Walk-in & online orders, one tab",
    gradient: "linear-gradient(135deg, #b45309, #d97706)",
  },
  {
    label: "Studio Supply Co.",
    detail: "Inventory synced with every sale",
    gradient: "linear-gradient(135deg, #92400e, #ea9a3e)",
  },
  {
    label: "Reyes Consulting",
    detail: "Invoices that get paid on time",
    gradient: "linear-gradient(135deg, #c2680a, #f0a93f)",
  },
];

const INTERVAL_MS = 3200;

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
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.label}
          className={styles.sceneCard}
          style={{ background: scene.gradient }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.sceneLabel}>{scene.label}</span>
          <span className={styles.sceneDetail}>{scene.detail}</span>
        </motion.div>
      </AnimatePresence>

      <div className={styles.sceneDots} aria-hidden>
        {SCENES.map((dotScene, dotIndex) => (
          <span
            key={dotScene.label}
            className={`${styles.sceneDot} ${dotIndex === index ? styles.sceneDotActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
