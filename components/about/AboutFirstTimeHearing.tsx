import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutFirstTimeHearing.module.css";

export function AboutFirstTimeHearing() {
  const { firstTimeHearing } = about;

  return (
    <section
      className={styles.section}
      aria-label="You may be hearing about us for the first time"
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>{firstTimeHearing.heading}</h2>
        <p className={styles.body}>{firstTimeHearing.body}</p>
        <Link href={firstTimeHearing.cta.href} className={styles.link}>
          {firstTimeHearing.cta.label}
        </Link>
      </div>
    </section>
  );
}
