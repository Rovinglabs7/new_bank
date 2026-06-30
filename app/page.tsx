import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Solutions } from "@/components/site/Solutions";
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
      <Header />
      <Hero />
      <ProductShowcase />
      <Solutions />
      <main className="ramp-home">
        <RampLogosMarquee />
        <RampPlatformBackOffice />
        <RampSystemsIntegration />
        <RampFinanceIntelligence />
        <RampStackBanner />
        <RampTeamScale />
        <RampTestimonials />
      </main>
      <Footer />
    </div>
  );
}
