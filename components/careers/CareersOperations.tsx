import Image from "next/image";
import Link from "next/link";
import { careers } from "@/config/careers";
import styles from "./careers-operations.module.css";

export function CareersOperations() {
  const { operations } = careers;

  return (
    <section className={styles.section} aria-label="Operations">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{operations.heading}</h2>
        <Link href={operations.cta.href} className={styles.cta}>
          {operations.cta.label}
        </Link>
      </div>

      <div className={styles.grid}>
        {operations.images.map((image, index) => (
          <div className={styles.imageWrap} key={image.src + index}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
