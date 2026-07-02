"use client";

import styles from "./blog.module.css";

// ── Icon primitives ───────────────────────────────────────────────────────────

function IconArticle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10h12M8 14h8M8 18h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconThumb() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 9h10M7 13h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Category icons

function IconPay() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.3" />
      <rect x="4" y="9" width="3" height="1.5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2L2.5 4.5v4.5c0 3 2.2 5.5 5.5 6.5 3.3-1 5.5-3.5 5.5-6.5V4.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 8l1.75 1.75L10.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCash() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 10V6l6-3 6 3v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="5" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function IconBot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="5" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="5.5" cy="9" r="1" fill="currentColor" />
      <circle cx="10.5" cy="9" r="1" fill="currentColor" />
      <path d="M6 11.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconSwitch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 5h12M11 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11H2M5 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 8h12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 12l4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconIndustry() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="8" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="6" y="5" width="4" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="2" width="4" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function IconStart() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 5.5L11 8l-4.5 2.5V5.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconReg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconPraevor() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const LATEST = [
  {
    slug: "five-questions-every-business-asks",
    tag: "Product",
    title: "The five questions every business asks about getting paid",
    desc: "Will I get paid, when, how much, what needs my attention, and what do I do when something goes wrong. Here is how we designed around all five.",
    meta: "6 min read",
  },
  {
    slug: "how-failure-prediction-works",
    tag: "Automation and AI",
    title: "How failure prediction actually works",
    desc: "We flag payments likely to fail three days before the collection date, based on that specific customer's own payment history. Here is the logic behind it.",
    meta: "5 min read",
  },
  {
    slug: "switching-from-gocardless",
    tag: "Switching",
    title: "Switching from GoCardless without losing a single customer",
    desc: "Most switching guides assume you will re-authorise every mandate from scratch. Ours does not. Here is exactly how migration works.",
    meta: "7 min read",
  },
];

const FEATURED = [
  {
    slug: "the-22-question",
    tag: "Praevor",
    title: "The 22 question: why we charge for statement names, and why it is still less than GoCardless",
    desc: "Full breakdown of the actual cost of provisioning a merchant SUN reference, and why we priced it the way we did.",
    meta: "4 min read",
  },
  {
    slug: "account-flagged-for-review",
    tag: "Compliance and Trust",
    title: "What happens when your account gets flagged for review",
    desc: "A real walkthrough of Praevor's compliance dashboard: what triggers a review, what you will see, and how long resolution actually takes.",
    meta: "5 min read",
  },
  {
    slug: "zombie-mandates",
    tag: "Compliance and Trust",
    title: "Zombie mandates: why some payment providers keep charging closed businesses",
    desc: "How weekly Companies House cross-checks stop mandates from collecting after a business dissolves or enters liquidation.",
    meta: "4 min read",
  },
  {
    slug: "change-direct-debit-date",
    tag: "Direct Debit",
    title: "How to change a Direct Debit date without cancelling the mandate",
    desc: "A walkthrough of one-click mandate editing, and why most providers still make you start over.",
    meta: "3 min read",
  },
  {
    slug: "instant-settlement-explained",
    tag: "Cash Flow",
    title: "Instant settlement explained: getting paid the same day, not in three to five",
    desc: "The mechanics of advancing collected funds ahead of Bacs settlement, and what it actually costs.",
    meta: "4 min read",
  },
  {
    slug: "building-ai-concierge",
    tag: "Automation and AI",
    title: "Building the AI Concierge: why we chose WhatsApp, Slack, and Teams first",
    desc: "The reasoning behind putting payment operations inside the tools business owners already use daily, instead of building another dashboard.",
    meta: "6 min read",
  },
  {
    slug: "continue-with-praevor",
    tag: "Praevor",
    title: "What Continue with Praevor actually means for your customers",
    desc: "An early look at Praevor Identity, the verified payment profile that follows a payer across every merchant on the network.",
    meta: "7 min read",
  },
  {
    slug: "direct-debit-for-gyms",
    tag: "Direct Debit",
    title: "Direct Debit for gyms: a complete setup guide",
    desc: "Membership pauses, mid month joiners, seasonal cancellations. Everything specific to running a fitness business on recurring payments.",
    meta: "6 min read",
  },
];

