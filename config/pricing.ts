/**
 * Edit copy here, this is the single source of truth for the Pricing page.
 * Every heading, paragraph, feature and plan can be replaced here without
 * touching any component or layout code.
 */

export type PlanFeatureGroup = {
  category: string;
  items: string[];
};

export type PricingPlan = {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  price: string;
  priceUnit?: string;
  priceNote?: string;
  cta: { label: string; href: string };
  featurePrefix?: string;
  featureGroups: PlanFeatureGroup[];
  recommended?: boolean;
};

export type ComparisonRow = {
  label: string;
  standard: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
};

export type ComparisonCategory = {
  category: string;
  rows: ComparisonRow[];
};

export type FeeRow = {
  label: string;
  standard: string;
  growth: string;
  enterprise: string;
  tooltip?: string;
};

export type FeeGroup = {
  category: string;
  rows: FeeRow[];
};

export type Addon = {
  name: string;
  price: string;
  description: string;
};

export type GlanceRow = {
  label: string;
  standard: string;
  growth: string;
  enterprise: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Currency = "GBP" | "EUR" | "USD";

export type CurrencyMeta = {
  symbol: string;
  label: string;
};

export const currencies: Record<Currency, CurrencyMeta> = {
  GBP: { symbol: "£", label: "GBP" },
  EUR: { symbol: "€", label: "EUR" },
  USD: { symbol: "$", label: "USD" },
};

/** Regional plan prices — not exchange-rate conversion, these are set rates */
export type PlanPrices = {
  standard: string;
  growth: string;
  pro: string;
};

export const regionalPrices: Record<Currency, PlanPrices> = {
  GBP: {
    standard: "1.1% + 20p",
    growth: "1.3% + 20p",
    pro: "1.40% + 20p",
  },
  EUR: {
    standard: "1.10% + €0.25",
    growth: "1.35% + €0.25",
    pro: "1.50% + €0.25",
  },
  USD: {
    standard: "1.20% + $0.30",
    growth: "1.45% + $0.30",
    pro: "1.60% + $0.30",
  },
};

export const pricing = {
  hero: {
    eyebrow: "Pricing",
    heading: "Pricing built for how you actually get paid.",
    subheading:
      "No setup costs. No long-term contracts. No charge unless a payment actually collects. Choose a plan that matches how your business runs today, and change it the moment that changes.",
    primaryCta: { label: "Get started", href: "/signup" },
    secondaryCta: { label: "Talk to sales", href: "/contact-sales" },
  },

  plans: [
    {
      id: "standard",
      eyebrow: "Built to get started",
      name: "Standard",
      tagline: "For businesses collecting their first recurring or one-off payments.",
      price: "1.1% + 20p",
      priceUnit: "per transaction",
      priceNote: "Excl. VAT",
      cta: { label: "Get started", href: "/signup" },
      featureGroups: [
        {
          category: "Collections",
          items: [
            "Recurring Direct Debit, one-off payments and instalments",
            "Set up mandates online, over the phone, on paper or with QR codes",
            "Payment links you can share anywhere",
          ],
        },
        {
          category: "Compliance",
          items: [
            "Real-time compliance dashboard with live onboarding and verification status",
            "FCA-regulated payment infrastructure with safeguarded client funds",
          ],
        },
        {
          category: "Automation",
          items: [
            "AI Concierge built into your dashboard to answer questions and automate routine tasks",
            "Native reconciliation with Xero and QuickBooks",
          ],
        },
        {
          category: "Support",
          items: ["24/7 chat support", "Help Centre, switching guide and onboarding checklist"],
        },
      ],
    },
    {
      id: "growth",
      eyebrow: "Most popular",
      name: "Growth",
      tagline: "For businesses ready to recover more revenue and automate payment operations.",
      price: "1.3% + 20p",
      priceUnit: "per transaction",
      priceNote: "Excl. VAT. Annual billing discounts available.",
      cta: { label: "Get started", href: "/signup" },
      featurePrefix: "Everything in Standard, plus:",
      recommended: true,
      featureGroups: [
        {
          category: "Collections",
          items: [
            "Predict failed payments before they happen",
            "Automatically retry collections when customers are most likely to have funds available",
            "Instant settlement available for eligible payments",
            "Verify bank details during mandate setup to reduce failed collections",
          ],
        },
        {
          category: "Automation",
          items: [
            "AI Concierge in your dashboard, Slack, Microsoft Teams and WhatsApp",
            "Multi-entity support for businesses managing multiple trading names",
          ],
        },
        {
          category: "Reporting",
          items: ["Custom report builder", "Revenue, cash flow and churn forecasting"],
        },
        {
          category: "Support",
          items: ["Priority support with responses in under 20 minutes"],
        },
      ],
    },
    {
      id: "enterprise",
      eyebrow: "Built for scale",
      name: "Enterprise",
      tagline: "For high-volume, multi-entity and international businesses.",
      price: "Custom pricing",
      priceNote: "Annual billing",
      cta: { label: "Talk to our team", href: "/contact-sales" },
      featurePrefix: "Everything in Growth, plus:",
      featureGroups: [
        {
          category: "Global",
          items: [
            "SEPA and international collections at near-domestic rates",
            "Multi-currency settlement",
            "Local payment scheme support across supported markets",
          ],
        },
        {
          category: "Compliance",
          items: [
            "Named compliance specialist",
            "Advanced fraud protection",
            "Payment dispute and chargeback support",
          ],
        },
        {
          category: "Enterprise Management",
          items: [
            "Dedicated account manager",
            "Custom implementation and migration",
            "API and webhook integration support",
            "Advanced user roles, permissions and audit logs",
            "Fully customised package",
            "Volume-based discounts",
          ],
        },
      ],
    },
  ] satisfies PricingPlan[],

  calculator: {
    heading: "Will Sprout pay for itself?",
    subheading:
      "Enter your monthly collections and average payment to see your estimated cost, recovered revenue and time saved.",
  },

  comparison: {
    heading: "The complete feature comparison",
    subheading: "Every feature, organised by category, across every plan.",
    categories: [
      {
        category: "Collections",
        rows: [
          {
            label: "Recurring Direct Debit, one-off payments and instalments",
            standard: true,
            growth: true,
            enterprise: true,
          },
          {
            label: "Set up mandates online, over the phone, on paper or with QR codes",
            standard: true,
            growth: true,
            enterprise: true,
          },
          { label: "Payment links you can share anywhere", standard: true, growth: true, enterprise: true },
          { label: "Predict failed payments before they happen", standard: false, growth: true, enterprise: true },
          { label: "Automatically retry collections when customers are most likely to have funds available", standard: false, growth: true, enterprise: true },
          { label: "Instant settlement available for eligible payments", standard: false, growth: true, enterprise: true },
          { label: "Verify bank details during mandate setup to reduce failed collections", standard: false, growth: true, enterprise: true },
          {
            label: "SEPA and international collections at near-domestic rates",
            standard: false,
            growth: false,
            enterprise: true,
          },
          { label: "Multi-currency settlement", standard: false, growth: false, enterprise: true },
          { label: "Local payment scheme support across supported markets", standard: false, growth: false, enterprise: true },
        ],
      },
      {
        category: "Compliance and trust",
        rows: [
          { label: "Real-time compliance dashboard with live onboarding and verification status", standard: true, growth: true, enterprise: true },
          {
            label: "FCA-regulated payment infrastructure with safeguarded client funds",
            standard: true,
            growth: true,
            enterprise: true,
          },
          { label: "Named compliance specialist", standard: false, growth: false, enterprise: true },
          { label: "Advanced fraud protection", standard: false, growth: false, enterprise: true },
          {
            label: "Payment dispute and chargeback support",
            standard: false,
            growth: false,
            enterprise: true,
          },
        ],
      },
      {
        category: "Automation",
        rows: [
          { label: "AI Concierge built into your dashboard to answer questions and automate routine tasks", standard: true, growth: true, enterprise: true },
          { label: "Native reconciliation with Xero and QuickBooks", standard: true, growth: true, enterprise: true },
          {
            label: "AI Concierge in your dashboard, Slack, Microsoft Teams and WhatsApp",
            standard: false,
            growth: true,
            enterprise: true,
          },
          {
            label: "Multi-entity support for businesses managing multiple trading names",
            standard: false,
            growth: true,
            enterprise: true,
          },
        ],
      },
      {
        category: "Reporting",
        rows: [
          { label: "Standard dashboard reporting", standard: true, growth: true, enterprise: true },
          { label: "Custom report builder", standard: false, growth: true, enterprise: true },
          { label: "Revenue, cash flow and churn forecasting", standard: false, growth: true, enterprise: true },
        ],
      },
      {
        category: "Enterprise Management",
        rows: [
          { label: "Dedicated account manager", standard: false, growth: false, enterprise: true },
          {
            label: "Custom implementation and migration",
            standard: false,
            growth: false,
            enterprise: true,
          },
          { label: "API and webhook integration support", standard: false, growth: false, enterprise: true },
          {
            label: "Advanced user roles, permissions and audit logs",
            standard: false,
            growth: false,
            enterprise: true,
          },
        ],
      },
      {
        category: "Support",
        rows: [
          { label: "24/7 chat support", standard: true, growth: true, enterprise: true },
          {
            label: "Help Centre, switching guide and onboarding checklist",
            standard: true,
            growth: true,
            enterprise: true,
          },
          { label: "Priority support with responses in under 20 minutes", standard: false, growth: true, enterprise: true },
        ],
      },
    ] satisfies ComparisonCategory[],
  },

  fees: {
    heading: "Transaction Fees",
    subheading: "Everything you pay, in one place.",
    columns: ["Standard", "Growth", "Enterprise"],
    groups: [
      {
        category: "Collections",
        rows: [
          {
            label: "UK Direct Debit",
            standard: "1.1% + 20p, capped at £4.30",
            growth: "1.3% + 20p, capped at £5.20",
            enterprise: "Custom",
          },
          {
            label: "International Collections",
            standard: "2% + 20p",
            growth: "2.2% + 20p",
            enterprise: "Custom",
          },
          {
            label: "Instant Bank Payment",
            standard: "1% + 20p",
            growth: "1% + 20p",
            enterprise: "Custom",
          },
          {
            label: "Large Direct Debit",
            standard: "+0.3%",
            growth: "+0.3%",
            enterprise: "Custom",
            tooltip: "(£2,000+)",
          },
        ],
      },
      {
        category: "Account Management",
        rows: [
          {
            label: "Failed Collection",
            standard: "5p",
            growth: "5p",
            enterprise: "Custom",
            tooltip: "Charged when a Direct Debit or Instant Bank Payment cannot be collected.",
          },
          {
            label: "Refunds",
            standard: "Free, deducted from next payout",
            growth: "Free, deducted from next payout",
            enterprise: "Free, deducted from next payout",
            tooltip: "Charged when a payment is returned to your customer at your request.",
          },
          {
            label: "Chargebacks and Disputes",
            standard: "£5 (only if over 15/month)",
            growth: "£5 (only if over 15/month)",
            enterprise: "Custom",
            tooltip: "Charged when a customer disputes a payment through their bank.",
          },
        ],
      },
      {
        category: "Cash Flow",
        rows: [
          {
            label: "Instant Settlement",
            standard: "Not available",
            growth: "0.6% of advanced amount",
            enterprise: "Custom",
          },
        ],
      },
    ] satisfies FeeGroup[],
    note: "All prices exclude VAT. VAT is charged in accordance with UK tax regulations where applicable.",
  },

  addons: {
    heading: "Add-ons, available on any plan",
    subheading: "Extend any plan with the extras that matter to your business.",
    items: [
      {
        name: "Your name on bank statements",
        price: "£22/month",
        description:
          "Display your business name on your customers' bank statements instead of Sprout. Reduce confusion, increase recognition and minimise payment queries.",
      },
      {
        name: "Extended checkout template library",
        price: "£20/month",
        description:
          "Unlock our complete library of professionally designed checkout pages and customer notifications. Customise every payment experience to match your brand.",
      },
      {
        name: "Additional team seats",
        price: "£8/user/month",
        description:
          "Invite more colleagues to manage payments, customers and reporting together. Three team members are included on every plan.",
      },
      {
        name: "Embedded Platform API",
        price: "£199/month",
        description:
          "Embed Sprout directly into your own product with platform-grade APIs, webhooks, sandbox environments and partner onboarding tools.",
      },
      {
        name: "White-label payment pages",
        price: "£299/month",
        description:
          "Replace every Sprout touchpoint with your own brand, domain and styling for a completely white-labelled payment experience.",
      },
      {
        name: "International SEPA Collections",
        price: "Contact us",
        description:
          "Enable SEPA Direct Debit collections across Europe with region-specific pricing. Contact us for a full rate card.",
      },
      {
        name: "Dedicated compliance contact",
        price: "£99/month",
        description:
          "Work directly with a named compliance specialist for onboarding, reviews and ongoing regulatory support. Included on Enterprise.",
      },
      {
        name: "Priority Support",
        price: "£49/month",
        description: "Faster response times with priority handling from the Sprout Support team.",
      },
      {
        name: "Sprout Intelligence",
        price: "£59/month",
        description:
          "Your AI-powered payment operations assistant. Recover revenue, automate routine tasks, forecast cash flow and keep your business moving with intelligent workflows and proactive insights.",
      },
      {
        name: "Custom Domain",
        price: "£15/month",
        description:
          "Use your own domain for every customer-facing payment page. Host payment links on pay.yourcompany.com or another custom subdomain for a seamless branded experience.",
      },
    ] satisfies Addon[],
  },

  glance: {
    heading: "Extra benefits by plan, at a glance",
    columns: ["Standard", "Growth", "Enterprise"],
    rows: [
      {
        label: "Best for",
        standard: "New and growing businesses",
        growth: "Businesses ready to automate and recover more revenue",
        enterprise: "High-growth and enterprise businesses",
      },
      {
        label: "Typical monthly payment volume",
        standard: "Up to £10,000",
        growth: "£10,000 to £100,000",
        enterprise: "£100,000+",
      },
      {
        label: "Typically chosen by",
        standard: "Founders and small business owners",
        growth: "Operations, finance and growing teams",
        enterprise: "Finance leaders and enterprise teams",
      },
      {
        label: "Time to get started",
        standard: "Start collecting payments the same day",
        growth: "Start collecting the same day, with AI recovery from your first failed payment",
        enterprise: "Tailored onboarding with a dedicated implementation team",
      },
    ] satisfies GlanceRow[],
  },

  faqs: {
    heading: "FAQ, full and thorough",
    items: [
      {
        question: "Is there a free plan?",
        answer:
          "There's no free tier, but Standard has no monthly platform fee and no setup cost. You only ever pay a small percentage on payments that actually collect, if nothing is collected in a given month, you pay nothing.",
      },
      {
        question: "What happens if I outgrow Standard?",
        answer:
          "You can upgrade to Growth at any point directly from your dashboard, or by simply asking your AI Concierge. The change takes effect from your next billing cycle, with no penalty and no need to re-set up a single mandate.",
      },
      {
        question: "Can I downgrade or cancel at any time?",
        answer:
          "Yes. Every plan is a monthly rolling agreement, there's no lock-in contract on Standard or Growth. You can downgrade or close your account whenever you choose, and you'll only be charged fees that applied while your account was active.",
      },
      {
        question: "How does Sprout charge me, is it deducted automatically?",
        answer:
          "Yes. Fees are deducted directly from your collected payments before they're paid out to you, so there's nothing separate to pay each month and nothing you need to remember to settle. Enterprise plans are invoiced monthly instead, by agreement.",
      },
      {
        question: "Why does Sprout charge VAT on its fees?",
        answer:
          "It's the VAT status of the supplier, not the customer, that determines this under UK law. Krandel Labs Ltd is a VAT-registered business providing a VATable service, so VAT applies to transaction fees regardless of your own business's VAT status. We'd always recommend speaking to a qualified accountant or tax adviser about whether this is reclaimable for your specific situation, we're not able to give tax advice ourselves.",
      },
      {
        question: "Why is there a fee on failed payments, even a small one?",
        answer:
          "Every payment we submit, successful or not, has a real processing cost attached to it through the underlying banking rails. Most providers either charge you the full transaction fee on a failed payment (which can feel punitive) or absorb the cost in a way that isn't sustainable long-term. We charge a flat 5p instead, enough to cover the real cost, never more.",
      },
      {
        question: "Do I need a separate bank account to collect international payments?",
        answer:
          "No. You can collect from 30+ countries directly into your existing UK business account. Currency conversion is handled at the real mid-market exchange rate, with the cost built into the international transaction fee shown above, never a hidden markup on top.",
      },
      {
        question: "Can I move my existing customers over from another provider?",
        answer:
          "Yes. We've built a dedicated migration process specifically for this. In most cases, your existing customer mandates can be carried across without requiring every individual customer to re-authorise a new payment from scratch, which is typically the most painful part of switching providers.",
      },
      {
        question: "Is there a discount for charities or nonprofits?",
        answer: "Yes, eligible registered charities and nonprofits receive 20% off standard transaction fees across every plan.",
      },
      {
        question: "What does instant settlement actually mean, and is it safe?",
        answer:
          "Normally, money collected via Direct Debit takes 3 to 5 working days to clear through the banking system before it reaches your account. Instant settlement means we advance you that money the same day it's collected, for a small fee. The underlying settlement still happens in the background exactly as normal, you simply don't have to wait for it.",
      },
      {
        question: "What happens if my account is ever flagged for a compliance review?",
        answer:
          "You'll see it the moment it happens, directly in your compliance dashboard, what triggered the review, what (if anything) we need from you, and a clear estimated timeline for resolution. We don't believe in silent holds or generic your account is under review emails with no further detail.",
      },
      {
        question: "How fast is support, really?",
        answer:
          "Standard plan customers get 24/7 chat support with typical response times under a few hours. Growth plan customers get priority support, with urgent issues reaching a real person in under 20 minutes. Enterprise customers have a named, dedicated account manager.",
      },
      {
        question: "Do you support multiple entities or trading names under one account?",
        answer:
          "Yes, from Growth upward. If you operate more than one legal entity or trading name, for example a group of gyms, or a holding company with several subsidiaries, you can manage them from a single Sprout account with separated reporting for each.",
      },
      {
        question: "What integrations are available?",
        answer:
          "Native, two-way reconciliation with Xero and QuickBooks is included on every plan. Additional accounting and business software integrations are available via our open API on Growth and Enterprise plans.",
      },
      {
        question: "Is my customers' bank data secure?",
        answer:
          "Yes. All bank connections happen via regulated Open Banking infrastructure, we never see or store your customers' online banking login details. All data is encrypted in transit and at rest, and Krandel Labs Ltd operates under the FCA's Payment Services Regulations 2017, with client funds held in fully segregated safeguarding accounts.",
      },
      {
        question: "Can I try Sprout before committing?",
        answer:
          "There's no separate trial, because Standard has no monthly fee and no setup cost, you can start using it immediately and only pay when a payment actually collects. If it's not right for your business, you can close your account at any time with nothing further owed.",
      },
    ] satisfies Faq[],
  },

  closing: {
    heading: "Run the numbers for your own business.",
    body: "Enter your typical monthly volume above and see exactly what you'd pay, what you'd likely recover in failed payments, and what you'd get back in time. No sales call required to find out.",
    primaryCta: { label: "Get started", href: "/signup" },
  },
};
