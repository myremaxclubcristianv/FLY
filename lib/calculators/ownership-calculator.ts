export type AircraftCategoryType =
  | "TURBOPROP"
  | "LIGHT_JET"
  | "SUPER_MIDSIZE"
  | "LARGE_CABIN";

export type AccessModelType =
  | "ON_DEMAND_CHARTER"
  | "MEMBERSHIP_JET_CARD"
  | "FRACTIONAL_OWNERSHIP"
  | "MANAGED_LEASE_ACMI"
  | "WHOLE_AIRCRAFT_OWNERSHIP";

export interface CategoryBenchmark {
  label: string;
  representativeModel: string;
  defaultHourlyCharterRateEur: number;
  defaultAcquisitionCapitalEur: number;
  defaultAnnualFixedCostEur: number; // crew, hangar, insurance, management, CAMO
  defaultDirectHourlyCostEur: number; // fuel, engine reserves, landing/handling fees
}

export const CATEGORY_BENCHMARKS: Record<AircraftCategoryType, CategoryBenchmark> = {
  TURBOPROP: {
    label: "Executive Turboprop",
    representativeModel: "Pilatus PC-12 NGX / Beechcraft King Air 350",
    defaultHourlyCharterRateEur: 2600,
    defaultAcquisitionCapitalEur: 4500000,
    defaultAnnualFixedCostEur: 195000,
    defaultDirectHourlyCostEur: 1100,
  },
  LIGHT_JET: {
    label: "Light Jet",
    representativeModel: "Embraer Phenom 300E / Cessna Citation CJ4",
    defaultHourlyCharterRateEur: 3800,
    defaultAcquisitionCapitalEur: 6800000,
    defaultAnnualFixedCostEur: 320000,
    defaultDirectHourlyCostEur: 1650,
  },
  SUPER_MIDSIZE: {
    label: "Super Midsize Jet",
    representativeModel: "Bombardier Challenger 350 / Embraer Praetor 600",
    defaultHourlyCharterRateEur: 6800,
    defaultAcquisitionCapitalEur: 14500000,
    defaultAnnualFixedCostEur: 560000,
    defaultDirectHourlyCostEur: 2850,
  },
  LARGE_CABIN: {
    label: "Large Cabin / Ultra-Long Range",
    representativeModel: "Gulfstream G650ER / Bombardier Global 7500",
    defaultHourlyCharterRateEur: 11500,
    defaultAcquisitionCapitalEur: 48000000,
    defaultAnnualFixedCostEur: 1150000,
    defaultDirectHourlyCostEur: 4900,
  },
};

export interface OwnershipCalculationInput {
  annualHours: number;
  category: AircraftCategoryType;
  customCharterRateEur?: number;
  customFixedCostsEur?: number;
  customDirectHourlyEur?: number;
  customCapitalEur?: number;
}

export interface OwnershipCalculationResult {
  annualHours: number;
  category: AircraftCategoryType;
  categoryLabel: string;
  representativeModel: string;
  recommendedModel: AccessModelType;
  modelTitle: string;
  headline: string;
  detailedReason: string;
  charterAnnualTotalEur: number;
  ownershipAnnualTotalEur: number;
  effectiveOwnershipHourlyEur: number;
  annualDifferenceEur: number; // positive = charter costs more than ownership
  capitalOutlayEur: number;
  fixedAnnualCostsEur: number;
  directHourlyCostEur: number;
  hourlyCharterRateEur: number;
  hoursBandDescription: string;
  isCustomized: boolean;
}

/**
 * Single typed decision engine for Aircraft Access & Ownership Economics.
 * Strict mathematical intervals with zero gaps, zero overlaps, and explicit boundaries.
 * 
 * Intervals:
 * [0, 50)     -> ON_DEMAND_CHARTER
 * [50, 100)   -> MEMBERSHIP_JET_CARD
 * [100, 175)  -> FRACTIONAL_OWNERSHIP
 * [175, 250)  -> MANAGED_LEASE_ACMI
 * [250, +inf) -> WHOLE_AIRCRAFT_OWNERSHIP
 */
