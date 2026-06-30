import styles from "./product-showcase.module.css";

export function ProductShowcase() {
  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Product experience</p>
        <div className={styles.placeholder} aria-hidden>
          <div className={styles.skeletonRow}>
            <span className={styles.skeletonBlock} />
            <span className={styles.skeletonBlockSmall} />
          </div>
          <div className={styles.skeletonRow}>
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLineShort} />
          </div>
          <div className={styles.skeletonRow}>
            <span className={styles.skeletonCard} />
            <span className={styles.skeletonCard} />
            <span className={styles.skeletonCard} />
          </div>
        </div>
      </div>
    </section>
  );
}
