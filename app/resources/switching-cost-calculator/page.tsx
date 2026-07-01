import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SwitchingCostCalculator } from "@/components/resources/SwitchingCostCalculator";

export const metadata = {
  title: "Switching Cost Calculator | Praevor",
  description:
    "Calculate the true operational cost of staying with your current payment provider. See your hidden costs, maturity score, and estimated savings from switching.",
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
