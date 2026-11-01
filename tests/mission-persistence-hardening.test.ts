import assert from "node:assert";
import { DurableMissionBuffer, MissionBufferRecord } from "../lib/services/durable-mission-buffer";
import { checkMfaStatus } from "../lib/auth/mfa";

console.log("==================================================");
console.log("AIR MISSION PERSISTENCE & MFA HARDENING TEST SUITE");
console.log("==================================================");

let passed = 0;
let failed = 0;

function it(desc: string, fn: () => void | Promise<void>) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res
        .then(() => {
          console.log(`✓ PASS: ${desc}`);
          passed++;
        })
        .catch((err) => {
          console.error(`✗ FAIL: ${desc}`);
          console.error(err);
          failed++;
        });
    }
    console.log(`✓ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`✗ FAIL: ${desc}`);
    console.error(err);
    failed++;
  }
}

async function runTests() {
  // Test 1: Durable Buffer stores and retrieves mission record
  await it("DurableMissionBuffer stores and retrieves a flight mission", async () => {
    const testRecord: MissionBufferRecord = {
      id: "test-uuid-101",
      referenceId: "AIR-2026-TESTA101",
      idempotencyKey: "test-idemp-key-101-alpha",
      ownerFingerprint: "auth:user-alpha",
      payloadHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "REQUESTED",
      statusLabel: "Mission Logged // Sourcing Dispatch Initiated",
      assignedAdvisor: "AIR Operations Center (Bucharest)",
      origin: "Bucharest Băneasa (LRBS)",
      originIcao: "LRBS",
      destination: "Nice Côte d'Azur (LFMN)",
      destinationIcao: "LFMN",
      tripType: "ONE_WAY",
      departureDate: "2026-10-15",
      dateFlexibility: "EXACT",
      passengers: 4,
      budgetPreference: "STANDARD_CHARTER",
      priority: "FASTEST",
      purpose: "EXECUTIVE_BUSINESS",
      requirements: ["WIFI_ONBOARD"],
      name: "VIP Charter Member",
      email: "member@air.aero",
      phone: "+40 722 000 001",
      quotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      storedIn: "kv_buffer",
    };

    await DurableMissionBuffer.saveMission(testRecord);
    const retrieved = await DurableMissionBuffer.getMission("AIR-2026-TESTA101");
    assert(retrieved !== null, "Mission should be retrievable by referenceId");
    assert.strictEqual(retrieved?.referenceId, "AIR-2026-TESTA101");
    assert.strictEqual(retrieved?.originIcao, "LRBS");
  });

  // Test 2: Idempotency detection returns MATCH for identical key, owner, and hash
  await it("DurableMissionBuffer detects exact duplicate idempotency", async () => {
    const check = await DurableMissionBuffer.checkIdempotency(
      "test-idemp-key-101-alpha",
      "auth:user-alpha",
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    assert.strictEqual(check.status, "MATCH");
    assert.strictEqual(check.existingMission?.referenceId, "AIR-2026-TESTA101");
  });

  // Test 3: Idempotency detects OWNERSHIP_MISMATCH when User B uses User A's key
  await it("DurableMissionBuffer rejects cross-owner idempotency reuse", async () => {
    const check = await DurableMissionBuffer.checkIdempotency(
      "test-idemp-key-101-alpha",
      "auth:user-bravo",
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    assert.strictEqual(check.status, "OWNERSHIP_MISMATCH");
  });

  // Test 4: Idempotency detects PAYLOAD_MISMATCH when same user alters flight params
  await it("DurableMissionBuffer rejects altered payload retry under same key", async () => {
    const check = await DurableMissionBuffer.checkIdempotency(
      "test-idemp-key-101-alpha",
      "auth:user-alpha",
      "modified-hash-different-route-or-pax-count-99999999999999999999999"
    );
    assert.strictEqual(check.status, "PAYLOAD_MISMATCH");
  });

  // Test 5: New idempotency key returns NEW
  await it("DurableMissionBuffer allows new unused idempotency keys", async () => {
    const check = await DurableMissionBuffer.checkIdempotency(
      "completely-new-unused-key-xyz-987",
      "auth:user-alpha",
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    assert.strictEqual(check.status, "NEW");
  });

  // Test 6: Mission status update works reliably in buffer
  await it("DurableMissionBuffer updates mission status", async () => {
    const updated = await DurableMissionBuffer.updateMission("AIR-2026-TESTA101", {
      status: "SOURCING",
      statusLabel: "Operator Availability Sourcing Dispatched",
    });
    assert(updated !== null);
    assert.strictEqual(updated?.status, "SOURCING");
    assert.strictEqual(updated?.statusLabel, "Operator Availability Sourcing Dispatched");

    const reloaded = await DurableMissionBuffer.getMission("AIR-2026-TESTA101");
    assert.strictEqual(reloaded?.status, "SOURCING");
  });

  // Test 7: Index maintains listing of all missions
  await it("DurableMissionBuffer lists all indexed missions", async () => {
    const list = await DurableMissionBuffer.listMissions();
    assert(Array.isArray(list));
    assert(list.some((m) => m.referenceId === "AIR-2026-TESTA101"));
  });

  // Test 8: MFA Status check returns correct assurance structure
  await it("checkMfaStatus evaluates mock Supabase client correctly", async () => {
    const mockSupabase = {
      auth: {
        mfa: {
          getAuthenticatorAssuranceLevel: async () => ({
            data: { currentLevel: "aal1", nextLevel: "aal2" },
            error: null,
          }),
          listFactors: async () => ({
            data: {
              all: [{ id: "factor-1", factor_type: "totp", status: "verified" }],
              totp: [{ id: "factor-1", factor_type: "totp", status: "verified" }],
            },
            error: null,
          }),
        },
      },
    };

    const status = await checkMfaStatus(mockSupabase as any);
    assert.strictEqual(status.enabled, true);
    assert.strictEqual(status.currentLevel, "aal1");
    assert.strictEqual(status.nextLevel, "aal2");
    assert.strictEqual(status.factors.length, 1);
  });

  // Test 9: MFA AAL2 status reports active elevation
  await it("checkMfaStatus identifies elevated AAL2 session", async () => {
    const mockSupabaseAal2 = {
      auth: {
        mfa: {
          getAuthenticatorAssuranceLevel: async () => ({
            data: { currentLevel: "aal2", nextLevel: "aal2" },
            error: null,
          }),
          listFactors: async () => ({
            data: {
              all: [{ id: "factor-1", factor_type: "totp", status: "verified" }],
              totp: [{ id: "factor-1", factor_type: "totp", status: "verified" }],
            },
            error: null,
          }),
        },
      },
    };

    const status = await checkMfaStatus(mockSupabaseAal2 as any);
    assert.strictEqual(status.enabled, true);
    assert.strictEqual(status.currentLevel, "aal2");
  });

  console.log("==================================================");
  console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
