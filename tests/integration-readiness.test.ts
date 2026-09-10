import {
  resolveUserRole,
  isOperationsAuthorized,
  canClientViewMission,
  validateLifecycleTransition,
} from "../lib/auth/rbac";
import {
  validateAndNormalizeQuotePayload,
  AvinodeSourcingAdapter,
  DirectOperatorDispatchAdapter,
} from "../lib/integrations/operators/operator-sourcing-provider";
import { quoteIngestionService } from "../lib/services/quote-ingestion-service";
import { missionRequestService } from "../lib/services/mission-request-service";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${message}`);
}

console.log("==================================================");
console.log("AIR INTEGRATION READINESS & BUSINESS LOGIC SUITE");
console.log("==================================================");

// 1. Role Authorization & RBAC
console.log("\n[1] RBAC & Role Authorization:");
assert(resolveUserRole("admin", "admin@air.aero") === "ADMIN", "resolveUserRole identifies ADMIN");
assert(resolveUserRole("ops", "ops@air.aero") === "OPERATIONS", "resolveUserRole identifies OPERATIONS");
assert(resolveUserRole(null, "client@domain.com") === "CLIENT", "resolveUserRole defaults to CLIENT");
assert(isOperationsAuthorized("OPERATIONS") === true, "OPERATIONS is authorized for flight desk actions");
assert(isOperationsAuthorized("CLIENT") === false, "CLIENT cannot access flight desk actions");

// 2. Mission Ownership Isolation
console.log("\n[2] Mission Ownership Isolation:");
const mockMission = { userId: "user-123", email: "client@vip.com" };
assert(canClientViewMission("user-123", "client@vip.com", mockMission) === true, "Owner can view mission");
assert(canClientViewMission("user-456", "other@vip.com", mockMission) === false, "Other client cannot view mission");

// 3. Lifecycle Transition Rules
console.log("\n[3] Lifecycle Transition Rules:");
assert(
  validateLifecycleTransition("REQUESTED", "SOURCING", "OPERATIONS").allowed === true,
  "Ops can transition REQUESTED -> SOURCING"
);
assert(
  validateLifecycleTransition("CONFIRMED", "REQUESTED", "OPERATIONS").allowed === false,
  "Cannot revert CONFIRMED -> REQUESTED (terminal state)"
);
assert(
  validateLifecycleTransition("REQUESTED", "CONFIRMED", "CLIENT", false, false).allowed === false,
  "Client cannot confirm a mission without presented quotes"
);
assert(
  validateLifecycleTransition("PRESENTED", "CONFIRMED", "CLIENT", true, true).allowed === true,
  "Client can confirm a mission in PRESENTED status"
);
assert(
  validateLifecycleTransition("QUOTES_RECEIVED", "PRESENTED", "OPERATIONS", true, false).allowed === false,
  "Ops cannot present quotes without completed safety review"
);

// 4. Quote Ingestion & Normalization
console.log("\n[4] Quote Ingestion & Normalization:");
const validPayload = {
  operatorBrand: "Ţiriac Air",
  operatorLegalName: "Ion Ţiriac Air S.R.L.",
  aocNumber: "RO-003",
  aircraftModel: "Embraer Phenom 300E",
  aircraftCategory: "LIGHT_JET",
  tailNumber: "YR-TYA",
  totalPrice: 8800,
  currency: "EUR",
  inclusions: ["VIP FBO handling", "Executive catering"],
  originIcao: "LRBS",
  destinationIcao: "LFMN",
  estimatedFlightTime: "2h 15m",
};
const normResult = validateAndNormalizeQuotePayload(validPayload, "direct_aoc", "OPERATOR_DIRECT");
assert(normResult.isValid === true, "Valid quote payload passes normalization");
assert(normResult.normalizedQuote?.operator.aocNumber === "RO-003", "AOC number normalized");
assert(normResult.normalizedQuote?.provenance.verificationStatus === "OFFICIAL_SOURCE", "Official source tagged");

// Test Malformed Quote Rejection
const invalidPayload = {
  operatorBrand: "",
  totalPrice: -500, // Invalid negative price
};
const invalidResult = validateAndNormalizeQuotePayload(invalidPayload, "direct_aoc", "OPERATOR_DIRECT");
assert(invalidResult.isValid === false, "Malformed quote is rejected");
assert(invalidResult.errors.length >= 2, "Rejection contains specific validation error messages");

// 5. Provider Sourcing Adapters & Unconfigured Safety
console.log("\n[5] Provider Sourcing Adapters Safety:");
const avinode = new AvinodeSourcingAdapter();
assert(avinode.getStatus() === "NOT_CONFIGURED", "Unconfigured Avinode reports NOT_CONFIGURED without fabrication");
const directAoc = new DirectOperatorDispatchAdapter();
assert(directAoc.getStatus() === "CONFIGURED", "Direct AOC adapter is CONFIGURED for flight desk");

// 6. End-to-End Mission Request Service State Machine
console.log("\n[6] Mission Request Service State Machine:");
const testMission = missionRequestService.createRequest({
  from: "Bucharest Băneasa (LRBS / BBU)",
  to: "Nice Côte d'Azur (LFMN / NCE)",
  tripType: "ONE_WAY",
  date: "2026-10-20",
  time: "11:00 EET",
  dateFlexibility: "EXACT",
  passengers: 4,
  budgetPreference: "STANDARD_CHARTER",
  priority: "FASTEST",
  purpose: "EXECUTIVE_BUSINESS",
  requirements: ["VIP_TARMAC_TRANSFER"],
  name: "Test VIP Client",
  email: "vip@test.aero",
  phone: "+40 722 999 888",
});

assert(testMission.status === "REQUESTED", "Initial mission status is REQUESTED");

// Try illegal confirmation:
const illegalConfirm = missionRequestService.confirmMission(testMission.referenceId, "fake-quote-id");
assert(illegalConfirm === undefined, "Illegal confirmation without presented quotes is rejected");

// Advance to SOURCING
const sourcing = missionRequestService.updateLifecycleStatus(
  testMission.referenceId,
  "SOURCING",
  "Operator Fleet Queries Dispatched",
  "AIR_OPS"
);
assert(sourcing?.status === "SOURCING", "Advanced to SOURCING");

// Ingest quote via QuoteIngestionService
const ingest = quoteIngestionService.ingestExternalQuote(
  testMission.referenceId,
  "direct_aoc_dispatch",
  validPayload
);
assert(ingest.success === true, "External quote ingested via pipeline");
assert(ingest.quote?.status === "RECEIVED", "Ingested quote is initially in RECEIVED state (not presented)");

// Perform AIR Flight Desk Safety Review
const review = missionRequestService.recordAirReview(
  testMission.referenceId,
  "Full AOC duty cycle and landing distance verified."
);
assert(review?.status === "PRESENTED", "After review, mission advances to PRESENTED");
assert(review?.quotes[0].status === "PRESENTED", "Quote is now PRESENTED to client");

// Confirm Mission on presented quote
const confirmed = missionRequestService.confirmMission(testMission.referenceId, review!.quotes[0].id);
assert(confirmed?.status === "CONFIRMED", "Mission confirmed successfully");
assert(confirmed?.selectedQuoteId === review!.quotes[0].id, "Selected quote ID saved");

console.log("\n==================================================");
console.log("✓ ALL 20 INTEGRATION READINESS TEST CHECKS PASSED");
console.log("==================================================");
