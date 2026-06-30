"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPToggle.module.css";

export function SPToggle() {
  const { toggle } = subscriptionPayments;
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={styles.section} aria-label="Value propositions">
      <div className={styles.inner}>
        <div className={styles.tabRow}>
          {toggle.tabs.map((tab, i) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(i)}
              aria-pressed={activeTab === i}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.valueProps}>
            {toggle.valueProps.map((prop, i) => (
              <motion.div
                key={prop.heading}
                className={styles.valueProp}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <h3 className={styles.propHeading}>{prop.heading}</h3>
                <p className={styles.propBody}>
                  {prop.body}
                  {prop.link && (
                    <>
                      {" "}
                      <Link href={prop.link.href} className={styles.propLink}>
                        {prop.link.label}
                      </Link>
                    </>
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.visual}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* image placeholder : 'new plan created' confirmation screen mockup */}
            <div className={styles.imagePlaceholder} aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
