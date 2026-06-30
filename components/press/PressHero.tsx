import { press } from "@/config/press";
import styles from "./press-hero.module.css";

export function PressHero() {
  const { hero } = press;

  return (
    <section className={styles.hero} aria-label="Press overview">
      <div className={styles.inner}>
        <h1 className={styles.heading}>{hero.heading}</h1>
        <p className={styles.subtext}>{hero.subtext}</p>
      </div>
    </section>
  );
}
