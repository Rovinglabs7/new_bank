import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { NovaDemoSection } from "@/components/site/NovaDemoSection";
import { Solutions } from "@/components/site/Solutions";
import { BrandStory } from "@/components/site/BrandStory";
import { Integration } from "@/components/site/Integration";
import { CustomerStory } from "@/components/site/CustomerStory";
import { WhoPraevorWorksFor } from "@/components/site/WhoSproutWorksFor";
import { WhoPraevorMarquee } from "@/components/site/WhoSproutMarquee";
import { Footer } from "@/components/site/Footer";
import { RampMotion } from "@/components/ramp/RampMotion";
import {
  RampPlatformBackOffice,
  RampFinanceIntelligence,
} from "@/components/ramp/sections";
import { PaymentOpsCards } from "@/components/site/PaymentOpsCards";
import { NovaLauncher } from "@/components/site/NovaLauncher";

export default function HomePage() {
  return (
    <div className="site-shell">
      <RampMotion />
      <NovaLauncher />
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductShowcase />
      <NovaDemoSection />
      <Solutions />
      <BrandStory />
      <Integration />
      <CustomerStory />
      <main className="ramp-home">
        <RampPlatformBackOffice />
        <RampFinanceIntelligence />
      </main>
      <PaymentOpsCards />
      <WhoPraevorWorksFor />
      <WhoPraevorMarquee />
      <Footer />
    </div>
  );
}
