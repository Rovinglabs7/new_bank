import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactPage } from "./ContactPage";
import { site } from "@/config/site";

export const metadata = {
  title: `Contact | ${site.brand}`,
  description: "Get in touch with Praevor. Talk to Sales, Customer Support, Partnerships or our Press team.",
};

export default function ContactRoute() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
