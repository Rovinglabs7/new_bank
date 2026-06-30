"use client";

import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-in-the-press.module.css";

function EmptyIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function PressInThePress() {
  const { inThePress } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={inThePress.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* TODO: replace empty state with real coverage list once press mentions exist, do not fabricate */}
        <div className={styles.iconWrap}>
          <EmptyIcon />
        </div>
        <h2 className={styles.heading}>{inThePress.heading}</h2>
        <p className={styles.body}>
          {inThePress.body}{" "}
          <a href={inThePress.linkHref} className={styles.link}>
            {inThePress.linkText}
          </a>{" "}
          {inThePress.afterLinkText}
        </p>
      </motion.div>
    </section>
  );
}
