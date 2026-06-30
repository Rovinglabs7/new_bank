import Link from "next/link";
import { partners } from "@/config/partners";
import styles from "./partners-hero.module.css";

function PartnersHeroVisual() {
  return (
    <svg
      className={styles.visual}
      viewBox="0 0 360 280"
      fill="none"
      aria-hidden
    >
      <circle cx="120" cy="140" r="70" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <circle cx="240" cy="140" r="70" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="120" cy="140" r="6" fill="rgba(255,255,255,0.7)" />
      <circle cx="240" cy="140" r="6" fill="#d97706" />
      <line x1="120" y1="140" x2="240" y2="140" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="180" cy="80" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="180" cy="200" r="4" fill="rgba(255,255,255,0.5)" />
      <line x1="120" y1="140" x2="180" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="240" y1="140" x2="180" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="120" y1="140" x2="180" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="240" y1="140" x2="180" y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    </svg>
  );
}

export function PartnersHero() {
  const { hero } = partners;

  return (
    <section className={styles.hero} aria-label="Partners overview">
      <div className={styles.inner}>
        <div className={styles.content}>
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

        <PartnersHeroVisual />
      </div>
    </section>
  );
}
