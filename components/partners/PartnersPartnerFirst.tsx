"use client";

import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import { PartnersLazyVideo } from "./PartnersLazyVideo";
import styles from "./partners-partner-first.module.css";

export function PartnersPartnerFirst() {
  const { partnerFirst } = partners;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label={partnerFirst.heading}>
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{partnerFirst.heading}</h2>
          <p className={styles.body}>{partnerFirst.body}</p>

          <div className={styles.placeholder}>
            <p className={styles.placeholderText}>{partnerFirst.note}</p>
          </div>
        </motion.div>

        <motion.div
          className={styles.videoPanel}
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PartnersLazyVideo
            src={partnerFirst.videoSrc}
            wrapperClassName={styles.videoWrap}
            videoClassName={styles.video}
            ariaLabel={partnerFirst.videoCaption}
          />
          <div className={styles.videoOverlay} aria-hidden />
          <p className={styles.videoCaption}>{partnerFirst.videoCaption}</p>
        </motion.div>
      </div>
    </section>
  );
}
