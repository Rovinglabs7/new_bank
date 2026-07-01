"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPHero.module.css";

export function SPHero() {
  const { hero } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-label="Subscription payments overview">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.p
            className={styles.eyebrow}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className={styles.heading}
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          >
            {hero.heading}
          </motion.h1>

          <motion.p
            className={styles.subtext}
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
          >
            {hero.subtext}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          >
            <Link href={hero.primaryCta.href} className={styles.primaryCta}>
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className={styles.secondaryCta}>
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          {/* image placeholder : device mockup showing Praevor dashboard subscription view */}
          <div className={styles.imagePlaceholder} aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
