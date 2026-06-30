import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { IBPHero } from "@/components/instant-bank-pay/IBPHero";
import { IBPEra } from "@/components/instant-bank-pay/IBPEra";
import { IBPBenefits } from "@/components/instant-bank-pay/IBPBenefits";
import { IBPBuilderCallout } from "@/components/instant-bank-pay/IBPBuilderCallout";
import { IBPDemo } from "@/components/instant-bank-pay/IBPDemo";
import { IBPHowItWorks } from "@/components/instant-bank-pay/IBPHowItWorks";
import { IBPUseCases } from "@/components/instant-bank-pay/IBPUseCases";
import { IBPSocialProof } from "@/components/instant-bank-pay/IBPSocialProof";
import { IBPGettingStarted } from "@/components/instant-bank-pay/IBPGettingStarted";
import { IBPClosingCTA } from "@/components/instant-bank-pay/IBPClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `Instant Bank Pay | ${site.brand}`,
  description:
    "Collect instant bank transfers from your customers using Faster Payments. Settled in seconds, not days.",
};

export default function InstantBankPayPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <IBPHero />
        <IBPEra />
        <IBPBenefits />
        <IBPBuilderCallout />
        <IBPDemo />
        <IBPHowItWorks />
        <IBPUseCases />
        <IBPSocialProof />
        <IBPGettingStarted />
        <IBPClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
