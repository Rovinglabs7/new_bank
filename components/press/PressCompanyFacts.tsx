"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { press } from "@/config/press";
import styles from "./press-company-facts.module.css";

const ICONS: Record<string, ReactElement> = {
  Founded: (
    <path d="M12 3v4M5 8h14l-1.5 12.5a1 1 0 0 1-1 .5H7.5a1 1 0 0 1-1-.5L5 8z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Headquarters: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  Founder: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "Parent company": (
    <>
      <rect x="4" y="10" width="16" height="11" rx="1.5" />
      <path d="M9 21v-5h6v5M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "Regulatory status": (
    <path d="M12 3l7 3v6c0 5-3.2 8.5-7 9.5C8.2 20.5 5 17 5 12V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

function FactIcon({ label }: { label: string }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {ICONS[label] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

export function PressCompanyFacts() {
  const { companyFacts } = press;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={companyFacts.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{companyFacts.heading}</h2>

        <div className={styles.grid}>
          {companyFacts.items.map((item, index) => (
            <motion.div
              className={styles.card}
              key={item.label}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }
              }
            >
              <FactIcon label={item.label} />
              <h3 className={styles.label}>{item.label}</h3>
              <p className={styles.value}>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
