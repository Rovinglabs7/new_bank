/**
 * Edit copy here, this is the single source of truth for the Careers page.
 * Every heading, paragraph and list item can be replaced here without
 * touching any component or layout code.
 */

export type CareerImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

export type CoreValue = {
  number: string;
  title: string;
  description: string;
};

export type Department = {
  name: string;
  description: string;
};

export type Perk = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

const heroImages: CareerImage[] = [
  { src: "/pexels-a-darmel-9040539.jpg", alt: "Colleagues collaborating around a laptop in a bright office" },
  { src: "/pexels-diva-plavalaguna-6150366.jpg", alt: "Team members reviewing a project together at a desk" },
  { src: "/pexels-mart-production-7550308.jpg", alt: "Coworkers having a relaxed discussion in a meeting room" },
  { src: "/pexels-mart-production-7550583.jpg", alt: "Small team brainstorming around a whiteboard" },
  { src: "/pexels-mikhail-nilov-7886850.jpg", alt: "Employees working together at a shared table" },
  { src: "/pexels-rdne-6518865.jpg", alt: "A team celebrating a successful project milestone" },
];

const operationsImages: CareerImage[] = [
  { src: "/pexels-rdne-7414009.jpg", alt: "Operations team reviewing dashboards together" },
  { src: "/hero/team-laptop.jpg", alt: "Small team reviewing a project together on a laptop" },
  { src: "/videos/product-walkthrough.mp4", alt: "Walkthrough of the Praevor product in action", type: "video" },
];

const departmentImages: CareerImage[] = [
  { src: "/hero/woman-tablet.png", alt: "Team member reviewing data on a tablet" },
  { src: "/hero/woman-box.jpg", alt: "Team member carrying a box through a workspace" },
  { src: "/hero/woman-phone.webp", alt: "Team member on a phone call at a desk" },
  { src: "/hero/man-counter.png", alt: "Team member working at a counter workstation" },
];

