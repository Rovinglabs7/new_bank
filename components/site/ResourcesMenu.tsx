"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import styles from "./resources-menu.module.css";

const COLUMN_ICONS: Record<string, ReactElement> = {
  Explore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" strokeLinejoin="round" />
    </svg>
  ),
  "Help & Developers": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M7.5 10.5 10 13l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 15.5h4" strokeLinecap="round" />
    </svg>
  ),
  Company: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4.5" y="3.5" width="10" height="17" rx="1.2" />
      <path d="M14.5 9.5h5v11h-5" />
      <path d="M7.5 7.5h1M11 7.5h1M7.5 11h1M11 11h1M7.5 14.5h1M11 14.5h1" strokeLinecap="round" />
    </svg>
  ),
};

const FEATURED_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M6.5 4.5h7l4 4v11h-11Z" strokeLinejoin="round" />
    <path d="M13.5 4.5v4h4" strokeLinejoin="round" />
    <path d="M9 13.5h6M9 16.5h6" strokeLinecap="round" />
  </svg>
);

export function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { columns, featured } = site.resourcesMenu;

  useEffect(() => {
    if (!open) return;
    const header = containerRef.current?.closest("header");
    if (header) setPanelTop(header.getBoundingClientRect().bottom);

    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="resources-menu-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Resources
        <motion.svg
          className={styles.chevron}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="resources-menu-panel"
            role="menu"
            aria-label="Resources"
            className={styles.panel}
            style={{ top: panelTop }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.inner}>
              <div className={styles.grid}>
                {columns.map((col) => (
                  <div className={styles.col} key={col.heading}>
                    <div className={styles.colHeading}>
                      <span className={styles.colIcon}>{COLUMN_ICONS[col.heading]}</span>
                      <p className={styles.heading}>{col.heading}</p>
                    </div>
                    <ul className={styles.list}>
                      {col.items.map((item) => (
                        <li key={item.title} role="none">
                          <Link role="menuitem" href={item.href} onClick={() => setOpen(false)}>
                            <span className={styles.title}>{item.title}</span>
                            <span className={styles.subtext}>{item.subtext}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className={styles.featuredCol}>
                  <Link
                    role="menuitem"
                    href={featured.href}
                    className={styles.featuredCard}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.featuredIcon}>{FEATURED_ICON}</span>
                    <p className={styles.featuredHeading}>{featured.heading}</p>
                    <p className={styles.featuredBody}>{featured.body}</p>
                    <span className={styles.featuredCta}>
                      {featured.ctaLabel}
                      <span aria-hidden> →</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
