import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { DECKS_HUB_CONFIG } from "@/lib/hubConfigs";

export const metadata: Metadata = {
  title: DECKS_HUB_CONFIG.metadata.title,
  description: DECKS_HUB_CONFIG.metadata.description,
  alternates: {
    canonical: "/decks",
  },
};

export default function DecksHub() {
  return <HubPage config={DECKS_HUB_CONFIG} />;
}