const CATEGORIES = [
  { slug: "getting-paid",               name: "Getting Paid",               desc: "Payments, Direct Debit, Open Banking, Instalments, and everything about how money actually moves.",                    icon: <IconPay /> },
  { slug: "compliance-and-trust",       name: "Compliance and Trust",       desc: "How reviews work, what safeguarding means for your funds, and the regulatory detail most providers hide.",            icon: <IconShield /> },
  { slug: "cash-flow",                  name: "Cash Flow",                  desc: "Forecasting, settlement timing, and managing the gap between invoicing and money landing.",                            icon: <IconCash /> },
  { slug: "automation-and-ai",          name: "Automation and AI",          desc: "How the AI Concierge, failure prediction, and mandate automation actually work under the hood.",                       icon: <IconBot /> },
  { slug: "switching",                  name: "Switching",                  desc: "Migrating from GoCardless, Stripe, a bureau, or manual bank transfers, without starting from zero.",                  icon: <IconSwitch /> },
  { slug: "global-payments",            name: "Global Payments",            desc: "SEPA, international collections, currency, and expanding beyond the UK.",                                              icon: <IconGlobe /> },
  { slug: "growth-and-retention",       name: "Growth and Retention",       desc: "Reducing churn, recovering failed payments, and what payment friction actually costs a growing business.",             icon: <IconGrowth /> },
  { slug: "industry-guides",            name: "Industry Guides",            desc: "Practical setup guides for gyms, SaaS, charities, professional services, and membership organisations.",              icon: <IconIndustry /> },
  { slug: "starting-a-business",        name: "Starting a Business",        desc: "The essentials for a new business setting up payment collection for the first time.",                                  icon: <IconStart /> },
  { slug: "accounting-reconciliation",  name: "Accounting and Reconciliation", desc: "Xero, QuickBooks, and keeping your books matched to what Praevor actually collected.",                            icon: <IconBook /> },
  { slug: "regulations",               name: "Regulations",                desc: "Direct Debit Guarantee, FCA rules, GDPR, and the regulatory landscape explained plainly.",                             icon: <IconReg /> },
  { slug: "praevor",                    name: "Praevor",                    desc: "Product updates, engineering notes, and what we are building next.",                                                  icon: <IconPraevor /> },
];

// Only populate with downloads that genuinely exist and are published.
// Do not display placeholder or empty download cards on the live site.
const DOWNLOADS: { slug: string; format: string; tag: string; title: string; desc: string }[] = [
  // Uncomment and populate when a real downloadable asset exists at the given path.
  // {
  //   slug: "/downloads/state-of-recurring-payments-2026.pdf",
  //   format: "PDF",
  //   tag: "Payments",
  //   title: "The state of recurring payments in the UK, 2026",
  //   desc: "Our first annual look at how UK businesses collect recurring revenue, based on data from our own merchant base and public industry sources.",
  // },
];

const GUIDES = [
  {
    slug: "/blog/guides/direct-debit",
    tag: "Direct Debit",
    title: "Direct Debit",
    desc: "A complete guide for anyone learning how Direct Debit actually works, from mandate to collection to guarantee.",
  },
  {
    slug: "/blog/guides/switching-payment-providers",
    tag: "Switching",
    title: "Switching payment providers",
    desc: "A full guide to moving your recurring payments from any provider to Praevor without disrupting a single customer.",
  },
  {
    slug: "/blog/guides/cash-flow-for-small-business",
    tag: "Cash Flow",
    title: "Cash Flow for Small Business",
    desc: "Practical guidance on forecasting, timing collections, and managing the space between invoicing and getting paid.",
  },
];

const REFERENCES = [
  { label: "Direct Debit: a complete guide",                     href: "/blog/guides/direct-debit" },
  { label: "Open Banking payments explained",                    href: "/blog/guides/open-banking" },
  { label: "Instalments: how to offer flexible payment plans",   href: "/blog/guides/instalments" },
  { label: "SEPA Direct Debit for UK businesses",               href: "/blog/guides/sepa-direct-debit" },
  { label: "Strong Customer Authentication explained",           href: "/blog/guides/strong-customer-authentication" },
  { label: "How to get customers to pay by Direct Debit",        href: "/blog/guides/mandate-conversion" },
  { label: "The Direct Debit Guarantee, explained properly",     href: "/blog/guides/direct-debit-guarantee" },
  { label: "Accountant's guide to Praevor",                      href: "/blog/guides/accountant-guide" },
  { label: "Direct Debit for charities and membership organisations", href: "/blog/guides/charities-direct-debit" },
  { label: "A founder's guide to FCA regulation for payment services", href: "/blog/guides/fca-regulation" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: typeof LATEST[0] }) {
  return (
    <a
      href={`/blog/${article.slug}`}
      className={styles.articleCard}
      aria-label={`Read: ${article.title}`}
    >
      {/* image placeholder for article thumbnail */}
      <div className={styles.articleThumb} aria-hidden>
        <div className={styles.articleThumbIcon}>
          <IconThumb />
        </div>
      </div>
      <div className={styles.articleBody}>
        <span className={styles.articleTag}>{article.tag}</span>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        <p className={styles.articleDesc}>{article.desc}</p>
        <p className={styles.articleMeta}>{article.meta}</p>
      </div>
    </a>
  );
}

function DownloadCard({ item }: { item: typeof DOWNLOADS[0] }) {
  return (
    <a
      href={item.slug}
      className={styles.downloadCard}
      aria-label={`Download: ${item.title}`}
      download
    >
      <div className={styles.downloadTop}>
        <div className={styles.downloadIconWrap}>
          <IconDownload />
        </div>
        <span className={styles.downloadBadge}>{item.format}</span>
      </div>
      <h3 className={styles.downloadTitle}>{item.title}</h3>
      <p className={styles.downloadDesc}>{item.desc}</p>
      <div className={styles.downloadAction}>
        <IconDownload />
        Download
      </div>
    </a>
  );
}

