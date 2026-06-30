"use client";

import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-more-than-culture.module.css";

export function CareersMoreThanCulture() {
  const { moreThanCulture } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={moreThanCulture.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>{moreThanCulture.heading}</h2>
        <p className={styles.body}>{moreThanCulture.body}</p>
      </motion.div>
    </section>
  );
}
