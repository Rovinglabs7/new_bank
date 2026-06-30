"use client";

import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-use-cases.module.css";

export function IBPUseCases() {
  const { useCases } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={useCases.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{useCases.heading}</h2>
        <div className={styles.grid}>
          {useCases.items.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
            >
              <div
                className={styles.imagePlaceholder}
                role="img"
                aria-label={`Illustration for: ${item.heading}`}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                  <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className={styles.cardHeading}>{item.heading}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
