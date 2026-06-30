"use client";

import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPHowItWorks.module.css";

export function SPHowItWorks() {
  const { howItWorks } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="How it works">
      <div className={styles.inner}>
        <h2 className={styles.sectionHeading}>{howItWorks.heading}</h2>

        <div className={styles.steps}>
          {howItWorks.steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={step.number}
                className={`${styles.step} ${isEven ? styles.stepReversed : ""}`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              >
                <div className={styles.stepCopy}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3 className={styles.stepHeading}>{step.heading}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
                <div className={styles.stepVisual} aria-hidden>
                  {/* image placeholder : {step.imagePlaceholder} */}
                  <div className={styles.imagePlaceholder} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
