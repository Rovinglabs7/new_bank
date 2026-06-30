import { careers } from "@/config/careers";
import styles from "./careers-content-cards.module.css";

export function CareersContentCards() {
  const { contentCards } = careers;

  return (
    <section className={styles.section} aria-label={contentCards.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{contentCards.heading}</h2>

        <div className={styles.grid}>
          {contentCards.items.map((item) => (
            <a className={styles.card} href={item.href} key={item.title}>
              {item.title}
            </a>
          ))}
        </div>

        <a className={styles.discoverMore} href={contentCards.discoverMore.href}>
          {contentCards.discoverMore.label}
        </a>
      </div>
    </section>
  );
}
