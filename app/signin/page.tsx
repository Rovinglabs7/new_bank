import Link from "next/link";
import { site } from "@/config/site";
import styles from "./signin.module.css";

export const metadata = {
  title: `Sign in — ${site.brand}`,
};

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {site.brand}
        </Link>

        <div className={styles.formBlock}>
          <h1 className={styles.heading}>Sign in</h1>
          <p className={styles.subheading}>Or choose another way to sign in.</p>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="name@email.com"
                className={styles.input}
                required
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
              />
            </label>

            <button type="submit" className={styles.submit}>
              Sign in
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR SIGN IN WITH</span>
          </div>

          <div className={styles.oauthRow}>
            <button type="button" className={styles.oauthButton}>
              <svg className={styles.oauthIcon} viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.98h3.93c2.3-2.12 3.62-5.24 3.62-8.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.93-2.98c-1.08.72-2.47 1.16-4 1.16-3.08 0-5.69-2.08-6.62-4.87H1.32v3.07C3.29 21.3 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.38 14.39A7.18 7.18 0 0 1 5 12c0-.83.14-1.64.38-2.39V6.54H1.32A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.32 5.46z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.34 0 3.29 2.7 1.32 6.54l4.06 3.07C6.31 6.83 8.92 4.77 12 4.77z"
                />
              </svg>
              Google
            </button>
            <button type="button" className={styles.oauthButton}>
              <svg className={styles.oauthIcon} viewBox="0 0 24 24" aria-hidden>
                <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
              </svg>
              Microsoft
            </button>
          </div>

          <p className={styles.signupLine}>
            Looking to get started with {site.brand} for your business?{" "}
            <Link href="/signup" className={styles.signupLink}>
              Sign up
            </Link>
          </p>

          <p className={styles.legal}>
            By continuing, you&apos;re agreeing to our{" "}
            <Link href="/legal/terms">Main Services Agreement</Link>,{" "}
            <Link href="/legal/terms">Terms of Service</Link> and{" "}
            <Link href="/legal/terms">Supplemental Terms</Link>. Additional
            disclosures are available in our{" "}
            <Link href="/legal/privacy">Privacy Policy</Link> and{" "}
            <Link href="/legal/cookies">Cookie Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
