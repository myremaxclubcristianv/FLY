import { MetadataRoute } from "next";
import { SITE_URL } from "../constants/seo";
import { UnifiedAviationRepository } from "../lib/repositories/unified-aviation-repo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPublicRoutes = [
    "",
    "/plan",
    "/routes",
    "/aircraft",
    "/aircraft/compare",
    "/aircraft/ownership",
    "/aircraft-for-sale",
    "/aviation",
    "/aviation/learn",
    "/aviation/learn/pilot-guide",
    "/aviation/schools",
    "/aviation/rules",
    "/aviation/explainers",
    "/aviation/airports",
    "/aviation/technology",
    "/aviation/careers",
    "/aviation/history",
    "/baneasa",
    "/business",
    "/directory",
    "/experiences",
    "/destinations",
    "/journal",
    "/journal/photo-essays",
    "/romania-from-above",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPublicRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Routes
  const routes = await UnifiedAviationRepository.getRoutes();
  routes.forEach((r) => {
    sitemapEntries.push({
      url: `${SITE_URL}/routes/${r.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  const aircraft = await UnifiedAviationRepository.getAircraftModels();
  aircraft.forEach((ac) => {
    sitemapEntries.push({
      url: `${SITE_URL}/aircraft/${ac.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  const companies = await UnifiedAviationRepository.getCompanies();
  companies.forEach((c) => {
    sitemapEntries.push({
      url: `${SITE_URL}/aviation/companies/${c.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  const destinationSlugs = ["bran", "constanta", "cluj", "sibiu"];
  destinationSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${SITE_URL}/destinations/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  const journal = await UnifiedAviationRepository.getJournalArticles();
  journal.forEach((art) => {
    sitemapEntries.push({
      url: `${SITE_URL}/journal/${art.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  const regions = await UnifiedAviationRepository.getAerialRegions();
  regions.forEach((reg) => {
    sitemapEntries.push({
      url: `${SITE_URL}/romania-from-above/${reg.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
