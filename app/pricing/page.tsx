import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingFees } from "@/components/pricing/PricingFees";
import { PricingAddons } from "@/components/pricing/PricingAddons";
import { PricingGlance } from "@/components/pricing/PricingGlance";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingClosingCTA } from "@/components/pricing/PricingClosingCTA";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { site } from "@/config/site";

export const metadata = {
  title: `Pricing | ${site.brand}`,
  description:
    "Simple, transparent pricing for collecting payments. No setup fees, no hidden charges.",
};

export default function PricingPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <PricingHero />
        <CurrencyProvider>
          <PricingPlans />
          <PricingCalculator />
          <PricingComparison />
          <PricingFees />
          <PricingAddons />
        </CurrencyProvider>
        <PricingGlance />
        <PricingFAQ />
        <PricingClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
