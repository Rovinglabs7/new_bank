"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-getting-started.module.css";

function IconCode() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M11 10L5 16l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 10l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 8l-6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPuzzle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M13 6h6v4a2 2 0 0 0 4 0V6h2a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1h-4a2 2 0 0 0-4 0H13a1 1 0 0 1-1-1v-2a2 2 0 0 0-4 0V7a1 1 0 0 1 1-1h4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconQuestion() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M13 13a3 3 0 0 1 6 0c0 2-3 2-3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="22" r="1" fill="currentColor" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M4 18l5 5 4-3 3 3 5-4 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8l4 4h4l6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12l-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const iconMap = {
  code: <IconCode />,
  puzzle: <IconPuzzle />,
  question: <IconQuestion />,
  handshake: <IconHandshake />,
} as const;

export function IBPGettingStarted() {
  const { gettingStarted } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={gettingStarted.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{gettingStarted.heading}</h2>
        <div className={styles.grid}>
          {gettingStarted.cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={styles.card}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
            >
              <div className={styles.icon}>{iconMap[card.iconType]}</div>
              <h3 className={styles.cardHeading}>{card.heading}</h3>
              <p className={styles.cardBody}>{card.body}</p>
              <Link href={card.link.href} className={styles.link}>
                {card.link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
