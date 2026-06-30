import { press } from "@/config/press";
import styles from "./press-latest-news.module.css";

function NewsIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="6" y="10" width="30" height="28" rx="3" />
      <path d="M14 18h14M14 24h14M14 30h9" strokeLinecap="round" />
      <path d="M36 16h4a2 2 0 0 1 2 2v16a4 4 0 0 1-4 4H14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PressLatestNews() {
  const { latestNews } = press;

  return (
    <section className={styles.section} aria-label={latestNews.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{latestNews.heading}</h2>

        <div className={styles.card}>
          <NewsIcon />
          <p className={styles.body}>{latestNews.body}</p>
          <a href={latestNews.cta.href} className={styles.cta}>
            {latestNews.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
