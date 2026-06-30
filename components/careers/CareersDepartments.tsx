"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-departments.module.css";

export function CareersDepartments() {
  const { departments } = careers;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={departments.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{departments.heading}</h2>
        <p className={styles.body}>{departments.body}</p>
      </div>

      <div className={styles.gallery}>
        {departments.images.map((image, index) => (
          <motion.div
            className={styles.galleryItem}
            key={image.src}
            initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              className={styles.galleryImage}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
