import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GlossaryIndex } from "@/components/glossary/GlossaryIndex";
import { site } from "@/config/site";

export const metadata = {
  title: `Payment Glossary | ${site.brand}`,
  description:
    "Plain-English definitions of 70+ payment terms. From direct debit to open banking — everything your business needs to know.",
};

export default function GlossaryPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <GlossaryIndex />
      </main>
      <Footer />
    </div>
  );
}
