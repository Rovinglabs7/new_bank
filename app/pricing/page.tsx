import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingAddons } from "@/components/pricing/PricingAddons";
import { PricingFees } from "@/components/pricing/PricingFees";
import { PricingEnterprise } from "@/components/pricing/PricingEnterprise";
import { PricingSecurity } from "@/components/pricing/PricingSecurity";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingClosingCTA } from "@/components/pricing/PricingClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `Pricing — ${site.brand}`,
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
        <PricingPlans />
        <PricingComparison />
        <PricingAddons />
        <PricingFees />
        <PricingEnterprise />
        <PricingSecurity />
        <PricingFAQ />
        <PricingClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
