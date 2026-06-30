import Link from "next/link";
import styles from "./solutions.module.css";

type SolutionCard = {
  id: string;
  heading: string;
  body: string;
  href: string;
  imagePlaceholderComment: string;
  video?: string;
};

const cards: SolutionCard[] = [
  {
    id: "startups",
    heading: "Startups",
    body: "Collect your first recurring payments without a finance team — set up in minutes, no developer required.",
    href: "/solutions/startups",
    imagePlaceholderComment: "image placeholder — startup founder/operator",
    video: "/videos/startups.mp4",
  },
  {
    id: "mid-size",
    heading: "Mid-size companies",
    body: "Predictable collections at scale. AI catches failed payments before they cost you revenue, and every transaction reconciles itself.",
    href: "/solutions/mid-size",
    imagePlaceholderComment: "image placeholder — mid-size company operator",
  },
  {
    id: "enterprise",
    heading: "Enterprises",
    body: "Multi-entity, multi-currency collections built for finance teams who need full control without the manual work.",
    href: "/solutions/enterprise",
    imagePlaceholderComment: "image placeholder — enterprise finance team",
  },
];

export function Solutions() {
  return (
    <section className={styles.solutions} aria-label="Solutions for every stage of growth">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Solutions for every stage of growth.</h2>

        <div className={styles.grid}>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={styles.card}
              aria-label={`${card.heading} — Learn more`}
            >
              <article>
                {card.video ? (
                  <video
                    className={styles.imagePlaceholder}
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden
                  />
                ) : (
                  <div className={styles.imagePlaceholder} aria-hidden />
                )}

                <h3 className={styles.cardHeading}>{card.heading}</h3>
                <p className={styles.cardBody}>{card.body}</p>
                <span className={styles.learnMore}>
                  Learn more
                  <span className={styles.arrow} aria-hidden>
                    →
                  </span>
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