function GuideCard({ guide }: { guide: typeof GUIDES[0] }) {
  return (
    <a
      href={guide.slug}
      className={styles.downloadCard}
      aria-label={`Read guide: ${guide.title}`}
    >
      <div className={styles.downloadTop}>
        <div className={styles.downloadIconWrap}>
          <IconBook />
        </div>
        <span className={styles.downloadBadge}>Guide</span>
      </div>
      <h3 className={styles.downloadTitle}>{guide.title}</h3>
      <p className={styles.downloadDesc}>{guide.desc}</p>
      <div className={styles.downloadAction}>
        Read guide
        <IconArrow />
      </div>
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function BlogPage() {
  return (
    <div>
      {/* 1. HERO */}
      <section className={styles.hero} aria-label="Blog hero">
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Blog</span>
          <h1 className={styles.heroHeading}>
            Everything you need to run payments the easy way.
          </h1>
          <p className={styles.heroSub}>
            Guides, product updates, and honest thinking on what it actually takes to get paid on time.
          </p>
          <div className={styles.heroCtas}>
            <a href="/blog/all" className={styles.btnPrimary}>Browse all articles</a>
            <a href="/blog/subscribe" className={styles.btnOutline}>Subscribe</a>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PIECE */}
      <section className={styles.section} aria-label="Featured article">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Featured</p>
          <a
            href="/blog/why-we-built-compliance-you-can-actually-see"
            className={styles.featuredCard}
            aria-label="Read featured article: Why we built compliance you can actually see"
          >
            {/* image placeholder: compliance dashboard screenshot or illustration */}
            <div className={styles.featuredImage} aria-hidden>
              <IconArticle />
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.featuredTag}>Compliance and Trust</span>
              <h2 className={styles.featuredTitle}>
                Why we built compliance you can actually see
              </h2>
              <p className={styles.featuredDesc}>
                Most payment platforms treat compliance as a black box. Here is the exact system behind Praevor&apos;s live compliance dashboard, and why we built it this way.
              </p>
              <p className={styles.featuredMeta}>8 min read</p>
              <span className={styles.featuredReadMore}>
                Read article <IconArrow />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 3. LATEST ARTICLES */}
      <section className={styles.sectionAlt} aria-label="Latest articles">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Latest</p>
          <h2 className={styles.sectionHeading}>Fresh from the team</h2>
          <div className={styles.grid3}>
            {LATEST.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ARTICLES GRID */}
      <section className={styles.section} aria-label="Featured articles">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Featured</p>
          <h2 className={styles.sectionHeading}>Worth reading</h2>
          <div className={styles.grid4}>
            {FEATURED.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BROWSE BY CATEGORY */}
      <section className={styles.sectionAlt} aria-label="Browse by category">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Browse</p>
          <h2 className={styles.sectionHeading}>Find what you are looking for</h2>
          <nav aria-label="Article categories">
            <ul className={styles.categoryGrid} style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/blog/category/${cat.slug}`}
                    className={styles.categoryCard}
                    aria-label={`Browse category: ${cat.name}`}
                  >
                    <div className={styles.categoryIcon} aria-hidden>{cat.icon}</div>
                    <h3 className={styles.categoryName}>{cat.name}</h3>
                    <p className={styles.categoryDesc}>{cat.desc}</p>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 6. POPULAR DOWNLOADS
          Only render download cards for resources that genuinely exist and are published.
          Do not display placeholder or empty download cards on the live site. */}
      {DOWNLOADS.length > 0 && (
        <section className={styles.section} aria-label="Popular downloads">
          <div className={styles.inner}>
            <p className={styles.sectionEyebrow}>Downloads</p>
            <h2 className={styles.sectionHeading}>Take something with you</h2>
            <div className={styles.downloadGrid}>
              {DOWNLOADS.map((d) => (
                <DownloadCard key={d.slug} item={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. POPULAR GUIDES */}
      <section className={DOWNLOADS.length > 0 ? styles.sectionAlt : styles.section} aria-label="Popular guides">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Guides</p>
          <h2 className={styles.sectionHeading}>Start here</h2>
          <div className={styles.downloadGrid}>
            {GUIDES.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. REFERENCE GUIDES */}
      <section className={styles.sectionAlt} aria-label="Reference guides">
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Reference</p>
          <h2 className={styles.sectionHeading}>Everything else</h2>
          <ul className={styles.refList} aria-label="Reference guide links">
            {REFERENCES.map((ref) => (
              <li key={ref.href} className={styles.refItem}>
                <a href={ref.href}>{ref.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. CLOSING CTA */}
      <section className={styles.cta} aria-label="Get started with Praevor">
        <div className={styles.inner}>
          <h2 className={styles.ctaHeading}>
            Interested in payments that actually explain themselves?
          </h2>
          <div className={styles.ctaBtns}>
            <a href="/signup" className={styles.btnCtaPrimary}>Get started</a>
            <a href="/contact-sales" className={styles.btnCtaOutline}>Talk to sales</a>
          </div>
        </div>
      </section>
    </div>
  );
}
