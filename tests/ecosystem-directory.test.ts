import {
  ECOSYSTEM_PROJECTS,
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_CONTACT,
} from "../data/real/ecosystem";
import { getAlternatePath, isRomanianPath } from "../lib/i18n/routes";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`✗ FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${msg}`);
}

console.log("==================================================");
console.log("CRISTIAN VĂDUVA ECOSYSTEM INTEGRATION TEST SUITE");
console.log("==================================================");

// 1. Projects Count & Hero Check
assert(ECOSYSTEM_PROJECTS.length >= 10, "Ecosystem directory contains at least 10 projects");
const hero = ECOSYSTEM_PROJECTS.find((p) => p.isPrimary);
assert(Boolean(hero), "Primary hero project is present");
assert(hero?.id === "air-aviation", "AIR by Cristian Văduva is the primary hero project");
assert(hero?.url === "https://fly.cristianvaduva.com", "AIR destination is https://fly.cristianvaduva.com");

// 2. Strict Domain Verification: Subvenții
const subventii = ECOSYSTEM_PROJECTS.find((p) => p.id === "subventii-romania");
assert(Boolean(subventii), "SUBVENȚII România project is in directory");
assert(
  subventii?.url === "https://subventii.cristianvaduva.com",
  "Subvenții domain is strictly https://subventii.cristianvaduva.com (NOT subventii.ro)"
);

// 3. Strict Domain Verification: Constructions
const constructions = ECOSYSTEM_PROJECTS.find((p) => p.id === "constructions");
assert(Boolean(constructions), "CONSTRUCTIONS project is in directory");
assert(
  constructions?.url === "https://constructions.cristianvaduva.com",
  "CONSTRUCTIONS domain is https://constructions.cristianvaduva.com"
);

// 4. Strict Domain Verification: Health
const health = ECOSYSTEM_PROJECTS.find((p) => p.id === "aix-health");
assert(Boolean(health), "AiX Health project is in directory");
assert(
  health?.url === "https://health.cristianvaduva.com",
  "AiX Health domain is https://health.cristianvaduva.com"
);

// 5. Strict Verification: Exclude Unverified Domains
const hasUnverifiedAixMedia = ECOSYSTEM_PROJECTS.some(
  (p) => p.url === "https://aixmedia.com" || p.url.includes("media.cristianvaduva.com")
);
assert(!hasUnverifiedAixMedia, "Unverified AiXMedia domain is safely excluded from public directory");

// 6. URL & Content Completeness
ECOSYSTEM_PROJECTS.forEach((p) => {
  assert(p.name.length > 0, `Project ${p.id} has name`);
  assert(p.description.length > 20, `Project ${p.id} has detailed description`);
  assert(p.descriptionRo.length > 20, `Project ${p.id} has Romanian description`);
  assert(p.url.startsWith("https://"), `Project ${p.id} has HTTPS URL`);
  assert(p.verified === true, `Project ${p.id} is marked verified`);
});

// 7. Categories Integrity
ECOSYSTEM_CATEGORIES.forEach((cat) => {
  const matching = ECOSYSTEM_PROJECTS.filter((p) => p.category === cat.id);
  assert(matching.length > 0, `Category ${cat.id} has at least one verified project`);
});

// 8. Contact Details Integrity
assert(
  ECOSYSTEM_CONTACT.phoneInternational === "+43 650 953 6345",
  "International phone / WhatsApp matches verified source (+43 650 953 6345)"
);
assert(
  ECOSYSTEM_CONTACT.email === "contact@cristianvaduva.com",
  "Email matches verified source (contact@cristianvaduva.com)"
);
assert(
  ECOSYSTEM_CONTACT.whatsappUrlEn.includes("wa.me/436509536345"),
  "WhatsApp link points to verified 436509536345"
);
assert(
  ECOSYSTEM_CONTACT.linktree.includes("linktr.ee/cristianvaduvarealestate"),
  "Linktree points to verified destination"
);

// 9. Verified Social Media Profiles
const platforms = ECOSYSTEM_CONTACT.socials.map((s) => s.platform);
assert(platforms.includes("Instagram"), "Instagram profile included");
assert(platforms.includes("Facebook"), "Facebook profile included");
assert(platforms.includes("LinkedIn"), "LinkedIn profile included");
assert(platforms.includes("YouTube"), "YouTube profile included");
assert(platforms.includes("Telegram Direct"), "Telegram Direct profile included");
assert(platforms.includes("Telegram Channel"), "Telegram Channel included");

// 10. i18n Alternates Resolution for Ecosystem Route
assert(
  getAlternatePath("/ecosystem") === "/ro/ecosystem",
  "getAlternatePath('/ecosystem') resolves to /ro/ecosystem"
);
assert(
  getAlternatePath("/ro/ecosystem") === "/ecosystem",
  "getAlternatePath('/ro/ecosystem') resolves to /ecosystem"
);
assert(isRomanianPath("/ro/ecosystem"), "/ro/ecosystem recognized as Romanian path");

console.log("==================================================");
console.log("ALL ECOSYSTEM DIRECTORY TESTS PASSED SUCCESSFULLY");
console.log("==================================================");
