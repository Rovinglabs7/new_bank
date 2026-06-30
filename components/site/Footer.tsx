"use client";

import { useState } from "react";
import { site } from "@/config/site";
import styles from "./footer.module.css";

export function Footer() {
  const { footer } = site;
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState<(typeof footer.countries)[number]>(
    footer.countries[0],
  );

  return (
    <footer
      id="sprout-footer"
      className={styles.footer}
      aria-label="Site footer"
    >
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <div className={styles.brandBlock}>
            <span className={styles.brandWordmark}>{footer.brand}</span>
            <p className={styles.brandTagline}>{footer.tagline}</p>
          </div>

          <div className={styles.contactSocialRow}>
            <div className={styles.infoCol}>
              <span className={styles.infoHeading}>
                {footer.contact.heading}
              </span>
              <ul className={styles.infoList}>
                {footer.contact.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.infoCol}>
              <span className={styles.infoHeading}>
                {footer.social.heading}
              </span>
              <ul className={styles.infoList}>
                {footer.social.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>
                      {/* icon placeholder — {item.label} logo */}
                      <span className={styles.socialIcon} aria-hidden />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.linkGrid}>
          {footer.columns.map((col) => (
            <nav
              key={col.title}
              className={`${styles.navCol} ${openCol === col.title ? styles.open : ""}`}
              aria-label={`${col.title} links`}
            >
              <button
                type="button"
                className={styles.colHeading}
                onClick={() =>
                  setOpenCol((prev) => (prev === col.title ? null : col.title))
                }
                aria-expanded={openCol === col.title}
              >
                {col.title}
              </button>
              <ul className={styles.colLinks}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>
                      {link.label}
                      {"badge" in link && link.badge ? (
                        <span className={styles.badge}>{link.badge}</span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.askAiRow}>
          <div className={styles.askAiBlock}>
            <span className={styles.infoHeading}>{footer.askAi.heading}</span>
            <div className={styles.askAiIcons}>
              {footer.askAi.platforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.href}
                  className={styles.askAiIconButton}
                  aria-label={`Ask ${platform.label} about Sprout`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* icon placeholder — {platform.label} logo */}
                  <span className={styles.askAiIcon} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.countrySelector}>
            <button
              type="button"
              className={styles.countryButton}
              aria-haspopup="listbox"
              aria-expanded={countryOpen}
              onClick={() => setCountryOpen((prev) => !prev)}
            >
              {/* flag icon placeholder — {country.code} */}
              <span className={styles.flagIcon} aria-hidden />
              {country.label}
              <span className={styles.chevron} aria-hidden>
                ▾
              </span>
            </button>
            {countryOpen ? (
              <ul className={styles.countryList} role="listbox">
                {footer.countries.map((option) => (
                  <li key={option.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option.code === country.code}
                      className={styles.countryOption}
                      onClick={() => {
                        // TODO: wire up actual locale routing
                        setCountry(option);
                        setCountryOpen(false);
                      }}
                    >
                      <span className={styles.flagIcon} aria-hidden />
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <p className={styles.builtWith}>{footer.builtWith}</p>

        <p className={styles.copyright}>
          {footer.copyright}
          {footer.copyrightLinks.map((link) => (
            <span key={link.label}>
              <span className={styles.copyrightDot} aria-hidden>
                ·
              </span>
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </p>

        <div className={styles.legalDisclosure}>
          {footer.legalDisclosure.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>{footer.wordmark}</span>
      </div>
    </footer>
  );
}
