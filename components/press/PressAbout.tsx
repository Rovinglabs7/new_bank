"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-about.module.css";

export function PressAbout() {
  const { about } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="About Sprout">
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.body}>{about.body}</p>
        <p className={styles.contactLine}>
          {about.contactLine}{" "}
          <a href={`mailto:${about.contactEmail}`} className={styles.contactLink}>
            {about.contactEmail}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
