import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GlossaryTerm } from "@/components/glossary/GlossaryTerm";
import { glossaryTerms } from "@/config/glossary";
import { site } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) return {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: "https://praevor.com/glossary",
  };

  return {
    title: `${term.term} | Payment Glossary | ${site.brand}`,
    description: term.definition,
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  const safeTerm = term!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: safeTerm.term,
    description: safeTerm.definition,
    inDefinedTermSet: "https://praevor.com/glossary",
  };

  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlossaryTerm term={safeTerm} />
      </main>
      <Footer />
    </div>
  );
}
