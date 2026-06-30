/**
 * Edit copy here — this is the single source of truth for the Sprout site.
 * No Framer hydration will overwrite these values.
 */
export const site = {
  brand: "Sprout",
  title: "Sprout — Payments for ambitious teams",
  description:
    "Getting paid should be the easiest part of running your business.",

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
    login: { label: "Sign in", href: "#login" },
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
        { label: "X", href: "https://x.com/sproutpay" },
        { label: "Instagram", href: "https://instagram.com/sproutpay" },
        { label: "LinkedIn", href: "https://linkedin.com/company/sproutpay" },
      ],
    },

    columns: [
      {
        title: "Features",
        links: [
          { label: "Microsoft Teams", href: "/features/microsoft-teams" },
          { label: "WhatsApp", href: "/features/whatsapp" },
          { label: "Slack", href: "/features/slack" },
        ],
      },
      {
        title: "Product",
        links: [
          { label: "Features", href: "/product/features" },
          { label: "How it works", href: "/product/how-it-works" },
          { label: "Integrations", href: "/product/integrations" },
          { label: "Pricing", href: "/pricing" },
          { label: "Security", href: "/product/security" },
          { label: "Book a demo", href: "#demo" },
          { label: "Join the waitlist", href: "/waitlist" },
          { label: "Enterprise", href: "/solutions/enterprise" },
          { label: "API", href: "/product/api", badge: "Coming soon" },
        ],
      },
      {
        title: "Tools",
        links: [
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
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Engineering", href: "/engineering" },
          { label: "Customer stories", href: "/customers" },
          { label: "Glossary", href: "/glossary" },
          { label: "Ambassador Programme", href: "/ambassadors" },
        ],
      },
      {
        title: "Compare",
        links: [
          { label: "vs GoCardless", href: "/compare/gocardless" },
          { label: "vs Stripe", href: "/compare/stripe" },
          { label: "vs a payment bureau", href: "/compare/payment-bureau" },
          {
            label: "vs manual bank transfers",
            href: "/compare/manual-bank-transfers",
          },
          { label: "vs PayPal", href: "/compare/paypal" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Partners", href: "/partners" },
          { label: "Press", href: "/press" },
          { label: "Contact", href: "/contact" },
          { label: "Krandel Labs", href: "/krandel-labs" },
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

    builtWith:
      "Built with intention in London, and everywhere ambitious teams work.",
    copyright: "© 2026 Krandel Labs Ltd. All rights reserved.",
    copyrightLinks: [
      { label: "Cookie Preferences", href: "/legal/cookies#preferences" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],

    legalDisclosure: [
      "Sprout is a trading name of Krandel Labs Ltd, a company registered in England and Wales with company number 16284957.",
      "Registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.",
      "Krandel Labs Ltd is authorised and regulated by the Financial Conduct Authority as a Small Payment Institution under the Payment Services Regulations 2017, firm reference number 1029384.",
      "Sprout's recurring direct debit and open banking payment infrastructure is provided by Modulr FS Limited, authorised and regulated by the Financial Conduct Authority as an Electronic Money Institution, firm reference number 900573. Open banking connectivity and instant bank payments are provided by TrueLayer Limited, authorised and regulated by the Financial Conduct Authority. Identity verification and business checks are conducted by Sumsub UK Ltd. Ongoing anti-money laundering monitoring is provided by ComplyAdvantage UK Ltd.",
      "Client funds collected on behalf of Sprout merchants are held in segregated safeguarding accounts in accordance with the Payment Services Regulations 2017 and are never used for Krandel Labs Ltd's own operating purposes.",
      "Sprout is not a bank. Sprout does not accept deposits. Funds processed through Sprout are not covered by the Financial Services Compensation Scheme (FSCS) but are protected through statutory safeguarding requirements enforced by the Financial Conduct Authority.",
      "Visa and Mastercard are registered trademarks of their respective owners. All other trademarks and service marks belong to their respective owners.",
      '"Sprout" and the Sprout logo are trademarks of Krandel Labs Ltd.',
    ],

    countries: [
      { code: "GB", label: "United Kingdom" },
      { code: "IE", label: "Ireland" },
      { code: "DE", label: "Germany" },
      { code: "FR", label: "France" },
      { code: "NL", label: "Netherlands" },
    ],

    wordmark: "Sprout AI",
  },
} as const;
