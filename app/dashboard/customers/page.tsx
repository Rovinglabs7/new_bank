import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { site } from "@/config/site";
import { CustomersClient } from "./CustomersClient";

export const metadata = {
  title: `Customers — ${site.brand}`,
};

export default async function CustomersPage() {
  const session = await getSession();
  if (!session) redirect("/signin");
  return <CustomersClient email={session.email} />;
}
