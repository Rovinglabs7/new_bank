"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPCustomerLove.module.css";

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M1.5 12S5 5 12 5s10.5 7 10.5 7S18 19 12 19 1.5 12 1.5 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 6v6c0 5.25 3.5 8.75 8 10 4.5-1.25 8-4.75 8-10V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconMap = {
  check: CheckIcon,
  eye: EyeIcon,
  shield: ShieldIcon,
};

export function SPCustomerLove() {
  const { customerLove } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Benefits for customers">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{customerLove.heading}</h2>

        <div className={styles.grid}>
          {customerLove.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.heading}
                className={styles.item}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className={styles.iconWrap}>
                  <Icon />
                </div>
                <h3 className={styles.itemHeading}>{item.heading}</h3>
                <p className={styles.itemBody}>
                  {item.body}
                  {item.link && (
                    <>
                      {" "}
                      <Link href={item.link.href} className={styles.itemLink}>
                        {item.link.label}
                      </Link>
                      .
                    </>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
