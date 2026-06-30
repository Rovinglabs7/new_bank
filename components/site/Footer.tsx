"use client";

import { useState } from "react";
import { site } from "@/config/site";
import styles from "./footer.module.css";

const socialIconPaths: Record<string, string> = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  instagram:
    "M12 7.378a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244zm0 7.624a3.002 3.002 0 1 1 0-6.004 3.002 3.002 0 0 1 0 6.004zm5.884-7.81a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0zM21.94 7.06c-.05-1.18-.27-2.43-.78-3.43-.53-1.04-1.4-1.91-2.44-2.44-1-.51-2.25-.73-3.43-.78C14.05 0.36 9.95 0.36 8.71.41c-1.18.05-2.43.27-3.43.78-1.04.53-1.91 1.4-2.44 2.44-.51 1-.73 2.25-.78 3.43C2.36 8.95 2.36 14.05 2.41 15.29c.05 1.18.27 2.43.78 3.43.53 1.04 1.4 1.91 2.44 2.44 1 .51 2.25.73 3.43.78 1.24.05 5.34.05 6.58 0 1.18-.05 2.43-.27 3.43-.78 1.04-.53 1.91-1.4 2.44-2.44.51-1 .73-2.25.78-3.43.05-1.24.05-5.34 0-6.58zm-2.22 8c-.13 3.13-1.47 4.5-4.59 4.62-1.21.06-5.34.06-6.55 0-3.13-.13-4.46-1.49-4.59-4.62-.06-1.21-.06-5.34 0-6.55.13-3.13 1.46-4.49 4.59-4.62 1.21-.06 5.34-.06 6.55 0 3.13.13 4.46 1.49 4.59 4.62.06 1.21.06 5.34 0 6.55z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57z",
};

function SocialIcon({ icon }: { icon: string }) {
  const path = socialIconPaths[icon];
  if (!path) return <span className={styles.socialIcon} aria-hidden />;
  return (
    <svg
      className={styles.socialIcon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

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
                      <SocialIcon icon={item.icon} />
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
              <span className={styles.flagIcon} aria-hidden>
                {country.flag}
              </span>
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
                      <span className={styles.flagIcon} aria-hidden>
                        {option.flag}
                      </span>
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className={styles.bottomDivider} />

        <div className={styles.bottomSection}>
          <div className={styles.bottomLeft}>
            <div className={styles.legalLinkRow}>
              {footer.bottom.legalLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                  {"icon" in link && link.icon ? (
                    // icon placeholder — standard "Privacy Choices" opt-out badge (blue checkmark / black X)
                    <span className={styles.privacyChoicesIcon} aria-hidden />
                  ) : null}
                </a>
              ))}
            </div>

            <p className={styles.bottomCopyright}>
              {footer.bottom.copyrightNotice}
            </p>
            <p className={styles.bottomSupport}>{footer.bottom.supportLine}</p>

            <div className={styles.bottomLegalParagraphs}>
              {footer.bottom.legalParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <p className={styles.bottomCta}>{footer.bottom.ctaLine}</p>

            <form
              className={styles.waitlistForm}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire up waitlist submission endpoint
              }}
            >
              <input
                type="email"
                required
                placeholder={footer.bottom.waitlist.placeholder}
                className={styles.waitlistInput}
                aria-label={footer.bottom.waitlist.placeholder}
              />
              <button type="submit" className={styles.waitlistButton}>
                {footer.bottom.waitlist.buttonLabel}
              </button>
            </form>
          </div>

          <div className={styles.bottomRight}>
            <address className={styles.addressBlock}>
              {footer.bottom.address.name}
              <br />
              {footer.bottom.address.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>

            {/* badge placeholder — FCA registration or trust seal, TBC once SPI approved */}
            <div className={styles.trustBadge} aria-hidden />

            <ul className={styles.bottomSocialList}>
              {footer.bottom.socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>{footer.wordmark}</span>
      </div>
    </footer>
  );
}
