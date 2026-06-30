import Link from "next/link";
import { pricing } from "@/config/pricing";
import styles from "./pricing-hero.module.css";

export function PricingHero() {
  const { hero } = pricing;

  return (
    <section className={styles.hero} aria-label="Pricing overview">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.heading}>{hero.heading}</h1>
        <p className={styles.subheading}>{hero.subheading}</p>

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
