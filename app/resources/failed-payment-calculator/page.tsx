import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FailedPaymentCalculator } from "@/components/resources/FailedPaymentCalculator";
import { site } from "@/config/site";

export const metadata = {
  title: `Failed Payment Cost Calculator | ${site.brand}`,
  description:
    "Calculate the true operational and financial cost of failed payments on your business. Free tool by Praevor.",
};

export default function FailedPaymentCalculatorPage() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <FailedPaymentCalculator />
      </main>
      <Footer />
    </div>
  );
}
