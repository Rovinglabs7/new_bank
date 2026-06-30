import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SPHero } from "@/components/subscription-payments/SPHero";
import { SPToggle } from "@/components/subscription-payments/SPToggle";
import { SPHowItWorks } from "@/components/subscription-payments/SPHowItWorks";
import { SPEasyWay } from "@/components/subscription-payments/SPEasyWay";
import { SPFeatures } from "@/components/subscription-payments/SPFeatures";
import { SPManage } from "@/components/subscription-payments/SPManage";
import { SPIntegrations } from "@/components/subscription-payments/SPIntegrations";
import { SPSocialProof } from "@/components/subscription-payments/SPSocialProof";
import { SPCustomerLove } from "@/components/subscription-payments/SPCustomerLove";
import { SPTestimonials } from "@/components/subscription-payments/SPTestimonials";
import { SPClosingCTA } from "@/components/subscription-payments/SPClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `Subscription and membership payments | ${site.brand}`,
  description:
    "Cut your costs, keep customers, and even go global. Subscription and membership payments built on bank infrastructure.",
};

export default function SubscriptionPaymentsPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <SPHero />
        <SPToggle />
        <SPHowItWorks />
        <SPEasyWay />
        <SPFeatures />
        <SPManage />
        <SPIntegrations />
        <SPSocialProof />
        <SPCustomerLove />
        <SPTestimonials />
        <SPClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
