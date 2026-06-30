"use client";

import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import styles from "./partners-why-partner.module.css";

export function PartnersWhyPartner() {
  const { whyPartner } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={whyPartner.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{whyPartner.heading}</h2>
        <p className={styles.body}>{whyPartner.body}</p>

        <div className={styles.grid}>
          {whyPartner.items.map((item, index) => (
            <motion.div
              className={styles.item}
              key={item.number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }
              }
            >
              <div className={styles.itemGlow} aria-hidden />
              <span className={styles.number}>{item.number}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
