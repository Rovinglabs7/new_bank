import Link from "next/link";
import { partners } from "@/config/partners";
import styles from "./partners-getting-started.module.css";

export function PartnersGettingStarted() {
  const { gettingStarted } = partners;

  return (
    <section className={styles.section} aria-label={gettingStarted.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{gettingStarted.heading}</h2>

        <div className={styles.grid}>
          {gettingStarted.items.map((item) => (
            <div className={styles.card} key={item.title}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
              {item.cta ? (
                <Link href={item.cta.href} className={styles.cardLink}>
                  {item.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
