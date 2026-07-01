import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SwitchingCostCalculator } from "@/components/resources/SwitchingCostCalculator";

export const metadata = {
  title: "Payment Operations Health Check | Praevor",
  description: "Discover the true operational cost of your current payment setup. Estimate hidden costs from failed payments, manual processes and delayed settlements — free tool by Praevor.",
};

export default function SwitchingCostCalculatorPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <SwitchingCostCalculator />
      </main>
      <Footer />
    </div>
  );
}
