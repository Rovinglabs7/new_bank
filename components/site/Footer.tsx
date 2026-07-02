"use client";

import { Linkedin, Twitter, Github } from "lucide-react";
import { site } from "@/config/site";
import styles from "./footer.module.css";

const NAV_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Payment Links", href: "/products/payment-links" },
      { label: "Direct Debit", href: "/products/subscription-payments" },
      { label: "Recurring Payments", href: "/products/subscription-payments" },
      { label: "Invoices", href: "/products/invoices" },
      { label: "Payment Requests", href: "/products/payment-requests" },
      { label: "Open Banking", href: "/platform/open-banking" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact-sales" },
      { label: "Security", href: "/security" },
      { label: "Trust Centre", href: "/legal/safeguarding" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/developers/docs" },
      { label: "Status", href: "/status" },
      { label: "Changelog", href: "/changelog" },
      { label: "Sandbox", href: "/developers/sandbox" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Centre", href: "/support" },
      { label: "Compliance", href: "/legal/complaints" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Terms", href: "/legal/terms" },
      { label: "FCA Information", href: "/legal/fca" },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Security", href: "/security" },
];

export function Footer() {
  const { footer } = site;

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.inner}>

        {/* ── Main grid ── */}
        <div className={styles.mainGrid}>

          {/* Brand column */}
          <div className={styles.brandCol}>
            <span className={styles.wordmark} aria-label="Praevor">
              praevor.
            </span>
            <p className={styles.tagline}>
              Building the easiest payment company in the world to work with.
            </p>
            <p className={styles.location}>London, United Kingdom</p>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <nav key={col.heading} className={styles.navCol} aria-label={`${col.heading} links`}>
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <ul className={styles.colLinks}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.colLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} role="separator" />

        {/* ── Bottom bar ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 Praevor Technologies Ltd. All rights reserved.
          </p>

          <nav className={styles.bottomLinks} aria-label="Legal links">
            {BOTTOM_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.bottomLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.socials}>
            <a
              href="https://linkedin.com/company/praevor"
              className={styles.socialBtn}
              aria-label="Praevor on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/praevor"
              className={styles.socialBtn}
              aria-label="Praevor on X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://github.com/praevor"
              className={styles.socialBtn}
              aria-label="Praevor on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} role="separator" />

        {/* ── Legal disclosure ── */}
        <div className={styles.legal}>
          {footer.bottom.legalParagraphs.map((para, i) => (
            <p key={i} className={styles.legalPara}>{para}</p>
          ))}
        </div>

      </div>
    </footer>
  );
}
