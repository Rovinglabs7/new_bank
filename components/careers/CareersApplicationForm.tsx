"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { careers } from "@/config/careers";
import styles from "./careers-application-form.module.css";

function CloseIcon() {
  return (
    <svg
      className={styles.closeIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function CareersApplicationForm() {
  const { applicationForm, departments } = careers;
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  const isOpen = selectedDepartment !== null;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedDepartment(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <section className={styles.section} id="open-roles" aria-label={applicationForm.heading}>
      <motion.div
        className={styles.inner}
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>{applicationForm.heading}</h2>
        <p className={styles.subtext}>{applicationForm.subtext}</p>
        {applicationForm.cardIntro ? (
          <p className={styles.cardIntro}>{applicationForm.cardIntro}</p>
        ) : null}

        <div className={styles.grid}>
          {departments.items.map((item) => (
            <button
              type="button"
              key={item.name}
              className={styles.card}
              aria-haspopup="dialog"
              onClick={() => setSelectedDepartment(item.name)}
            >
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              <span className={styles.cardLink}>Apply now</span>
            </button>
          ))}
        </div>
      </motion.div>

      {isOpen ? (
        <div
          className={styles.overlay}
          onClick={() => setSelectedDepartment(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              aria-label="Close"
              onClick={() => setSelectedDepartment(null)}
            >
              <CloseIcon />
            </button>

            <h2 id={titleId} className={styles.heading}>
              {applicationForm.heading}
            </h2>
            <p className={styles.subtext}>{applicationForm.subtext}</p>

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire up application form submission endpoint
              }}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-full-name">
                  Full name
                </label>
                <input
                  id="careers-full-name"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Your full name"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-email">
                  Email address
                </label>
                <input
                  id="careers-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-role">
                  What role or area are you interested in?
                </label>
                <input
                  id="careers-role"
                  name="role"
                  type="text"
                  required
                  placeholder="e.g. Engineering, Design, Operations, Growth"
                  className={styles.input}
                  value={selectedDepartment ?? ""}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-linkedin">
                  LinkedIn profile
                </label>
                <input
                  id="careers-linkedin"
                  name="linkedin"
                  type="url"
                  required
                  placeholder="linkedin.com/in/yourprofile"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-github">
                  GitHub profile
                </label>
                <input
                  id="careers-github"
                  name="github"
                  type="url"
                  placeholder="github.com/yourhandle"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-video">
                  3-minute video introduction
                </label>
                <input
                  id="careers-video"
                  name="video"
                  type="url"
                  required
                  placeholder="https://loom.com/share/..."
                  className={styles.input}
                  aria-describedby="careers-video-help"
                />
                <span id="careers-video-help" className={styles.helper}>
                  Record a short video: who you are, what you do best, and what you would bring to Sprout.
                </span>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-about-you">
                  Tell us about yourself
                </label>
                <textarea
                  id="careers-about-you"
                  name="aboutYou"
                  required
                  placeholder="2-3 sentences on your background and what you've built or done."
                  className={styles.textarea}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-offer">
                  What can you offer Sprout?
                </label>
                <textarea
                  id="careers-offer"
                  name="offer"
                  required
                  placeholder="What specific skills, experience, or perspective would you bring? What problem do you solve?"
                  className={styles.textarea}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="careers-why">
                  Why Sprout, and why now?
                </label>
                <textarea
                  id="careers-why"
                  name="whySprout"
                  required
                  placeholder="What drew you to Sprout specifically? Why is now the right moment for you?"
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submit}>
                {applicationForm.submitLabel}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
