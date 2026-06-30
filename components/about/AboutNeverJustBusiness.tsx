import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutNeverJustBusiness.module.css";

function CardIcon() {
  return (
    <svg
      className={styles.cardIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" strokeLinecap="round" />
    </svg>
  );
}

export function AboutNeverJustBusiness() {
  const { neverJustBusiness } = about;

  return (
    <section className={styles.section} aria-label="It's never just business">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{neverJustBusiness.heading}</h2>

        <div className={styles.grid}>
          {neverJustBusiness.cards.map((card) => (
            <div className={styles.card} key={card.title}>
              <CardIcon />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
              {card.cta ? (
                <Link href={card.cta.href} className={styles.cardLink}>
                  {card.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
