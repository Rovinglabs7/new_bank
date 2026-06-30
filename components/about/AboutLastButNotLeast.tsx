import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutLastButNotLeast.module.css";

export function AboutLastButNotLeast() {
  const { lastButNotLeast } = about;

  return (
    <section className={styles.section} aria-label="Last but not least">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{lastButNotLeast.heading}</h2>

        <div className={styles.grid}>
          {lastButNotLeast.cards.map((card) => (
            <div className={styles.card} key={card.title}>
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
