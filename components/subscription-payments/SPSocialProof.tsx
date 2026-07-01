"use client";

import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPSocialProof.module.css";

export function SPSocialProof() {
  const { socialProof } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Social proof">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{socialProof.heading}</h2>

          <div className={styles.cardAndVisual}>
            <div className={styles.card}>
              {/* TODO: replace with a real customer quote and case study link once first merchant goes live : do not fabricate a name, company, or quote */}
              <p className={styles.cardBody}>{socialProof.body}</p>
            </div>

            <div className={styles.visual} aria-hidden>
              {/* image placeholder : illustration in Praevor brand colours */}
              <div className={styles.imagePlaceholder} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
