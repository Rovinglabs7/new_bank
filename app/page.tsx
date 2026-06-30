import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Solutions } from "@/components/site/Solutions";
import { Integration } from "@/components/site/Integration";
import { CustomerStory } from "@/components/site/CustomerStory";
import { WhoSproutWorksFor } from "@/components/site/WhoSproutWorksFor";
import { WhoSproutMarquee } from "@/components/site/WhoSproutMarquee";
import { Footer } from "@/components/site/Footer";
import { RampStyles } from "@/components/ramp/RampStyles";
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
      <RampStyles />
      <RampMotion />
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductShowcase />
      <Solutions />
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
      <WhoSproutWorksFor />
      <WhoSproutMarquee />
      <Footer />
    </div>
  );
}
