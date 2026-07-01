/**
 * Edit copy here, this is the single source of truth for the Subscription Payments page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type SPValueProp = {
  heading: string;
  body: string;
  link?: { label: string; href: string };
};

export type SPStep = {
  number: string;
  heading: string;
  body: string;
  imagePlaceholder: string;
};

export type SPEasyWayItem = {
  heading: string;
  body: string;
  link?: { label: string; href: string };
  imagePlaceholder: string;
};

export type SPFeature = {
  heading: string;
  body: string;
  link?: { label: string; href: string };
  icon: "globe" | "bell" | "sliders" | "cog";
};

export type SPCustomerItem = {
  heading: string;
  body: string;
  link?: { label: string; href: string };
  icon: "check" | "eye" | "shield";
};

export const subscriptionPayments = {
  hero: {
    eyebrow: "Subscription and membership payments",
    heading: "Subscription and membership payments",
    subtext:
      "Cut your costs, keep customers, and even go global. For monthly payments, weekly payments, or anything else.",
    primaryCta: { label: "Sign up", href: "/signup" },
    secondaryCta: { label: "Talk to sales", href: "/contact/sales" },
  },

  toggle: {
    tabs: ["For small business", "For enterprise"] as const,
    valueProps: [
      {
        heading: "Lower costs",
        body: "Card payments are expensive and failure-prone. Praevor is built on bank payments, which cuts out unnecessary costs.",
        link: { label: "Learn more", href: "/products/subscription-payments" },
      },
      {
        heading: "Fewer failures",
        body: "AI flags at-risk payments before they fail, and retries intelligently, recovering significantly more than a fixed-schedule retry ever could.",
      },
      {
        heading: "Go global",
        body: "Provide a localised payment experience to customers across 30+ countries, including the UK, Eurozone, US, and Australia.",
        link: { label: "Learn more", href: "/products/international-payments" },
      },
    ] satisfies SPValueProp[],
  },

  howItWorks: {
    heading: "How it works",
    steps: [
      {
        number: "01",
        heading: "Choose what kind of payment to collect",
        body: "Maybe you want to add 'Pay Now' links to your invoices. Or include Praevor in your online checkout. Or set up automatic, recurring payments for new members or subscribers.",
        imagePlaceholder: "payment type selection screen mockup",
      },
      {
        number: "02",
        heading: "Set up, send, or schedule",
        body: "When your customer chooses to pay by Praevor, they'll either make an instant bank payment, or set up a flexible Direct Debit so you can collect future payments automatically, even if dates or amounts change. You can do both at once.",
        imagePlaceholder: "mandate setup flow mockup",
      },
      {
        number: "03",
        heading: "Sit back and relax",
        body: "Less time spent chasing, more time spent running your business. That's the entire idea.",
        imagePlaceholder: "dashboard overview mockup",
      },
      {
        number: "04",
        heading: "Easily amend plans",
        body: "Edit and pause subscriptions in a matter of clicks, making upgrades, downgrades, and one-off charges without your customers needing to lift a finger.",
        imagePlaceholder: "plan editing screen mockup",
      },
    ] satisfies SPStep[],
  },

  easyWay: {
    heading: "The easy way for your customers to pay",
    items: [
      {
        heading: "Directly on your website",
        body: "Accept payments on your website in minutes, with customisable payment pages. Or integrate with your existing checkout using our intuitive",
        link: { label: "API", href: "/developers" },
        imagePlaceholder: "checkout integration mockup",
      },
      {
        heading: "Using a secure link",
        body: "To set up automated, recurring payments, your customers only need to provide their payment details once, using a secure online form. Send them the link or add it to your website.",
        imagePlaceholder: "secure payment link screen mockup",
      },
    ] satisfies SPEasyWayItem[],
  },

  features: {
    heading: "Made for recurring payments",
    items: [
      {
        heading: "International payments",
        body: "Collect from 30+ countries without needing a local bank account.",
        icon: "globe",
      },
      {
        heading: "Real-time alerts",
        body: "Notifications keep you aware of any failed payments or cancellations, so you're never left wondering.",
        icon: "bell",
      },
      {
        heading: "Flexible payments",
        body: "Full control over your customers' payment plans. Amend or pause plans, and collect one-off charges with ease.",
        icon: "sliders",
      },
      {
        heading: "Fully customisable",
        body: "Customise our out-of-the-box payment pages, or build a bespoke integration using our",
        link: { label: "API", href: "/developers" },
        icon: "cog",
      },
    ] satisfies SPFeature[],
  },

  manage: {
    heading: "Simple to manage",
    body: "Collect and manage payments using our easy-to-use, online dashboard. Easily renew, amend, and pause payment plans. And get full visibility on every transaction.",
    cta: { label: "Sign up to get started", href: "/signup" },
  },

  integrations: {
    heading: "We play nice with others",
    body: "You can use Praevor on its own to collect payments. Or connect it to software you already use to run your business, to manage everything in one place.",
    link: { label: "See all systems Praevor connects with", href: "/integrations" },
  },

  socialProof: {
    heading: "What businesses are saying",
    body: "We're building Praevor with businesses just like yours, not after the fact, but from the start.",
  },

  customerLove: {
    heading: "Your customers will love us too",
    items: [
      {
        heading: "Quick and easy",
        body: "They can pay in a few taps or clicks, on any device. Or set up convenient, automated payments.",
        icon: "check",
      },
      {
        heading: "Transparent",
        body: "Notifications give your customers a heads up before payments are taken. No nasty surprises.",
        icon: "eye",
      },
      {
        heading: "Secure",
        body: "We're authorised by the FCA, GDPR compliant, and any payments collected via our Direct Debit feature are protected by the",
        link: {
          label: "Direct Debit Guarantee",
          href: "/resources/direct-debit-guarantee",
        },
        icon: "shield",
      },
    ] satisfies SPCustomerItem[],
  },

  testimonials: {
    heading: "What businesses tell us",
    body: "We're early, and we're building this with real businesses from day one. As our first merchants come on board, their stories will live here.",
  },

  closing: {
    heading: "Ready for payment collection that just works?",
    body: "Give Praevor a go, no obligations, with low, pay-as-you-go pricing. And get started in minutes.",
    primaryCta: { label: "Sign up", href: "/signup" },
    secondaryCta: { label: "See pricing", href: "/pricing" },
  },
} as const;
