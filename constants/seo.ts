import { BRAND } from "./brand";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fly.cristianvaduva.com";

export const DEFAULT_SEO = {
  title: BRAND.metaTitleDefault,
  titleTemplate: BRAND.metaTitleTemplate,
  description: BRAND.description,
  url: SITE_URL,
  siteName: BRAND.name,
  locale: "en_US",
  type: "website",
};

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description: BRAND.description,
    slogan: BRAND.tagline,
    location: {
      "@type": "Place",
      name: BRAND.location,
    },
    knowsAbout: [
      "Private Aviation",
      "Helicopter Charter",
      "Aviation Access",
      "Executive Flight Planning",
    ],
  };
}
