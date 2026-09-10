import { Metadata } from "next";
import AdminMissionQueueClient from "./AdminMissionQueueClient";

export const metadata: Metadata = {
  title: "Mission Queue & Sourcing Dispatch — AIR Operations Console",
  description: "Internal operations desk for managing flight missions, operator sourcing, and publishing verified charter quotes.",
  robots: { index: false, follow: false },
};

export default function AdminMissionsQueuePage() {
  return <AdminMissionQueueClient />;
}
