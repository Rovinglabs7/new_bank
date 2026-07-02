"use client";

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

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
              <LinkedInIcon />
            </a>
            <a
              href="https://x.com/praevor"
              className={styles.socialBtn}
              aria-label="Praevor on X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon />
            </a>
            <a
              href="https://github.com/praevor"
              className={styles.socialBtn}
              aria-label="Praevor on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>

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
