import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Solutions } from "@/components/site/Solutions";
import { BrandStory } from "@/components/site/BrandStory";
import { Integration } from "@/components/site/Integration";
import { CustomerStory } from "@/components/site/CustomerStory";
import { WhoPraevorWorksFor } from "@/components/site/WhoSproutWorksFor";
import { WhoPraevorMarquee } from "@/components/site/WhoSproutMarquee";
import { Footer } from "@/components/site/Footer";
import { RampMotion } from "@/components/ramp/RampMotion";
import {
  RampLogosMarquee,
  RampPlatformBackOffice,
  RampSystemsIntegration,
  RampFinanceIntelligence,
  RampStackBanner,
  RampTeamScale,
  RampTestimonials,
} from "@/components/ramp/sections";

export default function HomePage() {
  return (
    <div className="site-shell">
      <RampMotion />
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductShowcase />
      <Solutions />
      <BrandStory />
      <Integration />
      <CustomerStory />
      <main className="ramp-home">
        <RampLogosMarquee />
        <RampPlatformBackOffice />
        <RampSystemsIntegration />
        <RampFinanceIntelligence />
        <RampStackBanner />
        <RampTeamScale />
        <RampTestimonials />
      </main>
      <WhoPraevorWorksFor />
      <WhoPraevorMarquee />
      <Footer />
    </div>
  );
}
