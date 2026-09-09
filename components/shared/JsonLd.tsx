import React from "react";

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
    name: "AIR",
    alternateName: "AIR — The easiest way to fly",
    url: "https://flyair.ro",
    logo: "https://flyair.ro/opengraph-image",
    description: "AIR is an aviation access, discovery, and decision platform connecting business jets, helicopters, turboprops, experiences, and destinations.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucharest",
      addressCountry: "Romania",
    },
  };
}
