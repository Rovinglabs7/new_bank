"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-how-it-works.module.css";

export function IBPHowItWorks() {
  const { howItWorks } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={howItWorks.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{howItWorks.heading}</h2>
        <div className={styles.steps}>
          {howItWorks.steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={step.number}
                className={`${styles.step} ${isEven ? styles.stepReverse : ""}`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              >
                <div className={styles.stepText}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3 className={styles.stepHeading}>{step.heading}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                  {step.demoLink && (
                    <Link href={step.demoLink.href} className={styles.demoLink}>
                      {step.demoLink.label}
                    </Link>
                  )}
                </div>
                <div
                  className={styles.stepImage}
                  role="img"
                  aria-label={step.imagePlaceholderLabel}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                    <rect x="4" y="4" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className={styles.imagePlaceholderLabel}>{step.imagePlaceholderLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
