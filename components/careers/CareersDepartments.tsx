"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-departments.module.css";

export function CareersDepartments() {
  const { departments } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={departments.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{departments.heading}</h2>
        <p className={styles.body}>{departments.body}</p>

        <div className={styles.grid}>
          {departments.items.map((item, index) => (
            <motion.div
              className={styles.card}
              key={item.name}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }
              }
            >
              <div className={styles.cardGlow} aria-hidden />
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              <Link href={departments.cta.href} className={styles.cardLink}>
                <span>{departments.cta.label}</span>
                <svg
                  className={styles.cardLinkIcon}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