export function calculateOwnershipRecommendation(
  input: OwnershipCalculationInput
): OwnershipCalculationResult {
  const annualHours = Math.max(0, Number(input.annualHours) || 0);
  const category = input.category || "LIGHT_JET";
  const benchmark = CATEGORY_BENCHMARKS[category] || CATEGORY_BENCHMARKS.LIGHT_JET;

  const hourlyCharterRateEur =
    input.customCharterRateEur !== undefined && input.customCharterRateEur > 0
      ? input.customCharterRateEur
      : benchmark.defaultHourlyCharterRateEur;

  const capitalOutlayEur =
    input.customCapitalEur !== undefined && input.customCapitalEur > 0
      ? input.customCapitalEur
      : benchmark.defaultAcquisitionCapitalEur;

  const fixedAnnualCostsEur =
    input.customFixedCostsEur !== undefined && input.customFixedCostsEur >= 0
      ? input.customFixedCostsEur
      : benchmark.defaultAnnualFixedCostEur;

  const directHourlyCostEur =
    input.customDirectHourlyEur !== undefined && input.customDirectHourlyEur > 0
      ? input.customDirectHourlyEur
      : benchmark.defaultDirectHourlyCostEur;

  const isCustomized =
    hourlyCharterRateEur !== benchmark.defaultHourlyCharterRateEur ||
    capitalOutlayEur !== benchmark.defaultAcquisitionCapitalEur ||
    fixedAnnualCostsEur !== benchmark.defaultAnnualFixedCostEur ||
    directHourlyCostEur !== benchmark.defaultDirectHourlyCostEur;

  // Annual Totals
  const charterAnnualTotalEur = Math.round(annualHours * hourlyCharterRateEur);
  const ownershipAnnualTotalEur = Math.round(
    fixedAnnualCostsEur + annualHours * directHourlyCostEur
  );
  const effectiveOwnershipHourlyEur =
    annualHours > 0 ? Math.round(ownershipAnnualTotalEur / annualHours) : 0;
  const annualDifferenceEur = charterAnnualTotalEur - ownershipAnnualTotalEur;

  // Strict Decision Interval Determination
  let recommendedModel: AccessModelType;
  let modelTitle: string;
  let headline: string;
  let detailedReason: string;
  let hoursBandDescription: string;

  if (annualHours < 50) {
    recommendedModel = "ON_DEMAND_CHARTER";
    modelTitle = "On-Demand Charter";
    hoursBandDescription = "Under 50 Hours / Year";
    headline = "On-Demand Private Charter is the Most Efficient Model";
    detailedReason = `At ${annualHours} flight hours per year, on-demand charter eliminates all recurring fixed overhead (crew salaries, hangar rent, annual insurance, CAMO oversight). You pay strictly for hours flown with zero residual asset exposure or balance sheet debt.`;
  } else if (annualHours < 100) {
    recommendedModel = "MEMBERSHIP_JET_CARD";
    modelTitle = "Jet Card / Block-Hour Program";
    hoursBandDescription = "50 – 99 Hours / Year";
    headline = "Jet Card or 25-50 Hour Block Program Recommended";
    detailedReason = `At ${annualHours} hours annually, pre-purchased block hours (e.g. 25-hour or 50-hour jet cards) provide guaranteed fleet access, fixed hourly pricing, and short call-out times without committing €${(
      capitalOutlayEur / 1000000
    ).toFixed(1)}M in capital acquisition or taking on monthly maintenance retainers.`;
  } else if (annualHours < 175) {
    recommendedModel = "FRACTIONAL_OWNERSHIP";
    modelTitle = "Fractional Ownership Program";
    hoursBandDescription = "100 – 174 Hours / Year";
    headline = "Fractional Ownership Share is the Strategic Sweet Spot";
    detailedReason = `At ${annualHours} flight hours, acquiring a 1/8th or 1/4th fractional aircraft share gives you dedicated guaranteed tail availability, customized cabin familiarity, and accelerated tax depreciation benefits, while dividing the €${(
      fixedAnnualCostsEur / 1000
    ).toFixed(0)}k fixed cost base among co-owners.`;
  } else if (annualHours < 250) {
    recommendedModel = "MANAGED_LEASE_ACMI";
    modelTitle = "Dedicated Lease / Turnkey Aircraft Management (ACMI)";
    hoursBandDescription = "175 – 249 Hours / Year";
    headline = "Dedicated Aircraft Lease or ACMI Management Recommended";
    detailedReason = `At ${annualHours} flight hours annually, leasing a dedicated airframe under turnkey Part-NCC/Part-CAT management ensures continuous mission availability. Fixed operational costs can be partially offset by placing unutilized hours on a certified operator's AOC charter fleet.`;
  } else {
    recommendedModel = "WHOLE_AIRCRAFT_OWNERSHIP";
    modelTitle = "Whole-Aircraft Acquisition & Management";
    hoursBandDescription = "250+ Hours / Year";
    headline = "Whole Aircraft Ownership & Dedicated Flight Department Justified";
    detailedReason = `At ${annualHours}+ flight hours annually, the fixed cost base is amortized across high annual utilization, bringing your effective hourly cost down to ~€${effectiveOwnershipHourlyEur.toLocaleString()}/hr compared to €${hourlyCharterRateEur.toLocaleString()}/hr on retail charter. This volume justifies complete asset sovereignty, bespoke interior cabin design, and dedicated full-time crew.`;
  }

  return {
    annualHours,
    category,
    categoryLabel: benchmark.label,
    representativeModel: benchmark.representativeModel,
    recommendedModel,
    modelTitle,
    headline,
    detailedReason,
    charterAnnualTotalEur,
    ownershipAnnualTotalEur,
    effectiveOwnershipHourlyEur,
    annualDifferenceEur,
    capitalOutlayEur,
    fixedAnnualCostsEur,
    directHourlyCostEur,
    hourlyCharterRateEur,
    hoursBandDescription,
    isCustomized,
  };
}
