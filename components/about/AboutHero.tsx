import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutHero.module.css";

export function AboutHero() {
  const { hero } = about;

  return (
    <section className={styles.hero} aria-label="About Praevor">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.heading}>{hero.heading}</h1>
        <p className={styles.subtext}>{hero.subtext}</p>

        <div className={styles.ctas}>
          <Link href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} className={styles.secondaryCta}>
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
