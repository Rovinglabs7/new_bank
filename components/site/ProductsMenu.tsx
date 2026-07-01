"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import styles from "./products-menu.module.css";

const COLUMN_ICONS: Record<string, ReactElement> = {
  Collect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M11.5 13.5a5.5 5.5 0 1 0 5-3" />
    </svg>
  ),
  Automate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  Connect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 4.9a3.5 3.5 0 0 1 5 5L16 11.5" />
      <path d="M13 17.5 11.4 19.1a3.5 3.5 0 0 1-5-5L8 12.5" />
    </svg>
  ),
  More: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h9" strokeLinecap="round" />
    </svg>
  ),
};

export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { columns, switching } = site.productsMenu;

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
        aria-controls="products-menu-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Products
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
            id="products-menu-panel"
            role="menu"
            aria-label="Products"
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

                <div className={styles.col}>
                  <div className={styles.colHeading}>
                    <span className={styles.colIcon}>{COLUMN_ICONS.More}</span>
                    <p className={styles.heading}>More</p>
                  </div>
                  <ul className={styles.list}>
                    <li role="none">
                      <Link
                        role="menuitem"
                        href={switching.href}
                        className={styles.moreLink}
                        onClick={() => setOpen(false)}
                      >
                        {switching.label}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
