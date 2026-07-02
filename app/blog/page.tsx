import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BlogPage } from "@/components/blog/BlogPage";
import { site } from "@/config/site";

export const metadata = {
  title: `Blog | ${site.brand}`,
  description: "Guides, product updates, and honest thinking on what it actually takes to get paid on time.",
};

export default function BlogPageRoute() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}
