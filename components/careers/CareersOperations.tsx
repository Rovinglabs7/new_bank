"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
          <motion.div
            className={styles.imageWrap}
            key={image.src + index}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            {image.type === "video" ? (
              <video
                className={styles.image}
                src={image.src}
                autoPlay
                muted
                loop
                playsInline
                aria-label={image.alt}
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className={styles.image}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
