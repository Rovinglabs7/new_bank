"use client";

import { partners } from "@/config/partners";
import styles from "./partners-form.module.css";

export function PartnersForm() {
  const { form } = partners;

  return (
    <section className={styles.section} id="form" aria-label={form.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{form.heading}</h2>
        <p className={styles.body}>{form.body}</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire up partner application submission endpoint
          }}
        >
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
              Work email
            </label>
            <input
              id="partners-work-email"
              name="workEmail"
              type="email"
              required
              placeholder="you@company.com"
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
              placeholder="Tell us about your platform and how you'd like to use Sprout"
              className={styles.textarea}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="partners-user-count">
              Estimated number of users on your platform
            </label>
            <select id="partners-user-count" name="userCount" className={styles.select}>
              <option value="">Select a range</option>
              {form.userOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submit}>
            {form.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
