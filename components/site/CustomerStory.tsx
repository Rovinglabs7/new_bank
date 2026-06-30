import styles from "./customer-story.module.css";

export function CustomerStory() {
  return (
    <section className={styles.section} aria-label="Customer story">
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <img
            src="/customer-story/sarah-thompson.jpg"
            alt="Emma and Ben, owners of Bean There Coffee, standing together, smiling"
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={styles.textCol}>
          <p className={styles.eyebrow}>Customer Story</p>
          <blockquote className={styles.quote}>
            <p>
              &ldquo;Sprout has transformed the way we collect payments. What
              used to take hours each week now happens automatically, giving
              our team more time to focus on delivering exceptional
              care.&rdquo;
            </p>
          </blockquote>
          <p className={styles.name}>Emma & Ben</p>
          <p className={styles.role}>Owners of Bean There Coffee</p>
          <a href="#" className={styles.cta}>
            Read the full customer story
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
