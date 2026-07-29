import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { ROOFING_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: ROOFING_HUB_CONFIG.metadata.title,
  description: ROOFING_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/roofing",
  },
};

export default function RoofingHub() {
  return <HubPage config={ROOFING_HUB_CONFIG} />;
}
