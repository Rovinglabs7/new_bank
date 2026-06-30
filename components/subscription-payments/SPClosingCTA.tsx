"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPClosingCTA.module.css";

export function SPClosingCTA() {
  const { closing } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Get started">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{closing.heading}</h2>
          <p className={styles.body}>{closing.body}</p>
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
