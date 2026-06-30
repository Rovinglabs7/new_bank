"use client";

import { useActionState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import {
  signInWithCredentials,
  type AuthActionState,
} from "@/lib/actions/auth";
import styles from "./signin.module.css";

const initialState: AuthActionState = {};

type SignInFormProps = {
  callbackUrl?: string;
};

export function SignInForm({ callbackUrl }: SignInFormProps) {
  const [state, formAction, pending] = useActionState(
    signInWithCredentials,
    initialState,
  );

  return (
    <>
      <form className={styles.form} action={formAction}>
        {callbackUrl ? (
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
        ) : null}
        {state.error ? (
          <p className={styles.error} role="alert">
            {state.error}
          </p>
        ) : null}

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
        </label>

        <label className={styles.field}>
          <div className={styles.passwordRow}>
            <span className={styles.label}>Password</span>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            className={styles.input}
            required
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className={styles.signupLine}>
        Looking to get started with {site.brand} for your business?{" "}
        <Link href="/signup" className={styles.signupLink}>
          Sign up
        </Link>
      </p>
    </>
  );
}
