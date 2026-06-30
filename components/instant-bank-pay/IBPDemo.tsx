"use client";

import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-demo.module.css";

export function IBPDemo() {
  const { demo } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={demo.heading}>
      <div className={styles.inner}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{demo.heading}</h2>
          <p className={styles.body}>{demo.body}</p>
          <div
            className={styles.videoPlaceholder}
            role="img"
            aria-label={demo.videoPlaceholderCaption}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden
              className={styles.playIcon}
            >
              <circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="2" />
              <path
                d="M22 19l18 9-18 9V19z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.15"
              />
            </svg>
            <p className={styles.placeholderCaption}>{demo.videoPlaceholderCaption}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
