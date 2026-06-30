"use client";

import { motion, useReducedMotion } from "framer-motion";
import { instantBankPay } from "@/config/instant-bank-pay";
import styles from "./ibp-benefits.module.css";

function IconClockCheck() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 27l3-3 2 2 4-5" stroke="#174501" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPersonCheck() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="13" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 26c0-4.4 3.6-8 8-8h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 20l3 3 5-5" stroke="#174501" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPercent() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M8 24L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 5l22 22" stroke="rgba(40,30,21,0.12)" strokeWidth="1" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M8 24C8 24 10 14 22 10C22 10 24 20 12 26C12 26 10 26 8 24Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(23,69,1,0.08)"
      />
      <path d="M8 24C12 20 16 18 22 10" stroke="#174501" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  "instant-confirmation": <IconClockCheck />,
  "payer-conversion": <IconPersonCheck />,
  "reduce-fees": <IconPercent />,
  "less-stress": <IconLeaf />,
};

export function IBPBenefits() {
  const { benefits } = instantBankPay;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={benefits.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{benefits.heading}</h2>
        <div className={styles.grid}>
          {benefits.items.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardIcon}>{icons[item.id]}</div>
              <h3 className={styles.cardHeading}>{item.heading}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
