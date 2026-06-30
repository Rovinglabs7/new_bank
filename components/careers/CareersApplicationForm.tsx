"use client";

import { careers } from "@/config/careers";
import styles from "./careers-application-form.module.css";

export function CareersApplicationForm() {
  const { applicationForm } = careers;

  return (
    <section className={styles.section} id="open-roles" aria-label={applicationForm.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{applicationForm.heading}</h2>
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
    </section>
  );
}
