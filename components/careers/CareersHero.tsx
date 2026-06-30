"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-hero.module.css";

export function CareersHero() {
  const { hero } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-label="Careers introduction">
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={styles.heading}>{hero.heading}</h1>
        <p className={styles.subtext}>{hero.subtext}</p>
      </motion.div>

      <div className={styles.grid}>
        {hero.images.map((image, index) => (
          <motion.div
            className={styles.imageWrap}
            key={image.src + index}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 50vw, 33vw"
              className={styles.image}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
