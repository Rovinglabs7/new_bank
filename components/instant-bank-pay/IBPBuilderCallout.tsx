"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-builder-callout.module.css";

export function IBPBuilderCallout() {
  const { builderCallout } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={builderCallout.heading}>
      <div className={styles.inner}>
        <motion.div
          className={styles.card}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className={styles.badge}>{builderCallout.badge}</span>
          <h2 className={styles.heading}>{builderCallout.heading}</h2>
          <p className={styles.body}>{builderCallout.body}</p>
          <Link href={builderCallout.cta.href} className={styles.cta}>
            {builderCallout.cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
