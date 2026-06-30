import type { ReactElement } from "react";
import { pricing } from "@/config/pricing";
import styles from "./pricing-security.module.css";

const ICONS: Record<string, ReactElement> = {
  "FCA regulated": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 3 4 6.5V11c0 5 3.4 8.7 8 9.8 4.6-1.1 8-4.8 8-9.8V6.5L12 3Z" strokeLinejoin="round" />
    </svg>
  ),
  "Segregated client funds": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="9" width="7" height="10" rx="1.2" />
      <rect x="13.5" y="5" width="7" height="14" rx="1.2" />
    </svg>
  ),
  "Bank-grade encryption": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  "Open Banking verified mandates": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

export function PricingSecurity() {
  const { security } = pricing;

  return (
    <section className={styles.section} aria-label="Security and compliance">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{security.heading}</h2>
        <p className={styles.subheading}>{security.subheading}</p>

        <div className={styles.grid}>
          {security.items.map((item) => (
            <div className={styles.item} key={item.title}>
              <span className={styles.icon}>{ICONS[item.title]}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
