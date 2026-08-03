export type HomeImageSlot = {
  /** Path under /public, or null if no real photo exists yet — render a HomePlaceholder instead. */
  src: string | null;
  alt: string;
  caption: string;
};

export const HOMEPAGE_IMAGES = {
  hero: {
    src: null,
    alt: "Finished roof and home exterior in Bucks County, PA",
    caption: "hero photo — finished roof + exterior",
  },
  serviceRoofing: {
    src: null,
    alt: "Roof replacement in progress in Bucks County, PA",
    caption: "roofing photo",
  },
  serviceDecks: {
    src: null,
    alt: "Custom composite deck build in Bucks County, PA",
    caption: "deck photo",
  },
  serviceSiding: {
    src: null,
    alt: "Fiber-cement siding installation in Bucks County, PA",
    caption: "siding photo",
  },
  beforeAfterBefore: {
    src: null,
    alt: "Hail-damaged roof before repair, Levittown, PA",
    caption: "BEFORE — hail damage photo",
  },
  beforeAfterAfter: {
    src: null,
    alt: "New roof after repair, Levittown, PA",
    caption: "AFTER — new roof photo",
  },
} as const satisfies Record<string, HomeImageSlot>;
