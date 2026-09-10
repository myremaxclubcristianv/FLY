import {
  AircraftCategory,
  MissionPriority,
} from "@/types/domain";
import {
  TripType,
  DateFlexibility,
  BudgetPreference,
  MissionPurpose,
  SpecialRequirement,
  TransportOption,
  DecisionPayload,
} from "@/types/flight-request";
import { formatFlightDuration } from "@/lib/utils/distance";

export interface DecisionEngineInput {
  origin: string;
  destination: string;
  distanceNm?: number;
  passengerCount: number;
  priority: MissionPriority;
  tripType?: TripType;
  date?: string;
  returnDate?: string;
  dateFlexibility?: DateFlexibility;
  budgetPreference?: BudgetPreference;
  purpose?: MissionPurpose;
  requirements?: SpecialRequirement[];
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
  verificationStatus: "VERIFIED" | "OFFICIAL_SOURCE" | "PUBLIC";
  recommendationScore: number;
  payload: DecisionPayload;
  alternatives: Array<{
    category: string;
    categoryDisplayName: string;
    title: string;
    estimatedDuration: string;
    rationale: string;
    indicativePriceRange: string;
    pricingStatus: "INDICATIVE" | "REQUEST";
    constraints: string[];
  }>;
}

/**
 * Deterministic AIR Mission Decision & Way-to-Fly Engine
 * Analyzes mission vector, airfield constraints, passenger count, mission purpose,
 * luggage volume, and operational priorities to output the optimal way to fly and alternatives.
 */
