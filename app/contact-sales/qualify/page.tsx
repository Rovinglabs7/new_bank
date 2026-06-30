import { Suspense } from "react";
import { site } from "@/config/site";
import { QualifyPage } from "./QualifyPage";

export const metadata = {
  title: `Book a demo — ${site.brand}`,
};

export default function QualifyRoute() {
  return (
    <Suspense>
      <QualifyPage />
    </Suspense>
  );
}
