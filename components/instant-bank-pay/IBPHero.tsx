"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-hero.module.css";

export function IBPHero() {
  const { hero } = instantBankPay;
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? undefined : { opacity: 0, y: 18 };
  const animate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section className={styles.hero} aria-label="Instant Bank Pay overview">
      <div className={styles.inner}>
        <motion.p
          className={styles.eyebrow}
          initial={initial}
          animate={animate}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" as const, delay: 0 }}
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          className={styles.heading}
          initial={initial}
          animate={animate}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" as const, delay: 0.1 }}
        >
          {hero.heading}
        </motion.h1>
        <motion.p
          className={styles.subtext}
          initial={initial}
          animate={animate}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" as const, delay: 0.2 }}
        >
          {hero.subtext}
        </motion.p>
        <motion.div
          className={styles.ctas}
          initial={initial}
          animate={animate}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" as const, delay: 0.3 }}
        >
          <Link href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} className={styles.secondaryCta}>
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
        <motion.div
          className={styles.visualPlaceholder}
          aria-label={hero.visualAriaLabel}
          role="img"
          initial={initial}
          animate={animate}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: "easeOut" as const, delay: 0.4 }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden
            className={styles.placeholderIcon}
          >
            <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="2" />
            <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className={styles.placeholderCaption}>{hero.visualAriaLabel}</p>
        </motion.div>
      </div>
    </section>
  );
}
