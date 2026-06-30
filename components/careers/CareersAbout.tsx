import { careers } from "@/config/careers";
import styles from "./careers-about.module.css";

export function CareersAbout() {
  const { about } = careers;

  return (
    <section className={styles.section} aria-label={about.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{about.heading}</h2>
        <div className={styles.body}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
