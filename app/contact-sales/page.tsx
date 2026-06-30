import { Suspense } from "react";
import { site } from "@/config/site";
import { EmailCapturePage } from "./EmailCapturePage";

export const metadata = {
  title: `Book a demo — ${site.brand}`,
  description:
    "Book a personalised demo with one of our payment specialists. See how Sprout can automate collections, reduce failed payments and simplify payment operations.",
};

export default function ContactSalesPage() {
  return (
    <Suspense>
      <EmailCapturePage />
    </Suspense>
  );
}
