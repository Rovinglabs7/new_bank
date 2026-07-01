import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PressHero } from "@/components/press/PressHero";
import { PressAbout } from "@/components/press/PressAbout";
import { PressLatestNews } from "@/components/press/PressLatestNews";
import { PressBrandAssets } from "@/components/press/PressBrandAssets";
import { PressCompanyFacts } from "@/components/press/PressCompanyFacts";
import { PressInThePress } from "@/components/press/PressInThePress";
import { PressMediaEnquiries } from "@/components/press/PressMediaEnquiries";
import { site } from "@/config/site";

export const metadata = {
  title: `Press | ${site.brand}`,
  description: "News, announcements, and resources for journalists covering Praevor.",
};

export default function PressPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <PressHero />
        <PressAbout />
        <PressLatestNews />
        <PressBrandAssets />
        <PressCompanyFacts />
        <PressInThePress />
        <PressMediaEnquiries />
      </main>
      <Footer />
    </div>
  );
}
