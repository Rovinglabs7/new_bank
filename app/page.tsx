import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { FramerStaticBody } from "@/components/site/FramerStaticBody";
import { Footer } from "@/components/site/Footer";
import { getFramerBodyHtml } from "@/lib/get-framer-body";

export default function HomePage() {
  const framerBodyHtml = getFramerBodyHtml();

  return (
    <div className="site-shell">
      <Header />
      <Hero />
      <FramerStaticBody html={framerBodyHtml} />
      <Footer />
    </div>
  );
}
