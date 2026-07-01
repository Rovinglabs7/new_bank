import styles from "./brand-story.module.css";

export function BrandStory() {
  return (
    <section className={styles.section} aria-label="Brand story">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Business should feel this good.</h2>
        <div className={styles.imageWrap}>
          <img
            src="/denago-ebikes-bqXfzZOYyuU-unsplash.jpg"
            alt="Two cyclists high-fiving on a sunny park path — the freedom that comes when your business runs itself"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
