import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import { getSession } from "@/lib/auth/session";
import { site } from "@/config/site";
import styles from "./dashboard.module.css";

export const metadata = {
  title: `Dashboard — ${site.brand}`,
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          {site.brand}
        </Link>
        <form action={signOut}>
          <button type="submit" className={styles.signOut}>
            Sign out
          </button>
        </form>
      </header>

      <section className={styles.content}>
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subheading}>
          Signed in as <strong>{session.email}</strong>
        </p>
        <p className={styles.note}>
          This is a placeholder dashboard. Payment operations, mandates, and
          reconciliation will live here.
        </p>
      </section>
    </main>
  );
}
