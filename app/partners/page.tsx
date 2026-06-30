import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersEcosystem } from "@/components/partners/PartnersEcosystem";
import { PartnersAddPayments } from "@/components/partners/PartnersAddPayments";
import { PartnersWhyPartner } from "@/components/partners/PartnersWhyPartner";
import { PartnersHowItWorks } from "@/components/partners/PartnersHowItWorks";
import { PartnersPartnerFirst } from "@/components/partners/PartnersPartnerFirst";
import { PartnersGettingStarted } from "@/components/partners/PartnersGettingStarted";
import { PartnersForm } from "@/components/partners/PartnersForm";
import { site } from "@/config/site";

export const metadata = {
  title: `Partners | ${site.brand}`,
  description:
    "Let your users collect bank payments directly from your platform, and earn revenue from every transaction.",
};

export default function PartnersPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <PartnersHero />
        <PartnersEcosystem />
        <PartnersAddPayments />
        <PartnersWhyPartner />
        <PartnersHowItWorks />
        <PartnersPartnerFirst />
        <PartnersGettingStarted />
        <PartnersForm />
      </main>
      <Footer />
    </div>
  );
}
