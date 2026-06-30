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
    eyebrow: "Payments platform",
    headline:
      "Getting paid should be the easiest part of running your business.",
    subheadline:
      "Sprout connects to your business, automates payment operations, and makes getting paid simpler for you and your customers.",
    primaryCta: { label: "Get Sprout", href: "#demo" },
    secondaryCta: { label: "See pricing", href: "#pricing" },
  },

  footer: {
    newsletter: {
      title: "Stay up to date",
      description:
        "Get product updates, payment insights and practical guides delivered to your inbox.",
      placeholder: "Your email address",
      button: "Subscribe",
    },
    tagline:
      "Built with ♥ from London, San Francisco, and everywhere ambitious teams work.",
    copyright: "© 2026 Krandel Labs Ltd.",
    columns: [
      {
        title: "Payments",
        links: [
          "Recurring Payments",
          "Instant Bank Pay",
          "Payment Links",
          "International Payments",
          "Pricing",
        ],
      },
      {
        title: "Platform",
        links: [
          "Customer Management",
          "Mandates",
          "Integrations",
          "Analytics",
          "Reporting",
        ],
      },
      {
        title: "Developers",
        links: ["API", "Documentation", "SDKs", "Webhooks", "Status"],
      },
      {
        title: "Solutions",
        links: [
          "Small Business",
          "SaaS",
          "Memberships",
          "Professional Services",
          "Charities",
        ],
      },
      {
        title: "Resources",
        links: ["Help Centre", "Blog", "Customer Stories", "Guides"],
      },
      {
        title: "Company",
        links: ["About", "Careers", "Partners", "Contact", "Legal"],
      },
    ],
    legal: ["Privacy", "Terms", "Cookies", "Security", "Cookie Preferences", "Sitemap"],
  },
} as const;
