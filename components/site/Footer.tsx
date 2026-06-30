"use client";

import { useState } from "react";
import { site } from "@/config/site";
import styles from "./footer.module.css";

export function Footer() {
  const { footer } = site;
  const [openCol, setOpenCol] = useState<string | null>(null);

  return (
    <footer id="sprout-footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoRow}>
          <span className={styles.logo}>{site.brand}</span>
        </div>

        <div className={styles.newsletter}>
          <div className={styles.newsletterCopy}>
            <h3>{footer.newsletter.title}</h3>
            <p>{footer.newsletter.description}</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={footer.newsletter.placeholder}
              aria-label="Email address"
            />
            <button type="submit">{footer.newsletter.button}</button>
          </form>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footer.columns.map((col) => (
            <div
              key={col.title}
              className={`${styles.navCol} ${openCol === col.title ? styles.open : ""}`}
            >
              <button
                type="button"
                className={styles.colHeading}
                onClick={() =>
                  setOpenCol((prev) => (prev === col.title ? null : col.title))
                }
              >
                {col.title}
              </button>
              <ul className={styles.colLinks}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.tagline}>{footer.tagline}</p>
            <p className={styles.copyright}>{footer.copyright}</p>
          </div>
          <div className={styles.bottomRight}>
            <nav className={styles.legalLinks} aria-label="Legal navigation">
              {footer.legal.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
