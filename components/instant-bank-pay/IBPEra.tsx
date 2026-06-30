"use client";

import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-era.module.css";

export function IBPEra() {
  const { era } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={era.heading}>
      <div className={styles.inner}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{era.heading}</h2>
          {era.paragraphs.map((p, i) => (
            <p key={i} className={styles.body}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
