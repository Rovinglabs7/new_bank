"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import styles from "./partners-hero.module.css";

export function PartnersHero() {
  const { hero } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-label="Partners overview">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1 className={styles.heading}>{hero.heading}</h1>
          <p className={styles.subtext}>{hero.subtext}</p>

          <div className={styles.ctas}>
            <Link href={hero.primaryCta.href} className={styles.primaryCta}>
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className={styles.secondaryCta}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.videoPanel}
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          {/* TODO: replace with <video> element once partner-network-1.mp4 is hosted
              on an external CDN (e.g. Cloudflare R2 or Stream) — file is too large
              for Cloudflare Workers asset deployment */}
          <div className={styles.video} role="img" aria-label={hero.videoCaption} />
          <div className={styles.videoOverlay} aria-hidden />
          <p className={styles.videoCaption}>{hero.videoCaption}</p>
        </motion.div>
      </div>
    </section>
  );
}
