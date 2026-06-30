/**
 * Edit copy here, this is the single source of truth for the Security page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type TrustPartner = {
  name: string;
};

export type TrustCard = {
  heading: string;
  body: string;
};

export type SecurityPillar = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export const security = {
  hero: {
    eyebrow: "Security",
    heading: "Built securely from the ground up",
    subheading:
      "Every payment Sprout processes runs through regulated infrastructure, independently verified identity checks, and encryption end to end. Here's exactly how we keep your business and your customers safe.",
  },

  trustStrip: {
    message: "Built on regulated infrastructure",
    partners: [
      { name: "Modulr" },
      { name: "TrueLayer" },
      { name: "Sumsub" },
      { name: "ComplyAdvantage" },
    ] satisfies TrustPartner[],
  },

  trustCards: {
    items: [
      {
        heading: "FCA authorised",
        body: "Krandel Labs Ltd is authorised and regulated by the Financial Conduct Authority as a Small Payment Institution under the Payment Services Regulations 2017, firm reference number 1029384.",
      },
      {
        heading: "Regulated banking infrastructure",
        body: "Bacs Direct Debit collections are submitted via Modulr FS Limited, an Electronic Money Institution, firm reference number 900573, and a direct participant of the Bacs payment scheme. Open banking connectivity and instant payments run through TrueLayer Limited, an authorised Payment Initiation Service Provider.",
      },
      {
        heading: "Independently verified identity checks",
        body: "Business and identity verification (KYB and KYC) is conducted by Sumsub UK Ltd. Ongoing anti-money laundering and sanctions monitoring is provided by ComplyAdvantage UK Ltd.",
      },
    ] satisfies TrustCard[],
  },

  pillars: {
    eyebrow: "Our security pillars",
    heading: "How we keep every payment safe",
    items: [
      {
        title: "GDPR compliance",
        body: "Every piece of data we hold is handled in line with UK GDPR and the Data Protection Act 2018, from collection through to deletion.",
        cta: { label: "Learn more", href: "/legal/gdpr" },
      },
      {
        title: "Direct Debit Guarantee",
        body: "Every Bacs Direct Debit collection is protected by the Direct Debit Guarantee, so customers can claim an immediate refund from their bank for any payment collected in error.",
        cta: { label: "Learn more", href: "/resources/direct-debit-guarantee" },
      },
      {
        title: "Safeguarded client funds",
        body: "Funds collected on behalf of merchants are held in segregated safeguarding accounts under the Payment Services Regulations 2017, and are never used for Krandel Labs Ltd's own operating purposes.",
      },
      {
        title: "Strong encryption end to end",
        body: "Data is encrypted in transit using TLS and encrypted at rest, so information stays protected wherever it travels or sits.",
      },
      {
        title: "Compliance you can actually see",
        body: "Merchants get real-time visibility into account reviews and compliance status, directly from their dashboard, with no silent holds or vague status updates.",
      },
      {
        title: "Verified at the point of setup",
        body: "Every business is verified through our KYB process before it can start collecting payments, not after.",
      },
    ] satisfies SecurityPillar[],
  },

  closing: {
    heading: "Ready to get started?",
    primaryCta: { label: "Sign up now", href: "/demo" },
    secondaryCta: { label: "Talk to Sales", href: "/contact/sales" },
    disclaimer:
      "Sprout is not a bank. Funds are safeguarded, not covered by the FSCS.",
  },
};
