"use client";

import { useState } from "react";
import { careers } from "@/config/careers";
import styles from "./careers-faq.module.css";

export function CareersFAQ() {
  const { faqs } = careers;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-label="Careers frequently asked questions">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{faqs.heading}</h2>

        <div className={styles.list}>
          {faqs.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={styles.item} key={item.question}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className={isOpen ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={styles.answerWrap}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
