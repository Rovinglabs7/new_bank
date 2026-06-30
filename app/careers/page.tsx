import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CareersPromoBanner } from "@/components/careers/CareersPromoBanner";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersAbout } from "@/components/careers/CareersAbout";
import { CareersContact } from "@/components/careers/CareersContact";
import { CareersOperations } from "@/components/careers/CareersOperations";
import { CareersMoreThanCulture } from "@/components/careers/CareersMoreThanCulture";
import { CareersValues } from "@/components/careers/CareersValues";
import { CareersDepartments } from "@/components/careers/CareersDepartments";
import { CareersPerks } from "@/components/careers/CareersPerks";
import { CareersHowWeHire } from "@/components/careers/CareersHowWeHire";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import { CareersContentCards } from "@/components/careers/CareersContentCards";
import { CareersFAQ } from "@/components/careers/CareersFAQ";
import { CareersClosingCTA } from "@/components/careers/CareersClosingCTA";
import { site } from "@/config/site";

export const metadata = {
  title: `Careers | ${site.brand}`,
  description:
    "Join Sprout and help build the payments platform that gives every business the reliability only the largest companies could afford.",
};

export default function CareersPage() {
  return (
    <div className="site-shell">
      <CareersPromoBanner />
      <AnnouncementBar />
      <Header />
      <main>
        <CareersHero />
        <CareersAbout />
        <CareersContact />
        <CareersOperations />
        <CareersMoreThanCulture />
        <CareersValues />
        <CareersDepartments />
        <CareersPerks />
        <CareersHowWeHire />
        <CareersApplicationForm />
        <CareersContentCards />
        <CareersFAQ />
        <CareersClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
