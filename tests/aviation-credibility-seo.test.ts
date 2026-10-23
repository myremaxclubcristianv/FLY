import assert from "node:assert/strict";
import { AirportStatusService } from "../lib/services/airport-status-service";
import {
  REAL_AIRCRAFT_FOR_SALE,
  ILLUSTRATIVE_AIRCRAFT_EXAMPLES,
  getActiveAircraftForSale,
  getIllustrativeAircraftExamples,
} from "../data/real/aircraft-sale";
import { calculateDurationsForDistance } from "../lib/utils/distance";
import { createRouteMetadata, absoluteUrl } from "../lib/seo/metadata";
import {
  getAlternatePath,
  isRomanianPath,
  PRIORITY_ROUTE_SLUGS,
} from "../lib/i18n/routes";
import { LUXURY_DESTINATIONS } from "../data/real/destinations";
import { REAL_ROMANIA_HELIPORTS, HeliportRepository } from "../data/real/heliports";

let passed = 0;
let total = 0;

function it(name: string, fn: () => void) {
  total++;
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log("==================================================");
console.log("AIR AVIATION CREDIBILITY & TECHNICAL SEO TEST SUITE");
console.log("==================================================");

// [1] Airport Status Freshness & Unverified Fallback
it("AirportStatusService returns LRBS airport profile with official AIP source", () => {
  const lrbs = AirportStatusService.getAirportStatus("LRBS");
  assert.ok(lrbs, "LRBS status must be found");
  assert.equal(lrbs?.icao, "LRBS");
  assert.ok(lrbs?.name.includes("Băneasa"));
  assert.equal(lrbs?.runwayPhysical.dimensionsM, "3,103 × 45 m");
  assert.equal(lrbs?.runwayPhysical.designation, "07/25");
  assert.ok(lrbs?.sourceName.includes("AIP Romania AD 2.LRBS"));
  assert.ok(lrbs?.lastVerifiedAt, "lastVerifiedAt must be populated");
});

it("AirportStatusService gracefully handles unconfigured / unknown airport as STATUS_UNVERIFIED", () => {
  const unknown = AirportStatusService.getAirportStatus("UNKNOWN");
  assert.ok(unknown, "Unknown airport must return safe record");
  assert.equal(unknown?.operationalStatus, "STATUS_UNVERIFIED");
  assert.ok(unknown?.notamNotice.includes("No live operational feed"));
});

it("AirportStatusService reports NO live NOTAM feed by default without fabrication", () => {
  const isConfigured = AirportStatusService.isLiveFeedConfigured();
  assert.equal(isConfigured, false, "Live feed should report unconfigured without credentials");
});

// [2] Aircraft Marketplace & Inventory Isolation
it("Excludes illustrative aircraft examples from active inventory count", () => {
  const active = getActiveAircraftForSale();
  const illustrative = getIllustrativeAircraftExamples();
  assert.equal(active.length, 0, "Active inventory must be 0 when no authentic verifiable listings exist");
  assert.equal(illustrative.length, 5, "Illustrative examples must contain exactly 5 records");
});

it("All illustrative aircraft are tagged explicitly as illustrative_example", () => {
  const illustrative = getIllustrativeAircraftExamples();
  for (const item of illustrative) {
    assert.equal(
      item.listingStatus,
      "illustrative_example",
      `Item ${item.id} must be flagged as illustrative_example`
    );
  }
});

// [3] Route-Specific SEO & Canonical Metadata
it("createRouteMetadata generates absolute canonical URL on fly.cristianvaduva.com", () => {
  const meta = createRouteMetadata({
    path: "/aircraft-for-sale",
    title: "Aircraft For Sale | AIR",
    description: "Browse verified private aircraft.",
  });

  const canonical = (meta.alternates as { canonical?: string })?.canonical;
  assert.equal(canonical, "https://fly.cristianvaduva.com/aircraft-for-sale");
  assert.equal(meta.openGraph?.url, "https://fly.cristianvaduva.com/aircraft-for-sale");
  assert.equal(meta.openGraph?.title, "Aircraft For Sale | AIR");
});

it("Emits hreflang alternates ONLY for registered equivalent pairs", () => {
  const registeredMeta = createRouteMetadata({
    path: "/routes/bucharest-to-nice",
    title: "Bucharest to Nice",
    description: "Executive route.",
  });

  const registeredAlts = registeredMeta.alternates?.languages as Record<string, string>;
  assert.ok(registeredAlts, "Registered pair must emit languages hreflang");
  assert.equal(registeredAlts.en, "https://fly.cristianvaduva.com/routes/bucharest-to-nice");
  assert.equal(registeredAlts.ro, "https://fly.cristianvaduva.com/ro/routes/bucharest-to-nice");
  assert.equal(registeredAlts["x-default"], "https://fly.cristianvaduva.com/routes/bucharest-to-nice");

  const unregisteredMeta = createRouteMetadata({
    path: "/unregistered-secret-page",
    title: "Secret",
    description: "No translation.",
  });
  assert.equal(
    unregisteredMeta.alternates?.languages,
    undefined,
    "Unregistered pages must NOT emit fake hreflang"
  );
});

// [4] Localized Route Equivalence
it("Bidirectionally resolves alternate path between EN and RO", () => {
  assert.equal(getAlternatePath("/"), "/ro");
  assert.equal(getAlternatePath("/ro"), "/");
  assert.equal(getAlternatePath("/contact"), "/ro/contact");
  assert.equal(getAlternatePath("/ro/contact"), "/contact");
  assert.equal(getAlternatePath("/heliports"), "/ro/heliports");
  assert.equal(getAlternatePath("/ro/heliports"), "/heliports");
  assert.equal(getAlternatePath("/aviation/insurance"), "/ro/aviation/insurance");
  assert.equal(getAlternatePath("/ro/aviation/insurance"), "/aviation/insurance");
  assert.equal(getAlternatePath("/aircraft/ownership"), "/ro/aircraft/ownership");
  assert.equal(getAlternatePath("/ro/aircraft/ownership"), "/aircraft/ownership");

  for (const slug of PRIORITY_ROUTE_SLUGS) {
    assert.equal(getAlternatePath(`/routes/${slug}`), `/ro/routes/${slug}`);
    assert.equal(getAlternatePath(`/ro/routes/${slug}`), `/routes/${slug}`);
  }
});

it("Correctly identifies Romanian URL paths", () => {
  assert.equal(isRomanianPath("/ro"), true);
  assert.equal(isRomanianPath("/ro/contact"), true);
  assert.equal(isRomanianPath("/ro/heliports"), true);
  assert.equal(isRomanianPath("/routes/bucharest-to-nice"), false);
  assert.equal(isRomanianPath("/"), false);
});

// [5] Destination Integrity & Non-Generic Navigation
it("All luxury destinations have non-empty specific slugs and airport codes", () => {
  assert.ok(LUXURY_DESTINATIONS.length >= 10, "Must have at least 10 luxury destinations");
  for (const dest of LUXURY_DESTINATIONS) {
    assert.ok(dest.slug && dest.slug.length > 2, `Destination ${dest.name} must have valid slug`);
    assert.ok(dest.airportCode.includes("/"), `Destination ${dest.name} must include IATA/ICAO code`);
    assert.ok(dest.estimatedFlightFromLRBS, `Destination ${dest.name} must include flight time from LRBS`);
  }
});

// [6] Heliport Directory & Certification Transparency
it("Heliport directory distinguishes certified aerodromes from uncertified sites", () => {
  const certified = HeliportRepository.getCertifiedHeliports();
  assert.ok(certified.length > 0, "Must contain certified facilities");
  for (const hp of certified) {
    assert.equal(hp.status, "OFFICIALLY_CERTIFIED");
  }

  const tuzla = HeliportRepository.getHeliportByIcao("LRTZ");
  assert.ok(tuzla, "Tuzla LRTZ must exist");
  assert.equal(tuzla?.status, "OFFICIALLY_CERTIFIED");
  assert.equal(tuzla?.city, "Tuzla / Constanța");

  const unverified = HeliportRepository.getHeliportBySlug("danube-delta-private-landing-locations");
  assert.ok(unverified, "Danube delta site must exist");
  assert.equal(unverified?.status, "LANDING_SITE_NOT_VERIFIED");
  assert.ok(unverified?.operationalRestrictions?.some((r) => r.includes("ARBDD")));
});

// [7] Flight Duration Calculations & Metrics Labeling
it("Calculates realistic speed-based airborne flight durations", () => {
  const durations = calculateDurationsForDistance(1000);
  assert.ok(durations.lightJet, "Light jet duration must be calculated");
  assert.ok(durations.superMidsize, "Super midsize duration must be calculated");
  assert.ok(durations.turboprop, "Turboprop duration must be calculated");
  assert.ok(durations.vljet, "VLJ duration must be calculated");
});

console.log("==================================================");
console.log(`TOTAL: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
console.log("==================================================");

if (total !== passed) {
  process.exit(1);
}
