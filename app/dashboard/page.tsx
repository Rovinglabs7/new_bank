import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { site } from "@/config/site";
import { DashboardClient } from "./DashboardClient";

export const metadata = {
  title: `Dashboard — ${site.brand}`,
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }

  return <DashboardClient email={session.email} />;
}