export function evaluateMissionDecision(input: DecisionEngineInput): RecommendationResult {
  const {
    origin,
    destination,
    distanceNm = 350,
    passengerCount = 2,
    priority = "FASTEST",
    tripType = "ONE_WAY",
    date = "2026-09-24",
    returnDate,
    budgetPreference = "STANDARD_CHARTER",
    purpose = "EXECUTIVE_BUSINESS",
    requirements = [],
    isHelicopterAccessible = false,
    runwayConstrained = false,
  } = input;

  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();
  const isShortHop = distanceNm <= 180;
  const hasHelipadReq = requirements.includes("HELIPAD_DIRECT");
  const isMountainOrPad =
    hasHelipadReq ||
    isHelicopterAccessible ||
    purpose === "MOUNTAIN_ALPINE" ||
    originLower.includes("pad") ||
    destLower.includes("pad") ||
    originLower.includes("bran") ||
    destLower.includes("bran") ||
    originLower.includes("mamaia") ||
    destLower.includes("mamaia") ||
    originLower.includes("sinaia") ||
    destLower.includes("sinaia") ||
    destLower.includes("tuzla") ||
    runwayConstrained;

  // Case 1: Point-to-Point Helicopter Mission (Mountain resort, coastal pad, or short hop)
  if (isMountainOrPad && isShortHop && passengerCount <= 6) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-heli",
      category: "HELICOPTER",
      categoryDisplayName: "Twin-Engine Executive Helicopter",
      name: "AIRBUS H145 / BELL 429",
      tagline: "Direct point-to-point landing at destination property without airport transfers",
      estimatedDuration: formatFlightDuration(distanceNm, 140),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "Zero airport transfer overhead; lands directly on private estate or hotel pad",
      suitableFor: "Mountain retreats, coastal transfers, castle arrivals, time-critical direct hops",
      operationalConstraints: [
        "Day VFR / IFR minima required",
        "Maximum 6 passengers with standard soft luggage",
        "Subject to destination landing pad authorization",
      ],
      recommendationReason:
        "AIR recommends a dedicated Twin-Engine Executive Helicopter for this mission. Because your route involves mountain terrain or direct helipad access under 180 NM, a helicopter saves over 90 minutes of ground mountain transfer compared to landing at a conventional runway.",
      routing: `${origin} → ${destination} (Direct Rotor Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-turboprop",
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      name: "PILATUS PC-12 NGX",
      tagline: "Best-value runway alternative with Swiss-engineered short field access",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€2,600 - €3,900",
      keyBenefit: "Economical hourly cost, massive cargo door for ski/bulky luggage",
      suitableFor: "Nearest certified aerodrome landing followed by 35-45m chauffeured transfer",
      operationalConstraints: ["Requires certified aerodrome (min 750m runway)"],
      recommendationReason:
        "Operates into the nearest regional runway, requiring a short chauffeured ground transfer to destination.",
      routing: `${origin} → Nearest Runway + Ground Transfer`,
    };

    const alt2: TransportOption = {
      id: "opt-alt-light-jet",
      category: "LIGHT_JET",
      categoryDisplayName: "Light Jet",
      name: "EMBRAER PHENOM 300E",
      tagline: "High-speed jet corridor to closest major airport",
      estimatedDuration: formatFlightDuration(distanceNm, 420),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€4,200 - €5,800",
      keyBenefit: "Cruises at 453 KTS with pressurized quiet cabin",
      suitableFor: "Intercity jet connection when regional airport infrastructure exists",
      operationalConstraints: ["Requires certified paved runway >= 1,100m"],
      recommendationReason: "Jet speed to nearest airport, followed by executive ground transfer.",
      routing: `${origin} → Nearest Major Airport + VIP Vehicle`,
    };

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
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 97,
      payload: {
        missionTitle: `${origin} to ${destination} Point-to-Point Helicopter Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1, alt2],
      },
      alternatives: [
        {
          category: "TURBOPROP",
          categoryDisplayName: "Executive Turboprop",
          title: "Pilatus PC-12 NGX",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€2,600 - €3,900",
          pricingStatus: alt1.pricingStatus as "INDICATIVE" | "REQUEST",
          constraints: alt1.operationalConstraints,
        },
        {
          category: "LIGHT_JET",
          categoryDisplayName: "Light Jet",
          title: "Embraer Phenom 300E",
          estimatedDuration: alt2.estimatedDuration,
          rationale: alt2.recommendationReason,
          indicativePriceRange: alt2.indicativePriceRange || "€4,200 - €5,800",
          pricingStatus: alt2.pricingStatus as "INDICATIVE" | "REQUEST",
          constraints: alt2.operationalConstraints,
        },
      ],
    };
  }

  // Case 2: High Passenger Manifest (8+ passengers)
  if (passengerCount >= 8) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-super-mid",
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      name: "BOMBARDIER CHALLENGER 350",
      tagline: "Stand-up flat floor cabin with full passenger payload and transcontinental speed",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "Generous stand-up cabin (6ft height), dedicated galley, quietest cabin in class",
      suitableFor: "Executive delegations, corporate boards, large family groups with full luggage",
      operationalConstraints: [
        "Minimum runway length: 1,400m",
        "Dedicated dual-pilot crew + optional flight hostess",
      ],
      recommendationReason:
        "With 8+ passengers on manifest, AIR recommends a Super Midsize Jet (Bombardier Challenger 350). Smaller light jets cannot accommodate 8 passengers with full luggage without exceeding weight and balance limits. The Challenger 350 delivers true stand-up comfort, high-speed cruise (470 KTS), and extensive baggage capacity.",
      routing: `${origin} → ${destination} (Direct Jet Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-large-cabin",
      category: "LARGE_CABIN_JET",
      categoryDisplayName: "Large Cabin Heavy Jet",
      name: "BOMBARDIER GLOBAL 5000 / 6000",
      tagline: "Ultra-long-range luxury flagship with 3 distinct zone cabins",
      estimatedDuration: formatFlightDuration(distanceNm, 490),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€14,000 - €21,000",
      keyBenefit: "Master stateroom, full hot galley dining, transoceanic endurance",
      suitableFor: "Ultra-VIP missions requiring maximum prestige, quiet, and private suite",
      operationalConstraints: ["Requires major airport with long runway (>= 1,700m)"],
      recommendationReason: "Expanded cabin volume with 3 distinct living zones and full lie-flat berthing.",
      routing: `${origin} → ${destination} (Flagship Heavy Vector)`,
    };

    const alt2: TransportOption = {
      id: "opt-alt-midsize",
      category: "MIDSIZE_JET",
      categoryDisplayName: "Midsize Jet",
      name: "CESSNA CITATION XLS+",
      tagline: "Efficient stand-up cabin sized precisely for 8 passengers on regional legs",
      estimatedDuration: formatFlightDuration(distanceNm, 440),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€7,800 - €10,500",
      keyBenefit: "Lower operating cost while maintaining stand-up headroom",
      suitableFor: "Budget-conscious corporate travel within Europe for 8 passengers",
      operationalConstraints: ["Reduced luggage allowance per seat compared to Super Midsize"],
      recommendationReason: "Optimized budget alternative for 8 passengers on European routes.",
      routing: `${origin} → ${destination} (Midsize Jet Vector)`,
    };

    return {
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      recommendedModelSlug: "challenger-350",
      recommendedModelName: "Bombardier Challenger 350",
      rationale:
        "Stand-up cabin required for 8+ passengers with full luggage capacity, flight attendant service, and extended range capability.",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      constraints: ["Requires minimum 1,400m runway length"],
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 95,
      payload: {
        missionTitle: `${origin} to ${destination} Executive Heavy Manifest Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1, alt2],
      },
      alternatives: [
        {
          category: "LARGE_CABIN_JET",
          categoryDisplayName: "Large Cabin Jet",
          title: "Bombardier Global 5000 / 6000",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€14,000 - €21,000",
          pricingStatus: "INDICATIVE",
          constraints: alt1.operationalConstraints,
        },
        {
          category: "MIDSIZE_JET",
          categoryDisplayName: "Midsize Jet",
          title: "Cessna Citation XLS+",
          estimatedDuration: alt2.estimatedDuration,
          rationale: alt2.recommendationReason,
          indicativePriceRange: alt2.indicativePriceRange || "€7,800 - €10,500",
          pricingStatus: "INDICATIVE",
          constraints: alt2.operationalConstraints,
        },
      ],
    };
  }

  // Case 3: Priority BEST_VALUE & Medium Distance (Pilatus PC-12 NGX)
  if (
    (priority === "BEST_VALUE" || budgetPreference === "VALUE_OPTIMIZED") &&
    distanceNm <= 500 &&
    passengerCount <= 6
  ) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-turboprop",
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      name: "PILATUS PC-12 NGX",
      tagline: "The gold standard in Swiss executive efficiency, short-runway capability, and huge cabin space",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "40% lower fuel burn than entry-level jets with equal BMW Designworks interior comfort",
      suitableFor: "Regional European flights under 2.5 hours where value and luggage flexibility matter",
      operationalConstraints: [
        "Cruise speed: 280 KTS (approx 20 mins longer on European routes)",
        "Unpaved/short runway certified",
      ],
      recommendationReason:
        "AIR recommends the Pilatus PC-12 NGX for this mission. Given your priority for Best Value, the PC-12 delivers executive BMW-designed cabin seats, unmatched cargo capacity, and short-field access at a significantly lower operational cost than comparable light jets.",
      routing: `${origin} → ${destination} (Direct Turboprop Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-light-jet",
      category: "LIGHT_JET",
      categoryDisplayName: "Light Jet",
      name: "EMBRAER PHENOM 300E",
      tagline: "25 minutes faster flight time with high-altitude jet cruising",
      estimatedDuration: formatFlightDuration(distanceNm, 420),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€4,400 - €6,200",
      keyBenefit: "Fastest light jet in the world; best-in-class cabin pressurization",
      suitableFor: "Time-critical schedules requiring maximum speed",
      operationalConstraints: ["Requires certified paved runway >= 1,100m"],
      recommendationReason: "Faster travel speed for higher direct charter cost.",
      routing: `${origin} → ${destination} (Jet Vector)`,
    };

    const alt2: TransportOption = {
      id: "opt-alt-vlj",
      category: "VERY_LIGHT_JET",
      categoryDisplayName: "Very Light Jet",
      name: "CESSNA CITATION MUSTANG",
      tagline: "Ultra-compact jet pricing for 2 to 4 passengers",
      estimatedDuration: formatFlightDuration(distanceNm, 360),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€2,900 - €4,100",
      keyBenefit: "Lowest entry charter price for pure jet flight",
      suitableFor: "Solo travelers or couples with light luggage",
      operationalConstraints: ["Strict 4-passenger cabin, compact baggage hold"],
      recommendationReason: "Entry-level jet charter with compact 4-seat cabin.",
      routing: `${origin} → ${destination} (VLJ Vector)`,
    };

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
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 96,
      payload: {
        missionTitle: `${origin} to ${destination} Executive Value Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1, alt2],
      },
      alternatives: [
        {
          category: "LIGHT_JET",
          categoryDisplayName: "Light Jet",
          title: "Embraer Phenom 300E",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€4,400 - €6,200",
          pricingStatus: "INDICATIVE",
          constraints: alt1.operationalConstraints,
        },
        {
          category: "VERY_LIGHT_JET",
          categoryDisplayName: "Very Light Jet",
          title: "Cessna Citation Mustang",
          estimatedDuration: alt2.estimatedDuration,
          rationale: alt2.recommendationReason,
          indicativePriceRange: alt2.indicativePriceRange || "€2,900 - €4,100",
          pricingStatus: "INDICATIVE",
          constraints: alt2.operationalConstraints,
        },
      ],
    };
  }

  // Case 4: Standard European Mission -> EMBRAER PHENOM 300E (Europe's #1 Light Jet)
  const primaryOpt: TransportOption = {
    id: "opt-primary-phenom",
    category: "LIGHT_JET",
    categoryDisplayName: "Light Jet",
    name: "EMBRAER PHENOM 300E",
    tagline: "The world's bestselling light jet for 12 consecutive years: 453 KTS cruise & premium cabin altitude",
    estimatedDuration: formatFlightDuration(distanceNm, 420),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "REQUEST",
    indicativePriceRange: "REQUEST OPERATOR QUOTE",
    keyBenefit: "Fastest cruise speed in category, lowest cabin altitude (6,600 ft at FL450), 6-8 seats",
    suitableFor: "European business corridors, Mediterranean leisure, point-to-point speed",
    operationalConstraints: [
      "Requires certified paved runway >= 1,100m",
      "Full IFR operational clearance",
    ],
    recommendationReason:
      "AIR recommends the Embraer Phenom 300E as the optimal way to fly for this mission. It combines the highest speed in its class (453 KTS) with a quiet, low-altitude pressurized cabin, generous baggage hold, and proven operational availability across Romanian and European bases.",
    routing: `${origin} → ${destination} (Optimal Direct Jet Vector)`,
    isPrimary: true,
  };

  const alt1: TransportOption = {
    id: "opt-alt-turboprop",
    category: "TURBOPROP",
    categoryDisplayName: "Executive Turboprop",
    name: "PILATUS PC-12 NGX",
    tagline: "Swiss-engineered efficiency and flexible cargo hold",
    estimatedDuration: formatFlightDuration(distanceNm, 280),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "INDICATIVE",
    indicativePriceRange: "€3,200 - €4,500",
    keyBenefit: "Economical fuel burn, capable of landing on grass or short runways",
    suitableFor: "Short-field access, regional golf/ski luggage trips",
    operationalConstraints: ["280 KTS cruise speed"],
    recommendationReason: "Cost-effective alternative with large cargo door.",
    routing: `${origin} → ${destination} (Turboprop Vector)`,
  };

  const alt2: TransportOption = {
    id: "opt-alt-midsize",
    category: "MIDSIZE_JET",
    categoryDisplayName: "Midsize Jet",
    name: "CESSNA CITATION XLS+",
    tagline: "Stand-up headroom and wider cabin aisle for up to 8 passengers",
    estimatedDuration: formatFlightDuration(distanceNm, 440),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "INDICATIVE",
    indicativePriceRange: "€6,800 - €9,500",
    keyBenefit: "Stand-up comfort, generous galley bar, enclosed private lavatory",
    suitableFor: "Corporate flights where standing room and meeting comfort are desired",
    operationalConstraints: ["Requires minimum 1,250m runway length"],
    recommendationReason: "Greater cabin volume and headroom for extended comfort.",
    routing: `${origin} → ${destination} (Midsize Jet Vector)`,
  };

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
    verificationStatus: "OFFICIAL_SOURCE",
    recommendationScore: 98,
    payload: {
      missionTitle: `${origin} to ${destination} Flight Mission`,
      origin,
      destination,
      passengers: passengerCount,
      tripType,
      date,
      returnDate,
      priority,
      purpose,
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      summaryReason: primaryOpt.recommendationReason,
      primaryOption: primaryOpt,
      alternativeOptions: [alt1, alt2],
    },
    alternatives: [
      {
        category: "TURBOPROP",
        categoryDisplayName: "Executive Turboprop",
        title: "Pilatus PC-12 NGX",
        estimatedDuration: alt1.estimatedDuration,
        rationale: alt1.recommendationReason,
        indicativePriceRange: alt1.indicativePriceRange || "€3,200 - €4,500",
        pricingStatus: "INDICATIVE",
        constraints: alt1.operationalConstraints,
      },
      {
        category: "MIDSIZE_JET",
        categoryDisplayName: "Midsize Jet",
        title: "Cessna Citation XLS+",
        estimatedDuration: alt2.estimatedDuration,
        rationale: alt2.recommendationReason,
        indicativePriceRange: alt2.indicativePriceRange || "€6,800 - €9,500",
        pricingStatus: "INDICATIVE",
        constraints: alt2.operationalConstraints,
      },
    ],
  };
}
