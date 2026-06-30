import { careers } from "@/config/careers";
import styles from "./careers-values.module.css";

export function CareersValues() {
  const { coreValues } = careers;

  return (
    <section className={styles.section} aria-label={coreValues.heading}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{coreValues.eyebrow}</p>
        <h2 className={styles.heading}>{coreValues.heading}</h2>

        <div className={styles.grid}>
          {coreValues.items.map((item) => (
            <div className={styles.item} key={item.number}>
              <span className={styles.number}>{item.number}</span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
