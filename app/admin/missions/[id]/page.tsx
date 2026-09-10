import { Metadata } from "next";
import AdminMissionDetailClient from "./AdminMissionDetailClient";

export const metadata: Metadata = {
  title: "Mission Sourcing & Quote Logging — AIR Operations",
  description: "Internal AIR flight desk for managing mission dispatch, logging operator quotes, auditing safety parameters, and confirming bookings.",
  robots: { index: false, follow: false },
};

export default async function AdminMissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminMissionDetailClient referenceId={id} />;
}
