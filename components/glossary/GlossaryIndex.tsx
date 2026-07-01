"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { glossaryTerms, GlossaryTerm } from "@/config/glossary";
import styles from "./glossary-index.module.css";

const CATEGORIES = [
  "All",
  "Direct Debit",
  "Open Banking",
  "Settlement",
  "Compliance",
  "Payments",
  "Disputes",
  "Reconciliation",
  "Infrastructure",
] as const;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function categoryClass(category: GlossaryTerm["category"]): string {
  const map: Record<GlossaryTerm["category"], string> = {
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

export function GlossaryIndex() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredTerms = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryTerms.filter((t) => {
      const matchesCategory =
        activeCategory === "All" || t.category === activeCategory;
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const termsByLetter = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    const sorted = [...filteredTerms].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
    for (const term of sorted) {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(term);
    }
    return grouped;
  }, [filteredTerms]);

  const presentLetters = new Set(Object.keys(termsByLetter));
  const isSearchActive = search.trim().length > 0 || activeCategory !== "All";

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Payment Glossary</p>
          <h1 className={styles.heroHeading}>
            Every payment term, explained plainly.
          </h1>
          <p className={styles.heroBody}>
            70+ terms. No jargon. Written for business owners.
          </p>
        </div>
      </section>

      {/* Controls — sticky */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search terms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search payment glossary terms"
            />
          </div>

          {/* Category pills */}
          <div className={styles.pills} role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ""}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* A-Z nav — only shown when not in filtered mode */}
      {!isSearchActive && (
        <nav className={styles.azNav} aria-label="Jump to letter">
          <div className={styles.azNavInner}>
            {ALPHABET.map((letter) => {
              const hasTerms = presentLetters.has(letter);
              return hasTerms ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className={styles.azLink}
                  aria-label={`Jump to terms beginning with ${letter}`}
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  className={`${styles.azLink} ${styles.azLinkDisabled}`}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </nav>
      )}

      {/* Terms */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          {filteredTerms.length === 0 ? (
            <p className={styles.noResults}>
              No terms match your search. Try a different word or clear the
              filter.
            </p>
          ) : isSearchActive ? (
            /* Flat list when searching */
            <div className={styles.termsGrid}>
              {[...filteredTerms]
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((term) => (
                  <TermCard key={term.slug} term={term} />
                ))}
            </div>
          ) : (
            /* A-Z grouped */
            ALPHABET.filter((l) => presentLetters.has(l)).map((letter) => (
              <section
                key={letter}
                id={`letter-${letter}`}
                className={styles.letterGroup}
              >
                <h2 className={styles.letterHeading} aria-label={`Terms beginning with ${letter}`}>
                  {letter}
                </h2>
                <div className={styles.termsGrid}>
                  {termsByLetter[letter].map((term) => (
                    <TermCard key={term.slug} term={term} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </>
  );
}

function TermCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link href={`/glossary/${term.slug}`} className={styles.termCard}>
      <div className={styles.termCardTop}>
        <p className={styles.termName}>{term.term}</p>
        <span
          className={`${styles.categoryBadge} ${categoryClass(term.category)}`}
        >
          {term.category}
        </span>
      </div>
      <p className={styles.termDefinition}>{term.definition}</p>
      <span className={styles.readMore}>Read more →</span>
    </Link>
  );
}
