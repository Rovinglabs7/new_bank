"use client";

import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import styles from "./partners-ecosystem.module.css";

export function PartnersEcosystem() {
  const { ecosystem } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={ecosystem.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{ecosystem.heading}</h2>

        <div className={styles.grid}>
          {ecosystem.stats.map((stat, index) => (
            <motion.div
              className={styles.card}
              key={stat.value}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={
                reduceMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }
              }
            >
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
