import { AircraftCategory, MissionPriority } from "@/types/domain";
import { formatFlightDuration } from "@/lib/utils/distance";

export interface DecisionEngineInput {
  origin: string;
  destination: string;
  distanceNm?: number;
  passengerCount: number;
  priority: MissionPriority;
  isHelicopterAccessible?: boolean;
  runwayConstrained?: boolean;
  specialLuggage?: boolean;
}

export interface RecommendationResult {
  category: AircraftCategory;
  categoryDisplayName: string;
  recommendedModelSlug: string;
  recommendedModelName: string;
  rationale: string;
  estimatedDuration: string;
  constraints: string[];
  dataStatus: "VERIFIED" | "INDICATIVE" | "REQUEST";
  recommendationScore: number;
  alternatives: Array<{
    category: string;
    title: string;
    estimatedDuration: string;
    rationale: string;
    indicativePriceRange: string;
    pricingStatus: "INDICATIVE" | "REQUEST";
  }>;
}

/**
 * Deterministic AIR Mission Decision Engine
 * Maps mission distance, passenger payload, operational constraints and priority to optimal aircraft category and models.
 */
export function evaluateMissionDecision(input: DecisionEngineInput): RecommendationResult {
  const {
    origin,
    destination,
    distanceNm = 350,
    passengerCount = 2,
    priority = "FASTEST",
    isHelicopterAccessible = false,
    runwayConstrained = false,
  } = input;

  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();
  const isShortHop = distanceNm <= 180;
  const isMountainOrPad =
    isHelicopterAccessible ||
    originLower.includes("pad") ||
    destLower.includes("pad") ||
    originLower.includes("bran") ||
    destLower.includes("bran") ||
    destLower.includes("tuzla") ||
    runwayConstrained;

  // Case 1: Helicopter Suitability
  if (isMountainOrPad && isShortHop && passengerCount <= 6) {
    return {
      category: "HELICOPTER",
      categoryDisplayName: "Twin-Engine Executive Helicopter",
      recommendedModelSlug: "airbus-h145",
      recommendedModelName: "Airbus H145 / Bell 429",
      rationale:
        "Direct point-to-point landing capability without airport transfers. Ideal for mountain resorts, coastal pads, and regional short-hops under 180 NM.",
      estimatedDuration: formatFlightDuration(distanceNm, 140),
      constraints: ["Day VFR/IFR weather dependent", "Maximum 6 passengers with standard luggage"],
      dataStatus: "VERIFIED",
      recommendationScore: 96,
      alternatives: [
        {
          category: "TURBOPROP",
          title: "Executive Turboprop (Pilatus PC-12)",
          estimatedDuration: formatFlightDuration(distanceNm, 280),
          rationale: "Requires nearest certified runway landing, followed by 45m ground transfer.",
          indicativePriceRange: "€2,400 - €3,800",
          pricingStatus: "INDICATIVE",
        },
        {
          category: "LIGHT_JET",
          title: "Light Jet (Phenom 300E)",
          estimatedDuration: formatFlightDuration(distanceNm, 420),
          rationale: "Operates from certified airports only; requires ground limousine transfer to final pad location.",
          indicativePriceRange: "€3,900 - €5,500",
          pricingStatus: "INDICATIVE",
        },
      ],
    };
  }

  // Case 2: High Passenger Count (9+ passengers)
  if (passengerCount >= 8) {
    return {
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize / Large Cabin Jet",
      recommendedModelSlug: "challenger-350",
      recommendedModelName: "Bombardier Challenger 350",
      rationale:
        "Stand-up cabin required for 8+ passengers with full luggage capacity, flight attendant service, and extended range capability.",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      constraints: ["Requires minimum 1,400m runway length"],
      dataStatus: "VERIFIED",
      recommendationScore: 94,
      alternatives: [
        {
          category: "LARGE_CABIN_JET",
          title: "Heavy Jet (Legacy 600 / Global 6000)",
          estimatedDuration: formatFlightDuration(distanceNm, 490),
          rationale: "Maximum cabin volume with 3 distinct seating zones and transcontinental endurance.",
          indicativePriceRange: "€12,000 - €18,500",
          pricingStatus: "INDICATIVE",
        },
        {
          category: "MIDSIZE_JET",
          title: "Midsize Jet (Hawker 900XP)",
          estimatedDuration: formatFlightDuration(distanceNm, 450),
          rationale: "Tight fit for 8 passengers; optimized for medium range budgets.",
          indicativePriceRange: "€7,500 - €11,000",
          pricingStatus: "INDICATIVE",
        },
      ],
    };
  }

  // Case 3: Priority BEST_VALUE & Short/Medium Distance
  if (priority === "BEST_VALUE" && distanceNm <= 450 && passengerCount <= 6) {
    return {
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      recommendedModelSlug: "pilatus-pc12-ngx",
      recommendedModelName: "Pilatus PC-12 NGX",
      rationale:
        "Optimal balance of operating economics, unpaved runway capability, large cargo door, and executive cabin comfort for flights under 2.5 hours.",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      constraints: ["Turboprop cruise speed (280 KTS)"],
      dataStatus: "VERIFIED",
      recommendationScore: 95,
      alternatives: [
        {
          category: "LIGHT_JET",
          title: "Light Jet (Phenom 300E)",
          estimatedDuration: formatFlightDuration(distanceNm, 420),
          rationale: "25 minutes faster flight time for higher direct charter cost.",
          indicativePriceRange: "€4,200 - €6,200",
          pricingStatus: "INDICATIVE",
        },
        {
          category: "VERY_LIGHT_JET",
          title: "Very Light Jet (Citation Mustang)",
          estimatedDuration: formatFlightDuration(distanceNm, 380),
          rationale: "Lower charter price, limited to 4 passengers and smaller baggage hold.",
          indicativePriceRange: "€3,100 - €4,500",
          pricingStatus: "INDICATIVE",
        },
      ],
    };
  }

  // Case 4: Priority FASTEST or European Mission (Standard Light / Super Light Jet)
  if (distanceNm > 800) {
    return {
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      recommendedModelSlug: "challenger-350",
      recommendedModelName: "Bombardier Challenger 350",
      rationale:
        "Non-stop range over 2,500 NM with high-speed cruise (470 KTS), full galley, and private lavatory.",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      constraints: ["Main airport runway requirements"],
      dataStatus: "VERIFIED",
      recommendationScore: 92,
      alternatives: [
        {
          category: "MIDSIZE_JET",
          title: "Midsize Jet (Citation XLS+)",
          estimatedDuration: formatFlightDuration(distanceNm, 440),
          rationale: "Comfortable stand-up cabin for 7 passengers across continental Europe.",
          indicativePriceRange: "€8,500 - €12,500",
          pricingStatus: "INDICATIVE",
        },
      ],
    };
  }

  // Default European Light Jet Mission (Phenom 300E / Citation CJ4)
  return {
    category: "LIGHT_JET",
    categoryDisplayName: "Light Jet",
    recommendedModelSlug: "phenom-300e",
    recommendedModelName: "Embraer Phenom 300E",
    rationale:
      "Europe's most requested light jet class. Delivers high speed (453 KTS), best-in-class cabin altitude, and superior baggage capacity for up to 6 passengers.",
    estimatedDuration: formatFlightDuration(distanceNm, 420),
    constraints: ["Requires certified asphalt/concrete runway >= 1,100m"],
    dataStatus: "VERIFIED",
    recommendationScore: 98,
    alternatives: [
      {
        category: "TURBOPROP",
        title: "Executive Turboprop (Pilatus PC-12 NGX)",
        estimatedDuration: formatFlightDuration(distanceNm, 280),
        rationale: "Cost-effective alternative for short-field access and flexible baggage needs.",
        indicativePriceRange: "€2,900 - €4,200",
        pricingStatus: "INDICATIVE",
      },
      {
        category: "MIDSIZE_JET",
        title: "Midsize Jet (Citation XLS+)",
        estimatedDuration: formatFlightDuration(distanceNm, 440),
        rationale: "Greater cabin headroom and seating for up to 8 passengers.",
        indicativePriceRange: "€6,500 - €9,200",
        pricingStatus: "INDICATIVE",
      },
    ],
  };
}
