"use client";

import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-values.module.css";

export function CareersValues() {
  const { coreValues } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={coreValues.heading}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{coreValues.eyebrow}</p>
        <h2 className={styles.heading}>{coreValues.heading}</h2>

        <div className={styles.grid}>
          {coreValues.items.map((item, index) => (
            <motion.div
              className={styles.item}
              key={item.number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
            >
              <span className={styles.number}>{item.number}</span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
