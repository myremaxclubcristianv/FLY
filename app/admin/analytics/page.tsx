import { Metadata } from "next";
import { AdminAnalyticsClient } from "./AdminAnalyticsClient";

export const metadata: Metadata = {
  title: "Operational Analytics & Live Radar — AIR Admin",
  description: "Real-time AIR live visitors, Telegram customer journey gateway, and attribution telemetry.",
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsClient />;
}
