"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-media-enquiries.module.css";

function MailIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PressMediaEnquiries() {
  const { mediaEnquiries } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={mediaEnquiries.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.glow} aria-hidden />
        <div className={styles.iconWrap}>
          <MailIcon />
        </div>
        <h2 className={styles.heading}>{mediaEnquiries.heading}</h2>
        <p className={styles.body}>{mediaEnquiries.body}</p>
        <a href={`mailto:${mediaEnquiries.email}`} className={styles.email}>
          {mediaEnquiries.email}
        </a>
        <p className={styles.responseTime}>{mediaEnquiries.responseTime}</p>
      </motion.div>
    </section>
  );
}
