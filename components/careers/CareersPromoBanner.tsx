"use client";

import { useState } from "react";
import Link from "next/link";
import { careers } from "@/config/careers";
import styles from "./careers-promo-banner.module.css";

export function CareersPromoBanner() {
  const { promoBanner } = careers;
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <span className={styles.message}>{promoBanner.message}</span>
        <Link href={promoBanner.cta.href} className={styles.cta}>
          {promoBanner.cta.label}
        </Link>
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss banner"
          onClick={() => setDismissed(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
