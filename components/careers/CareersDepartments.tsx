import Link from "next/link";
import { careers } from "@/config/careers";
import styles from "./careers-departments.module.css";

export function CareersDepartments() {
  const { departments } = careers;

  return (
    <section className={styles.section} aria-label={departments.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{departments.heading}</h2>
        <p className={styles.body}>{departments.body}</p>

        <div className={styles.grid}>
          {departments.items.map((item) => (
            <div className={styles.card} key={item.name}>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              <Link href={departments.cta.href} className={styles.cardLink}>
                {departments.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
