import type { MetadataRoute } from "next";
import {
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  FENCING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
  INSULATED_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  METAL_ROOFING_SERVICE,
  PROJECT_CASE_STUDIES,
  RAILINGS_GUARDRAILS_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  ROOF_REPAIR_SERVICE,
  ROOF_REPLACEMENT_SERVICE,
  SIDING_REPAIR_SERVICE,
  SIDING_REPLACEMENT_SERVICE,
  SITE_URL,
  SOFFIT_FASCIA_TRIM_SERVICE,
  VINYL_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  WOOD_DECKING_SERVICE,
} from "@/lib/constants";

const ALL_SERVICES = [
  ROOF_REPLACEMENT_SERVICE,
  ROOF_REPAIR_SERVICE,
  ASPHALT_SHINGLE_ROOFING_SERVICE,
  METAL_ROOFING_SERVICE,
  FLAT_LOW_SLOPE_ROOFING_SERVICE,
  ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE,
  GUTTERS_GUTTER_GUARDS_SERVICE,
  CUSTOM_DECK_CONSTRUCTION_SERVICE,
  DECK_RESTORATION_REFINISHING_SERVICE,
  COMPOSITE_DECKING_SERVICE,
  WOOD_DECKING_SERVICE,
  RAILINGS_GUARDRAILS_SERVICE,
  FENCING_SERVICE,
  DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE,
  SIDING_REPLACEMENT_SERVICE,
  VINYL_SIDING_SERVICE,
  JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE,
  INSULATED_SIDING_SERVICE,
  WOOD_CEDAR_SHAKE_SIDING_SERVICE,
  SIDING_REPAIR_SERVICE,
  SOFFIT_FASCIA_TRIM_SERVICE,
];

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
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceDetailPages: MetadataRoute.Sitemap = ALL_SERVICES.map(
    (service) => ({
      url: `${SITE_URL}${service.hubHref}/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

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
