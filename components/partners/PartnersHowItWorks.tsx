import Link from "next/link";
import { partners } from "@/config/partners";
import styles from "./partners-how-it-works.module.css";

function StepBody({
  body,
  linkText,
  linkHref,
}: {
  body: string;
  linkText?: string;
  linkHref?: string;
}) {
  if (!linkText || !linkHref) {
    return <p className={styles.body}>{body}</p>;
  }

  const marker = `{{${linkText}}}`;
  const index = body.indexOf(marker);
  if (index === -1) {
    return <p className={styles.body}>{body}</p>;
  }

  const before = body.slice(0, index);
  const after = body.slice(index + marker.length);

  return (
    <p className={styles.body}>
      {before}
      <Link href={linkHref} className={styles.inlineLink}>
        {linkText}
      </Link>
      {after}
    </p>
  );
}

export function PartnersHowItWorks() {
  const { howItWorks } = partners;

  return (
    <section className={styles.section} aria-label={howItWorks.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{howItWorks.heading}</h2>

        <div className={styles.grid}>
          {howItWorks.steps.map((step) => (
            <div className={styles.item} key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <StepBody body={step.body} linkText={step.linkText} linkHref={step.linkHref} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
