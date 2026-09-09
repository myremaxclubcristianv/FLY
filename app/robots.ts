import { MetadataRoute } from "next";
import { SITE_URL } from "../constants/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/operator/", "/account/", "/login", "/register", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
