import React from "react";
import { SITE_URL } from "../../constants/seo";
import { BRAND } from "../../constants/brand";
import { Aircraft } from "../../types/domain";
import { AircraftPhotoSet } from "../../data/real/aviation-photos";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function createAirportJsonLd(airport: {
  name: string;
  icao?: string;
  iata?: string;
  city: string;
  country: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Airport",
    name: airport.name,
    icaoCode: airport.icao,
    iataCode: airport.iata,
    address: {
      "@type": "PostalAddress",
      addressLocality: airport.city,
      addressCountry: airport.country,
    },
    description: airport.description || `${airport.name} general aviation & executive gateway.`,
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    alternateName: "AIR — The easiest way to fly",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description: BRAND.description,
    slogan: BRAND.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucharest",
      addressCountry: "Romania",
    },
    knowsAbout: [
      "Private Aviation",
      "Helicopter Charter",
      "Aviation Access",
      "Executive Flight Planning",
    ],
  };
}

/**
 * Schema.org Vehicle & Product mapping for Aircraft Models
 * Strictly maps verified manufacturer telemetry from data/real/aircraft.ts without false claims.
 */
export function createAircraftJsonLd(aircraft: Aircraft, photos?: AircraftPhotoSet) {
  const images = photos
    ? [photos.hero, photos.exterior, photos.interior, photos.cockpit].filter(Boolean)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["Vehicle", "Product"],
    name: `${aircraft.manufacturer} ${aircraft.model}`,
    manufacturer: {
      "@type": "Organization",
      name: aircraft.manufacturer,
    },
    model: aircraft.model,
    description: aircraft.cabinHighlights,
    url: `${SITE_URL}/aircraft/${aircraft.slug}`,
    ...(images && images.length > 0 ? { image: images } : {}),
    vehicleConfiguration: aircraft.category.replace(/_/g, " "),
    seatingCapacity: aircraft.passengerCapacity,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Typical Cruise Speed",
        value: `${aircraft.typicalCruiseSpeed} KTAS`,
      },
      {
        "@type": "PropertyValue",
        name: "Maximum Range",
        value: `${aircraft.approximateRange} NM`,
      },
      {
        "@type": "PropertyValue",
        name: "Takeoff Runway Requirement",
        value: `${aircraft.runwayTakeoffM} m`,
      },
      {
        "@type": "PropertyValue",
        name: "Landing Runway Requirement",
        value: `${aircraft.runwayLandingM} m`,
      },
      {
        "@type": "PropertyValue",
        name: "Max Takeoff Weight (MTOW)",
        value: `${aircraft.mtowKg} kg`,
      },
      {
        "@type": "PropertyValue",
        name: "Baggage Capacity",
        value: aircraft.baggageCapacity,
      },
    ],
  };
}

/**
 * Schema.org Article mapping for Journal Articles
 */
export function createArticleJsonLd(article: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  publishedAt?: string;
  author?: string;
}, imageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/journal/${article.slug}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    author: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/journal/${article.slug}`,
    },
  };
}
