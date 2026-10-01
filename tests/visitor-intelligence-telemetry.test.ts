import * as fs from "fs";
import * as path from "path";

// Auto-load .env.local for standalone test executions
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

import {
  TelemetryEngine,
  classifyAttribution,
  parseUserAgent,
  calculateIntentLevel,
} from "../lib/telemetry/engine";
import {
  formatBucharestTime,
  formatBucharestDate,
  formatDuration,
  sendNewVisitorTelegramAlert,
  sendReturningVisitorTelegramAlert,
  sendPageViewTelegramAlert,
  sendCtaClickTelegramAlert,
  sendFormStartedTelegramAlert,
  sendNewLeadTelegramAlert,
  sendHighEngagementTelegramAlert,
  sendSessionSummaryTelegramAlert,
  sendLiveVisitorTelegramAlert,
} from "../lib/telemetry/telegram";

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    testsFailed++;
  }
}

async function runTestSuite() {
  console.log("\n=======================================================");
  console.log("AIR — VISITOR INTELLIGENCE & TELEGRAM TEST SUITE");
  console.log("=======================================================\n");

  // TEST 1: Attribution Classification
  console.log("[1/9] ATTRIBUTION & TRAFFIC SOURCE CLASSIFIER");
  const attrGoogle = classifyAttribution({ referrer: "https://www.google.com/search?q=private+jet+bucharest" });
  assert(attrGoogle.source === "Google" && attrGoogle.medium === "organic", "Google Organic traffic classification");

  const attrInstagram = classifyAttribution({ referrer: "https://l.instagram.com/" });
  assert(attrInstagram.source === "Instagram" && attrInstagram.medium === "social", "Instagram Social traffic classification");

  const attrUtm = classifyAttribution({
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "autumn_escape_2026",
    referrer: "https://mail.google.com/",
  });
  assert(attrUtm.source === "Newsletter" && attrUtm.medium === "email", "Explicit UTM campaign precedence");

  const attrDirect = classifyAttribution({});
  assert(attrDirect.source === "Direct" && attrDirect.medium === "direct", "Direct traffic classification");

  // TEST 2: Device & Browser Parsing
  console.log("\n[2/9] USER AGENT & DEVICE RESOLUTION");
  const iphoneUa = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
  const parsedIphone = parseUserAgent(iphoneUa);
  assert(parsedIphone.deviceType === "Mobile" && parsedIphone.os === "iOS" && parsedIphone.browser === "Safari", "iPhone / Safari Mobile identification");

  const macUa = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
  const parsedMac = parseUserAgent(macUa);
  assert(parsedMac.deviceType === "Desktop" && parsedMac.os === "macOS" && parsedMac.browser === "Chrome", "macOS / Chrome Desktop identification");

  // TEST 3: Intent Scoring Matrix
  console.log("\n[3/9] DETERMINISTIC COMMERCIAL INTENT SCORING");
  assert(calculateIntentLevel(0, false) === "CASUAL", "0 pts -> CASUAL intent");
  assert(calculateIntentLevel(35, false) === "INTERESTED", "35 pts -> INTERESTED intent");
  assert(calculateIntentLevel(65, false) === "ENGAGED", "65 pts -> ENGAGED intent");
  assert(calculateIntentLevel(90, false) === "HIGH_INTENT", "90 pts -> HIGH_INTENT");
  assert(calculateIntentLevel(10, true) === "LEAD_CONVERTED", "Lead submitted -> LEAD_CONVERTED");

  // TEST 4: Visitor Identity & Session Hierarchy
  console.log("\n[4/9] VISITOR & SESSION HIERARCHY LIFECYCLE");
  const reg1 = await TelemetryEngine.registerSession({
    path: "/plan",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "bucharest_charter",
    userAgent: iphoneUa,
    viewportWidth: 390,
    viewportHeight: 844,
  });
  assert(reg1.isNewVisitor === true, "New visitor identity assigned (V-XXXXXXXX)");
  assert(reg1.visitor.visitorId.startsWith("V-"), "Visitor ID format valid");
  assert(reg1.session.sessionId.startsWith("S-"), "Session ID format valid");
  assert(reg1.session.source === "Google", "Session source correctly mapped");

  // Returning visitor on same ID
  const reg2 = await TelemetryEngine.registerSession({
    visitorId: reg1.visitor.visitorId,
    path: "/aircraft/compare",
    userAgent: macUa,
  });
  assert(reg2.isNewVisitor === false, "Returning visitor successfully recognized");
  assert(reg2.visitor.totalSessions === 2, "Visitor session counter incremented to 2");

  // TEST 5: Event Ingestion & High Intent Triggering
  console.log("\n[5/9] EVENT INGESTION & COMMERCIAL JOURNEY TRACE");
  const ev1 = await TelemetryEngine.ingestEvent({
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    eventName: "planner_route_selected",
    eventCategory: "COMMERCIAL",
    pagePath: "/plan",
    routeContext: "Bucharest → Nice (4 PAX)",
  });
  assert(ev1.commercialScore >= 25, "Route selection adds commercial score");

  const ev2 = await TelemetryEngine.ingestEvent({
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    eventName: "aircraft_compared",
    eventCategory: "COMMERCIAL",
    pagePath: "/aircraft/compare",
  });
  assert(ev2.commercialScore >= 50, "Aircraft comparison advances engagement");

  const ev3 = await TelemetryEngine.ingestEvent({
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    eventName: "form_started",
    eventCategory: "FORM",
    pagePath: "/plan",
    payload: { formName: "Flight Decision Proposal", fields: { Route: true, Passengers: true, Dates: true } },
  });
  assert(ev3.commercialScore >= 80, "Form started triggers HIGH_INTENT threshold");
  assert(ev3.intentLevel === "HIGH_INTENT", "Intent level updated to HIGH_INTENT");

  // TEST 6: Lead Conversion & Anonymous Linking
  console.log("\n[6/9] LEAD ATTRIBUTION & VISITOR LINKAGE");
  const leadRes = await TelemetryEngine.registerLead({
    referenceId: "AIR-2026-TEST01",
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    leadType: "FLIGHT_REQUEST",
    name: "Alex Vance",
    email: "alex@example.com",
    phone: "+40 722 000 000",
    origin: "Bucharest (LRBS)",
    destination: "Nice (LFMN)",
    passengers: 4,
    date: "2026-10-15",
  });
  assert(leadRes.success === true, "Lead successfully registered and linked to anonymous visitor");
  assert(reg1.visitor.leadId === "AIR-2026-TEST01", "Visitor profile updated with lead reference");
  assert(reg1.visitor.intentLevel === "LEAD_CONVERTED", "Visitor intent level marked as LEAD_CONVERTED");

  // TEST 7: Heartbeat & Active Visitor Radar
  console.log("\n[7/9] HEARTBEAT & LIVE ACTIVE VISITOR RADAR");
  await TelemetryEngine.recordHeartbeat({
    sessionId: reg1.session.sessionId,
    visitorId: reg1.visitor.visitorId,
    path: "/plan",
  });
  const liveActive = TelemetryEngine.getActiveVisitors();
  assert(liveActive.length >= 1, "Live active visitor radar accurately reflects current online state");
  assert(liveActive.some((a) => a.sessionId === reg1.session.sessionId), "Session present in active radar list");

  // TEST 8: Time & Duration Formatters
  console.log("\n[8/9] BUCHAREST TIMEZONE & DURATION FORMATTERS");
  const bTime = formatBucharestTime(new Date("2026-10-01T20:30:00Z"));
  assert(bTime.includes("2026") || bTime.includes("23:30"), "Bucharest time formatting valid");

  const dur1 = formatDuration(45);
  assert(dur1 === "45s", "Duration 45s formatted correctly");
  const dur2 = formatDuration(522);
  assert(dur2 === "08m 42s", "Duration 522s formatted as 08m 42s");

  // TEST 9: Telegram Alert Formatters & Live Delivery Verification
  console.log("\n[9/9] TELEGRAM OPERATIONAL GATEWAY DISPATCH VALIDATION");
  const resNew = await sendNewVisitorTelegramAlert({
    visitor: reg1.visitor,
    session: reg1.session,
    firstVisibleSection: "Flight Decision Engine",
    initialCta: "Find my way to fly",
    intentSignals: {
      route: "Bucharest → Nice",
      passengers: 4,
      tripType: "ONE_WAY",
      budget: "STANDARD_CHARTER",
      priority: "FASTEST",
      purpose: "EXECUTIVE_BUSINESS",
      requestStarted: true,
    },
  });
  assert(resNew.success === true, "Telegram NEW VISITOR alert dispatched successfully");

  const resCta = await sendCtaClickTelegramAlert({
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    ctaName: "Plan this Mission",
    pagePath: "/aircraft/compare",
    context: "Phenom 300E vs Pilatus PC-12",
    source: "Google",
    deviceType: "Mobile",
  });
  assert(resCta.success === true, "Telegram CTA CLICK alert dispatched successfully");

  const resPv = await sendPageViewTelegramAlert({
    visitorId: reg1.visitor.visitorId,
    sessionId: reg1.session.sessionId,
    pageTitle: "Embraer Phenom 300E — Fleet Dossier",
    pageUrl: "/aircraft/phenom-300",
    previousUrl: "/aircraft/compare",
    source: "Google Organic",
    deviceSummary: "iPhone / Safari",
    sessionDurationSeconds: 142,
    pagesViewedCount: 3,
  });
  assert(resPv.success === true, "Telegram PAGE VIEW alert dispatched successfully");

  console.log("\n=======================================================");
  console.log(`TEST SUITE COMPLETE: ${testsPassed} passed, ${testsFailed} failed.`);
  console.log("=======================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((e) => {
  console.error("Test execution fatal error:", e);
  process.exit(1);
});
