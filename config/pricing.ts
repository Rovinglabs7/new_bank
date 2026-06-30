/**
 * Edit copy here — this is the single source of truth for the Pricing page.
 * Every heading, paragraph, feature and plan can be replaced here without
 * touching any component or layout code.
 */

export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceUnit?: string;
  priceNote?: string;
  features: string[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  recommended?: boolean;
};

export type FeatureRow = {
  label: string;
  description?: string;
  standard: boolean | string;
  growth: boolean | string;
  pro: boolean | string;
};

export type Addon = {
  name: string;
  price: string;
  description: string;
};

export type FeeRow = {
  label: string;
  standard: string;
  growth: string;
  pro: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export const pricing = {
  hero: {
    eyebrow: "Pricing",
    heading: "Simple, honest pricing that scales with you.",
    subheading:
      "One transparent rate per transaction. No setup fees, no hidden charges, no surprises — just the tools you need to get paid reliably.",
    primaryCta: { label: "Get started", href: "/signup" },
    secondaryCta: { label: "Talk to sales", href: "/contact-sales" },
  },

  plans: [
    {
      id: "standard",
      name: "Standard",
      tagline: "For businesses that want to collect one-off or recurring payments",
      price: "1.1% + 20p",
      priceUnit: "per transaction",
      priceNote: "Excl. VAT",
      features: [
        "Collect one-off, recurring and instalment payments",
        "International payments in 30+ countries",
        "Xero and QuickBooks reconciliation",
        "AI Concierge across dashboard, WhatsApp, Slack and Teams",
        "2 checkout templates included",
        "Real-time compliance dashboard",
      ],
      cta: { label: "Get started", href: "/signup" },
      secondaryCta: { label: "See all fees", href: "#fees" },
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "For businesses that want failure recovery and faster settlement",
      price: "1.3% + 20p",
      priceUnit: "per transaction",
      priceNote: "Excl. VAT",
      features: [
        "Everything in Standard",
        "AI failure prediction, 3 days ahead",
        "Intelligent payment retry and recovery",
        "Instant same-day settlement",
        "Open Banking verified mandates",
      ],
      cta: { label: "Get started", href: "/signup" },
      secondaryCta: { label: "See all fees", href: "#fees" },
      recommended: true,
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For businesses that want full fraud protection and compliance visibility",
      price: "1.45% + 20p",
      priceUnit: "per transaction",
      priceNote: "Excl. VAT",
      features: [
        "Everything in Growth",
        "Advanced fraud and bank-detail-change protection",
        "Automated dispute evidence and chargeback handling",
        "Dedicated compliance contact",
      ],
      cta: { label: "Get started", href: "/signup" },
      secondaryCta: { label: "See all fees", href: "#fees" },
    },
    {
      id: "custom",
      name: "Custom",
      tagline: "For businesses with £1m+ annual revenue or bespoke needs",
      price: "Custom",
      features: [
        "Fully customised package",
        "Volume-based discounts",
        "Dedicated account manager",
      ],
      cta: { label: "Contact sales", href: "/contact-sales" },
    },
  ] satisfies PricingPlan[],

  comparison: {
    heading: "Compare plans",
    subheading: "Every plan includes the essentials. Growth and Pro add more protection as you scale.",
    rows: [
      {
        label: "Collect payments",
        description: "One-off, subscription, membership and instalment payments",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "International payments",
        description: "Collect from 30+ countries at the real mid-market rate",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "Native accounting integrations",
        description: "Xero and QuickBooks reconciliation built in",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "AI Concierge",
        description: "Manage payments from your dashboard, WhatsApp, Slack or Teams",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "Compliance dashboard",
        description: "Real-time visibility into any account review",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "Priority support",
        description: "Urgent issues reach a human within 20 minutes",
        standard: true,
        growth: true,
        pro: true,
      },
      {
        label: "Failure prediction",
        description: "AI flags at-risk payments 3 days before collection",
        standard: false,
        growth: true,
        pro: true,
      },
      {
        label: "Intelligent recovery",
        description: "Retries timed to each customer's real account behaviour",
        standard: false,
        growth: true,
        pro: true,
      },
      {
        label: "Instant settlement",
        description: "Same-day funds for a small advance fee",
        standard: false,
        growth: true,
        pro: true,
      },
      {
        label: "Verified mandates",
        description: "Bank details verified at checkout via Open Banking",
        standard: false,
        growth: true,
        pro: true,
      },
      {
        label: "Advanced fraud protection",
        description: "Detects suspicious payers and bank-detail-change fraud",
        standard: false,
        growth: false,
        pro: true,
      },
      {
        label: "Dispute resolution",
        description: "Evidence compiled automatically to challenge chargebacks",
        standard: false,
        growth: false,
        pro: true,
      },
      {
        label: "Dedicated compliance contact",
        description: "A named contact for any account review",
        standard: false,
        growth: false,
        pro: true,
      },
    ] satisfies FeatureRow[],
  },

  addons: {
    heading: "Add-ons",
    subheading: "Extend any plan with the extras that matter to your business.",
    items: [
      {
        name: "Your name on bank statements",
        price: "£22/month",
        description:
          "Show your business name on customer statements instead of \"Sprout Ltd\".",
      },
      {
        name: "Beyond 2 checkout templates",
        price: "£20/month",
        description:
          "Unlock the full template library and restyle every payment page and notification.",
      },
      {
        name: "API access for platforms",
        price: "£199/month",
        description: "Build Sprout directly into your own product — full REST API, sandbox and webhooks.",
      },
      {
        name: "White-label payment pages",
        price: "£299/month",
        description: "Remove all Sprout branding from every customer-facing touchpoint.",
      },
      {
        name: "Multi-user team access",
        price: "£19/month",
        description: "Add seats beyond the 3 included on every plan.",
      },
      {
        name: "International SEPA collections",
        price: "1.5% + 20p",
        description: "Collect across the EU at near-domestic rates.",
      },
    ] satisfies Addon[],
  },

  fees: {
    heading: "Transaction fees",
    subheading: "Every fee, in one place.",
    columns: ["Standard", "Growth", "Pro"],
    rows: [
      {
        label: "Domestic UK",
        standard: "1.1% + 20p, capped at £4.30",
        growth: "1.3% + 20p, capped at £5.20",
        pro: "1.45% + 20p, capped at £5.80",
      },
      {
        label: "International",
        standard: "2% + 20p",
        growth: "2.2% + 20p",
        pro: "2.35% + 20p",
      },
      {
        label: "Over £2,000 (Direct Debit)",
        standard: "+0.3%",
        growth: "+0.3%",
        pro: "+0.3%",
      },
      {
        label: "Failed payment fee",
        standard: "5p",
        growth: "5p",
        pro: "5p",
      },
      {
        label: "Statement name",
        standard: "£22/month add-on",
        growth: "£22/month add-on",
        pro: "£22/month add-on",
      },
      {
        label: "Checkout templates",
        standard: "2 included free",
        growth: "2 included free",
        pro: "2 included free",
      },
    ] satisfies FeeRow[],
    note:
      "Prices exclude VAT. Krandel Labs Ltd is VAT-registered and provides a VATable service under HMRC rules, so VAT applies to transaction fees regardless of your own VAT status.",
  },

  enterprise: {
    eyebrow: "Custom",
    heading: "Built for larger businesses.",
    body: "If you're processing £1m or more a year, or need something a standard plan can't cover, we'll build a package around how your business actually runs — with volume-based pricing and a dedicated account manager.",
    points: [
      "Fully customised package",
      "Volume-based discounts",
      "Dedicated account manager",
      "Custom onboarding and migration support",
    ],
    cta: { label: "Contact sales", href: "/contact-sales" },
  },

  security: {
    heading: "Security & compliance",
    subheading: "Built on the same standards regulated financial institutions rely on.",
    items: [
      { title: "FCA regulated", description: "Authorised and supervised under UK financial services law" },
      { title: "Segregated client funds", description: "Your customers' money is never co-mingled with operating funds" },
      { title: "Bank-grade encryption", description: "Data encrypted in transit and at rest" },
      { title: "Open Banking verified mandates", description: "Bank details verified at the point of checkout" },
    ],
  },

  faqs: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "How does Sprout collect fees from me?",
        answer:
          "Fees are deducted automatically from your collections. If a payment fails, you're charged a flat 5p — never the full percentage fee. If you're on a Custom plan, you'll be invoiced monthly instead.",
      },
      {
        question: "Can I change my plan or cancel any time?",
        answer:
          "Yes. Every plan is a monthly rolling contract. Upgrade or downgrade any time from your dashboard or by asking your AI Concierge.",
      },
      {
        question: "Why does Sprout charge VAT on its fees?",
        answer:
          "It's the VAT status of the supplier, not the customer, that determines this. Krandel Labs Ltd is VAT-registered and provides a VATable service under HMRC rules, so VAT applies to transaction fees regardless of your own VAT status. We recommend speaking to a tax professional about whether this is reclaimable for your business.",
      },
      {
        question: "Why isn't my name on bank statements included for free?",
        answer:
          "It's a genuine cost to provision per merchant, so we price it honestly at £22/month rather than bundling the cost into every transaction.",
      },
      {
        question: "Can I move my existing customers from another provider to Sprout?",
        answer:
          "Yes. Our migration tool carries mandates across without requiring every customer to re-authorise. Most businesses move their full customer base in under a day.",
      },
      {
        question: "Is there a discount for charities?",
        answer: "Yes — 20% off transaction fees for eligible registered charities and nonprofits.",
      },
      {
        question: "What happens if my account is ever flagged for review?",
        answer:
          "You see it immediately. The compliance dashboard shows what triggered it, what's needed, who's handling it, and when it'll be resolved.",
      },
      {
        question: "What if I need support urgently?",
        answer: "Anything flagged urgent reaches a real person within 20 minutes, not a queue.",
      },
    ] satisfies Faq[],
  },

  closing: {
    heading: "Run your own numbers.",
    body: "See exactly what you'd pay on Sprout based on your real transaction volume — no calls, no sales pitch required.",
    primaryCta: { label: "Get started", href: "/signup" },
    secondaryCta: { label: "Talk to sales", href: "/contact-sales" },
  },
};
