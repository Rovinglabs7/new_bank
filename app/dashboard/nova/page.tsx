import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { site } from "@/config/site";
import { NovaWorkspaceClient } from "./NovaWorkspaceClient";

export const metadata = {
  title: `Nova — ${site.brand}`,
};

export default async function NovaPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }

  return <NovaWorkspaceClient email={session.email} />;
}
