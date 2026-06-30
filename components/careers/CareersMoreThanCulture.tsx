import { careers } from "@/config/careers";
import styles from "./careers-more-than-culture.module.css";

export function CareersMoreThanCulture() {
  const { moreThanCulture } = careers;

  return (
    <section className={styles.section} aria-label={moreThanCulture.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{moreThanCulture.heading}</h2>
        <p className={styles.body}>{moreThanCulture.body}</p>
      </div>
    </section>
  );
}
