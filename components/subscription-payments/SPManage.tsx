"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPManage.module.css";

export function SPManage() {
  const { manage } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Simple to manage">
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{manage.heading}</h2>
          <p className={styles.body}>{manage.body}</p>
          <Link href={manage.cta.href} className={styles.cta}>
            {manage.cta.label}
          </Link>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {/* image placeholder : partner integrations illustration */}
          <div className={styles.imagePlaceholder} aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
