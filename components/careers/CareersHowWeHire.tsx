"use client";

import { useState } from "react";
import Link from "next/link";
import { careers } from "@/config/careers";
import styles from "./careers-how-we-hire.module.css";

export function CareersHowWeHire() {
  const { howWeHire } = careers;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-label={howWeHire.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{howWeHire.heading}</h2>
        <p className={styles.body}>{howWeHire.body}</p>

        <div className={styles.steps}>
          {howWeHire.steps.map((step) => (
            <div className={styles.step} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>
              <span className={styles.stepTitle}>{step.title}</span>

              {step.title === "Apply" ? (
                <div className={styles.faqList}>
                  {howWeHire.applyFaqs.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div className={styles.faqItem} key={item.question}>
                        <button
                          type="button"
                          className={styles.faqQuestion}
                          aria-expanded={isOpen}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          <span>{item.question}</span>
                          <span
                            className={
                              isOpen ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron
                            }
                          >
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
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.callout}>
          <h3 className={styles.calloutHeading}>{howWeHire.callout.heading}</h3>
          <p className={styles.calloutBody}>{howWeHire.callout.body}</p>
          <Link href={howWeHire.callout.cta.href} className={styles.calloutLink}>
            {howWeHire.callout.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
