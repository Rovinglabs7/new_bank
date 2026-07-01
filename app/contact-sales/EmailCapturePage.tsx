"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import styles from "./contact-sales.module.css";

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

export function EmailCapturePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid work email address.");
      return;
    }
    setError("");
    sessionStorage.setItem("demo_email", trimmed);
    router.push(`/contact-sales/qualify?email=${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className={styles.page}>
      {/* Left: form panel */}
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          <Link href="/" className={styles.logo}>
            {site.brand}
          </Link>

          <div className={styles.formContent}>
            <h1 className={styles.heading}>
              Let&apos;s see how {site.brand} can help your business get paid.
            </h1>
            <p className={styles.subheading}>
              Book a personalised demo with one of our payment specialists. We&apos;ll learn about your business, answer your questions and show you how {site.brand} can automate collections, reduce failed payments and simplify payment operations.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {error ? (
                <p className={styles.fieldError} role="alert">{error}</p>
              ) : null}

              <label className={styles.field}>
                <span className={styles.label}>Work email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={styles.input}
                  autoComplete="email"
                  autoFocus
                  required
                />
              </label>

              <button type="submit" className={styles.submit}>
                Continue
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <p className={styles.legalNote}>
              By continuing, we&apos;ll save your email and use it to personalise your demo request.
            </p>

            <div className={styles.backLink}>
              <Link href="/">Back to {site.brand}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right: visual panel */}
      <div className={styles.visualPanel}>
        <div className={styles.visualInner}>
          <div className={styles.photoGrid}>
            {teamPhotos.map((photo, i) => (
              <div key={i} className={styles.photoCell}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 25vw, 160px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div className={styles.visualText}>
            <h2 className={styles.visualHeading}>You&apos;re in good hands.</h2>
            <p className={styles.visualBody}>
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
                body="We&apos;ll recommend the best setup based on how your business gets paid."
              />
              <ExpectItem
                icon={<ShieldIcon />}
                title="No pressure"
                body="No hard selling. Just practical advice to help you decide."
              />
            </ul>
          </div>

          <div className={styles.trustStatement}>
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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7.5 6.5l4 2.5-4 2.5V6.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.5 15c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2l1.8 4.9L16 7.6l-3.7 3.3 1.1 5L9 13.4 5.6 15.9l1.1-5L3 7.6l5.2-.7L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2L3 4.5v5c0 3.3 2.4 6.3 6 7 3.6-.7 6-3.7 6-7v-5L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M6.5 9l1.75 1.75L11.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
