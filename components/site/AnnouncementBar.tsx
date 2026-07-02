"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import styles from "./announcement-bar.module.css";

const ANNOUNCEMENTS = [
  {
    tag: "New",
    message: site.announcementBar.message,
    cta: { label: "Join the waitlist", href: "#waitlist" },
  },
  {
    tag: null,
    message: "Our obsession: becoming the easiest payment company in the world to work with.",
    cta: { label: "Book a demo", href: "/contact-sales" },
  },
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 120_000); // 2 minutes
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  const current = ANNOUNCEMENTS[idx];

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className={styles.content}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.tag && (
              <span className={styles.tag}>{current.tag}</span>
            )}
            <span className={styles.message}>{current.message}</span>
            <a href={current.cta.href} className={styles.cta}>
              {current.cta.label} →
            </a>
          </motion.div>
        </AnimatePresence>

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
