"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPTestimonials.module.css";

export function SPTestimonials() {
  const { testimonials } = subscriptionPayments;
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  return (
    <section className={styles.section} aria-label="Testimonials">
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.heading}>{testimonials.heading}</h2>
          <p className={styles.subtext}>{testimonials.body}</p>

          <div className={styles.carousel} aria-label="Testimonial carousel">
            <button
              className={styles.arrowBtn}
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              aria-label="Previous testimonial"
              disabled={current === 0}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.cardContainer}>
              {/* TODO: replace with real customer story cards once merchants go live : do not fabricate names, quotes, or outcomes */}
              <div className={styles.emptyCard}>
                <p className={styles.emptyBody}>{testimonials.body}</p>
              </div>
            </div>

            <button
              className={styles.arrowBtn}
              onClick={() => setCurrent((c) => c + 1)}
              aria-label="Next testimonial"
              disabled={current === 0}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
