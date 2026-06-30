import Link from "next/link";
import { site } from "@/config/site";
import { SignupScenes } from "./SignupScenes";
import { SignUpForm } from "./SignUpForm";
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

          <SignUpForm />

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
