import { press } from "@/config/press";
import styles from "./press-in-the-press.module.css";

export function PressInThePress() {
  const { inThePress } = press;

  return (
    <section className={styles.section} aria-label={inThePress.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{inThePress.heading}</h2>
        <p className={styles.body}>
          {inThePress.body}{" "}
          <a href={inThePress.linkHref} className={styles.link}>
            {inThePress.linkText}
          </a>{" "}
          {inThePress.afterLinkText}
        </p>
      </div>
    </section>
  );
}
