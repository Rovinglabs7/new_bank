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

  navActions: {
    login: { label: "Log in", href: "#login" },
    demo: { label: "Book a demo", href: "#demo" },
  },

  hero: {
    eyebrow: "Payments platform",
    headline:
      "Getting paid should be the easiest part of running your business.",
    subheadline:
      "Sprout connects to your tools, learns how your company works, and helps you collect revenue with less friction.",
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
