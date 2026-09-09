import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookings Orchestration — AIR Admin",
  description: "Internal AIR Flight Booking & Operator Confirmation Console.",
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  const bookings = [
    {
      id: "bk-1",
      bookingReference: "AIR-BK-2026-F982A1",
      missionRef: "AIR-2026-F982A1",
      customerName: "VIP Charter Client",
      operatorName: "Toyo Aviation SRL",
      routing: "LRBS Băneasa → LFMN Nice",
      date: "2026-09-24",
      bookingStatus: "CONFIRMED",
      paymentStatus: "DEPOSIT_PAID",
      amount: "€8,800 EUR",
    },
    {
      id: "bk-2",
      bookingReference: "AIR-BK-2026-C44109",
      missionRef: "AIR-2026-C44109",
      customerName: "Executive Client",
      operatorName: "Carpathian Heli Access",
      routing: "LROV Brașov → LRTZ Tuzla",
      date: "2026-10-12",
      bookingStatus: "BOOKING",
      paymentStatus: "PAYMENT_PENDING",
      amount: "€3,400 EUR",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">COMMAND CENTER</span>
            <h1 className="text-2xl font-light text-white mt-1">Bookings & Commercial Orchestration</h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <Link href="/admin/missions" className="text-neutral-400 hover:text-white underline">Missions Queue</Link>
            <Link href="/admin/sourcing" className="text-neutral-400 hover:text-white underline">Sourcing</Link>
            <Link href="/admin/communications" className="text-neutral-400 hover:text-white underline">Audit Logs</Link>
            <Link href="/admin/analytics" className="text-amber-400 hover:text-amber-300 underline">Analytics</Link>
          </div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase">
                <th className="pb-3 px-2">Booking Ref</th>
                <th className="pb-3 px-2">Client</th>
                <th className="pb-3 px-2">Operator</th>
                <th className="pb-3 px-2">Routing</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Booking Status</th>
                <th className="pb-3 px-2">Payment Status</th>
                <th className="pb-3 px-2">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-neutral-900/80 transition">
                  <td className="py-4 px-2 font-bold text-amber-400">{b.bookingReference}</td>
                  <td className="py-4 px-2 text-white font-sans font-medium">{b.customerName}</td>
                  <td className="py-4 px-2 text-neutral-300">{b.operatorName}</td>
                  <td className="py-4 px-2 text-neutral-200">{b.routing}</td>
                  <td className="py-4 px-2 text-neutral-400">{b.date}</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-amber-300">{b.paymentStatus}</td>
                  <td className="py-4 px-2 font-bold text-white">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
