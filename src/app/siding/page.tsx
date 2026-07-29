import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { SIDING_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: SIDING_HUB_CONFIG.metadata.title,
  description: SIDING_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/siding",
  },
};

export default function SidingHub() {
  return <HubPage config={SIDING_HUB_CONFIG} />;
}
