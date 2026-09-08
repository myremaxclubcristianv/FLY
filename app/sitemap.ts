import { MetadataRoute } from "next";
import { SITE_URL } from "../constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/plan",
    "/aviation",
    "/aircraft",
    "/aircraft/ownership",
    "/experiences",
    "/destinations",
    "/baneasa",
    "/business",
    "/aviation/finance",
    "/aviation/insurance",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
