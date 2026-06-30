"use client";

import { motion } from "framer-motion";
import styles from "./hero-collage.module.css";

const photos = [
  {
    src: "/hero/woman-phone.webp",
    alt: "Business owner laughing while taking a call next to her laptop",
    className: styles.itemA,
    rotate: -6,
    floatDelay: 0,
  },
  {
    src: "/hero/man-counter.png",
    alt: "Shop owner in an apron smiling at the counter",
    className: styles.itemB,
    rotate: 4,
    floatDelay: 0.4,
  },
  {
    src: "/hero/team-laptop.jpg",
    alt: "Small team reviewing a project together on a laptop",
    className: styles.itemC,
    rotate: -3,
    floatDelay: 0.8,
  },
  {
    src: "/hero/woman-tablet.png",
    alt: "Founder sitting on the floor reviewing packaging swatches on a tablet",
    className: styles.itemD,
    rotate: 5,
    floatDelay: 1.2,
  },
  {
    src: "/hero/woman-box.jpg",
    alt: "Business owner holding a packed shipping box, ready to send",
    className: styles.itemE,
    rotate: -4,
    floatDelay: 0.2,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: (rotate: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroCollage() {
  return (
    <motion.div
      className={styles.collage}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {photos.map((photo) => (
        <motion.div
          key={photo.src}
          className={`${styles.item} ${photo.className}`}
          custom={photo.rotate}
          variants={item}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 5 }}
        >
          <motion.div
            className={styles.floatWrap}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              delay: photo.floatDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
