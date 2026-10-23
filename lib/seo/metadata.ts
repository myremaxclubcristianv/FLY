import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";
import { SITE_URL } from "@/constants/seo";
import { getAlternatePath } from "@/lib/i18n/routes";

export interface RouteMetadataOptions {
  /** Path of THIS page, e.g. "/aircraft-for-sale" or "/ro/contact". */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? SITE_URL : `${SITE_URL}${clean}`;
}

/**
 * Route-specific SEO metadata: absolute canonical, og:url, og:title, locale.
 * hreflang alternates are emitted ONLY when a real translated equivalent is
 * registered in lib/i18n/routes.ts — never for non-existent translations.
 */
export function createRouteMetadata(options: RouteMetadataOptions): Metadata {
  const { path, title, description, ogImage, noIndex = false } = options;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const isRo = cleanPath === "/ro" || cleanPath.startsWith("/ro/");
  const canonicalUrl = absoluteUrl(cleanPath);

  const alternate = getAlternatePath(cleanPath);
  const languages: Record<string, string> | undefined = alternate
    ? isRo
      ? { ro: canonicalUrl, en: absoluteUrl(alternate), "x-default": absoluteUrl(alternate) }
      : { en: canonicalUrl, ro: absoluteUrl(alternate), "x-default": canonicalUrl }
    : undefined;

  const resolvedOgImage = ogImage || `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND.name,
      locale: isRo ? "ro_RO" : "en_US",
      ...(languages ? { alternateLocale: isRo ? ["en_US"] : ["ro_RO"] } : {}),
      type: "website",
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedOgImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