export const careers = {
  hero: {
    heading: "Come help every business on the planet get paid on time.",
    subtext:
      "We are a small team with a big mission. Join us and build the payments platform that gives every business the reliability only the largest companies could afford.",
    images: heroImages,
  },

  about: {
    heading: "About us",
    paragraphs: [
      "Praevor began with a pattern we kept seeing inside growing businesses: reliable people running good businesses, quietly let down by payment infrastructure that wasn't built for them.",
      "We built Praevor as a simple way to give every business recurring payments that just work: collections that run themselves, compliance you can actually see, and money that arrives when it's supposed to.",
    ],
  },

  contact: {
    heading: "Contact us",
    items: [
      { label: "Address", value: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom" },
      { label: "Phone", value: "+44 7353 179684" },
      { label: "Email", value: "Careers@praevor.com" },
    ],
  },

  operations: {
    heading: "Join our team building the payments platform that every business deserves.",
    cta: { label: "See open roles", href: "#open-roles" },
    images: operationsImages,
  },

  moreThanCulture: {
    heading: "More than a culture, it's an asset.",
    body:
      "We're building payment infrastructure for ambitious teams. Whether it's recovering a failed payment or settling money on time, we put our backs into it. The by-product? One of the best places to work. You should totally join us.",
  },

  coreValues: {
    eyebrow: "Our core values",
    heading: "What we stand for",
    items: [
      {
        number: "01",
        title: "Customers first",
        description:
          "The businesses using Praevor are why we exist. We obsess over making getting paid genuinely easier.",
      },
      {
        number: "02",
        title: "Better together",
        description:
          "One platform beats a dozen disconnected providers. We build for teams, not lone operators.",
      },
      {
        number: "03",
        title: "Keep it real",
        description:
          "No theatre, no vanity metrics. We ship what works and talk honestly about what doesn't.",
      },
      {
        number: "04",
        title: "Keep it simple",
        description:
          "Complexity is easy. Clarity is hard. We choose the path that makes Praevor feel obvious.",
      },
      {
        number: "05",
        title: "Set the bar high",
        description:
          "Good enough isn't. We hold ourselves to the standard of a payment platform you'd trust with your own money.",
      },
      {
        number: "06",
        title: "Never stop learning",
        description:
          "Every customer conversation teaches us something. We listen, adapt, and ship again.",
      },
    ] satisfies CoreValue[],
  },

  departments: {
    heading: "What's behind a great product? An even greater team",
    body:
      "Our currency is collaboration. Our work, a blend of ideas and efforts. The result, a stronger bond and a world class product. We compound these by investing in the best people.",
    cta: { label: "See open roles", href: "#open-roles" },
    images: departmentImages,
    items: [
      {
        name: "Engineering",
        description:
          "We call them our payment mechanics: superheroes in their own right. They turn ambitious ideas into infrastructure businesses trust with their revenue.",
      },
      {
        name: "Design",
        description:
          "Ever fallen in love with how Praevor feels? Thank the design team. Their thirst for simplicity and attention to detail is unmatched.",
      },
      {
        name: "Customer Experience",
        description:
          "Customer satisfaction and obsession are values our CX team holds to heart. They make sure every business feels supported, not sold to.",
      },
      {
        name: "Operations",
        description:
          "Operations is what we do. This team ensures we practice what we preach, running a tight ship so our customers can too.",
      },
      {
        name: "Finance",
        description:
          "Numbers don't lie. And neither does the finance team. They keep our books in check and the company financially fit.",
      },
      {
        name: "People and Culture",
        description:
          "They make sure we have the resources we need to stay happy, productive, and building something worth staying for.",
      },
      {
        name: "Product",
        description:
          "A synergy of business, engineering and design: they bring harmony to Praevor and hold it in perfect balance.",
      },
      {
        name: "Legal and Compliance",
        description:
          "They balance the scale of regulation and trust beautifully, protecting the team and our merchants from within and without.",
      },
      {
        name: "Growth",
        description:
          "Master storytellers who work day in, day out to tell the Praevor story. If you've ever heard of us, it's thanks to them.",
      },
    ] satisfies Department[],
  },

  perks: {
    heading: "Have a look at some of the perks we enjoy",
    featured: {
      title: "Flexible working",
      description: "Work from where you're most productive. We trust you to get great work done.",
    },
    items: [
      { title: "Learning and development", description: "" },
      { title: "Health and wellbeing", description: "" },
      { title: "Flexible time off", description: "" },
      { title: "Small team big scope", description: "" },
      { title: "Team retreats", description: "" },
    ] satisfies Perk[],
  },

  howWeHire: {
    heading: "How we hire",
    body:
      "You've heard recruiters spend 6 seconds on a resume? Well, we don't. We give every application the same time and consideration.",
    steps: [
      { number: "01", title: "Apply" },
      { number: "02", title: "Interview" },
      { number: "03", title: "Decision" },
    ],
    applyFaqs: [
      {
        question: "How do I put in the best application?",
        answer:
          "Tell us specifically why you'd be a great fit and let your work speak for itself. We read every application in full.",
      },
      {
        question: "Can I re-apply for a role?",
        answer:
          "Yes. If a role wasn't the right fit the first time, your circumstances or our needs may have changed since.",
      },
    ] satisfies Faq[],
    callout: {
      heading: "We give you room to evolve",
      body:
        "Whether you're looking to grow from support into product, or operations into engineering, we hire for potential and give you the scope to prove it. Small team, big ownership.",
      cta: { label: "Read our stories", href: "#" },
    },
  },

  applicationForm: {
    heading: "Join our team",
    subtext:
      "We don't currently have open roles listed, but reach out anyway if you think you'd be a great fit.",
    cardIntro: "Pick the team you'd like to join to get started.",
    submitLabel: "Submit application",
  },

  faqs: {
    heading: "Careers FAQ",
    items: [
      {
        question: "Do you accept contract workers or placements?",
        answer:
          "Occasionally, depending on the team's needs at the time. If a contract or placement role is open, it will be listed alongside our other open roles.",
      },
      {
        question: "Do you have a graduate trainee scheme?",
        answer:
          "Not currently. As a small team we tend to hire for specific roles rather than running a structured graduate programme, but we welcome applications from candidates at any stage of their career.",
      },
      {
        question: "I saw a role recently but can't find it anymore. Can I still apply?",
        answer:
          "Yes. Roles can close once we've found the right person, but you're welcome to submit a general application below and we'll keep you in mind for similar openings.",
      },
      {
        question: "I am a recruiter, can we work together?",
        answer:
          "We mostly hire directly, but if you think you have something genuinely useful to offer, send us a note via the application form and tell us a bit about how you work.",
      },
    ] satisfies Faq[],
  },

  closing: {
    heading: "Ready to build something worth building?",
    body:
      "We're a small team with a lot left to build. If that sounds like your kind of problem, we'd like to hear from you.",
    cta: { label: "See open roles", href: "#open-roles" },
  },
};
