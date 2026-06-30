"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPIntegrations.module.css";

export function SPIntegrations() {
  const { integrations } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Integrations">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{integrations.heading}</h2>
          <p className={styles.body}>{integrations.body}</p>
          <Link href={integrations.link.href} className={styles.link}>
            {integrations.link.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
