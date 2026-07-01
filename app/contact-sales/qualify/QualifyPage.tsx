"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { submitDemoRequestFromClient } from "@/lib/actions/leads";
import styles from "./qualify.module.css";

const teamPhotos = [
  { src: "/pexels-rdne-7414009.jpg", alt: "Payment specialist" },
  { src: "/pexels-tima-miroshnichenko-6913243.jpg", alt: "Payment specialist" },
  { src: "/pexels-mart-production-7550308.jpg", alt: "Payment specialist" },
  { src: "/pexels-mikhail-nilov-7886850.jpg", alt: "Payment specialist" },
  { src: "/pexels-rdne-6518865.jpg", alt: "Payment specialist" },
  { src: "/pexels-tima-miroshnichenko-6913305.jpg", alt: "Payment specialist" },
  { src: "/pexels-mart-production-7550583.jpg", alt: "Payment specialist" },
  { src: "/pexels-diva-plavalaguna-6150366.jpg", alt: "Payment specialist" },
];

const interests = [
  "Recurring Payments",
  "One-off Bank Payments",
  "Open Banking Payments",
  "Payment Operations & AI",
  "Multi-entity & Enterprise",
  "API & Integrations",
  "Migration from another provider",
];

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  size: string;
  volume: string;
  interests: string[];
};

