import { press } from "@/config/press";
import styles from "./press-about.module.css";

export function PressAbout() {
  const { about } = press;

  return (
    <section className={styles.section} aria-label="About Sprout">
      <div className={styles.inner}>
        <p className={styles.body}>{about.body}</p>
        <p className={styles.contactLine}>
          {about.contactLine}{" "}
          <a href={`mailto:${about.contactEmail}`} className={styles.contactLink}>
            {about.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
