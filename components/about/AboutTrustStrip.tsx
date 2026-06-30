import { about } from "@/config/about";
import styles from "./aboutTrustStrip.module.css";

export function AboutTrustStrip() {
  const { trustStrip } = about;

  return (
    <section className={styles.section} aria-label="Who Sprout is built for">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{trustStrip.heading}</h2>
        <p className={styles.subtext}>{trustStrip.subtext}</p>

        {/* TODO: add real customer logos here once available, do not fabricate */}
        <div className={styles.logoRow} aria-hidden>
          <div className={styles.logoPlaceholder} />
          <div className={styles.logoPlaceholder} />
          <div className={styles.logoPlaceholder} />
          <div className={styles.logoPlaceholder} />
        </div>
      </div>
    </section>
  );
}
