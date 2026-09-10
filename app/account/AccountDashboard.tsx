"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { missionRequestService, MissionDetailRecord } from "@/lib/services/mission-request-service";

interface SavedItem {
  slug: string;
  name: string;
  category: string;
}

interface GiftVoucher {
  id: string;
  referenceId: string;
  experienceTitle: string;
  aircraftCategory: string;
  recipientName: string;
  status: "ACTIVE" | "REDEEMED" | "REQUESTED";
  validUntil: string;
}

export default function AccountDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"missions" | "quotes" | "saved" | "gifts" | "alerts" | "profile">("missions");
  const [missions, setMissions] = useState<MissionDetailRecord[]>([]);

  useEffect(() => {
    const mockUser = localStorage.getItem("air_mock_user");
    if (mockUser) {
      try {
        setUser(JSON.parse(mockUser));
      } catch {
        setUser({ email: "client@air.aero", name: "VIP Client Member" });
      }
    } else {
      setUser({ email: "client@air.aero", name: "VIP Client Member" });
    }

    // Load missions from missionRequestService
    const storedMissions = missionRequestService.getAllRequests();
    setMissions(storedMissions);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("air_mock_user");
    router.push("/login");
  };

  const savedAircraft: SavedItem[] = [
    { slug: "phenom-300", name: "Embraer Phenom 300E", category: "LIGHT_JET" },
    { slug: "pilatus-pc12", name: "Pilatus PC-12 NGX", category: "TURBOPROP" },
    { slug: "airbus-h145", name: "Airbus H145", category: "HELICOPTER" },
    { slug: "challenger-350", name: "Bombardier Challenger 350", category: "SUPER_MIDSIZE_JET" },
  ];

  const savedRoutes: SavedItem[] = [
    { slug: "bucharest-nice", name: "Bucharest (LRBS) → Nice Côte d'Azur (LFMN)", category: "CHARTER_MISSION" },
    { slug: "bucharest-mamaia", name: "Bucharest → Mamaia Beach Heliport", category: "HELICOPTER_TRANSFER" },
    { slug: "bucharest-london", name: "Bucharest → London Farnborough", category: "CHARTER_MISSION" },
  ];

  const gifts: GiftVoucher[] = [
    {
      id: "gift-01",
      referenceId: "AIR-GIFT-8942",
      experienceTitle: "Transylvanian Castles & Carpathian Aerial Exploration",
      aircraftCategory: "Twin-Engine Executive Helicopter",
      recipientName: "Alexander Vancea",
      status: "ACTIVE",
      validUntil: "2027-09-10",
    },
    {
      id: "gift-02",
      referenceId: "AIR-GIFT-1102",
      experienceTitle: "Sunset Over the Black Sea & Coastal Heli-Dining",
      aircraftCategory: "Airbus H135",
      recipientName: "Elena Popescu",
      status: "REQUESTED",
      validUntil: "2027-04-15",
    },
  ];

  const alerts = [
    {
      id: "alt-1",
      title: "Empty Leg Alert: Nice (LFMN) → Bucharest Băneasa (LRBS)",
      aircraft: "Embraer Phenom 300E",
      date: "2026-09-28",
      priceEstimated: "€4,200 (Repositioning Rate - 55% Off)",
      status: "LIVE_MONITOR",
    },
    {
      id: "alt-2",
      title: "Winter Ski Heliport Access Cleared: Poiana Brașov & Sinaia",
      aircraft: "Airbus H145",
      date: "2026-11-01 to 2027-03-31",
      priceEstimated: "On-Demand Flight Access",
      status: "OFFICIAL_NOTICE",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Account Header */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                MY AIR // PRIVATE CLIENT ACCESS
              </span>
              <ProvenanceBadge status="VERIFIED" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-white mt-2 tracking-tight">
              Welcome back, <span className="font-normal text-amber-400">{user?.name || "VIP Member"}</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">{user?.email || "client@air.aero"}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/plan"
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold px-5 py-2.5 rounded-xl transition text-xs flex items-center gap-2 shadow-lg"
            >
              + Plan New Mission
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2.5 rounded-xl transition text-xs border border-neutral-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-800 flex flex-wrap gap-6 text-sm">
          <button
            onClick={() => setActiveTab("missions")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "missions" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            My Flight Requests ({missions.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "saved" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Saved Fleet & Routes ({savedAircraft.length + savedRoutes.length})
          </button>
          <button
            onClick={() => setActiveTab("gifts")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "gifts" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Gifts & Certificates ({gifts.length})
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "alerts" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Aviation Alerts & Empty Legs ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "profile" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Client Profile
          </button>
        </div>

        {/* Tab 1: Missions & Requests */}
        {activeTab === "missions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light text-white">Active Flight Missions & Requests</h2>
              <span className="text-xs text-neutral-400 font-mono">Real-time Sourcing Lifecycle</span>
            </div>

            <div className="grid gap-4">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className="bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-amber-400 font-semibold bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                        {m.referenceId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {m.status} {"//"} {m.statusLabel}
                      </span>
                      <DataStatusBadge status="OFFICIAL_SOURCE" />
                    </div>

                    <div className="text-lg text-white font-medium">
                      {m.from} <span className="text-neutral-500">→</span> {m.to}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                      <span>Date: <strong className="text-neutral-200">{m.date}</strong></span>
                      <span>Passengers: <strong className="text-neutral-200">{m.passengers} pax</strong></span>
                      <span>Priority: <strong className="text-amber-300">{m.priority}</strong></span>
                      <span>Recommended: <strong className="text-neutral-200">{m.recommendedAircraft}</strong></span>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-1 italic">
                      &ldquo;{m.recommendationReason}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/account/requests/${m.referenceId}`}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition border border-neutral-700"
                    >
                      Track Sourcing & Quotes →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Fleet & Routes */}
        {activeTab === "saved" && (
          <div className="space-y-6">
            <h2 className="text-lg font-light text-white">Saved Fleet Models & Intelligence Routes</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">Saved Aircraft Fleet</h3>
                <div className="space-y-3">
                  {savedAircraft.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                      <div>
                        <Link href={`/aircraft/${item.slug}`} className="text-sm font-medium text-white hover:text-amber-300">
                          {item.name}
                        </Link>
                        <p className="text-[10px] text-neutral-500 font-mono">{item.category}</p>
                      </div>
                      <Link href={`/aircraft/${item.slug}`} className="text-xs text-amber-400 hover:underline">
                        View Dossier →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">Saved Intelligence Routes</h3>
                <div className="space-y-3">
                  {savedRoutes.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                      <div>
                        <Link href={`/routes/${item.slug}`} className="text-sm font-medium text-white hover:text-amber-300">
                          {item.name}
                        </Link>
                        <p className="text-[10px] text-neutral-500 font-mono">{item.category}</p>
                      </div>
                      <Link href={`/routes/${item.slug}`} className="text-xs text-amber-400 hover:underline">
                        View Flight Profile →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Gifts */}
        {activeTab === "gifts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light text-white">Gift A Flight Vouchers & Requests</h2>
              <Link href="/experiences" className="text-xs text-amber-400 font-mono hover:underline">
                + Gift An Aviation Experience →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {gifts.map((g) => (
                <div key={g.id} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-amber-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-amber-500/20">
                      {g.referenceId}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {g.status}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-white">{g.experienceTitle}</h3>
                  <div className="text-xs text-neutral-400 space-y-1 font-data">
                    <div>Recipient: <strong className="text-neutral-200">{g.recipientName}</strong></div>
                    <div>Category: <strong className="text-neutral-200">{g.aircraftCategory}</strong></div>
                    <div>Validity: <strong className="text-neutral-200">Valid until {g.validUntil}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Alerts & Empty Legs */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <h2 className="text-lg font-light text-white">Aviation Intelligence Alerts & Repositioning Watch</h2>
            <div className="grid gap-4">
              {alerts.map((a) => (
                <div key={a.id} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">{a.status}</span>
                    </div>
                    <h3 className="text-base font-medium text-white">{a.title}</h3>
                    <p className="text-xs text-neutral-400">
                      Aircraft: {a.aircraft} | Target Date: {a.date} | Rate: <strong className="text-amber-300">{a.priceEstimated}</strong>
                    </p>
                  </div>
                  <Link
                    href={`/plan?from=Nice&to=Bucharest`}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-xl text-xs border border-neutral-700 transition font-data"
                  >
                    Request Flight Slot →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Profile */}
        {activeTab === "profile" && (
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 max-w-2xl space-y-4">
            <h2 className="text-lg font-light text-white">Member Profile & Preferences</h2>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Full Name</span>
                <span className="col-span-2 text-white font-medium">{user?.name || "VIP Member"}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Email Address</span>
                <span className="col-span-2 text-white font-mono">{user?.email || "client@air.aero"}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Member Status</span>
                <span className="col-span-2 text-amber-400 font-mono">Verified VIP Charter Access (LRBS / Global)</span>
              </div>
              <div className="grid grid-cols-3 py-2">
                <span className="text-neutral-400">Data Integrity</span>
                <span className="col-span-2 text-neutral-300 text-xs">Full PII confidentiality & encrypted operational dispatch.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
