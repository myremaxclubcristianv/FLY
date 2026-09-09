import { Metadata } from "next";
import AccountDashboard from "./AccountDashboard";

export const metadata: Metadata = {
  title: "My AIR — Private Aviation Account",
  description: "Manage your private flight missions, quote options, and saved aviation fleet.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountDashboard />;
}
