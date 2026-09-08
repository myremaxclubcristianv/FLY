import { DecisionPayload } from "../../types/flight-request";

export const BUCHAREST_BRAN_DECISION: DecisionPayload = {
  missionTitle: "BUCHAREST → BRAN (TRANSYLVANIA)",
  origin: "Bucharest (Baneasa LROP / Henri Coanda LROP)",
  destination: "Bran Castle Helipad / Transylvania Region",
  passengers: 4,
  dataStatus: "INDICATIVE",
  summaryReason:
    "Helicopter direct point-to-point transfer is the fastest mission profile, bypassing mountain road congestion and landing directly at destination private pads.",
  primaryOption: {
    id: "opt-heli",
    category: "HELICOPTER",
    name: "TWIN-ENGINE HELICOPTER",
    tagline: "Direct Heliport Access",
    estimatedDuration: "42 MIN FLIGHT",
    status: "INDICATIVE",
    keyBenefit: "Zero ground transfer delays; direct helipad arrival at Bran",
    suitableFor: "VIP executive missions, day experiences & direct property access",
    isPrimary: true,
  },
  alternativeOptions: [
    {
      id: "opt-aircraft",
      category: "TURBOPROP",
      name: "EXECUTIVE TURBOPROP VIA BRAȘOV (LROV)",
      tagline: "Regional Runway + Short Vehicle Transfer",
      estimatedDuration: "25 MIN FLIGHT + 35 MIN GROUND",
      status: "INDICATIVE",
      keyBenefit: "Higher luggage payload capacity and all-weather operational ceiling",
      suitableFor: "Groups with heavy luggage or winter weather operations",
    },
    {
      id: "opt-combined",
      category: "COMBINED",
      name: "CAR + HELICOPTER INTERMODAL",
      tagline: "Chauffeur to Northern Departure Pad + Air Transfer",
      estimatedDuration: "15 MIN GROUND + 35 MIN FLIGHT",
      status: "INDICATIVE",
      keyBenefit: "Bypasses city exit traffic via pre-positioned peripheral heliport",
      suitableFor: "Peak hour Bucharest center departures",
    },
    {
      id: "opt-ground",
      category: "GROUND",
      name: "PREMIUM CHAUFFEURED SUV",
      tagline: "Direct Highway Transfer",
      estimatedDuration: "2 HR 45 MIN GROUND",
      status: "INDICATIVE",
      keyBenefit: "No flight planning or weather minimum constraints",
      suitableFor: "Flexible schedules or severe mountain weather conditions",
    },
  ],
};
