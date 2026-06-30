/**
 * Edit copy here — this is the single source of truth for the Sprout site.
 * No Framer hydration will overwrite these values.
 */
export const site = {
  brand: "Sprout",
  title: "Sprout — Payments for ambitious teams",
  description:
    "Getting paid should be the easiest part of running your business.",

  announcementBar: {
    tag: "New",
    message:
      "Be among the first to experience Sprout. We're inviting a small group of businesses to help us build a better way to collect payments.",
  },

  nav: [
    { label: "Products", href: "#products" },
    { label: "Resources", href: "#resources" },
    { label: "Pricing", href: "#pricing" },
  ],

  productsMenu: {
    columns: [
      {
        heading: "Collect",
        items: [
          {
            title: "Recurring payments",
            subtext: "Automatic direct debit collection, every cycle",
            href: "/products/recurring-payments",
          },
          {
            title: "One-off payments",
            subtext: "Instant bank payments via open banking",
            href: "/products/one-off-payments",
          },
          {
            title: "Variable payments",
            subtext: "Collect different amounts without re-authorisation",
            href: "/products/variable-payments",
          },
          {
            title: "Payment links and QR codes",
            subtext: "Share a link or code, get paid in under a minute",
            href: "/products/payment-links",
          },
          {
            title: "International payments",
            subtext: "Collect across 30+ countries, one dashboard",
            href: "/products/international-payments",
          },
        ],
      },
      {
        heading: "Automate",
        items: [
          {
            title: "AI Concierge",
            subtext: "Manage payments from your dashboard or WhatsApp",
            href: "/products/ai-concierge",
          },
          {
            title: "Failure prediction",
            subtext: "Know which payments are at risk before they fail",
            href: "/products/failure-prediction",
          },
          {
            title: "Mandate management",
            subtext: "Change dates, pause, or resume — no cancellations",
            href: "/products/mandate-management",
          },
          {
            title: "Compliance dashboard",
            subtext: "Real-time visibility into every account review",
            href: "/products/compliance-dashboard",
          },
        ],
      },
      {
        heading: "Connect",
        items: [
          {
            title: "Xero and QuickBooks",
            subtext: "Every payment reconciled automatically",
            href: "/products/accounting-integrations",
          },
          {
            title: "Developer API",
            subtext: "Build on our payment infrastructure",
            href: "/products/api",
          },
          {
            title: "Webhooks",
            subtext: "Real-time events for every transaction",
            href: "/products/webhooks",
          },
        ],
      },
    ],
    switching: {
      label: "Switching from another provider? See how migration works →",
      href: "/switch",
    },
  },

  navActions: {
    login: { label: "Sign in", href: "/signin" },
    demo: { label: "Book a demo", href: "#demo" },
  },

  hero: {
    headline:
      "Getting paid should be the easiest part of running your business.",
    subheadline:
      "Sprout connects to your business, automates payment operations, and makes getting paid simpler for you and your customers.",
    primaryCta: { label: "Get started for free", href: "#demo" },
  },

  footer: {
    brand: "sprout.",
    tagline: "Recurring payments that run themselves.",

    contact: {
      heading: "Contact",
      items: [
        { label: "hello@sprout.com", href: "mailto:hello@sprout.com" },
        { label: "support@sprout.com", href: "mailto:support@sprout.com" },
        { label: "+44 7353 179684", href: "tel:+447353179684" },
      ],
    },

    social: {
      heading: "Social",
      items: [
        { label: "X", href: "https://x.com/sproutpay", icon: "x" },
        { label: "Instagram", href: "https://instagram.com/sproutpay", icon: "instagram" },
        { label: "LinkedIn", href: "https://linkedin.com/company/sproutpay", icon: "linkedin" },
      ],
    },

    columns: [
      {
        title: "About us",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Customers", href: "/customers" },
          { label: "Help centre", href: "/help" },
          { label: "Product releases", href: "/releases" },
          { label: "Press", href: "/press" },
          { label: "API documentation", href: "/developers/docs" },
          { label: "Versus", href: "/versus" },
          { label: "Krandel Labs", href: "/krandel-labs" },
        ],
      },
      {
        title: "Products",
        links: [
          { label: "Recurring payments", href: "/products/recurring-payments" },
          { label: "One-off payments", href: "/products/one-off-payments" },
          { label: "Variable payments", href: "/products/variable-payments" },
          { label: "Instalments", href: "/products/instalments" },
          {
            label: "International payments",
            href: "/products/international-payments",
          },
          {
            label: "Payment links and QR codes",
            href: "/products/payment-links",
          },
          {
            label: "Mandate management",
            href: "/products/mandate-management",
          },
          { label: "Refunds and disputes", href: "/products/refunds-and-disputes" },
          {
            label: "Reporting and analytics",
            href: "/products/reporting-and-analytics",
          },
          { label: "API", href: "/product/api", badge: "Coming soon" },
          { label: "Webhooks", href: "/products/webhooks" },
          { label: "Security", href: "/product/security" },
          { label: "Mobile app", href: "/products/mobile-app" },
        ],
      },
      {
        title: "Platform",
        links: [
          { label: "Platform overview", href: "/platform" },
          { label: "AI Concierge", href: "/products/ai-concierge" },
          { label: "Failure prediction", href: "/products/failure-prediction" },
          {
            label: "Compliance dashboard",
            href: "/products/compliance-dashboard",
          },
          { label: "Instant settlement", href: "/platform/instant-settlement" },
          { label: "Reconciliation", href: "/platform/reconciliation" },
          { label: "Bank connections", href: "/platform/bank-connections" },
          { label: "Open banking", href: "/platform/open-banking" },
          { label: "Multi-entity", href: "/platform/multi-entity" },
          { label: "Trust", href: "/trust" },
        ],
      },
      {
        title: "Partners",
        links: [
          { label: "Accounting firms", href: "/partners/accounting-firms" },
          {
            label: "Banking infrastructure partners",
            href: "/partners/banking-infrastructure",
          },
          {
            label: "Open banking partners",
            href: "/partners/open-banking",
          },
          { label: "Compliance partners", href: "/partners/compliance" },
          { label: "Reseller partners", href: "/partners/reseller" },
          { label: "API partners", href: "/partners/api" },
          { label: "Technology partners", href: "/partners/technology" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "Startups", href: "/solutions/startups" },
          { label: "Mid-size companies", href: "/solutions/mid-size" },
          { label: "Enterprises", href: "/solutions/enterprise" },
        ],
      },
      {
        title: "Free tools and resources",
        links: [
          {
            label: "Direct debit calculator",
            href: "/tools/direct-debit-calculator",
          },
          {
            label: "Failed payment cost calculator",
            href: "/tools/failed-payment-cost-calculator",
          },
          {
            label: "Settlement time calculator",
            href: "/tools/settlement-time-calculator",
          },
          {
            label: "Switching cost calculator",
            href: "/tools/switching-cost-calculator",
          },
          { label: "Find an integration", href: "/integrations" },
          { label: "Payment timing guide", href: "/guides/payment-timing" },
          { label: "Glossary", href: "/glossary" },
          { label: "Switching guide", href: "/guides/switching" },
          { label: "Answers Hub", href: "/answers" },
        ],
      },
      {
        title: "Legal & Trust",
        links: [
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Terms of Service", href: "/legal/terms" },
          { label: "Cookie Policy", href: "/legal/cookies" },
          { label: "Acceptable Use Policy", href: "/legal/acceptable-use" },
          { label: "Complaints Policy", href: "/legal/complaints" },
          { label: "Safeguarding Policy", href: "/legal/safeguarding" },
          { label: "Responsible AI", href: "/legal/responsible-ai" },
          { label: "Accessibility Statement", href: "/legal/accessibility" },
          {
            label: "Modern Slavery Statement",
            href: "/legal/modern-slavery",
          },
        ],
      },
    ],

    askAi: {
      heading: "Ask AI about Sprout",
      platforms: [
        {
          id: "chatgpt",
          label: "ChatGPT",
          href: "https://chat.openai.com/?q=What+is+Sprout%2C+the+payments+platform%3F",
        },
        {
          id: "claude",
          label: "Claude",
          href: "https://claude.ai/new?q=What+is+Sprout%2C+the+payments+platform%3F",
        },
        {
          id: "perplexity",
          label: "Perplexity",
          href: "https://www.perplexity.ai/search?q=What+is+Sprout%2C+the+payments+platform%3F",
        },
        {
          id: "gemini",
          label: "Gemini",
          href: "https://gemini.google.com/app?q=What+is+Sprout%2C+the+payments+platform%3F",
        },
      ],
    },

    countries: [
      { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
      { code: "IE", label: "Ireland", flag: "🇮🇪" },
      { code: "DE", label: "Germany", flag: "🇩🇪" },
      { code: "FR", label: "France", flag: "🇫🇷" },
      { code: "NL", label: "Netherlands", flag: "🇳🇱" },
    ],

    wordmark: "Sprout AI",

    bottom: {
      legalLinks: [
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Cookie Policy", href: "/legal/cookies" },
        {
          label: "Your Privacy Choices",
          href: "/legal/privacy-choices",
          icon: "privacy-choices",
        },
        { label: "Manage Preferences", href: "/legal/cookies#preferences" },
      ],

      copyrightNotice:
        '© 2026 Krandel Labs Ltd. "Sprout" and the Sprout logo are registered trademarks of the company.',

      legalParagraphs: [
        "Sprout is a trading name of Krandel Labs Ltd, a company registered in England and Wales with company number 16284957. Registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.",
        "Krandel Labs Ltd is authorised and regulated by the Financial Conduct Authority as a Small Payment Institution under the Payment Services Regulations 2017, firm reference number 1029384.",
        "Sprout's recurring direct debit collections are processed via Bacs, and are submitted on Sprout's behalf by Modulr FS Limited, a company authorised and regulated by the Financial Conduct Authority as an Electronic Money Institution, firm reference number 900573, and a direct participant of the Bacs payment scheme.",
        "Open banking connectivity, account verification, and instant bank payments are provided by TrueLayer Limited, authorised and regulated by the Financial Conduct Authority as a Payment Initiation Service Provider under the Payment Services Regulations 2017.",
        "Identity verification, business checks, and Know Your Business (KYB) screening are conducted by Sumsub UK Ltd on Sprout's behalf. Ongoing anti-money laundering monitoring and sanctions screening are provided by ComplyAdvantage UK Ltd.",
        "Client funds collected by Sprout on behalf of merchants are held in segregated safeguarding accounts in accordance with the Payment Services Regulations 2017, and are never used for Krandel Labs Ltd's own operating purposes, lending, or investment activities.",
        "Sprout is not a bank and does not accept deposits. Funds processed through Sprout are not covered by the Financial Services Compensation Scheme (FSCS). Safeguarded funds are instead protected under the statutory safeguarding requirements set out in the Payment Services Regulations 2017 and supervised by the Financial Conduct Authority.",
        "International collections processed outside the United Kingdom, including SEPA Direct Debit collections within the European Economic Area, are subject to the relevant local payment scheme rules and may be processed by regulated entities other than those listed above. Further detail on the specific entity responsible for processing any given transaction is available within the merchant dashboard and on request.",
        "Visa, Mastercard, and other payment network marks referenced on this site are registered trademarks of their respective owners. All other trademarks, logos, and service marks displayed on this site are the property of their respective owners and their use does not imply any affiliation with or endorsement by Sprout or Krandel Labs Ltd unless explicitly stated.",
        '"Sprout," the Sprout logo, "AI Concierge," and other Sprout product names referenced on this site are trademarks or trade names of Krandel Labs Ltd.',
      ],

      ctaLine:
        "Join the growing number of UK businesses simplifying how they get paid with Sprout.",

      waitlist: {
        placeholder: "Enter your work email",
        buttonLabel: "Join the waitlist",
      },

      address: {
        label: "London Office",
        name: "Krandel Labs Ltd",
        lines: ["71-75 Shelton Street", "Covent Garden", "London", "WC2H 9JQ"],
      },
    },
  },
} as const;
