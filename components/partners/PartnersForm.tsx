"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { partners } from "@/config/partners";
import { submitPartnerApplicationFromClient } from "@/lib/actions/leads";
import styles from "./partners-form.module.css";

export function PartnersForm() {
  const { form } = partners;
  const reduceMotion = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || submitted) return;

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const payload = Object.fromEntries(
      Array.from(data.entries()).map(([key, value]) => [key, String(value)]),
    );

    setSubmitting(true);
    setError("");

    const result = await submitPartnerApplicationFromClient(payload);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
    formEl.reset();
  }

  return (
    <section className={styles.section} id="form" aria-label={form.heading}>
      <div className={styles.inner}>
        <motion.h2
          className={styles.heading}
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {form.heading}
        </motion.h2>
        <p className={styles.body}>{form.body}</p>

        {submitted ? (
          <p className={styles.successMessage}>
            Thanks for your application. Our partnerships team will be in touch.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {error ? (
              <p className={styles.formError} role="alert">
                {error}
              </p>
            ) : null}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-full-name">
                Full name
              </label>
              <input
                id="partners-full-name"
                name="fullName"
                type="text"
                required
                placeholder="Your full name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-work-email">
                Email address
              </label>
              <input
                id="partners-work-email"
                name="workEmail"
                type="email"
                required
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-company-name">
                Company name
              </label>
              <input
                id="partners-company-name"
                name="companyName"
                type="text"
                required
                placeholder="Your company name"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-company-website">
                Company website
              </label>
              <input
                id="partners-company-website"
                name="companyWebsite"
                type="url"
                required
                placeholder="https://yourcompany.com"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-integration">
                What are you looking to integrate?
              </label>
              <textarea
                id="partners-integration"
                name="integration"
                required
                placeholder="Tell us about your platform and how you'd like to use Praevor"
                className={styles.textarea}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="partners-user-count">
                Estimated number of users on your platform
              </label>
              <select id="partners-user-count" name="userCount" className={styles.select} required>
                <option value="">Select a range</option>
                {form.userOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "Submitting..." : form.submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
