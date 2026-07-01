"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./forgot-password.module.css";

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function EnvelopeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="12" fill="rgba(40,30,21,0.06)" />
      <path
        d="M12 16a2 2 0 012-2h20a2 2 0 012 2v16a2 2 0 01-2 2H14a2 2 0 01-2-2V16z"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 18l12 8 12-8"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="12" fill="rgba(22,163,74,0.08)" />
      <path
        d="M15 24l7 7 11-14"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const emailValid = isValidEmail(email);
  const showError = touched && email.length > 0 && !emailValid;

  useEffect(() => {
    if (!submitted) return;
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submitted, countdown]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setCountdown(60);
    setCanResend(false);
  }, [emailValid, loading]);

  const handleResend = useCallback(async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    await new Promise((r) => setTimeout(r, 800));
  }, [canResend]);

  const handleOpenEmail = useCallback(() => {
    window.location.href = "mailto:";
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>praevor.</Link>

        <div className={`${styles.card} ${submitted ? styles.cardSuccess : ""}`}>
          {!submitted ? (
            <>
              <div className={styles.iconWrap}><EnvelopeIcon /></div>

              <p className={styles.eyebrow}>ACCOUNT RECOVERY</p>
              <h1 className={styles.heading}>Forgot your password?</h1>
              <p className={styles.subtext}>
                No worries. Enter the email address you use for Praevor and we&apos;ll send you a secure link to create a new one.
              </p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    className={`${styles.input} ${showError ? styles.inputError : ""}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    autoComplete="email"
                    autoFocus
                  />
                  {showError && (
                    <p className={styles.fieldError}>Enter a valid email address.</p>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!emailValid || loading}
                >
                  {loading ? (
                    <span className={styles.spinner} aria-label="Sending" />
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>

              <div className={styles.links}>
                <p className={styles.backLine}>
                  Remembered your password?{" "}
                  <Link href="/signin" className={styles.link}>Sign in</Link>
                </p>
                <p className={styles.supportLine}>
                  Still having trouble?{" "}
                  <Link href="/contact/support" className={styles.linkMuted}>Contact support</Link>
                </p>
              </div>

              <div className={styles.security}>
                For your security, reset links expire after 30 minutes and can only be used once.
              </div>
            </>
          ) : (
            <div className={styles.success}>
              <div className={styles.iconWrap}><CheckIcon /></div>

              <h1 className={styles.heading}>Check your inbox.</h1>
              <p className={styles.subtext}>
                We&apos;ve sent a secure password reset link to:
              </p>
              <p className={styles.emailDisplay}>{email}</p>
              <p className={styles.subtextSmall}>
                If you don&apos;t see it within a few minutes, check your spam folder or request another email below.
              </p>

              <div className={styles.successActions}>
                <button className={styles.submit} onClick={handleOpenEmail}>
                  Open my email
                </button>

                <button
                  className={styles.resend}
                  onClick={handleResend}
                  disabled={!canResend}
                >
                  {canResend ? (
                    "Resend email"
                  ) : (
                    <>Resend available in <strong>{countdown}s</strong></>
                  )}
                </button>
              </div>

              <div className={styles.links}>
                <p className={styles.backLine}>
                  <Link href="/signin" className={styles.link}>Back to sign in</Link>
                </p>
              </div>

              <div className={styles.reassurance}>
                Passwords are easy to forget. That&apos;s why we&apos;ve made getting back into your account just as easy.
              </div>

              <div className={styles.security}>
                For your security, reset links expire after 30 minutes and can only be used once.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
