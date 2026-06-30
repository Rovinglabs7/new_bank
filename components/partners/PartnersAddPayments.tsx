"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import styles from "./partners-add-payments.module.css";

export function PartnersAddPayments() {
  const { addPayments } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={addPayments.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{addPayments.heading}</h2>
        <p className={styles.body}>{addPayments.body}</p>

        <div className={styles.groups}>
          {addPayments.groups.map((group, groupIndex) => (
            <motion.div
              className={styles.group}
              key={group.heading}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: groupIndex * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <h3 className={styles.groupHeading}>{group.heading}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.link}>
                      <span>{item.label}</span>
                      <svg
                        className={styles.linkIcon}
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
