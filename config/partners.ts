/**
 * Edit copy here, this is the single source of truth for the Partners page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type CtaLink = {
  label: string;
  href: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type LinkGroup = {
  heading: string;
  items: LinkItem[];
};

export type NumberedItem = {
  number: string;
  title: string;
  body: string;
};

export type Step = {
  number: string;
  title: string;
  body: string;
  linkText?: string;
  linkHref?: string;
};

export type GettingStartedCard = {
  title: string;
  body: string;
  cta?: CtaLink;
};

export type ValueStat = {
  value: string;
  label: string;
};

export const partners = {
  hero: {
    eyebrow: "Praevor for Partners",
    heading: "Become a partner",
    subtext:
      "Let your users collect bank payments directly from your platform, and earn revenue from every transaction.",
    primaryCta: { label: "Partner with us", href: "#form" },
    secondaryCta: { label: "Developer Docs", href: "/developers" },
    videoSrc: "/videos/partners/partner-network-1.mp4",
    videoCaption: "Built for platforms moving real money for real businesses.",
  },

  ecosystem: {
    heading: "Building the next generation of recurring payment partnerships.",
    stats: [
      {
        value: "Revenue share",
        label: "Earn on every successful transaction processed through your integration.",
      },
      {
        value: "Weeks, not months",
        label: "Most integrations are ready to collect bank payments within weeks.",
      },
      {
        value: "Full compliance cover",
        label: "We handle merchant verification and regulatory burden, so you don't have to.",
      },
    ] satisfies ValueStat[],
  },

  addPayments: {
    heading: "Add bank payments to your platform",
    body:
      "Integrate Praevor into your platform and your users will be able to collect one-off and recurring payments without leaving your product.",
    groups: [
      {
        heading: "Payment methods enabled",
        items: [
          { label: "Direct Debit (Bacs, SEPA, and more)", href: "/products/recurring-payments" },
          {
            label: "Instant bank payments (UK, with European coverage expanding)",
            href: "/products/one-off-payments",
          },
          {
            label: "Variable Recurring Payments (open banking-native collections)",
            href: "/products/variable-payments",
          },
        ],
      },
      {
        heading: "Payment intelligence products",
        items: [
          { label: "Failure prediction", href: "/products/failure-prediction" },
          { label: "Advanced fraud protection", href: "/security" },
          { label: "Verified mandates", href: "/products/mandate-management" },
        ],
      },
    ] satisfies LinkGroup[],
  },

  whyPartner: {
    heading: "Why partner with Praevor?",
    body: "We're building a partner programme around the things that actually matter to the platforms we work with.",
    items: [
      {
        number: "01",
        title: "Create a recurring revenue stream",
        body: "You'll receive revenue share on every successful transaction processed within your integration.",
      },
      {
        number: "02",
        title: "Grow alongside us",
        body:
          "As Praevor expands into new markets, our go-to-market support will help you reach more customers in step with us.",
      },
      {
        number: "03",
        title: "Pre-built payment pages",
        body: "Out-of-the-box, customisable checkout flow, optimised for conversion from day one.",
      },
      {
        number: "04",
        title: "Compliance is covered by us",
        body:
          "Partners don't need to be experts in payment regulation. Praevor verifies your merchants and removes the regulatory burden from you.",
      },
    ] satisfies NumberedItem[],
  },

  howItWorks: {
    heading: "How does it work?",
    steps: [
      {
        number: "01",
        title: "Get in touch",
        body:
          "Get in touch and our partner team will support you along the way. If you're a self-starter, {{submit this form}} and register your interest in becoming a Praevor integration partner. Once reviewed, we'll set you up on our partner portal.",
        linkText: "submit this form",
        linkHref: "#form",
      },
      {
        number: "02",
        title: "Build your integration",
        body:
          "In the meantime, access our {{developer documentation}} and start building. Most integrations are ready to collect bank payments within weeks.",
        linkText: "developer documentation",
        linkHref: "/developers",
      },
      {
        number: "03",
        title: "Get your integration approved",
        body:
          "Jump on a call, or send us a demo. Once approved, you'll be an official Praevor partner, we'll help with marketing materials and any support you need.",
      },
      {
        number: "04",
        title: "Join the Praevor ecosystem",
        body:
          "You'll receive revenue share on every transaction processed through your integration. We'll feature you in our partner directory, and a dedicated contact will help you grow the partnership over time.",
      },
    ] satisfies Step[],
  },

  partnerFirst: {
    heading: "We're a partner-first organisation",
    body:
      "We're building Praevor's partner programme from day one with the same principles that matter to every business we work with: clear revenue share, real compliance support, and a team that actually responds.",
    videoSrc: "/videos/partners/partner-network-2.mp4",
    videoCaption: "Every integration is backed by a real partner team, not a support queue.",
    note: "Partner case studies will appear here once our first integrations go live.",
  },

  gettingStarted: {
    heading: "Getting started is easy",
    items: [
      {
        title: "Go-to-market support",
        body: "Learn how to get your users using your integration. We'll provide the content and assets you need, ready to go.",
      },
      {
        title: "Developer docs",
        body: "Everything you need to build your Praevor integration and get it certified.",
        cta: { label: "Read developer docs", href: "/developers" },
      },
      {
        title: "Sandbox",
        body:
          "Create an account in our sandbox environment and test your integration without affecting your live application.",
        cta: { label: "Create a sandbox account", href: "/sandbox-signup" },
      },
    ] satisfies GettingStartedCard[],
  },

  form: {
    heading: "Ready to get started?",
    body: "Submit the form. Register your interest. Our team will get in touch.",
    submitLabel: "Partner with us",
    userOptions: ["Under 1,000", "1,000 to 10,000", "10,000+"],
  },
};
