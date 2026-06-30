"use client";

import { useActionState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { registerUser, type AuthActionState } from "@/lib/actions/auth";
import { CountrySelect } from "./CountrySelect";
import styles from "./signup.module.css";

const initialState: AuthActionState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <>
      <form className={styles.form} action={formAction}>
        {state.error ? (
          <p className={styles.error} role="alert">
            {state.error}
          </p>
        ) : null}

        <label className={styles.field}>
          <span className={styles.label}>What&apos;s your business called?</span>
          <input
            type="text"
            name="businessName"
            placeholder="Bean There Coffee ☕"
            className={styles.input}
            required
            autoComplete="organization"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            className={styles.input}
            required
            autoComplete="email"
          />
          <span className={styles.helper}>
            Use the email you use for your business. Gmail and Outlook addresses
            are welcome.
          </span>
        </label>

        <div className={styles.field}>
          <span className={styles.label}>Where is your business based?</span>
          <CountrySelect />
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Create a password</span>
          <input
            type="password"
            name="password"
            className={styles.input}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className={styles.signinLine}>
        Already have a {site.brand} account?{" "}
        <Link href="/signin" className={styles.signinLink}>
          Sign in
        </Link>
      </p>
    </>
  );
}
