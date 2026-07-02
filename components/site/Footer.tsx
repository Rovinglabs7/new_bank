"use client";

import { useActionState, useState } from "react";
import { site } from "@/config/site";
import { joinWaitlist } from "@/lib/actions/leads";
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

function AskAiIcon({ id }: { id: string }) {
  switch (id) {
    case "chatgpt":
      return (
        <svg className={styles.askAiIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.28 9.82a5.99 5.99 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.5-2.9A6.07 6.07 0 0 0 10.8 0a6.05 6.05 0 0 0-5.77 4.2 5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.09 5.99 5.99 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.5 2.9A6.07 6.07 0 0 0 13.2 24a6.05 6.05 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.69-7.08zM13.2 22.43a4.52 4.52 0 0 1-2.9-1.05l.14-.08 4.81-2.78a.78.78 0 0 0 .4-.69v-6.78l2.03 1.18a.07.07 0 0 1 .04.06v5.61a4.54 4.54 0 0 1-4.52 4.53zM3.5 18.3a4.5 4.5 0 0 1-.54-3.03l.14.09 4.81 2.78a.78.78 0 0 0 .79 0l5.87-3.39v2.35a.08.08 0 0 1-.03.07l-4.87 2.81a4.54 4.54 0 0 1-6.17-1.68zM2.25 7.9a4.5 4.5 0 0 1 2.36-1.98v5.7a.77.77 0 0 0 .39.68l5.87 3.39-2.03 1.18a.08.08 0 0 1-.07 0L3.83 14.04A4.54 4.54 0 0 1 2.25 7.9zm16.7 3.88-5.87-3.4 2.03-1.17a.08.08 0 0 1 .07 0l4.94 2.86a4.53 4.53 0 0 1-.68 8.17v-5.7a.78.78 0 0 0-.4-.68zm2.02-3.04-.14-.09-4.81-2.78a.78.78 0 0 0-.79 0L9.36 9.26V6.91a.07.07 0 0 1 .03-.07l4.87-2.81a4.53 4.53 0 0 1 6.71 4.7zM8.31 12.86l-2.04-1.18a.07.07 0 0 1-.03-.06V5.99a4.53 4.53 0 0 1 7.42-3.48l-.14.08-4.81 2.78a.78.78 0 0 0-.4.69zm1.1-2.38L12 8.83l2.59 1.65v3.3L12 15.17l-2.59-1.65z" />
        </svg>
      );
    case "claude":
      return (
        <svg
          className={styles.askAiIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 2v20M4.6 6l14.8 12M4.6 18 19.4 6M2 12h20" />
        </svg>
      );
    case "perplexity":
      return (
        <svg className={styles.askAiIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M12 2v7.5M12 2 5.5 7v9.5M12 2l6.5 5v9.5M5.5 16.5 12 22l6.5-5.5M5.5 7l6.5 4.5L18.5 7" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "gemini":
      return (
        <svg className={styles.askAiIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 22c0-5.52-4.48-10-10-10 5.52 0 10-4.48 10-10 0 5.52 4.48 10 10 10-5.52 0-10 4.48-10 10z" />
        </svg>
      );
    default:
      return <span className={styles.askAiIcon} aria-hidden />;
  }
}

function PrivacyChoicesIcon() {
  return (
    <svg
      className={styles.privacyChoicesIcon}
      viewBox="0 0 32 16"
      aria-hidden
    >
      <rect x="0.5" y="0.5" width="31" height="15" rx="7.5" fill="#ffffff" stroke="#d4d4d4" />
      <path
        d="M6.2 8.1 8 9.9l3.4-3.8"
        fill="none"
        stroke="#0a5dc2"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 6.2 24 9.8M24 6.2l-3.5 3.6"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
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
  const [waitlistState, waitlistAction, waitlistPending] = useActionState(
    joinWaitlist,
    {},
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
              <div className={styles.contactGroups}>
                {footer.contact.groups.map((group) => (
                  <div className={styles.contactGroup} key={group.label}>
                    <span className={styles.contactGroupLabel}>
                      {group.label}
                    </span>
                    <ul className={styles.infoList}>
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <a href={item.href}>{item.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
                  aria-label={`Ask ${platform.label} about Praevor`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AskAiIcon id={platform.id} />
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
                  {"icon" in link && link.icon ? <PrivacyChoicesIcon /> : null}
                </a>
              ))}
            </div>

            <p className={styles.bottomCopyright}>
              {footer.bottom.copyrightNotice}
            </p>

            <div className={styles.bottomLegalParagraphs}>
              {footer.bottom.legalParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.waitlistBlock} id="waitlist">
              <p className={styles.bottomCta}>{footer.bottom.ctaLine}</p>

              {waitlistState.error ? (
                <p className={styles.waitlistFeedback} role="alert">
                  {waitlistState.error}
                </p>
              ) : null}
              {waitlistState.success ? (
                <p className={`${styles.waitlistFeedback} ${styles.waitlistSuccess}`}>
                  You&apos;re on the list. We&apos;ll be in touch.
                </p>
              ) : null}

              <form className={styles.waitlistForm} action={waitlistAction}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={footer.bottom.waitlist.placeholder}
                  className={styles.waitlistInput}
                  aria-label={footer.bottom.waitlist.placeholder}
                  disabled={waitlistPending || waitlistState.success}
                />
                <button
                  type="submit"
                  className={styles.waitlistButton}
                  disabled={waitlistPending || waitlistState.success}
                >
                  {waitlistPending
                    ? "Joining..."
                    : waitlistState.success
                      ? "Joined"
                      : footer.bottom.waitlist.buttonLabel}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>{footer.wordmark}</span>
      </div>
    </footer>
  );
}
