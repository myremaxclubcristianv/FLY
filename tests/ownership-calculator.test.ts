import {
  calculateOwnershipRecommendation,
  CATEGORY_BENCHMARKS,
  AircraftCategoryType,
} from "../lib/calculators/ownership-calculator";

console.log("==================================================");
console.log("AIR OWNERSHIP CALCULATOR & BOUNDARY TEST SUITE");
console.log("==================================================");

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passedCount++;
  } else {
    console.error(`✗ FAIL: ${testName}`);
    failedCount++;
  }
}

// 1. Boundary tests for [0, 50) -> ON_DEMAND_CHARTER
const zeroHours = calculateOwnershipRecommendation({ annualHours: 0, category: "LIGHT_JET" });
assert(zeroHours.recommendedModel === "ON_DEMAND_CHARTER", "0 hours resolves to ON_DEMAND_CHARTER");
assert(zeroHours.effectiveOwnershipHourlyEur === 0, "0 hours does not divide by zero");

const edge49 = calculateOwnershipRecommendation({ annualHours: 49, category: "LIGHT_JET" });
assert(edge49.recommendedModel === "ON_DEMAND_CHARTER", "49 hours resolves to ON_DEMAND_CHARTER");

// 2. Boundary tests for [50, 100) -> MEMBERSHIP_JET_CARD
const edge50 = calculateOwnershipRecommendation({ annualHours: 50, category: "LIGHT_JET" });
assert(edge50.recommendedModel === "MEMBERSHIP_JET_CARD", "50 hours boundary resolves to MEMBERSHIP_JET_CARD");

const edge99 = calculateOwnershipRecommendation({ annualHours: 99, category: "LIGHT_JET" });
assert(edge99.recommendedModel === "MEMBERSHIP_JET_CARD", "99 hours boundary resolves to MEMBERSHIP_JET_CARD");

// 3. Boundary tests for [100, 175) -> FRACTIONAL_OWNERSHIP
const edge100 = calculateOwnershipRecommendation({ annualHours: 100, category: "LIGHT_JET" });
assert(edge100.recommendedModel === "FRACTIONAL_OWNERSHIP", "100 hours boundary resolves to FRACTIONAL_OWNERSHIP");

const edge150 = calculateOwnershipRecommendation({ annualHours: 150, category: "LIGHT_JET" });
assert(edge150.recommendedModel === "FRACTIONAL_OWNERSHIP", "150 hours (previously in gap) resolves to FRACTIONAL_OWNERSHIP");

const edge174 = calculateOwnershipRecommendation({ annualHours: 174, category: "LIGHT_JET" });
assert(edge174.recommendedModel === "FRACTIONAL_OWNERSHIP", "174 hours resolves to FRACTIONAL_OWNERSHIP");

// 4. Boundary tests for [175, 250) -> MANAGED_LEASE_ACMI
const edge175 = calculateOwnershipRecommendation({ annualHours: 175, category: "LIGHT_JET" });
assert(edge175.recommendedModel === "MANAGED_LEASE_ACMI", "175 hours boundary resolves to MANAGED_LEASE_ACMI");

const edge200 = calculateOwnershipRecommendation({ annualHours: 200, category: "LIGHT_JET" });
assert(edge200.recommendedModel === "MANAGED_LEASE_ACMI", "200 hours resolves to MANAGED_LEASE_ACMI");

const edge249 = calculateOwnershipRecommendation({ annualHours: 249, category: "LIGHT_JET" });
assert(edge249.recommendedModel === "MANAGED_LEASE_ACMI", "249 hours resolves to MANAGED_LEASE_ACMI");

// 5. Boundary tests for [250, +inf) -> WHOLE_AIRCRAFT_OWNERSHIP
const edge250 = calculateOwnershipRecommendation({ annualHours: 250, category: "LIGHT_JET" });
assert(edge250.recommendedModel === "WHOLE_AIRCRAFT_OWNERSHIP", "250 hours boundary resolves to WHOLE_AIRCRAFT_OWNERSHIP");

const edge350 = calculateOwnershipRecommendation({ annualHours: 350, category: "LARGE_CABIN" });
assert(edge350.recommendedModel === "WHOLE_AIRCRAFT_OWNERSHIP", "350 hours resolves to WHOLE_AIRCRAFT_OWNERSHIP");

// 6. Test all categories benchmark integrity
const categories: AircraftCategoryType[] = ["TURBOPROP", "LIGHT_JET", "SUPER_MIDSIZE", "LARGE_CABIN"];
for (const cat of categories) {
  const res = calculateOwnershipRecommendation({ annualHours: 120, category: cat });
  assert(res.category === cat, `Category ${cat} correctly reflected in result`);
  assert(res.hourlyCharterRateEur === CATEGORY_BENCHMARKS[cat].defaultHourlyCharterRateEur, `Default rate matches for ${cat}`);
  assert(res.capitalOutlayEur === CATEGORY_BENCHMARKS[cat].defaultAcquisitionCapitalEur, `Capital outlay matches for ${cat}`);
}

// 7. Customization & Reset verification
const custom = calculateOwnershipRecommendation({
  annualHours: 120,
  category: "LIGHT_JET",
  customCharterRateEur: 4200,
});
assert(custom.isCustomized === true, "Custom charter rate flagged as isCustomized=true");
assert(custom.hourlyCharterRateEur === 4200, "Custom charter rate honored");

console.log("==================================================");
console.log(`TOTAL: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
