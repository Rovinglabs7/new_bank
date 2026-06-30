import Link from "next/link";
import { site } from "@/config/site";
import { CountrySelect } from "./CountrySelect";
import { SignupScenes } from "./SignupScenes";
import styles from "./signup.module.css";

export const metadata = {
  title: `Sign up — ${site.brand}`,
};

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <div className={styles.brandPanel}>
        <div className={styles.brandIntro}>
          <Link href="/" className={styles.brandLogo}>
            {site.brand}
          </Link>
          <p className={styles.brandTagline}>
            Getting paid should be the easiest part of running your business.
          </p>
        </div>

        <SignupScenes />
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          <h1 className={styles.heading}>Create your {site.brand} account</h1>
          <p className={styles.subheading}>It only takes a minute.</p>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>What&apos;s your business called?</span>
              <input
                type="text"
                name="businessName"
                placeholder="Bean There Coffee ☕"
                className={styles.input}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Work email</span>
              <input
                type="email"
                name="email"
                placeholder="name@email.com"
                className={styles.input}
                required
              />
              <span className={styles.helper}>
                Use the email you use for your business. Gmail and Outlook
                addresses are welcome.
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
              />
            </label>

            <button type="submit" className={styles.submit}>
              Sign up
            </button>
          </form>

          <p className={styles.signinLine}>
            Already have a {site.brand} account?{" "}
            <Link href="/signin" className={styles.signinLink}>
              Sign in
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
