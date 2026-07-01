import Link from "next/link";
import { GlossaryTerm as GlossaryTermType, glossaryTerms } from "@/config/glossary";
import styles from "./glossary-term.module.css";

function categoryClass(category: GlossaryTermType["category"]): string {
  const map: Record<GlossaryTermType["category"], string> = {
    "Direct Debit": styles["cat-direct-debit"],
    "Open Banking": styles["cat-open-banking"],
    Settlement: styles["cat-settlement"],
    Compliance: styles["cat-compliance"],
    Payments: styles["cat-payments"],
    Disputes: styles["cat-disputes"],
    Reconciliation: styles["cat-reconciliation"],
    Infrastructure: styles["cat-infrastructure"],
  };
  return map[category] ?? "";
}

interface Props {
  term: GlossaryTermType;
}

export function GlossaryTerm({ term }: Props) {
  const relatedTermObjects = term.relatedTerms
    .map((slug) => glossaryTerms.find((t) => t.slug === slug))
    .filter((t): t is GlossaryTermType => t !== undefined);

  // Split explanation into paragraphs on double newlines or \n\n
  const explanationParagraphs = term.explanation
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <div className={styles.breadcrumbInner}>
          <Link href="/glossary" className={styles.breadcrumbLink}>
            Payment Glossary
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>{term.term}</span>
        </div>
      </nav>

      {/* Hero */}
      <header className={styles.termHero}>
        <div className={styles.termHeroInner}>
          <span
            className={`${styles.categoryBadge} ${categoryClass(term.category)}`}
          >
            {term.category}
          </span>
          <h1 className={styles.termTitle}>{term.term}</h1>
          <div className={styles.definitionBox}>
            <p className={styles.definitionText}>{term.definition}</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          {/* Explanation */}
          <h2 className={styles.explanationHeading}>What is {term.term}?</h2>
          {explanationParagraphs.map((para, i) => (
            <p key={i} className={styles.explanationBody}>
              {para}
            </p>
          ))}

          {/* Why it matters */}
          <div className={styles.whyBox} role="note" aria-label="Why this matters for your business">
            <p className={styles.whyLabel}>Why it matters for your business</p>
            <p className={styles.whyText}>{term.whyItMatters}</p>
          </div>

          {/* Related terms */}
          {relatedTermObjects.length > 0 && (
            <section className={styles.relatedSection}>
              <h2 className={styles.sectionHeading}>Related terms</h2>
              <div className={styles.relatedGrid}>
                {relatedTermObjects.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className={styles.relatedCard}
                  >
                    <p className={styles.relatedTermName}>{related.term}</p>
                    <p className={styles.relatedTermCategory}>
                      {related.category}
                    </p>
                    <span className={styles.relatedArrow}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Resources */}
          {term.resources && term.resources.length > 0 && (
            <section className={styles.resourcesSection}>
              <h2 className={styles.sectionHeading}>Helpful resources</h2>
              <ul className={styles.resourcesList}>
                {term.resources.map((resource) => (
                  <li key={resource.href}>
                    <Link href={resource.href} className={styles.resourceLink}>
                      <span>{resource.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Back link */}
          <div className={styles.backSection}>
            <Link href="/glossary" className={styles.backLink}>
              ← Back to Payment Glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
