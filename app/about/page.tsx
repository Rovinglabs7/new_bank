import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTrustStrip } from "@/components/about/AboutTrustStrip";
import { AboutBetterWay } from "@/components/about/AboutBetterWay";
import { AboutIntegrations } from "@/components/about/AboutIntegrations";
import { AboutNeverJustBusiness } from "@/components/about/AboutNeverJustBusiness";
import { AboutFirstTimeHearing } from "@/components/about/AboutFirstTimeHearing";
import { AboutLastButNotLeast } from "@/components/about/AboutLastButNotLeast";
import { AboutClosingCTA } from "@/components/about/AboutClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `About | ${site.brand}`,
  description:
    "Sprout is a recurring payments platform for growing UK and European businesses, automating collections and reducing failed payments.",
};

export default function AboutPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <AboutHero />
        <AboutTrustStrip />
        <AboutBetterWay />
        <AboutIntegrations />
        <AboutNeverJustBusiness />
        <AboutFirstTimeHearing />
        <AboutLastButNotLeast />
        <AboutClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
