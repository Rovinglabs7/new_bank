import Link from "next/link";
import { site } from "@/config/site";
import { SignInForm } from "./SignInForm";
import styles from "./signin.module.css";

export const metadata = {
  title: `Sign in — ${site.brand}`,
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {site.brand}
        </Link>

        <div className={styles.formBlock}>
          <h1 className={styles.heading}>Sign in</h1>
          <p className={styles.subheading}>Welcome back to {site.brand}.</p>

          <SignInForm callbackUrl={callbackUrl} />

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
