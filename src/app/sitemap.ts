import type { MetadataRoute } from "next";
import { PROJECT_CASE_STUDIES, ROOF_REPLACEMENT_SERVICE, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const hubs: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/roofing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/decks`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/siding`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceDetailPages: MetadataRoute.Sitemap = [
    ROOF_REPLACEMENT_SERVICE,
  ].map((service) => ({
    url: `${SITE_URL}${service.hubHref}/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = PROJECT_CASE_STUDIES.map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  return [...hubs, ...serviceDetailPages, ...projectPages];
}
