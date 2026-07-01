import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SettlementCalculator } from "@/components/resources/SettlementCalculator";
import { site } from "@/config/site";

export const metadata = {
  title: `Settlement Time Calculator | ${site.brand}`,
  description:
    "Estimate exactly when your payments will settle based on payment method, collection time and business days. Free tool by Praevor.",
};

export default function SettlementCalculatorPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <SettlementCalculator />
      </main>
      <Footer />
    </div>
  );
}