export function QualifyPage() {
  const params = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    size: "",
    volume: "",
    interests: [],
  });

  useEffect(() => {
    const fromParam = params.get("email") ?? "";
    const fromSession =
      typeof sessionStorage !== "undefined"
        ? (sessionStorage.getItem("demo_email") ?? "")
        : "";
    setForm((f) => ({ ...f, email: fromParam || fromSession }));
  }, [params]);

  function set(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleInterest(item: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item)
        ? f.interests.filter((i) => i !== item)
        : [...f.interests, item],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await submitDemoRequestFromClient(form);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      {/* LEFT: form or confirmation */}
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          <Link href="/" className={styles.logo}>
            {site.brand}
          </Link>

          {submitted ? (
            <ConfirmationPanel email={form.email} />
          ) : (
            <div className={styles.formContent}>
              <div className={styles.stepBadge}>Step 2 of 2</div>

              <h1 className={styles.heading}>
                Let&apos;s get you connected with a {site.brand} specialist.
              </h1>
              <p className={styles.subheading}>
                Every demo is tailored to your business. Tell us a little about yourself and we&apos;ll connect you with the right member of our team.
              </p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {error ? (
                  <p className={styles.fieldError} role="alert">
                    {error}
                  </p>
                ) : null}

                {/* Email prefilled */}
                <label className={styles.field}>
                  <span className={styles.label}>Email address</span>
                  <input
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                {/* Name row */}
                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>First name</span>
                    <input
                      type="text"
                      className={styles.input}
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Last name</span>
                    <input
                      type="text"
                      className={styles.input}
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      autoComplete="family-name"
                      required
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span className={styles.label}>Company name</span>
                  <input
                    type="text"
                    className={styles.input}
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    autoComplete="organization"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Company website{" "}
                    <span className={styles.optional}>(optional)</span>
                  </span>
                  <input
                    type="url"
                    className={styles.input}
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="https://yourcompany.com"
                    autoComplete="url"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Business size</span>
                  <select
                    className={styles.select}
                    value={form.size}
                    onChange={(e) => set("size", e.target.value)}
                    required
                  >
                    <option value="" disabled>Select...</option>
                    <option value="solo">Just getting started</option>
                    <option value="1-10">1 to 10 employees</option>
                    <option value="11-50">11 to 50 employees</option>
                    <option value="51-250">51 to 250 employees</option>
                    <option value="250+">250 or more</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Monthly payment volume</span>
                  <select
                    className={styles.select}
                    value={form.volume}
                    onChange={(e) => set("volume", e.target.value)}
                    required
                  >
                    <option value="" disabled>Select...</option>
                    <option value="under-10k">Under £10k</option>
                    <option value="10k-50k">£10k to £50k</option>
                    <option value="50k-100k">£50k to £100k</option>
                    <option value="100k-500k">£100k to £500k</option>
                    <option value="500k+">£500k or more</option>
                  </select>
                </label>

                {/* Interests */}
                <fieldset className={styles.checkboxGroup}>
                  <legend className={styles.label}>
                    What are you interested in?
                  </legend>
                  <p className={styles.checkboxHelper}>
                    No worries if you&apos;re still exploring. This simply helps us tailor your demo.
                  </p>
                  <div className={styles.checkboxGrid}>
                    {interests.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={form.interests.includes(item)}
                          onChange={() => toggleInterest(item)}
                        />
                        <span className={styles.checkboxText}>{item}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button type="submit" className={styles.submit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Book my demo"}
                  {!submitting ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </form>

              <p className={styles.backNote}>
                <Link href="/contact-sales">Back to email capture</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: sticky panel */}
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelInner}>
          <div className={styles.photoGrid}>
            {teamPhotos.map((photo, i) => (
              <div key={i} className={styles.photoCell}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 12vw, 120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div className={styles.sideText}>
            <h2 className={styles.sideHeading}>You&apos;re in good hands.</h2>
            <p className={styles.sideBody}>
              Every demo is led by a payment specialist who understands how businesses collect, manage and automate payments.
            </p>
          </div>

          <div className={styles.expectList}>
            <p className={styles.expectHeading}>What to expect</p>
            <ul className={styles.expectItems}>
              <ExpectItem
                icon={<PlayIcon />}
                title="Personalised product walkthrough"
                body="See how Praevor fits your business and existing workflows."
              />
              <ExpectItem
                icon={<PersonIcon />}
                title="Answers from a payment specialist"
                body="Talk through payments, compliance, integrations and migration."
              />
              <ExpectItem
                icon={<StarIcon />}
                title="Tailored recommendations"
                body="We&apos;ll recommend the best setup for your business."
              />
              <ExpectItem
                icon={<ShieldIcon />}
                title="No pressure"
                body="No hard selling. Just practical advice."
              />
            </ul>
          </div>

          <div className={styles.trustCard}>
            <p className={styles.trustHeading}>Trusted payment infrastructure.</p>
            <p className={styles.trustBody}>
              Built for businesses that want faster collections, fewer failed payments and less manual work.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Confirmation + Calendly ── */

function ConfirmationPanel({ email }: { email: string }) {
  return (
    <div className={styles.confirmPanel}>
      <div className={styles.confirmMeta}>
        <span className={styles.confirmBadge}>
          <CheckIcon /> Request received
        </span>
        <h1 className={styles.confirmHeading}>
          Now choose a time that works for you.
        </h1>
        <p className={styles.confirmBody}>
          We&apos;ve received your details{email ? ` and sent a confirmation to ${email}` : ""}. Pick a slot below and your Praevor specialist will be there, prepared and ready to go.
        </p>
      </div>

      {/* Calendly embed placeholder — replace src with live Calendly URL */}
      <div className={styles.calendlyWrap}>
        <iframe
          src="https://calendly.com/d/demo"
          className={styles.calendlyFrame}
          title="Book a time with Praevor"
          frameBorder="0"
        />
        <div className={styles.calendlyOverlay} aria-hidden>
          <div className={styles.calendlyPlaceholder}>
            <CalendarIcon />
            <p className={styles.calendlyPlaceholderText}>
              Your scheduling widget will appear here.
            </p>
            <p className={styles.calendlyPlaceholderSub}>
              Connect your Calendly, Cal.com or HubSpot meetings link to activate live scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpectItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className={styles.expectItem}>
      <span className={styles.expectIcon}>{icon}</span>
      <span className={styles.expectContent}>
        <span className={styles.expectTitle}>{title}</span>
        <span className={styles.expectBody}>{body}</span>
      </span>
    </li>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7.5 6.5l4 2.5-4 2.5V6.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.5 15c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2l1.8 4.9L16 7.6l-3.7 3.3 1.1 5L9 13.4 5.6 15.9l1.1-5L3 7.6l5.2-.7L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2L3 4.5v5c0 3.3 2.4 6.3 6 7 3.6-.7 6-3.7 6-7v-5L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M6.5 9l1.75 1.75L11.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 7l1.75 1.75L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="7" width="24" height="21" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 13h24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 4v6M21 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="9" y="17" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="14" y="17" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="19" y="17" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
