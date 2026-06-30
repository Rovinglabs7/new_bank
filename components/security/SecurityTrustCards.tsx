import { security } from "@/config/security";
import styles from "./securityTrustCards.module.css";

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
      <path d="M12 3 4 6v6c0 5 3.4 8.6 8 9.9 4.6-1.3 8-4.9 8-9.9V6z" strokeLinejoin="round" />
      <path d="M9 12.5 11 14.5 15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SecurityTrustCards() {
  const { trustCards } = security;

  return (
    <section className={styles.section} aria-label="Trust and regulation">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {trustCards.items.map((card) => (
            <div className={styles.card} key={card.heading}>
              <CardIcon />
              <h2 className={styles.heading}>{card.heading}</h2>
              <p className={styles.body}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
