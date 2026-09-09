import { Metadata } from "next";
import OperatorSourcingClient from "./OperatorSourcingClient";

export const metadata: Metadata = {
  title: "Sourcing Requests Queue — Operator Portal",
  description: "Review incoming charter sourcing requests and submit quotes.",
  robots: { index: false, follow: false },
};

export default function OperatorSourcingQueuePage() {
  return <OperatorSourcingClient />;
}
