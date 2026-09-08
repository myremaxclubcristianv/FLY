import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan a Flight | AIR Decision Engine",
  description:
    "Tell us where you're going, when, and who is flying. AIR calculates optimal aviation vehicle profiles across twin helicopters, private jets, and turboprops.",
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex-1 flex flex-col">{children}</div>;
}
