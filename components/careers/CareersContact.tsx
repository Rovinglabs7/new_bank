"use client";

import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-contact.module.css";

export function CareersContact() {
  const { contact } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={contact.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>{contact.heading}</h2>
        <div className={styles.grid}>
          {contact.items.map((item, index) => (
            <div className={styles.item} key={item.label + index}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
