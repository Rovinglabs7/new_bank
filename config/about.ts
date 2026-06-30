/**
 * Edit copy here, this is the single source of truth for the About page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type CtaLink = {
  label: string;
  href: string;
};

export type AboutCard = {
  title: string;
  body: string;
  cta?: CtaLink;
};

export const about = {
  hero: {
    eyebrow: "About Sprout",
    heading: "Recurring payments, rebuilt for the way businesses run today",
    subtext:
      "Sprout is a recurring payments platform for growing UK and European businesses. We automate collections, cut down failed payments, and give finance teams real visibility into recurring revenue, without the manual chasing.",
    primaryCta: { label: "Get in touch", href: "/contact/sales" } satisfies CtaLink,
    secondaryCta: { label: "Join the team", href: "/careers" } satisfies CtaLink,
  },

  trustStrip: {
    heading: "Built for businesses that run on recurring revenue",
    subtext:
      "Built for gyms, SaaS companies, charities, and membership organisations. Small to growing. Across Europe.",
  },

  betterWay: {
    heading: "It's time for a better way",
    paragraphs: [
      "Chasing payments shouldn't be a part-time job. For most recurring-revenue businesses, getting paid still means manual reminders, spreadsheets stitched together from bank statements, and card payments that quietly fail in the background until a customer notices their access has lapsed.",
      "Sprout automates the collection itself, through Direct Debit and open banking, gives you visibility into what's coming in and what's at risk, and reduces the number of payments that fail in the first place. It's all built on regulated infrastructure, so the plumbing underneath is something you don't have to think about.",
    ],
  },

  integrations: {
    heading: "Built to connect with what you already use",
    body:
      "Sprout connects with the accounting tools you already run your business on, including Xero and QuickBooks, so every payment reconciles automatically instead of becoming another manual task.",
    cta: { label: "See our partners", href: "/partners" } satisfies CtaLink,
  },

  neverJustBusiness: {
    heading: "It's never just business",
    cards: [
      {
        title: "People first",
        body:
          "Behind every business we work with are real people trying to get paid on time. We build Sprout, and support the people using it, with that in mind.",
        cta: { label: "Reach out", href: "/contact/sales" },
      },
      {
        title: "Compliance you can actually see",
        body:
          "Merchants get real-time visibility into account reviews and compliance status, directly from their dashboard, with no silent holds or vague status updates.",
        cta: { label: "Learn how it works", href: "/security" },
      },
      {
        title: "Built on regulated foundations",
        body:
          "Krandel Labs Ltd is authorised and regulated by the Financial Conduct Authority, and we work with regulated infrastructure partners for banking, open banking, and identity verification.",
        cta: { label: "Learn more", href: "/security" },
      },
    ] satisfies AboutCard[],
  },

  firstTimeHearing: {
    heading: "You may be hearing about us for the first time",
    body:
      "Sprout is a newer, growing company. We don't have a long press history yet, and we'd rather be upfront about that than overstate where we are. If you want to keep up with what we're building, our press page is the best place to start.",
    cta: { label: "Visit our press page", href: "/press" } satisfies CtaLink,
  },

  lastButNotLeast: {
    heading: "Last but not least",
    cards: [
      {
        title: "Our editorial guidelines",
        body: "How we research, write, and fact-check the content we publish.",
        cta: { label: "Read our guidelines", href: "/editorial-guidelines" },
      },
      {
        title: "Accessibility statement",
        body: "Our ongoing commitment to making Sprout usable by everyone.",
        cta: { label: "Read our statement", href: "/legal/accessibility" },
      },
    ] satisfies AboutCard[],
  },

  closing: {
    heading: "Have a question? Get in touch",
    cta: { label: "Get in touch", href: "/contact/sales" } satisfies CtaLink,
  },
} as const;
