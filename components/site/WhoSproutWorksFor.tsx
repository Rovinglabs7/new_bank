import type { ReactElement } from "react";
import styles from "./who-sprout-works-for.module.css";

type Industry = {
  title: string;
  icon: ReactElement;
};

const INDUSTRIES: Industry[] = [
  {
    title: "Agencies & Studios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
        <path d="M8.5 6.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      </svg>
    ),
  },
  {
    title: "Professional Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    title: "Healthcare Providers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 12h4l2-5 4 10 2-5h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fitness & Wellness",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M6.5 7v10M17.5 7v10M3.5 10v4M20.5 10v4M6.5 12h11" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Education & Training",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 4 2 9l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      </svg>
    ),
  },
  {
    title: "Property & Real Estate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M4 11 12 4l8 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9h12v-9" />
      </svg>
    ),
  },
  {
    title: "Retail & E-commerce",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M6 8h12l-1 11H7L6 8z" strokeLinejoin="round" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    title: "Hospitality",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 19V8a2 2 0 0 1 2-2h3v13M8 19h13v-6a3 3 0 0 0-3-3H11" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Nonprofits & Charities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 20.5s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Growing Teams",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="9" cy="8" r="3" />
        <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" />
        <circle cx="17.5" cy="9" r="2.4" />
        <path d="M16 12.2a5 5 0 0 1 5.5 5" />
      </svg>
    ),
  },
];

export function WhoSproutWorksFor() {
  return (
    <section className={styles.section} aria-labelledby="who-sprout-heading">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.textCol}>
            <p className={styles.eyebrow}>Who Sprout works for</p>
            <h2 id="who-sprout-heading" className={styles.heading}>
              Built for businesses of every size.
            </h2>
            <p className={styles.supporting}>
              From solo founders to growing teams, Sprout adapts to how your
              business gets paid.
            </p>
          </div>

          <div className={styles.pillGrid}>
            {INDUSTRIES.map((industry) => (
              <span className={styles.pill} key={industry.title}>
                <span className={styles.pillIcon}>{industry.icon}</span>
                {industry.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
