import { press } from "@/config/press";
import styles from "./press-brand-assets.module.css";

export function PressBrandAssets() {
  const { brandAssets } = press;

  return (
    <section className={styles.section} aria-label={brandAssets.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{brandAssets.heading}</h2>
        <p className={styles.body}>{brandAssets.body}</p>
        <a href={brandAssets.cta.href} className={styles.cta}>
          {brandAssets.cta.label}
        </a>
        <p className={styles.note}>{brandAssets.note}</p>
      </div>
    </section>
  );
}
