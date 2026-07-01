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
  RampStackBanner,
  RampTeamScale,
} from "@/components/ramp/sections";

export default function HomePage() {
  return (
    <div className="site-shell">
      <RampMotion />
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
        <RampStackBanner />
        <RampTeamScale />
      </main>
      <WhoPraevorWorksFor />
      <WhoPraevorMarquee />
      <Footer />
    </div>
  );
}
