"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-brand-assets.module.css";

function DownloadIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M12 4v11" strokeLinecap="round" />
      <path d="M7 11l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" strokeLinecap="round" />
    </svg>
  );
}

export function PressBrandAssets() {
  const { brandAssets } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={brandAssets.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className={styles.iconWrap}>
          <DownloadIcon />
        </div>
        <h2 className={styles.heading}>{brandAssets.heading}</h2>
        <p className={styles.body}>{brandAssets.body}</p>
        {/* TODO: link to a real press kit archive once one is produced, do not fabricate */}
        <a href={brandAssets.cta.href} className={styles.cta}>
          {brandAssets.cta.label}
        </a>
        <p className={styles.note}>{brandAssets.note}</p>
      </motion.div>
    </section>
  );
}
