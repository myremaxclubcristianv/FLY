import { Metadata } from "next";
import QuoteComparisonView from "./QuoteComparisonView";

export const metadata: Metadata = {
  title: "Flight Mission Options — AIR",
  description: "Review and compare operator charter quotes for your mission.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <QuoteComparisonView referenceId={id} />;
}
