"use client";

import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-social-proof.module.css";

export function IBPSocialProof() {
  const { socialProof } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={socialProof.heading}>
      <div className={styles.inner}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{socialProof.heading}</h2>
          <p className={styles.body}>{socialProof.body}</p>
          <div className={styles.card}>
            {/* TODO: replace with real case study, customer quote, and 'Read the case study' link once first merchant goes live - do not fabricate a testimonial or customer name */}
            <p className={styles.cardPlaceholder}>
              Customer case study coming soon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
