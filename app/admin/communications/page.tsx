import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Communications & Webhooks — AIR Admin",
  description: "Provider notification delivery logs and incoming webhook audit stream.",
  robots: { index: false, follow: false },
};

export default function AdminCommunicationsPage() {
  const notificationLogs = [
    {
      id: "log-1",
      event: "MISSION_CREATED",
      recipient: "vip.client@air.aero",
      channel: "INTERNAL_LOG",
      status: "NOT_CONNECTED",
      timestamp: "2026-09-09 18:45:10",
      notes: "Internal audit stream recorded. External email provider not connected.",
    },
    {
      id: "log-2",
      event: "QUOTE_RECEIVED",
      recipient: "dispatch@toyoaviation.ro",
      channel: "INTERNAL_LOG",
      status: "NOT_CONNECTED",
      timestamp: "2026-09-09 18:50:22",
      notes: "Internal audit stream recorded. External WhatsApp provider not connected.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">AUDIT LOGS</span>
            <h1 className="text-2xl font-light text-white mt-1">Notification Delivery & Webhook Audit Stream</h1>
          </div>
          <Link href="/admin" className="text-xs text-amber-400 hover:underline font-mono">← Admin Home</Link>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase">
                <th className="pb-3 px-2">Timestamp</th>
                <th className="pb-3 px-2">Event</th>
                <th className="pb-3 px-2">Recipient</th>
                <th className="pb-3 px-2">Channel</th>
                <th className="pb-3 px-2">Delivery Status</th>
                <th className="pb-3 px-2">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {notificationLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-900/80 transition">
                  <td className="py-4 px-2 text-neutral-500">{log.timestamp}</td>
                  <td className="py-4 px-2 font-bold text-amber-400">{log.event}</td>
                  <td className="py-4 px-2 text-white">{log.recipient}</td>
                  <td className="py-4 px-2 text-neutral-300">{log.channel}</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-neutral-400 font-sans">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
