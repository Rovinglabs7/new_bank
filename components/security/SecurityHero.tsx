import { security } from "@/config/security";
import styles from "./securityHero.module.css";

function ShieldMotif() {
  return (
    <svg
      className={styles.shieldMotif}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <path
        d="M100 12 168 38v52c0 56-38 86-68 98-30-12-68-42-68-98V38z"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />
      <path
        d="M100 36 148 55v36c0 40-27 61-48 70-21-9-48-30-48-70V55z"
        stroke="#d97706"
        strokeWidth="2"
        fill="rgba(217,119,6,0.08)"
      />
      <circle cx="100" cy="92" r="14" stroke="#d97706" strokeWidth="2" fill="none" />
      <path d="M100 102v22" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="92" r="3" fill="#d97706" />
    </svg>
  );
}

export function SecurityHero() {
  const { hero } = security;

  return (
    <section className={styles.hero} aria-label="Security overview">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.heading}>{hero.heading}</h1>
          <p className={styles.subheading}>{hero.subheading}</p>
        </div>
        <div className={styles.visual}>
          <ShieldMotif />
        </div>
      </div>
    </section>
  );
}
