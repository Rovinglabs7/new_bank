"use client";

import { useState } from "react";
import { site } from "@/config/site";
import styles from "./announcement-bar.module.css";

export function AnnouncementBar() {
  const { announcementBar } = site;
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <span className={styles.tag}>{announcementBar.tag}</span>
        <span className={styles.message}>{announcementBar.message}</span>
        <a href="#waitlist" className={styles.cta}>
          Join the waitlist
        </a>
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
