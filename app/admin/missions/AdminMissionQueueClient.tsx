"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { missionRequestService, MissionDetailRecord } from "@/lib/services/mission-request-service";

export default function AdminMissionQueueClient() {
  const [missions, setMissions] = useState<MissionDetailRecord[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchServerMissions = async () => {
    try {
      const res = await fetch("/api/admin/missions");
      if (res.ok) {
        const data = await res.json();
        if (data.missions && Array.isArray(data.missions) && data.missions.length > 0) {
          const mapped: MissionDetailRecord[] = data.missions.map((m: Record<string, unknown>) => ({
            id: String(m.id || m.referenceId),
            referenceId: String(m.referenceId || m.reference_id),
            from: String(m.origin || m.origin_name || m.from || ""),
            to: String(m.destination || m.destination_name || m.to || ""),
            tripType: (m.tripType || m.trip_type || "ONE_WAY") as MissionDetailRecord["tripType"],
            date: String(m.departureDate || m.departure_date || m.date || ""),
            returnDate: m.returnDate ? String(m.returnDate) : undefined,
            time: m.preferredTime ? String(m.preferredTime) : undefined,
            passengers: Number(m.passengers || m.passenger_count || 1),
            budgetPreference: (m.budgetPreference || m.budget_preference || "STANDARD_CHARTER") as MissionDetailRecord["budgetPreference"],
            priority: (m.priority || "FASTEST") as MissionDetailRecord["priority"],
            purpose: (m.purpose || "EXECUTIVE_BUSINESS") as MissionDetailRecord["purpose"],
            name: m.name || m.user_name ? String(m.name || m.user_name) : undefined,
            email: m.email || m.user_email ? String(m.email || m.user_email) : undefined,
            phone: m.phone || m.user_phone ? String(m.phone || m.user_phone) : undefined,
            message: m.notes || m.client_notes ? String(m.notes || m.client_notes) : undefined,
            status: (m.status || m.lifecycle_status || "REQUESTED") as MissionDetailRecord["status"],
            statusLabel: String(m.statusLabel || m.status_label || "Mission Logged // Sourcing Dispatch Initiated"),
            assignedAdvisor: String(m.assignedAdvisor || m.assigned_advisor || "AIR Operations Center (Bucharest)"),
            recommendedAircraft: String(m.recommendedAircraft || m.recommended_aircraft || "Executive Jet"),
            recommendedCategory: String(m.recommendedCategory || m.recommended_category || "Light Jet"),
            estimatedFlightTime: String(m.estimatedFlightTime || m.estimated_flight_time || "1h 45m"),
            recommendationReason: String(m.recommendationReason || m.recommendation_reason || "Direct dispatch"),
            constraints: Array.isArray(m.constraints) ? m.constraints : [],
            timeline: Array.isArray(m.timeline) ? m.timeline : [],
            quotes: Array.isArray(m.quotes) ? m.quotes : [],
            createdAt: String(m.createdAt || m.created_at || new Date().toISOString()),
            isDemoRecord: false,
          }));

          // Merge server missions with any local archive demo records
          const localMissions = missionRequestService.getAllRequests();
          const serverRefs = new Set(mapped.map((sm) => sm.referenceId));
          const nonColliding = localMissions.filter((lm) => !serverRefs.has(lm.referenceId));
          setMissions([...mapped, ...nonColliding]);
          return;
        }
      }
    } catch (err) {
      console.warn("[ADMIN MISSIONS FETCH NOTICE]", err);
    }
    setMissions(missionRequestService.getAllRequests());
  };

  useEffect(() => {
    fetchServerMissions();
  }, []);

  const refreshList = () => {
    fetchServerMissions();
  };

  const filteredMissions = missions.filter((m) => {
    const matchesStatus = selectedStatus === "ALL" || m.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      m.referenceId.toLowerCase().includes(q) ||
      m.from.toLowerCase().includes(q) ||
      m.to.toLowerCase().includes(q) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.name && m.name.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  const statuses: Array<{ key: string; label: string }> = [
    { key: "ALL", label: "All Missions" },
    { key: "REQUESTED", label: "01 Requested" },
    { key: "SOURCING", label: "02 Sourcing" },
    { key: "QUOTES_RECEIVED", label: "03 Quotes Received" },
    { key: "AIR_REVIEW", label: "04 AIR Review" },
    { key: "PRESENTED", label: "05 Presented" },
    { key: "CONFIRMED", label: "06 Confirmed" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                AIR FLIGHT OPERATIONS CONSOLE
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                DISPATCH QUEUE // ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-white mt-2">
              Mission Sourcing & Dispatch Control
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Internal flight desk for logging operator availability, auditing charter itineraries, and publishing verified quotes.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={refreshList}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 transition"
            >
              ⟳ Refresh Queue
            </button>
            <Link href="/account" className="text-amber-400 hover:underline">
              Client Portal →
            </Link>
          </div>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((st) => (
              <button
                key={st.key}
                onClick={() => setSelectedStatus(st.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                  selectedStatus === st.key
                    ? "bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-sm"
                    : "bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search Ref, City, Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Mission Queue Table */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase">
                <th className="pb-3 px-2">Ref ID</th>
                <th className="pb-3 px-2">Routing Vector</th>
                <th className="pb-3 px-2">Date & Pax</th>
                <th className="pb-3 px-2">Priority</th>
                <th className="pb-3 px-2">Lifecycle State</th>
                <th className="pb-3 px-2">Quotes Logged</th>
                <th className="pb-3 px-2 text-right">Operations Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredMissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-500 font-sans">
                    No missions found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredMissions.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-900/80 transition">
                    <td className="py-4 px-2 font-bold text-amber-400">
                      {m.referenceId}
                      {m.isDemoRecord && (
                        <span className="block text-[9px] text-neutral-500 uppercase font-normal">
                          Sample Archive
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-white font-sans text-sm font-medium">
                        {m.from} → {m.to}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        Client: {m.name || "Client Member"} ({m.email || "client@air.aero"})
                      </div>
                    </td>
                    <td className="py-4 px-2 text-neutral-300">
                      <div>{m.date}</div>
                      <div className="text-[10px] text-neutral-500">{m.passengers} Passengers</div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-amber-300 font-medium">{m.priority}</span>
                      <div className="text-[10px] text-neutral-500 font-sans">{m.recommendedAircraft}</div>
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                          m.status === "CONFIRMED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : m.status === "PRESENTED"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : m.status === "AIR_REVIEW"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : m.status === "QUOTES_RECEIVED"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-neutral-800 text-neutral-300 border-neutral-700"
                        }`}
                      >
                        {m.status}
                      </span>
                      <div className="text-[9px] text-neutral-400 mt-1 max-w-[160px] truncate">
                        {m.statusLabel}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-white font-bold">
                        {m.quotes ? m.quotes.length : 0} Options
                      </span>
                      {m.quotes && m.quotes.length > 0 && (
                        <span className="block text-[9px] text-emerald-400">
                          {m.quotes.map((q) => q.operatorBrand).join(", ")}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Link
                        href={`/admin/missions/${m.referenceId}`}
                        className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-sans border border-neutral-700 transition inline-block"
                      >
                        Manage Mission →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
