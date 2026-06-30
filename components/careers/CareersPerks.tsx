import { careers } from "@/config/careers";
import styles from "./careers-perks.module.css";

function SparkleIcon() {
  return (
    <svg
      className={styles.sparkleIcon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2c.5 4.2 1.3 6.6 3 8.3 1.7 1.7 4.1 2.5 8.3 3-4.2.5-6.6 1.3-8.3 3-1.7 1.7-2.5 4.1-3 8.3-.5-4.2-1.3-6.6-3-8.3-1.7-1.7-4.1-2.5-8.3-3 4.2-.5 6.6-1.3 8.3-3 1.7-1.7 2.5-4.1 3-8.3z" />
    </svg>
  );
}

export function CareersPerks() {
  const { perks } = careers;

  return (
    <section className={styles.section} aria-label={perks.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{perks.heading}</h2>

        <div className={styles.featured}>
          <SparkleIcon />
          <h3 className={styles.featuredTitle}>{perks.featured.title}</h3>
          <p className={styles.featuredDescription}>{perks.featured.description}</p>
        </div>

        <ul className={styles.list}>
          {perks.items.map((item) => (
            <li className={styles.listItem} key={item.title}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
