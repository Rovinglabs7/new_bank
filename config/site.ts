/**
 * Edit copy here, this is the single source of truth for the Praevor site.
 * No Framer hydration will overwrite these values.
 */
export const site = {
  brand: "Praevor",
  title: "Praevor, Payments for ambitious teams",
  description:
    "Getting paid should be the easiest part of running your business.",

  announcementBar: {
    tag: "New",
    message:
      "Be among the first to experience Praevor. We're inviting a small group of businesses to help us build a better way to collect payments.",
  },

  nav: [
    { label: "Products", href: "#products" },
    { label: "Resources", href: "#resources" },
    { label: "Pricing", href: "/pricing" },
  ],

  productsMenu: {
    columns: [
      {
        heading: "Collect",
        items: [
          {
            title: "Recurring payments",
            subtext: "Automatic direct debit collection, every cycle",
            href: "/products/subscription-payments",
          },
          {
            title: "One-off payments",
            subtext: "Instant bank payments via open banking",
            href: "/products/instant-bank-pay",
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
            subtext: "Change dates, pause, or resume, no cancellations",
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

  resourcesMenu: {
    columns: [
      {
        heading: "Explore",
        items: [
          {
            title: "Customer Stories",
            subtext: "See how businesses grow with Praevor.",
            href: "/customers",
          },
          {
            title: "Blog",
            subtext: "Product updates, insights and company news.",
            href: "/blog",
          },
          {
            title: "Payment Guides",
            subtext: "Practical guides to collecting payments more efficiently.",
            href: "/guides/payment-timing",
          },
          {
            title: "Failed Payment Calculator",
            subtext: "Calculate the true cost of failed payments.",
            href: "/resources/failed-payment-calculator",
          },
          {
            title: "Settlement Time Calculator",
            subtext: "Know exactly when your payments will settle.",
            href: "/resources/settlement-calculator",
          },
          {
            title: "Integrations",
            subtext: "Discover the tools Praevor works with.",
            href: "/integrations",
          },
          {
            title: "What's New",
            subtext: "See the latest product releases and improvements.",
            href: "/releases",
          },
        ],
      },
      {
        heading: "Help & Developers",
        items: [
          {
            title: "Help Centre",
            subtext: "Find answers to common questions.",
            href: "/help",
          },
          {
            title: "Developer Docs",
            subtext: "Build with the Praevor API.",
            href: "/developers/docs",
          },
          {
            title: "API Reference",
            subtext: "Authentication, endpoints and examples.",
            href: "/developers/api-reference",
          },
          {
            title: "System Status",
            subtext: "View live platform availability.",
            href: "/status",
          },
          {
            title: "Changelog",
            subtext: "See what's changed in every release.",
            href: "/changelog",
          },
        ],
      },
      {
        heading: "Company",
        items: [
          {
            title: "About Praevor",
            subtext: "Learn about our mission and team.",
            href: "/about",
          },
          {
            title: "Security",
            subtext: "How we protect your business and customers.",
            href: "/security",
          },
          {
            title: "Partners",
            subtext: "Become a partner or integration partner.",
            href: "/partners",
          },
          {
            title: "Contact Sales",
            subtext: "Talk to our team.",
            href: "/contact/sales",
          },
          {
            title: "Contact Support",
            subtext: "Get technical help when you need it.",
            href: "/contact/support",
          },
        ],
      },
    ],
    featured: {
      heading: "Getting Started",
      body: "Launch your first payment in under 10 minutes.",
      ctaLabel: "View Quick Start Guide",
      href: "/developers/docs",
    },
  },

  navActions: {
    login: { label: "Sign in", href: "/signin" },
    demo: { label: "Book a demo", href: "/contact-sales" },
  },

  hero: {
    headline:
      "Getting paid should be the easiest part of running your business.",
    subheadline:
      "Praevor connects to your business, automates payment operations, and makes getting paid simpler for you and your customers.",
    primaryCta: { label: "Get started for free", href: "/signup" },
  },

  footer: {
    brand: "praevor.",
    tagline: "Recurring payments that run themselves.",

    contact: {
      heading: "Contact us",
      groups: [
        {
          label: "Sales",
          items: [
            { label: "Book a demo", href: "/contact-sales" },
            { label: "+44 7353 179684", href: "tel:+447353179684" },
          ],
        },
        {
          label: "Support",
          items: [
            { label: "Request support", href: "/support" },
            { label: "support@praevor.com", href: "mailto:support@praevor.com" },
          ],
        },
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
          { label: "Recurring payments", href: "/products/subscription-payments" },
          { label: "One-off payments", href: "/products/instant-bank-pay" },
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
          { label: "Security", href: "/security" },
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
      heading: "Ask AI about Praevor",
      platforms: [
        {
          id: "chatgpt",
          label: "ChatGPT",
          href: "https://chat.openai.com/?q=What+is+Praevor%2C+the+payments+platform%3F",
        },
        {
          id: "claude",
          label: "Claude",
          href: "https://claude.ai/new?q=What+is+Praevor%2C+the+payments+platform%3F",
        },
        {
          id: "perplexity",
          label: "Perplexity",
          href: "https://www.perplexity.ai/search?q=What+is+Praevor%2C+the+payments+platform%3F",
        },
        {
          id: "gemini",
          label: "Gemini",
          href: "https://gemini.google.com/app?q=What+is+Praevor%2C+the+payments+platform%3F",
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

    wordmark: "Praevor AI",

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
        '© 2026 Krandel Labs Ltd. "Praevor" and the Praevor logo are registered trademarks of the company.',

      legalParagraphs: [
        "Praevor is a trading name of Krandel Labs Ltd, a company registered in England and Wales with company number 16284957. Registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.",
        "Krandel Labs Ltd is authorised and regulated by the Financial Conduct Authority as a Small Payment Institution under the Payment Services Regulations 2017, firm reference number 1029384.",
        "Praevor's recurring direct debit collections are processed via Bacs, and are submitted on Praevor's behalf by Modulr FS Limited, a company authorised and regulated by the Financial Conduct Authority as an Electronic Money Institution, firm reference number 900573, and a direct participant of the Bacs payment scheme.",
        "Open banking connectivity, account verification, and instant bank payments are provided by TrueLayer Limited, authorised and regulated by the Financial Conduct Authority as a Payment Initiation Service Provider under the Payment Services Regulations 2017.",
        "Identity verification, business checks, and Know Your Business (KYB) screening are conducted by Sumsub UK Ltd on Praevor's behalf. Ongoing anti-money laundering monitoring and sanctions screening are provided by ComplyAdvantage UK Ltd.",
        "Client funds collected by Praevor on behalf of merchants are held in segregated safeguarding accounts in accordance with the Payment Services Regulations 2017, and are never used for Krandel Labs Ltd's own operating purposes, lending, or investment activities.",
        "Praevor is not a bank and does not accept deposits. Funds processed through Praevor are not covered by the Financial Services Compensation Scheme (FSCS). Safeguarded funds are instead protected under the statutory safeguarding requirements set out in the Payment Services Regulations 2017 and supervised by the Financial Conduct Authority.",
        "International collections processed outside the United Kingdom, including SEPA Direct Debit collections within the European Economic Area, are subject to the relevant local payment scheme rules and may be processed by regulated entities other than those listed above. Further detail on the specific entity responsible for processing any given transaction is available within the merchant dashboard and on request.",
        "Visa, Mastercard, and other payment network marks referenced on this site are registered trademarks of their respective owners. All other trademarks, logos, and service marks displayed on this site are the property of their respective owners and their use does not imply any affiliation with or endorsement by Praevor or Krandel Labs Ltd unless explicitly stated.",
        '"Praevor," the Praevor logo, "AI Concierge," and other Praevor product names referenced on this site are trademarks or trade names of Krandel Labs Ltd.',
      ],

      ctaLine:
        "Join the growing number of UK businesses simplifying how they get paid with Praevor.",

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
