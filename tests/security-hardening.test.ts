import { checkRateLimit, createRateLimitResponse, RATE_LIMIT_CONFIGS } from "../lib/security/rate-limiter";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

async function runSecurityHardeningTests() {
  console.log("==================================================");
  console.log("AIR SECURITY, LEGAL & PRODUCTION HARDENING TEST SUITE");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Rate Limiting Tests
  const testIp = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
  const mockReq = {
    headers: new Headers({
      "cf-connecting-ip": testIp,
    }),
  } as unknown as Request;

  // First request should be allowed
  const r1 = await checkRateLimit(mockReq, "contact_form", testIp);
  assert(r1.allowed === true, "First submission is allowed by rate limiter");
  assert(r1.remaining === RATE_LIMIT_CONFIGS.contact_form.limit - 1, "Remaining count decrements correctly");

  // Consume remaining quota
  for (let i = 0; i < RATE_LIMIT_CONFIGS.contact_form.limit - 1; i++) {
    await checkRateLimit(mockReq, "contact_form", testIp);
  }

  // Next request must be blocked with allowed = false
  const rBlocked = await checkRateLimit(mockReq, "contact_form", testIp);
  assert(rBlocked.allowed === false, "Rate limit is enforced when threshold is exceeded");
  assert(rBlocked.remaining === 0, "Remaining count is 0 when blocked");
  assert(rBlocked.resetInSeconds > 0, "Reset in seconds is positive when blocked");

  const resp429 = createRateLimitResponse(rBlocked.resetInSeconds);
  assert(resp429.status === 429, "Rate limit response returns HTTP 429");
  assert(resp429.headers.get("Retry-After") !== null, "Rate limit response includes Retry-After header");

  // 2. Security.txt RFC 9116 Tests
  const secTxtPath = join(process.cwd(), "public", ".well-known", "security.txt");
  assert(existsSync(secTxtPath), "public/.well-known/security.txt file exists");
  const secTxtContent = readFileSync(secTxtPath, "utf-8");
  assert(secTxtContent.includes("Contact: mailto:contact@cristianvaduva.com"), "security.txt contains verified contact email");
  assert(secTxtContent.includes("Expires:"), "security.txt contains mandatory RFC 9116 Expires directive");
  assert(secTxtContent.includes("Canonical: https://fly.cristianvaduva.com/.well-known/security.txt"), "security.txt contains canonical HTTPS URL");
  assert(secTxtContent.includes("Preferred-Languages:"), "security.txt contains Preferred-Languages directive");

  // 3. Legal Routes Validation
  const legalRoutes = ["privacy", "gdpr", "terms", "cookies", "disclaimer"];
  for (const route of legalRoutes) {
    const pagePath = join(process.cwd(), "app", route, "page.tsx");
    assert(existsSync(pagePath), `Root legal route /${route}/page.tsx exists`);
  }

  // 4. Middleware & Workers.dev Redirect Verification
  const middlewarePath = join(process.cwd(), "middleware.ts");
  assert(existsSync(middlewarePath), "Root middleware.ts exists");
  const middlewareContent = readFileSync(middlewarePath, "utf-8");
  assert(middlewareContent.includes("workers.dev"), "middleware handles workers.dev redirection");
  assert(middlewareContent.includes("https://fly.cristianvaduva.com"), "middleware redirects workers.dev to canonical production domain");
  assert(middlewareContent.includes("pathname.startsWith(\"/admin\")"), "middleware guards /admin routes");
  assert(middlewareContent.includes("pathname.startsWith(\"/operator\")"), "middleware guards /operator routes");
  assert(middlewareContent.includes("pathname.startsWith(\"/account\")"), "middleware guards /account routes");

  // 5. Security Headers & Next Config Verification
  const nextConfigPath = join(process.cwd(), "next.config.ts");
  const nextConfigContent = readFileSync(nextConfigPath, "utf-8");
  assert(nextConfigContent.includes("poweredByHeader: false"), "next.config.ts disables X-Powered-By header");
  assert(nextConfigContent.includes("Strict-Transport-Security"), "next.config.ts enforces HSTS");
  assert(nextConfigContent.includes("nosniff"), "next.config.ts enforces X-Content-Type-Options: nosniff");
  assert(nextConfigContent.includes("SAMEORIGIN"), "next.config.ts enforces X-Frame-Options: SAMEORIGIN");

  console.log("==================================================");
  console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityHardeningTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
