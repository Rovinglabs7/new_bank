import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SecurityHero } from "@/components/security/SecurityHero";
import { SecurityTrustStrip } from "@/components/security/SecurityTrustStrip";
import { SecurityTrustCards } from "@/components/security/SecurityTrustCards";
import { SecurityPillars } from "@/components/security/SecurityPillars";
import { SecurityClosingCTA } from "@/components/security/SecurityClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `Security | ${site.brand}`,
  description:
    "How Sprout keeps your business and your customers safe, from regulated infrastructure to independently verified identity checks.",
};

export default function SecurityPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <SecurityHero />
        <SecurityTrustStrip />
        <SecurityTrustCards />
        <SecurityPillars />
        <SecurityClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
