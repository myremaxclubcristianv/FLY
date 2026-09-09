"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

interface SavedItem {
  slug: string;
  name: string;
  category: string;
}

export default function AccountDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"missions" | "saved" | "profile">("missions");

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
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("air_mock_user");
    router.push("/login");
  };

  const sampleMissions = [
    {
      id: "mission-1",
      referenceId: "AIR-2026-F982A1",
      origin: "Bucharest Băneasa (LBS/BBU)",
      destination: "Nice Côte d'Azur (NCE)",
      date: "2026-09-24",
      passengers: 4,
      priority: "FASTEST",
      status: "OPTIONS_READY",
      statusLabel: "Options Ready for Review",
      recommendedCategory: "Embraer Phenom 300E",
      createdAt: "2026-09-08T14:30:00Z",
    },
    {
      id: "mission-2",
      referenceId: "AIR-2026-C44109",
      origin: "Cluj-Napoca (CLJ)",
      destination: "Tuzla Heliport (LRTZ)",
      date: "2026-10-12",
      passengers: 2,
      priority: "MOST_MEMORABLE",
      status: "SOURCING",
      statusLabel: "Operator Sourcing in Progress",
      recommendedCategory: "Airbus H145 Twin-Engine Helicopter",
      createdAt: "2026-09-09T09:15:00Z",
    },
  ];

  const savedAircraft: SavedItem[] = [
    { slug: "phenom-300e", name: "Embraer Phenom 300E", category: "LIGHT_JET" },
    { slug: "pilatus-pc12-ngx", name: "Pilatus PC-12 NGX", category: "TURBOPROP" },
    { slug: "airbus-h145", name: "Airbus H145", category: "HELICOPTER" },
  ];

  const savedRoutes: SavedItem[] = [
    { slug: "bucharest-nice", name: "Bucharest → Nice Côte d'Azur", category: "CHARTER_MISSION" },
    { slug: "bucharest-constanta-helicopter", name: "Bucharest → Mamaia Heliport", category: "HELICOPTER_TRANSFER" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Account Header */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                VIP Aviation Portal
              </span>
              <ProvenanceBadge status="VERIFIED" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-white mt-2 tracking-tight">
              Welcome back, <span className="font-normal text-amber-400">{user?.name || "Member"}</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">{user?.email || "vip.client@air.aero"}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/plan"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-5 py-2.5 rounded-lg transition text-xs flex items-center gap-2"
            >
              + Plan New Mission
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2.5 rounded-lg transition text-xs border border-neutral-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-neutral-800 flex gap-6 text-sm">
          <button
            onClick={() => setActiveTab("missions")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "missions" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            My Flight Missions ({sampleMissions.length})
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
            onClick={() => setActiveTab("profile")}
            className={`pb-3 font-medium transition relative ${
              activeTab === "profile" ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Profile & Settings
          </button>
        </div>

        {/* Tab Content: Missions */}
        {activeTab === "missions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light text-white">Active Flight Requests & Options</h2>
              <span className="text-xs text-neutral-400 font-mono">Server Reference Identifier System</span>
            </div>

            <div className="grid gap-4">
              {sampleMissions.map((m) => (
                <div
                  key={m.id}
                  className="bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-amber-400 font-semibold bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                        {m.referenceId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {m.statusLabel}
                      </span>
                    </div>

                    <div className="text-lg text-white font-medium">
                      {m.origin} <span className="text-neutral-500">→</span> {m.destination}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                      <span>Date: <strong className="text-neutral-200">{m.date}</strong></span>
                      <span>Passengers: <strong className="text-neutral-200">{m.passengers} pax</strong></span>
                      <span>Priority: <strong className="text-amber-300">{m.priority}</strong></span>
                      <span>Aircraft: <strong className="text-neutral-200">{m.recommendedCategory}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/account/requests/${m.referenceId}`}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-4 py-2 rounded-lg text-xs transition border border-neutral-700"
                    >
                      Compare Options & Quotes →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Saved Items */}
        {activeTab === "saved" && (
          <div className="space-y-6">
            <h2 className="text-lg font-light text-white">Saved Fleet Models & Intelligence Routes</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Saved Aircraft Models</h3>
                <div className="space-y-3">
                  {savedAircraft.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                      <div>
                        <Link href={`/aircraft/${item.slug}`} className="text-sm font-medium text-white hover:text-amber-300">
                          {item.name}
                        </Link>
                        <p className="text-[10px] text-neutral-500 font-mono">{item.category}</p>
                      </div>
                      <Link href={`/aircraft/${item.slug}`} className="text-xs text-amber-400 hover:underline">
                        View Spec →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Saved Intelligence Routes</h3>
                <div className="space-y-3">
                  {savedRoutes.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                      <div>
                        <Link href={`/routes/${item.slug}`} className="text-sm font-medium text-white hover:text-amber-300">
                          {item.name}
                        </Link>
                        <p className="text-[10px] text-neutral-500 font-mono">{item.category}</p>
                      </div>
                      <Link href={`/routes/${item.slug}`} className="text-xs text-amber-400 hover:underline">
                        View Route →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Profile */}
        {activeTab === "profile" && (
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 max-w-2xl space-y-4">
            <h2 className="text-lg font-light text-white">Member Profile & Preferences</h2>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Full Name</span>
                <span className="col-span-2 text-white font-medium">{user?.name || "VIP Member"}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Email Address</span>
                <span className="col-span-2 text-white font-mono">{user?.email || "vip.client@air.aero"}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Member Status</span>
                <span className="col-span-2 text-amber-400 font-mono">Verified VIP Charter Access</span>
              </div>
              <div className="grid grid-cols-3 py-2">
                <span className="text-neutral-400">Data Privacy</span>
                <span className="col-span-2 text-neutral-300 text-xs">Strict PII protection. Data is never shared or sold.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
