/**
 * Edit copy here, this is the single source of truth for the Instant Bank Pay product page.
 * Every heading, paragraph, card label and link can be replaced here without
 * touching any component or layout code.
 */

export type IBPBenefit = {
  id: string;
  heading: string;
  body: string;
};

export type IBPStep = {
  number: string;
  heading: string;
  body: string;
  imagePlaceholderLabel: string;
  demoLink?: { label: string; href: string };
};

export type IBPUseCase = {
  id: string;
  heading: string;
  body: string;
};

export type IBPGettingStartedCard = {
  id: string;
  iconType: "code" | "puzzle" | "question" | "handshake";
  heading: string;
  body: string;
  link: { label: string; href: string };
};

export const instantBankPay = {
  hero: {
    eyebrow: "Instant Bank Pay",
    heading: "Collect instant bank transfers",
    subtext:
      "Sprout makes it easy to collect instant payments from your customers, settled in seconds, not days.",
    primaryCta: { label: "Sign up", href: "/signup" },
    secondaryCta: { label: "Request a call", href: "/contact/sales" },
    visualAriaLabel:
      "Hero visual placeholder, success/confirmation screen mockup in Sprout brand colours",
  },

  era: {
    heading: "Welcome to the era of 'pay by bank'",
    paragraphs: [
      "The current options for one-off payments are limited. Cards carry expensive transaction fees. Bank transfers offer a poor customer experience. Direct Debit is not built for one-off collections.",
      "Instant Bank Pay is the Sprout feature that lets your customers pay by bank, using Faster Payments. These instant transfers mean better visibility for you and your customers, save you time chasing one-off payments, and create a smoother experience from start to finish.",
    ],
  },

  benefits: {
    heading: "Benefits of instant payments",
    items: [
      {
        id: "instant-confirmation",
        heading: "Instant confirmation",
        body: "Instant transfers mean real-time confirmation for you and your payers.",
      },
      {
        id: "payer-conversion",
        heading: "Optimise payer conversion",
        body: "Frictionless authorisation, no card details to enter.",
      },
      {
        id: "reduce-fees",
        heading: "Reduce fees",
        body: "Significantly cheaper than online card transactions.",
      },
      {
        id: "less-stress",
        heading: "Less stress",
        body: "Spend less time chasing down late or failed payments.",
      },
    ] satisfies IBPBenefit[],
  },

  builderCallout: {
    badge: "New",
    heading: "Try our Payment Builder",
    body: "Customise your business's payment settings and branding for one-off or subscription payments, even before signing up.",
    cta: { label: "Begin", href: "/signup" },
  },

  demo: {
    heading: "Try instant bank payments yourself",
    body: "Curious what the one-off payment experience feels like with Sprout? Watch the 60-second walkthrough below.",
    videoPlaceholderCaption:
      "Demo video placeholder, replace with real Instant Bank Pay walkthrough video once live",
  },

  howItWorks: {
    heading: "How instant payments work",
    steps: [
      {
        number: "01",
        heading: "Create an instant bank payment request",
        body: "Add Instant Bank Pay to your checkout, or send your customer a link requesting payment.",
        imagePlaceholderLabel: "Checkout/payment request screen mockup",
      },
      {
        number: "02",
        heading: "Customer authorises payment",
        body: "We connect your customer to their bank and they authorise the instant transfer in seconds.",
        imagePlaceholderLabel: "Bank authorisation screen mockup",
        demoLink: {
          label: "Watch a demo of the payer experience",
          href: "/products/instant-bank-pay/demo",
        },
      },
      {
        number: "03",
        heading: "Payment completed",
        body: "Once payment is made, you both receive an instant confirmation.",
        imagePlaceholderLabel: "Confirmation screen mockup",
      },
    ] satisfies IBPStep[],
  },

  useCases: {
    heading: "Instant payments are perfect for:",
    items: [
      {
        id: "first-time-payment",
        heading: "Taking a first-time payment",
        body: "When a new customer signs up, take their first payment instantly before Direct Debit collections begin.",
      },
      {
        id: "easy-invoicing",
        heading: "Easy invoicing",
        body: "Collect one-off payments quickly by sending customers an invoice with an instant bank payment link.",
      },
      {
        id: "one-off-goods",
        heading: "One-off payments for goods or services",
        body: "Let your customers make upfront payments, purchase extras outside their recurring plan, or follow up on a failed payment.",
      },
      {
        id: "account-topup",
        heading: "Account top-up",
        body: "Prompt customers to instantly top up their account balance and continue using your service without interruption.",
      },
    ] satisfies IBPUseCase[],
  },

  socialProof: {
    heading: "What businesses are saying",
    body: "We're building Instant Bank Pay with the same businesses who told us what they needed most: a faster way to get paid without losing customers to failed card payments.",
  },

  gettingStarted: {
    heading: "Getting started with instant bank payments",
    cards: [
      {
        id: "developers",
        iconType: "code",
        heading: "For developers",
        body: "Have a look through our API documentation.",
        link: { label: "View API docs", href: "/developers" },
      },
      {
        id: "partner-user",
        iconType: "puzzle",
        heading: "Using Sprout through a partner?",
        body: "If you connect to Sprout through a partner application, Instant Bank Pay is coming soon.",
        link: { label: "Register your interest", href: "/contact/sales" },
      },
      {
        id: "faq",
        iconType: "question",
        heading: "Do you have more questions?",
        body: "We've put all the frequently asked questions about Instant Bank Pay on a dedicated FAQs page.",
        link: { label: "Visit the FAQs", href: "/help/instant-bank-pay-faqs" },
      },
      {
        id: "sprout-partner",
        iconType: "handshake",
        heading: "Are you a Sprout partner?",
        body: "Give your users Instant Bank Pay, a better way to collect instant bank transfers.",
        link: { label: "Everything you need to know", href: "/partners" },
      },
    ] satisfies IBPGettingStartedCard[],
  },

  closing: {
    heading: "Start collecting instant bank transfers from your customers",
    primaryCta: { label: "Request a call", href: "/contact/sales" },
    secondaryCta: { label: "Sign up", href: "/signup" },
  },
} as const;
