"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-closing-cta.module.css";

export function CareersClosingCTA() {
  const { closing } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Get started">
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>{closing.heading}</h2>
        <p className={styles.body}>{closing.body}</p>
        <Link href={closing.cta.href} className={styles.cta}>
          {closing.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
