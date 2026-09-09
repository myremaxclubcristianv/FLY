import { Metadata } from "next";
import BookingDetailView from "./BookingDetailView";

export const metadata: Metadata = {
  title: "Flight Booking Record — AIR",
  description: "Review your confirmed private flight booking and operational status.",
  robots: { index: false, follow: false },
};

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BookingDetailView bookingReference={id} />;
}
