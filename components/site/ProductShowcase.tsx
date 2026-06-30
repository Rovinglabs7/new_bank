import Link from "next/link";
import styles from "./product-showcase.module.css";

type ShowcaseCard = {
  id: string;
  title: string;
  mutedSuffix: string;
  href: string;
  ariaLabel: string;
  placeholderComment: string;
  variant: "row1-narrow" | "row1-wide" | "row2";
};

const cards: ShowcaseCard[] = [
  {
    id: "recurring-payments",
    title: "Recurring payments that",
    mutedSuffix: "handle themselves",
    href: "/products/recurring-payments",
    ariaLabel: "Recurring payments that handle themselves — view product details",
    placeholderComment: "animation placeholder — payment notification mockup",
    variant: "row1-narrow",
  },
  {
    id: "mandate-management",
    title: "Mandate changes",
    mutedSuffix: "without the chasing",
    href: "/products/mandate-management",
    ariaLabel: "Mandate changes without the chasing — view product details",
    placeholderComment: "animation placeholder — dashboard mockup, mandate editor UI",
    variant: "row1-wide",
  },
  {
    id: "compliance",
    title: "Compliance",
    mutedSuffix: "that explains itself",
    href: "/products/compliance",
    ariaLabel: "Compliance that explains itself — view product details",
    placeholderComment: "animation placeholder — compliance dashboard mockup",
    variant: "row2",
  },
  {
    id: "settlement",
    title: "Money that",
    mutedSuffix: "arrives on time",
    href: "/products/settlement",
    ariaLabel: "Money that arrives on time — view product details",
    placeholderComment: "animation placeholder — payout timeline mockup",
    variant: "row2",
  },
  {
    id: "integrations",
    title: "Built to connect",
    mutedSuffix: "with what you use",
    href: "/integrations",
    ariaLabel: "Built to connect with what you use — view product details",
    placeholderComment: "animation placeholder — integration logo grid (Xero, QuickBooks, Sage, etc.)",
    variant: "row2",
  },
];

function ShowcaseCardItem({ card }: { card: ShowcaseCard }) {
  return (
    <Link
      href={card.href}
      aria-label={card.ariaLabel}
      className={`${styles.card} ${styles[card.variant]}`}
    >
      <span className={styles.expandIcon} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M4 10L10 4M10 4H5M10 4V9"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className={styles.cardTitle}>
        {card.title} <span className={styles.muted}>{card.mutedSuffix}</span>
      </h3>

      {/* animation placeholder — see card.placeholderComment for intended content */}
      <div className={styles.animPlaceholder} aria-hidden>
        {/* {card.placeholderComment} */}
      </div>
    </Link>
  );
}

export function ProductShowcase() {
  const [cardA, cardB, cardC, cardD, cardE] = cards;

  return (
    <section className={styles.showcase} aria-labelledby="product-showcase-heading">
      <div className={styles.inner}>
        <h2 id="product-showcase-heading" className={styles.eyebrow}>
          Product experience
        </h2>

        <div className={styles.row1}>
          <ShowcaseCardItem card={cardA} />
          <ShowcaseCardItem card={cardB} />
        </div>

        <div className={styles.row2}>
          <ShowcaseCardItem card={cardC} />
          <ShowcaseCardItem card={cardD} />
          <ShowcaseCardItem card={cardE} />
        </div>
      </div>
    </section>
  );
}
