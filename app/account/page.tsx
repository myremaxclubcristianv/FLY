import { Metadata } from "next";
import AccountDashboard from "./AccountDashboard";
import { requireAuth } from "@/lib/auth/server-guard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "My AIR — Private Aviation Account",
  description: "Manage your private flight missions, quote options, and saved aviation fleet.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage() {
  const user = await requireAuth("/account");
  return <AccountDashboard initialUser={{ email: user.email, name: user.name || user.email.split("@")[0] }} />;
}
