"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import styles from "./partners-getting-started.module.css";

export function PartnersGettingStarted() {
  const { gettingStarted } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={gettingStarted.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{gettingStarted.heading}</h2>

        <div className={styles.grid}>
          {gettingStarted.items.map((item, index) => (
            <motion.div
              className={styles.card}
              key={item.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }
              }
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
              {item.cta ? (
                <Link href={item.cta.href} className={styles.cardLink}>
                  <span>{item.cta.label}</span>
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
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
