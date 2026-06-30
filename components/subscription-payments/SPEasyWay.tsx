"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPEasyWay.module.css";

export function SPEasyWay() {
  const { easyWay } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Easy way to pay">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{easyWay.heading}</h2>

        <div className={styles.columns}>
          {easyWay.items.map((item, i) => (
            <motion.div
              key={item.heading}
              className={styles.column}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            >
              <div className={styles.imagePlaceholder} aria-hidden>
                {/* image placeholder : {item.imagePlaceholder} */}
              </div>
              <h3 className={styles.colHeading}>{item.heading}</h3>
              <p className={styles.colBody}>
                {item.body}
                {item.link && (
                  <>
                    {" "}
                    <Link href={item.link.href} className={styles.colLink}>
                      {item.link.label}
                    </Link>
                    .
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
