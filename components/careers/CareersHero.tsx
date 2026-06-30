import Image from "next/image";
import { careers } from "@/config/careers";
import styles from "./careers-hero.module.css";

export function CareersHero() {
  const { hero } = careers;

  return (
    <section className={styles.hero} aria-label="Careers introduction">
      <div className={styles.inner}>
        <h1 className={styles.heading}>{hero.heading}</h1>
        <p className={styles.subtext}>{hero.subtext}</p>
      </div>

      <div className={styles.grid}>
        {hero.images.map((image, index) => (
          <div className={styles.imageWrap} key={image.src + index}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
