"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-closing-cta.module.css";

export function IBPClosingCTA() {
  const { closing } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={closing.heading}>
      <div className={styles.inner}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{closing.heading}</h2>
          <div className={styles.ctas}>
            <Link href={closing.primaryCta.href} className={styles.primaryCta}>
              {closing.primaryCta.label}
            </Link>
            <Link href={closing.secondaryCta.href} className={styles.secondaryCta}>
              {closing.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
