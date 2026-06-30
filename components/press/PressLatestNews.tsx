"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-latest-news.module.css";

function NewsIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="6" y="10" width="30" height="28" rx="3" />
      <path d="M14 18h14M14 24h14M14 30h9" strokeLinecap="round" />
      <path d="M36 16h4a2 2 0 0 1 2 2v16a4 4 0 0 1-4 4H14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PressLatestNews() {
  const { latestNews } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={latestNews.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{latestNews.heading}</h2>

        <motion.div
          className={styles.card}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className={styles.iconWrap}>
            <NewsIcon />
          </div>
          <p className={styles.body}>{latestNews.body}</p>
          <a href={latestNews.cta.href} className={styles.cta}>
            {latestNews.cta.label}
            <svg
              className={styles.ctaIcon}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
