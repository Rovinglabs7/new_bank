/**
 * Edit copy here, this is the single source of truth for the Press page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type CtaLink = {
  label: string;
  href: string;
};

export type FactItem = {
  label: string;
  value: string;
};

export const press = {
  hero: {
    eyebrow: "Newsroom",
    heading: "Press",
    subtext: "News, announcements, and resources for journalists covering Sprout.",
  },

  about: {
    body:
      "Sprout is an AI-native recurring payments platform, built by Krandel Labs Ltd, for businesses that collect one-off or recurring revenue from their customers' bank accounts.",
    contactLine: "For media enquiries, please contact",
    contactEmail: "press@sprout.com",
  },

  latestNews: {
    heading: "Latest news",
    body:
      "We don't have any press coverage to share yet, we're early. If you're a journalist covering payments, fintech, or AI infrastructure and would like to talk to our team, get in touch below.",
    cta: { label: "Contact our press team", href: "mailto:press@sprout.com" },
  },

  brandAssets: {
    heading: "Brand assets",
    body: "Download our logo, brand colours, and usage guidelines.",
    cta: { label: "Download press kit", href: "/assets/sprout-press-kit.zip" },
    note: "Includes: Sprout wordmark (light and dark), logomark, brand colour palette, typography guidelines.",
  },

  companyFacts: {
    heading: "Company facts",
    items: [
      { label: "Founded", value: "2026" },
      { label: "Headquarters", value: "London, United Kingdom" },
      { label: "Founder", value: "Daniel Bamidele" },
      { label: "Parent company", value: "Krandel Labs Ltd" },
      {
        label: "Regulatory status",
        value:
          "Authorised and regulated by the Financial Conduct Authority as a Small Payment Institution under the Payment Services Regulations 2017",
      },
    ] satisfies FactItem[],
  },

  inThePress: {
    heading: "In the press",
    body: "No coverage yet. Check back soon, or",
    linkText: "get in touch",
    linkHref: "mailto:press@sprout.com",
    afterLinkText: "if you're working on a story.",
  },

  mediaEnquiries: {
    heading: "Media enquiries",
    body: "For interviews, comment, or further information, contact:",
    email: "press@sprout.com",
    responseTime: "We aim to respond to media enquiries within 24 hours.",
  },
};
