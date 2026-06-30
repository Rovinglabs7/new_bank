"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-hero.module.css";

export function PressHero() {
  const { hero } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-label="Press overview">
      <div className={styles.glow} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <div className={styles.inner}>
        <motion.span
          className={styles.eyebrow}
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {hero.eyebrow}
        </motion.span>
        <motion.h1
          className={styles.heading}
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        >
          {hero.heading}
        </motion.h1>
        <motion.p
          className={styles.subtext}
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
        >
          {hero.subtext}
        </motion.p>
      </div>
    </section>
  );
}
