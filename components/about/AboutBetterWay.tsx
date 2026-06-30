import { about } from "@/config/about";
import styles from "./aboutBetterWay.module.css";

export function AboutBetterWay() {
  const { betterWay } = about;

  return (
    <section className={styles.section} aria-label="It's time for a better way">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{betterWay.heading}</h2>
        <div className={styles.body}>
          {betterWay.paragraphs.map((paragraph) => (
            <p className={styles.paragraph} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
