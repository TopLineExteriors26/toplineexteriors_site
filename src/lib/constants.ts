export const BUSINESS_NAME = "TopLine Exteriors";
export const BUSINESS_LEGAL_NAME = "TopLine Exteriors LLC";
export const PHONE_DISPLAY = "(267) 202-3663";
export const PHONE_DIGITS = "2672023663";
export const EMAIL = "toplineexteriors26@gmail.com";
export const HIC_LICENSE = "PA HIC #PA214414";
export const SITE_URL = "https://www.toplineexteriorsllc.com";

export const SERVICE_AREA_BLURB =
  "Serving Bucks County, PA & South Jersey";

export const CITIES = [
  "Levittown, PA",
  "Bristol, PA",
  "Newtown, PA",
  "Yardley, PA",
  "Doylestown, PA",
  "Langhorne, PA",
  "Philadelphia, PA",
  "Cherry Hill, NJ",
  "Trenton, NJ",
  "Camden, NJ",
] as const;

export const FOOTER_CITIES = CITIES.slice(0, 5);

export type NavLink = {
  label: string;
  href: string;
};

export const HOME_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Contact", href: "/#estimate" },
];

export const ROOFING_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Contact", href: "/roofing#estimate" },
];

export const DECKS_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Contact", href: "/decks#estimate" },
];

export const SIDING_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "Contact", href: "/siding#estimate" },
];

export type WhyIcon =
  | "shield"
  | "badge"
  | "stamp"
  | "tag"
  | "umbrella"
  | "clipboard"
  | "layers"
  | "weight";

export type WhyItem = {
  title: string;
  desc: string;
  icon: WhyIcon;
};

export const HOME_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured in Pennsylvania and New Jersey — verified before any crew steps on your property.",
    icon: "shield",
  },
  {
    title: "Workmanship Warranty",
    desc: "Every install is backed by our own workmanship warranty, on top of manufacturer coverage.",
    icon: "badge",
  },
  {
    title: "Trusted Brand Materials",
    desc: "GAF and CertainTeed roofing systems, James Hardie fiber-cement siding.",
    icon: "stamp",
  },
  {
    title: "Honest, Fixed-Price Estimates",
    desc: "One clear quote before work starts — no change orders, no surprise line items.",
    icon: "tag",
  },
];

export const ROOFING_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured across PA and NJ.",
    icon: "shield",
  },
  {
    title: "GAF & CertainTeed Certified",
    desc: "Manufacturer-certified installs that keep warranties intact.",
    icon: "stamp",
  },
  {
    title: "Workmanship Warranty",
    desc: "Our own crews, backed by a warranty on the labor itself.",
    icon: "badge",
  },
  {
    title: "Storm & Insurance Claims",
    desc: "We work directly with your adjuster from inspection to sign-off.",
    icon: "umbrella",
  },
];

export type ServiceCard = {
  num: string;
  title: string;
  href: string;
  imgLabel: string;
  imgSrc?: string;
  desc: string;
  bullets: string[];
};

export const SERVICES: ServiceCard[] = [
  {
    num: "01",
    title: "Roofing",
    href: "/roofing",
    imgLabel: "roof replacement — in progress",
    imgSrc: "/roofing/2/1.webp",
    desc: "Roof replacement, repair, and inspections built around real Pennsylvania winters.",
    bullets: [
      "GAF & CertainTeed certified systems",
      "Storm damage & insurance claims",
      "Workmanship warranty",
    ],
  },
  {
    num: "02",
    title: "Decks",
    href: "/decks",
    imgLabel: "composite deck build",
    imgSrc: "/deck/1 deck/1.webp",
    desc: "Composite and wood decks designed to hold up outdoors, all season.",
    bullets: [
      "Custom design & permits handled",
      "Composite, railing & lighting",
      "Staining, sealing & repair",
    ],
  },
  {
    num: "03",
    title: "Siding",
    href: "/siding",
    imgLabel: "fiber-cement siding install",
    imgSrc: "/siding/10 siding/1.webp",
    desc: "Vinyl, insulated, and fiber-cement siding that locks out weather for good.",
    bullets: [
      "James Hardie fiber-cement",
      "Seamless gutters & trim",
      "Full tear-off & repair",
    ],
  },
];

export const FOOTER_SERVICES = ["Roofing", "Decks", "Siding"];

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Free Estimate",
    desc: "A walkthrough and a written, no-obligation quote.",
  },
  {
    num: "02",
    title: "Design & Permits",
    desc: "Materials selected, permits pulled — we handle the paperwork.",
  },
  {
    num: "03",
    title: "Installation",
    desc: "Our own crew on-site start to finish. No subcontractors.",
  },
  {
    num: "04",
    title: "Walkthrough & Warranty",
    desc: "Final inspection with you, then your warranty paperwork.",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const HOME_STATS: Stat[] = [
  { value: "5+", label: "Years serving the region" },
  { value: "500+", label: "Roofs, decks & siding jobs" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export const ROOFING_STATS: Stat[] = [
  { value: "5+", label: "Years serving the region" },
  { value: "500+", label: "Roofs completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export type TrustBadge = {
  value: string;
  label: string;
};

export const TRUST_BADGES: TrustBadge[] = [
  { value: "4.9★ Rating", label: "Average Google rating" },
  { value: "5+ Years", label: "Serving Bucks County & South Jersey" },
  { value: "Licensed & Insured", label: "PA & NJ compliant, every job" },
];

export type Project = {
  label: string;
  alt: string;
  src: string;
  href: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    label: "Full tear-off roof replacement",
    alt: "Full tear-off roof replacement in progress in Bucks County, PA",
    src: "/roofing/1/1.webp",
    href: "/projects/full-tear-off-roof-replacement",
    featured: true,
  },
  {
    label: "Privacy fencing — freshly installed",
    alt: "Newly installed wood privacy fencing along a property line",
    src: "/deck/5 deck/1.webp",
    href: "/projects/privacy-fencing-install",
  },
  {
    label: "Full tear-off siding replacement",
    alt: "Full tear-off siding replacement in progress on a residential home",
    src: "/siding/2 siding/1.webp",
    href: "/projects/full-tear-off-siding-replacement",
  },
];

export type Review = {
  name: string;
  meta: string;
  stars: string;
  text: string;
};

export const HOME_REVIEWS: Review[] = [
  {
    name: "Mike R.",
    meta: "Roof Replacement — Levittown, PA",
    stars: "★★★★★",
    text: "Crew showed up on time, replaced our roof in a day and a half, and cleaned up every nail. Exactly what they quoted, no surprises.",
  },
  {
    name: "Dana T.",
    meta: "Deck Build — Newtown, PA",
    stars: "★★★★★",
    text: "They handled the permit paperwork and built a composite deck that's held up through two winters without a single issue.",
  },
  {
    name: "Carlos M.",
    meta: "Siding Replacement — Cherry Hill, NJ",
    stars: "★★★★★",
    text: "Our old vinyl was falling apart. TopLine tore it off and put up James Hardie siding, and the house looks brand new.",
  },
  {
    name: "Sandra K.",
    meta: "Storm Damage Repair — Bristol, PA",
    stars: "★★★★★",
    text: "Hail damage claim handled start to finish, and they dealt with the adjuster directly. The new roof looks great.",
  },
  {
    name: "Vince A.",
    meta: "Custom Deck & Railing — Yardley, PA",
    stars: "★★★★★",
    text: "Designed around our pool and built a cable railing system that looks incredible. Crew was meticulous the whole way through.",
  },
  {
    name: "Barbara S.",
    meta: "Cedar Shake Siding — Doylestown, PA",
    stars: "★★★★★",
    text: "Wanted a historic look for our older home and they matched it perfectly. We still get compliments from neighbors.",
  },
  {
    name: "Tom P.",
    meta: "Roof Repair — Doylestown, PA",
    stars: "★★★★★",
    text: "Found and fixed a leak two other companies missed. Fair price, clear explanation of what was actually wrong.",
  },
  {
    name: "Monica R.",
    meta: "Deck Repair — Bristol, PA",
    stars: "★★★★★",
    text: "Found rotted joists our home inspector missed and fixed them properly instead of just patching boards.",
  },
  {
    name: "Renee P.",
    meta: "Vinyl Siding Replacement — Levittown, PA",
    stars: "★★★★★",
    text: "Found soft sheathing behind our old siding during tear-off and fixed it before wrapping. Glad they checked.",
  },
];

export const ROOFING_REVIEWS: Review[] = [
  {
    name: "Mike R.",
    meta: "Roof Replacement — Levittown, PA",
    stars: "★★★★★",
    text: "Crew showed up on time, replaced our roof in a day and a half, and cleaned up every nail. Exactly what they quoted, no surprises.",
  },
  {
    name: "Sandra K.",
    meta: "Storm Damage — Bristol, PA",
    stars: "★★★★★",
    text: "Hail damage claim handled start to finish, and they dealt with the adjuster directly. The new roof looks great.",
  },
  {
    name: "Tom P.",
    meta: "Roof Repair — Doylestown, PA",
    stars: "★★★★★",
    text: "Found and fixed a leak two other companies missed. Fair price, clear explanation of what was actually wrong.",
  },
];

export type Faq = {
  q: string;
  a: string;
};

export const HOME_FAQS: Faq[] = [
  {
    q: "Do you handle permits and insurance claims?",
    a: "Yes — we pull all required permits ourselves and can work directly with your insurance adjuster on storm-damage roof claims from inspection through final sign-off.",
  },
  {
    q: "What brands of materials do you install?",
    a: "GAF and CertainTeed for roofing systems, and James Hardie for fiber-cement siding. All are manufacturer-certified installs, which keeps their warranties intact.",
  },
  {
    q: "How long does a typical roof replacement take?",
    a: "Timeline depends on the size and complexity of the roof — we'll walk you through the schedule for your specific project during the estimate.",
  },
  {
    q: "Do you offer financing?",
    a: "We offer financing options for larger projects — ask about current plans when you request your estimate.",
  },
  {
    q: "What areas do you serve?",
    a: "Bucks County and the greater Philadelphia area, plus South Jersey communities including Cherry Hill, Trenton, and Camden.",
  },
];

export const ROOFING_FAQS: Faq[] = [
  {
    q: "Do you handle permits and insurance claims?",
    a: "Yes — we pull all required permits ourselves and can work directly with your insurance adjuster on storm-damage roof claims from inspection through final sign-off.",
  },
  {
    q: "What brands of materials do you install?",
    a: "GAF and CertainTeed for roofing systems. Both are manufacturer-certified installs, which keeps their warranties intact.",
  },
  {
    q: "How long does a typical roof replacement take?",
    a: "Timeline depends on the size and complexity of the roof — we'll walk you through the schedule for your specific project during the estimate.",
  },
  {
    q: "Do you offer financing?",
    a: "We offer financing options for larger roofing projects — ask about current plans when you request your estimate.",
  },
  {
    q: "What areas do you serve?",
    a: "Bucks County and the greater Philadelphia area, plus South Jersey communities including Cherry Hill, Trenton, and Camden.",
  },
];

export type SubService = {
  num: string;
  title: string;
  desc: string;
};

export const ROOFING_SUB_SERVICES: SubService[] = [
  {
    num: "01",
    title: "Roof Replacement",
    desc: "Full tear-off and replacement with GAF or CertainTeed systems, built for PA & NJ winters.",
  },
  {
    num: "02",
    title: "Roof Repair",
    desc: "Leaks, flashing, and damaged shingles fixed fast, with a clear written scope.",
  },
  {
    num: "03",
    title: "Asphalt Shingle Roofing",
    desc: "GAF and CertainTeed shingle systems, installed to manufacturer spec.",
  },
  {
    num: "04",
    title: "Metal Roofing",
    desc: "Standing-seam and metal shingle roofing for long-term durability.",
  },
  {
    num: "05",
    title: "Flat / Low-Slope Roofing",
    desc: "Membrane roofing systems for additions, porches, and low-slope sections.",
  },
  {
    num: "06",
    title: "Roof Inspections & Storm Damage",
    desc: "Full inspection reports and insurance-ready storm damage documentation.",
  },
  {
    num: "07",
    title: "Gutters & Gutter Guards",
    desc: "Seamless gutters and guards installed alongside your roofing project.",
  },
];

export type GalleryImage = {
  label: string;
  alt: string;
  src?: string;
};

export const ROOFING_GALLERY: GalleryImage[] = [
  {
    label: "full tear-off roof replacement",
    alt: "Full tear-off roof replacement in progress in Bucks County, PA",
    src: "/roofing/1/1.webp",
  },
  {
    label: "standing-seam metal roof install",
    alt: "Standing-seam metal roofing panels installed on a residential home",
    src: "/roofing/2/1.webp",
  },
];

export const SERVICE_TYPE_OPTIONS = [
  { key: "roofing", label: "Roofing" },
  { key: "decks", label: "Decks" },
  { key: "siding", label: "Siding" },
] as const;

// ---------------------------------------------------------------------------
// DECKS HUB
// ---------------------------------------------------------------------------

export const DECKS_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured across PA and NJ for every build, from a single stair repair to a full custom deck.",
    icon: "shield",
  },
  {
    title: "Permits Handled For You",
    desc: "We pull the required permits and schedule inspections, so your deck is built to code from day one.",
    icon: "clipboard",
  },
  {
    title: "Composite & Premium Wood",
    desc: "Trex, TimberTech, cedar, pressure-treated, and exotic hardwoods — we build in the material you want.",
    icon: "layers",
  },
  {
    title: "Built to Hold Structural Weight",
    desc: "Framing, footings, and ledger attachment engineered for real load — hot tubs, furniture, and crowds included.",
    icon: "weight",
  },
];

export const DECKS_STATS: Stat[] = [
  { value: "5+", label: "Years serving the region" },
  { value: "300+", label: "Decks & fences built" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export const DECKS_REVIEWS: Review[] = [
  {
    name: "Dana T.",
    meta: "Composite Deck Build — Newtown, PA",
    stars: "★★★★★",
    text: "They handled the permit paperwork and built a composite deck that's held up through two winters without a single issue.",
  },
  {
    name: "Greg H.",
    meta: "Deck Restoration — Doylestown, PA",
    stars: "★★★★★",
    text: "Our 15-year-old wood deck looked brand new after they stripped, repaired, and refinished it. Half the cost of a full rebuild.",
  },
  {
    name: "Patricia L.",
    meta: "Privacy Fence — Langhorne, PA",
    stars: "★★★★★",
    text: "Clean lines, plumb posts, finished a day early. The vinyl fence still looks perfect two summers later.",
  },
];

export const DECKS_FAQS: Faq[] = [
  {
    q: "Composite or wood — which should I choose?",
    a: "Composite (Trex, TimberTech) costs more upfront but needs no staining or sealing and typically carries a 25-50 year warranty. Wood costs less initially but needs refinishing every 2-3 years. We'll walk you through both during your estimate.",
  },
  {
    q: "Do you handle the permits for a new deck?",
    a: "Yes — deck construction almost always requires a permit in Bucks County and South Jersey municipalities. We pull it, schedule the required inspections, and handle the paperwork end to end.",
  },
  {
    q: "Can you restore an old deck instead of rebuilding it?",
    a: "Often, yes. If the structural framing is sound, we can replace worn boards, sister damaged joists, and refinish the surface for a fraction of a full rebuild's cost. We'll tell you honestly if restoration isn't a safe option.",
  },
  {
    q: "Do you build fences too, or just decks?",
    a: "Both — wood, vinyl, and decorative fencing for privacy or property-line marking, often installed alongside a deck project as one coordinated job.",
  },
  {
    q: "How long does a typical deck build take?",
    a: "Most standard-size composite or wood decks are completed in one to two weeks from the start of installation, weather and permit timing permitting.",
  },
];

export const DECKS_SUB_SERVICES: SubService[] = [
  {
    num: "01",
    title: "Custom Deck Construction",
    desc: "Design and build from the ground up — layout, framing, decking, and finishing handled by one crew.",
  },
  {
    num: "02",
    title: "Deck Restoration & Refinishing",
    desc: "Board replacement, joist sistering, sanding, staining, and sealing to bring an aging deck back to life.",
  },
  {
    num: "03",
    title: "Composite Decking",
    desc: "Trex, TimberTech, and other low-maintenance composite systems built for PA & NJ weather.",
  },
  {
    num: "04",
    title: "Wood Decking",
    desc: "Cedar, pressure-treated pine, and exotic hardwoods like ipe, installed and finished to last.",
  },
  {
    num: "05",
    title: "Railings & Guardrails",
    desc: "Cable, composite, wood, and metal railing systems built to code and matched to your deck's style.",
  },
  {
    num: "06",
    title: "Fencing",
    desc: "Wood, vinyl, and decorative fencing for privacy, pets, pools, and property-line marking.",
  },
  {
    num: "07",
    title: "Deck Repair & Structural Reinforcement",
    desc: "Rotted board and joist replacement, ledger reattachment, and footing repair for decks with real structural issues.",
  },
];

export const DECKS_GALLERY: GalleryImage[] = [
  {
    label: "custom composite deck — finished build",
    alt: "Finished custom composite deck build in Bucks County, PA",
    src: "/deck/1 deck/1.webp",
  },
  {
    label: "deck framing — structural build in progress",
    alt: "Deck framing and joist structure during construction",
    src: "/deck/2 deck/1.webp",
  },
  {
    label: "cable railing system — install detail",
    alt: "Close-up of a cable railing system installed on a deck",
    src: "/deck/3 deck/1.webp",
  },
  {
    label: "wood deck restoration — before and after",
    alt: "Before and after photos of a wood deck restoration",
    src: "/deck/4 deck/1.webp",
  },
  {
    label: "privacy fencing — freshly installed",
    alt: "Newly installed wood privacy fencing along a property line",
    src: "/deck/5 deck/1.webp",
  },
  {
    label: "ipe hardwood decking — finished surface",
    alt: "Finished ipe hardwood decking surface detail",
    src: "/deck/6 deck/1.webp",
  },
  {
    label: "completed deck & railing — full exterior view",
    alt: "Completed deck and railing project on a home in Bucks County, PA",
  },
];

// ---------------------------------------------------------------------------
// SIDING HUB
// ---------------------------------------------------------------------------

export const SIDING_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured across PA and NJ, with every crew member trained on the systems we install.",
    icon: "shield",
  },
  {
    title: "James Hardie Certified",
    desc: "Manufacturer-certified fiber-cement installs that keep the product warranty intact from day one.",
    icon: "stamp",
  },
  {
    title: "Full Tear-Off, Not Overlay",
    desc: "We remove old siding down to the sheathing to check for rot and water damage before anything new goes up.",
    icon: "layers",
  },
  {
    title: "Honest, Fixed-Price Estimates",
    desc: "One clear quote before work starts — no change orders once your crew is on-site.",
    icon: "tag",
  },
];

export const SIDING_STATS: Stat[] = [
  { value: "5+", label: "Years serving the region" },
  { value: "400+", label: "Siding projects completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export const SIDING_REVIEWS: Review[] = [
  {
    name: "Carlos M.",
    meta: "Fiber-Cement Siding — Cherry Hill, NJ",
    stars: "★★★★★",
    text: "Our old vinyl was falling apart. TopLine tore it off and put up James Hardie siding, and the house looks brand new.",
  },
  {
    name: "Renee P.",
    meta: "Vinyl Siding Replacement — Levittown, PA",
    stars: "★★★★★",
    text: "Found soft sheathing behind our old siding during tear-off and fixed it before wrapping. Glad they checked.",
  },
  {
    name: "Anthony D.",
    meta: "Insulated Siding — Newtown, PA",
    stars: "★★★★★",
    text: "Noticeable difference in the upstairs bedrooms this winter. Install was clean and fast, crew was respectful of the property.",
  },
];

export const SIDING_FAQS: Faq[] = [
  {
    q: "Vinyl, fiber-cement, or wood — what's the difference?",
    a: "Vinyl is the most affordable and virtually maintenance-free. James Hardie fiber-cement costs more but resists fire, rot, and pests while holding paint longer. Wood and cedar shake offer a classic look but need regular refinishing. We'll help you weigh cost against long-term upkeep.",
  },
  {
    q: "Do you do a full tear-off or install over the existing siding?",
    a: "We do a full tear-off on every replacement. Installing over old siding can trap moisture and hide rot — removing it lets us inspect and repair the sheathing underneath before anything new goes up.",
  },
  {
    q: "Will new siding actually lower my energy bills?",
    a: "Insulated siding adds a continuous layer of rigid foam behind the panel, which reduces drafts and thermal bridging at the studs. Most homeowners notice a difference in comfort, and it can modestly reduce heating and cooling costs.",
  },
  {
    q: "How long does a siding replacement take?",
    a: "Most single-family homes are completed in three to seven days depending on square footage and material, with daily cleanup so the property stays livable throughout.",
  },
  {
    q: "Do you repair storm-damaged siding, or only full replacements?",
    a: "Both — we handle small repair jobs like loose or cracked panels as well as full tear-off replacements, and can work with your insurance adjuster on storm-damage claims.",
  },
];

export const SIDING_SUB_SERVICES: SubService[] = [
  {
    num: "01",
    title: "Siding Replacement",
    desc: "Full tear-off and replacement of old, worn, or storm-damaged siding down to the sheathing.",
  },
  {
    num: "02",
    title: "Vinyl Siding",
    desc: "Budget-friendly, low-maintenance vinyl siding in a wide range of colors and profiles.",
  },
  {
    num: "03",
    title: "James Hardie Fiber-Cement Siding",
    desc: "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems.",
  },
  {
    num: "04",
    title: "Insulated Siding",
    desc: "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home.",
  },
  {
    num: "05",
    title: "Wood & Cedar Shake Siding",
    desc: "Classic and historic-style wood and cedar shake siding, installed and finished to last outdoors.",
  },
  {
    num: "06",
    title: "Siding Repair",
    desc: "Targeted repair of cracked, loose, or storm-damaged panels without a full replacement.",
  },
  {
    num: "07",
    title: "Soffit, Fascia & Trim",
    desc: "Soffit and fascia replacement and trim work, usually completed alongside your siding project.",
  },
];

export const SIDING_GALLERY: GalleryImage[] = [
  {
    label: "James Hardie fiber-cement siding — finished install",
    alt: "Finished James Hardie fiber-cement siding install in Bucks County, PA",
    src: "/siding/1 siding/1.webp",
  },
  {
    label: "full tear-off siding replacement — in progress",
    alt: "Full tear-off siding replacement in progress on a residential home",
    src: "/siding/2 siding/1.webp",
  },
  {
    label: "insulated siding — panel and foam backing detail",
    alt: "Close-up of insulated siding panel with rigid foam backing",
    src: "/siding/4 siding/1.webp",
  },
  {
    label: "cedar shake siding — historic-style finish",
    alt: "Cedar shake siding installed in a historic-style finish",
    src: "/siding/6 siding/1.webp",
  },
  {
    label: "storm-damaged siding repair — panel replacement",
    alt: "Repair of storm-damaged siding panels on a home exterior",
    src: "/siding/7 siding/1.webp",
  },
  {
    label: "soffit and fascia — fresh trim work",
    alt: "Newly installed soffit and fascia trim along a roofline",
    src: "/siding/10 siding/1.webp",
  },
  {
    label: "completed siding project — full exterior view",
    alt: "Completed siding replacement project on a home in Bucks County, PA",
  },
];

// ---------------------------------------------------------------------------
// PROJECT CASE STUDIES — /projects/[slug]
// ---------------------------------------------------------------------------

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectTrade = "roofing" | "decks" | "siding";

export type ProjectCaseStudy = {
  slug: string;
  trade: ProjectTrade;
  title: string;
  metaTitle: string;
  metaDescription: string;
  serviceLabel: string;
  hubHref: string;
  facts: ProjectFact[];
  aboutParagraphs: string[];
  photos: { src: string; alt: string }[];
};

const TRADE_META: Record<
  ProjectTrade,
  {
    hubHref: string;
    serviceLabel: string;
    aboutParagraphs: string[];
    whyItems: WhyItem[];
  }
> = {
  roofing: {
    hubHref: "/roofing",
    serviceLabel: "Roofing",
    aboutParagraphs: [
      "This roofing project was completed by our own crew — no subcontractors — for a homeowner in Bucks County, PA. Every job starts with a full roof inspection, so the scope of work reflects what the roof actually needs rather than a generic estimate.",
      "We install GAF and CertainTeed roofing systems as manufacturer-certified installers, which keeps material warranties fully intact. That applies whether the job is a full tear-off replacement, a targeted repair, or a metal roofing install — the underlying process of inspecting, documenting, and installing to manufacturer specification stays the same.",
      "TopLine Exteriors serves homeowners across Bucks County, Philadelphia, and South Jersey with roofing, deck, and siding work handled by the same in-house crew from start to finish.",
    ],
    whyItems: ROOFING_WHY_ITEMS,
  },
  decks: {
    hubHref: "/decks",
    serviceLabel: "Decks & Fencing",
    aboutParagraphs: [
      "This deck and fencing project was built by our own crew from the ground up for a homeowner in Bucks County, PA — framing, footings, decking, and railing all handled in-house. We design around how the space will actually be used before the first post ever goes in the ground.",
      "Whether the material is composite, pressure-treated pine, cedar, or a hardwood like ipe, the fundamentals stay consistent: engineered framing and footings rated for real load, proper fastening, and finish work that holds up outdoors through every Pennsylvania and New Jersey season.",
      "TopLine Exteriors builds decks, railing, and fencing for homeowners across Bucks County, Philadelphia, and South Jersey, alongside our roofing and siding work.",
    ],
    whyItems: DECKS_WHY_ITEMS,
  },
  siding: {
    hubHref: "/siding",
    serviceLabel: "Siding",
    aboutParagraphs: [
      "This siding project was installed by our own crew for a homeowner in Bucks County, PA, with attention to the details that determine how siding actually performs over time — proper flashing, moisture barriers, and manufacturer-specified fastening.",
      "We work with vinyl, insulated, James Hardie fiber-cement, and wood siding, and every install — whether it's a full tear-off replacement or a targeted repair — follows the same underlying process: assess the existing wall assembly, address anything hidden underneath before it's covered up, then install to manufacturer specification.",
      "TopLine Exteriors installs and repairs siding for homeowners across Bucks County, Philadelphia, and South Jersey, alongside our roofing and deck work.",
    ],
    whyItems: SIDING_WHY_ITEMS,
  },
};

export function whyItemsForTrade(trade: ProjectTrade): WhyItem[] {
  return TRADE_META[trade].whyItems;
}

function projectPhotos(folder: string, count: number, ext: string, alt: string) {
  return Array.from({ length: count }, (_, i) => ({
    src: `${folder}/${i + 1}.${ext}`,
    alt: i === 0 ? alt : `${alt} — photo ${i + 1}`,
  }));
}

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  // ROOFING
  {
    slug: "full-tear-off-roof-replacement",
    trade: "roofing",
    title: "Full Tear-Off Roof Replacement",
    metaTitle: "Full Tear-Off Roof Replacement in Levittown, PA",
    metaDescription:
      "Photos from a full tear-off roof replacement completed by TopLine Exteriors in Levittown, PA — full project gallery and details.",
    serviceLabel: "Roofing",
    hubHref: "/roofing",
    facts: [
      { label: "Service", value: "Full Tear-Off Roof Replacement" },
      { label: "Location", value: "Levittown, PA" },
    ],
    aboutParagraphs: TRADE_META.roofing.aboutParagraphs,
    photos: projectPhotos(
      "/roofing/1",
      7,
      "webp",
      "Full tear-off roof replacement in progress in Bucks County, PA"
    ),
  },
  {
    slug: "standing-seam-metal-roof-install",
    trade: "roofing",
    title: "Standing-Seam Metal Roof Install",
    metaTitle: "Standing-Seam Metal Roof Install in Doylestown, PA",
    metaDescription:
      "Photos from a standing-seam metal roof installation completed by TopLine Exteriors in Doylestown, PA — full project gallery and details.",
    serviceLabel: "Roofing",
    hubHref: "/roofing",
    facts: [
      { label: "Service", value: "Standing-Seam Metal Roof Install" },
      { label: "Location", value: "Doylestown, PA" },
    ],
    aboutParagraphs: TRADE_META.roofing.aboutParagraphs,
    photos: projectPhotos(
      "/roofing/2",
      9,
      "webp",
      "Standing-seam metal roofing panels installed on a residential home"
    ),
  },

  // DECKS
  {
    slug: "custom-composite-deck-build",
    trade: "decks",
    title: "Custom Composite Deck Build",
    metaTitle: "Custom Composite Deck Build in Newtown, PA",
    metaDescription:
      "Photos from a custom composite deck build completed by TopLine Exteriors in Newtown, PA — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Composite Deck Build" },
      { label: "Location", value: "Newtown, PA" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/1 deck",
      1,
      "webp",
      "Finished custom composite deck build in Bucks County, PA"
    ),
  },
  {
    slug: "deck-framing-structural-build",
    trade: "decks",
    title: "Deck Framing & Structural Build",
    metaTitle: "Deck Framing & Structural Build in Yardley, PA",
    metaDescription:
      "Photos from a deck framing and structural build completed by TopLine Exteriors in Yardley, PA — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Deck Framing & Structural Build" },
      { label: "Location", value: "Yardley, PA" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/2 deck",
      2,
      "webp",
      "Deck framing and joist structure during construction"
    ),
  },
  {
    slug: "cable-railing-system-install",
    trade: "decks",
    title: "Cable Railing System Install",
    metaTitle: "Cable Railing System Install in Langhorne, PA",
    metaDescription:
      "Photos from a cable railing system installation completed by TopLine Exteriors in Langhorne, PA — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Cable Railing System Install" },
      { label: "Location", value: "Langhorne, PA" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/3 deck",
      2,
      "webp",
      "Close-up of a cable railing system installed on a deck"
    ),
  },
  {
    slug: "wood-deck-restoration",
    trade: "decks",
    title: "Wood Deck Restoration",
    metaTitle: "Wood Deck Restoration in Bristol, PA",
    metaDescription:
      "Photos from a wood deck restoration completed by TopLine Exteriors in Bristol, PA — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Wood Deck Restoration" },
      { label: "Location", value: "Bristol, PA" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/4 deck",
      3,
      "webp",
      "Wood deck restoration in Bucks County, PA"
    ),
  },
  {
    slug: "privacy-fencing-install",
    trade: "decks",
    title: "Privacy Fencing Install",
    metaTitle: "Privacy Fencing Install in Philadelphia, PA",
    metaDescription:
      "Photos from a privacy fencing installation completed by TopLine Exteriors in Philadelphia, PA — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Privacy Fencing Install" },
      { label: "Location", value: "Philadelphia, PA" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/5 deck",
      4,
      "webp",
      "Newly installed wood privacy fencing along a property line"
    ),
  },
  {
    slug: "ipe-hardwood-decking",
    trade: "decks",
    title: "Ipe Hardwood Decking",
    metaTitle: "Ipe Hardwood Decking in Cherry Hill, NJ",
    metaDescription:
      "Photos from an ipe hardwood decking project completed by TopLine Exteriors in Cherry Hill, NJ — full project gallery and details.",
    serviceLabel: "Decks & Fencing",
    hubHref: "/decks",
    facts: [
      { label: "Service", value: "Ipe Hardwood Decking" },
      { label: "Location", value: "Cherry Hill, NJ" },
    ],
    aboutParagraphs: TRADE_META.decks.aboutParagraphs,
    photos: projectPhotos(
      "/deck/6 deck",
      4,
      "webp",
      "Finished ipe hardwood decking surface detail"
    ),
  },

  // SIDING
  {
    slug: "james-hardie-fiber-cement-siding",
    trade: "siding",
    title: "James Hardie Fiber-Cement Siding",
    metaTitle: "James Hardie Fiber-Cement Siding in Doylestown, PA",
    metaDescription:
      "Photos from a James Hardie fiber-cement siding install completed by TopLine Exteriors in Doylestown, PA — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "James Hardie Fiber-Cement Siding" },
      { label: "Location", value: "Doylestown, PA" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/1 siding",
      4,
      "webp",
      "Finished James Hardie fiber-cement siding install in Bucks County, PA"
    ),
  },
  {
    slug: "full-tear-off-siding-replacement",
    trade: "siding",
    title: "Full Tear-Off Siding Replacement",
    metaTitle: "Full Tear-Off Siding Replacement in Levittown, PA",
    metaDescription:
      "Photos from a full tear-off siding replacement completed by TopLine Exteriors in Levittown, PA — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "Full Tear-Off Siding Replacement" },
      { label: "Location", value: "Levittown, PA" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/2 siding",
      3,
      "webp",
      "Full tear-off siding replacement in progress on a residential home"
    ),
  },
  {
    slug: "insulated-siding-install",
    trade: "siding",
    title: "Insulated Siding Install",
    metaTitle: "Insulated Siding Install in Newtown, PA",
    metaDescription:
      "Photos from an insulated siding installation completed by TopLine Exteriors in Newtown, PA — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "Insulated Siding Install" },
      { label: "Location", value: "Newtown, PA" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/4 siding",
      2,
      "webp",
      "Close-up of insulated siding panel with rigid foam backing"
    ),
  },
  {
    slug: "cedar-shake-siding",
    trade: "siding",
    title: "Cedar Shake Siding",
    metaTitle: "Cedar Shake Siding in Doylestown, PA",
    metaDescription:
      "Photos from a cedar shake siding project completed by TopLine Exteriors in Doylestown, PA — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "Cedar Shake Siding" },
      { label: "Location", value: "Doylestown, PA" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/6 siding",
      2,
      "webp",
      "Cedar shake siding installed in a historic-style finish"
    ),
  },
  {
    slug: "storm-damaged-siding-repair",
    trade: "siding",
    title: "Storm-Damaged Siding Repair",
    metaTitle: "Storm-Damaged Siding Repair in Bristol, PA",
    metaDescription:
      "Photos from a storm-damaged siding repair completed by TopLine Exteriors in Bristol, PA — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "Storm-Damaged Siding Repair" },
      { label: "Location", value: "Bristol, PA" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/7 siding",
      4,
      "webp",
      "Repair of storm-damaged siding panels on a home exterior"
    ),
  },
  {
    slug: "soffit-and-fascia-trim",
    trade: "siding",
    title: "Soffit & Fascia Trim Work",
    metaTitle: "Soffit & Fascia Trim Work in Trenton, NJ",
    metaDescription:
      "Photos from soffit and fascia trim work completed by TopLine Exteriors in Trenton, NJ — full project gallery and details.",
    serviceLabel: "Siding",
    hubHref: "/siding",
    facts: [
      { label: "Service", value: "Soffit & Fascia Trim Work" },
      { label: "Location", value: "Trenton, NJ" },
    ],
    aboutParagraphs: TRADE_META.siding.aboutParagraphs,
    photos: projectPhotos(
      "/siding/10 siding",
      2,
      "webp",
      "Newly installed soffit and fascia trim along a roofline"
    ),
  },
];

// ---------------------------------------------------------------------------
// SERVICE DETAIL PAGES — /roofing/[service], /decks/[service], /siding/[service]
// ---------------------------------------------------------------------------

export type ServiceDetail = {
  slug: string;
  hubHref: string;
  hubLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroDek: string;
  heroImgLabel: string;
  heroAlt: string;
  heroImgSrc?: string;
  introParagraphs: string[];
  quickFacts: { label: string; value: string }[];
  signsList: string[];
  processSteps: ProcessStep[];
  materials: { title: string; desc: string }[];
  faqs: Faq[];
};

export const ROOF_REPLACEMENT_SERVICE: ServiceDetail = {
  slug: "roof-replacement",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Replacement",
  metaTitle: "Roof Replacement in Bucks County, PA",
  metaDescription:
    "Full tear-off roof replacement with GAF & CertainTeed systems in Bucks County, PA & South Jersey. Backed by a workmanship warranty. Get a free estimate today.",
  eyebrow: "ROOFING · ROOF REPLACEMENT",
  heroDek:
    "A full tear-off and replacement, built for real Pennsylvania and New Jersey winters — installed by our own crews, backed by a workmanship warranty.",
  heroImgLabel: "completed roof replacement — full tear-off",
  heroAlt: "Completed full tear-off roof replacement in Bucks County, PA",
  heroImgSrc: "/roofing/1/1.webp",
  introParagraphs: [
    "A roof replacement is a full tear-off of your existing roofing system down to the decking, followed by a new installation from the ground up — new underlayment, flashing, and shingles or metal panels, installed to current code and manufacturer specification.",
    "It's a different job from a repair. A repair fixes a specific leak or damaged section; a replacement addresses the whole roof at once, which makes sense once a roof is past its expected lifespan, has widespread wear across multiple slopes, or has been damaged badly enough that patchwork repairs would only buy a year or two.",
    "We install GAF and CertainTeed shingle systems as manufacturer-certified installers, which means the material warranty stays fully intact — something that isn't guaranteed if a roof is installed by a non-certified contractor. Every replacement is also backed by our own workmanship warranty on top of that manufacturer coverage.",
  ],
  quickFacts: [
    { label: "Materials", value: "GAF & CertainTeed" },
    { label: "Warranty", value: "Workmanship warranty" },
    { label: "Permits", value: "Pulled for you" },
  ],
  signsList: [
    "Shingles curling, cracking, or losing granules across large sections of the roof",
    "A roof that's 20+ years old (25+ for architectural shingles) and showing its age",
    "Daylight visible through the roof deck from inside the attic",
    "Multiple past repairs that haven't resolved recurring leaks",
    "Sagging rooflines or soft spots when walked on",
    "Moss, algae streaks, or dark patches spreading across the shingles",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Estimate",
      desc: "We inspect the full roof and decking, then provide a written, fixed-price quote.",
    },
    {
      num: "02",
      title: "Material Selection & Permits",
      desc: "Choose your shingle or metal system and color; we pull the required township permit before work begins.",
    },
    {
      num: "03",
      title: "Full Tear-Off & Install",
      desc: "Complete removal of the old roof, decking repair as needed, then new underlayment, flashing, and roofing system.",
    },
    {
      num: "04",
      title: "Cleanup, Walkthrough & Warranty",
      desc: "Magnetic nail sweep, full property cleanup, final walkthrough with you, then your warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "GAF Timberline Shingles",
      desc: "Architectural asphalt shingles with GAF's Advanced Protection Shingle Technology and a Lifetime limited warranty.",
    },
    {
      title: "CertainTeed Landmark Shingles",
      desc: "Dimensional shingles with StreakFighter algae resistance, backed by CertainTeed's SureStart warranty.",
    },
    {
      title: "Synthetic Underlayment & Ice & Water Shield",
      desc: "Full synthetic underlayment plus ice & water shield at eaves and valleys — standard on every replacement, not an upsell.",
    },
  ],
  faqs: [
    {
      q: "How do I know if I need a replacement instead of a repair?",
      a: "If damage is limited to one section or a single leak, a repair usually makes sense. If your roof is near the end of its rated lifespan, has wear across multiple slopes, or has needed several repairs already, a full replacement is typically the more cost-effective long-term choice. We'll give you an honest recommendation either way during the inspection.",
    },
    {
      q: "How long does a roof replacement take?",
      a: "Timeline depends on the size and complexity of the roof — we'll walk you through the schedule for your specific project during the inspection, and clean up the site fully once work is finished.",
    },
    {
      q: "Will you handle the permit?",
      a: "Yes — we pull all required township permits ourselves as part of every replacement, and schedule any required inspections.",
    },
    {
      q: "What happens to the old shingles and materials?",
      a: "Everything is torn off, loaded, and hauled away as part of the job. We also run a magnetic sweep of the property to catch stray nails before we leave.",
    },
  ],
};

export const ROOF_REPAIR_SERVICE: ServiceDetail = {
  slug: "roof-repair",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Repair",
  metaTitle: "Roof Repair in Bucks County, PA",
  metaDescription:
    "Fast, honest roof leak and shingle repair in Bucks County, PA & South Jersey. Written scope before we start, no unnecessary upsells. Get a free estimate today.",
  eyebrow: "ROOFING · ROOF REPAIR",
  heroDek:
    "Leaks, flashing failures, and storm-damaged shingles fixed fast — with a clear written scope before we start, not a replacement pitch you didn't ask for.",
  heroImgLabel: "roof repair — flashing and shingle replacement",
  heroAlt: "Roof repair in progress, replacing damaged flashing and shingles",
  heroImgSrc: "/43_roof.webp",
  introParagraphs: [
    "A roof repair targets a specific problem — a leak, a section of damaged shingles, failed flashing around a chimney or vent — without touching the rest of a roof that's still doing its job. It's the right call when the damage is contained and the roof still has years of life left in it.",
    "Most repair calls we get in Bucks County and South Jersey come down to a handful of causes: ice damming after a hard winter, wind-lifted shingles after a storm, or flashing that was never sealed correctly around a penetration. We diagnose the actual cause first, not just patch the symptom, so the same leak doesn't come back six months later.",
    "If an inspection turns up wear that goes beyond what a repair can reasonably fix, we'll tell you that directly and explain why — we don't pad repair jobs and we don't push replacements that aren't needed yet.",
  ],
  quickFacts: [
    { label: "Scope", value: "Written before work starts" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "A stain spreading across a ceiling or upper wall after rain",
    "Missing, cracked, or curled shingles in one section of the roof",
    "Visible daylight or water around a chimney, skylight, or vent pipe",
    "Granules collecting in gutters after a storm",
    "A shingle or two lifted or torn loose after high wind",
    "A small leak that's been patched before and has come back",
  ],
  processSteps: [
    {
      num: "01",
      title: "Diagnosis",
      desc: "We trace the leak to its actual source — not just the spot where water is showing up inside.",
    },
    {
      num: "02",
      title: "Written Scope & Price",
      desc: "A fixed price for exactly what needs to be fixed, before any work begins.",
    },
    {
      num: "03",
      title: "Repair",
      desc: "Flashing, decking, underlayment, and shingles repaired or replaced as needed to match the surrounding roof.",
    },
    {
      num: "04",
      title: "Follow-Up Check",
      desc: "We confirm the repair is holding, especially after the next real rain or storm.",
    },
  ],
  materials: [
    {
      title: "Matched Shingle Replacement",
      desc: "We source GAF or CertainTeed shingles that match your existing roof as closely as possible for repairs.",
    },
    {
      title: "Step & Counter-Flashing",
      desc: "New aluminum flashing at chimneys, walls, and penetrations — the most common source of recurring leaks.",
    },
    {
      title: "Ice & Water Shield",
      desc: "Added at eaves and valleys during repair when the existing underlayment is missing or failed.",
    },
  ],
  faqs: [
    {
      q: "How do you know a repair is enough, and I don't need a full replacement?",
      a: "We inspect the full roof, not just the leak location — checking overall shingle condition, decking, and how many other repairs the roof has needed. If the rest of the roof has real life left, a targeted repair is the honest recommendation, and that's what we'll quote.",
    },
    {
      q: "How fast can you get someone out for an active leak?",
      a: "We prioritize active leaks and work to get a crew out as quickly as possible across Bucks County and South Jersey, especially after major storms.",
    },
    {
      q: "Will the repaired area match the rest of my roof?",
      a: "We match shingle brand, style, and color as closely as possible. Some color variation is normal with older roofs since shingles fade over time, but we aim for the closest available match.",
    },
    {
      q: "Do you offer any guarantee on repair work?",
      a: "Yes — every repair is backed by our workmanship guarantee. If the same issue recurs due to our work, we come back and fix it at no charge.",
    },
  ],
};

export const ASPHALT_SHINGLE_ROOFING_SERVICE: ServiceDetail = {
  slug: "asphalt-shingle-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Asphalt Shingle Roofing",
  metaTitle: "Asphalt Shingle Roofing in Bucks County, PA",
  metaDescription:
    "GAF & CertainTeed certified asphalt shingle roofing installation in Bucks County, PA & South Jersey. Architectural & 3-tab options. Get a free estimate today.",
  eyebrow: "ROOFING · ASPHALT SHINGLE ROOFING",
  heroDek:
    "GAF and CertainTeed shingle systems installed to manufacturer spec, in a range of styles and colors built to handle Pennsylvania and New Jersey weather.",
  heroImgLabel: "architectural asphalt shingle roof — finished install",
  heroAlt: "Finished architectural asphalt shingle roof installation",
  heroImgSrc: "/43_roof.webp",
  introParagraphs: [
    "Asphalt shingles are the most common roofing material in the region for good reason — they're durable, cost-effective, and available in styles that suit almost any home, from a straightforward 3-tab shingle to dimensional architectural shingles that mimic the look of slate or wood shake.",
    "As GAF and CertainTeed certified installers, we install these systems exactly to manufacturer specification — correct nailing pattern, proper ventilation, and the underlayment each manufacturer requires to honor its warranty. That certification matters because a shingle warranty can be voided by incorrect installation, even if the shingles themselves are defect-free.",
    "We work with homeowners across Levittown, Newtown, Doylestown, and the wider Bucks County and South Jersey area to pick a shingle line and color that fits both the home's style and the budget, then install it as a full system — not just shingles nailed to whatever was underneath before.",
  ],
  quickFacts: [
    { label: "Materials", value: "GAF & CertainTeed" },
    { label: "Lifespan", value: "20–30+ years" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Shingles curling, cupping, or losing their granule coating",
    "Bald or shiny patches where granules have worn away completely",
    "Cracked shingles after a hail or wind event",
    "A roof over 20 years old that hasn't been reroofed",
    "Visible sagging along the roofline",
    "Frequent ice damming or water backing up under the eaves",
  ],
  processSteps: [
    {
      num: "01",
      title: "Consultation & Selection",
      desc: "Walk through GAF and CertainTeed shingle lines, colors, and pricing tiers to find the right fit.",
    },
    {
      num: "02",
      title: "Permits & Scheduling",
      desc: "We pull the required township permit and schedule the install around weather windows.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Full removal of the old roof, decking inspection, then new underlayment, flashing, and shingle system.",
    },
    {
      num: "04",
      title: "Final Inspection",
      desc: "Walkthrough with you, magnetic nail sweep, and warranty registration paperwork.",
    },
  ],
  materials: [
    {
      title: "GAF Timberline HDZ Shingles",
      desc: "The best-selling architectural shingle in North America, with GAF's LayerLock technology and a limited lifetime warranty.",
    },
    {
      title: "CertainTeed Landmark Shingles",
      desc: "Dimensional shingles with StreakFighter algae resistance and a range of color blends.",
    },
    {
      title: "3-Tab Shingle Options",
      desc: "A budget-friendly, flat-profile option for homeowners who prefer a traditional look or a tighter project budget.",
    },
  ],
  faqs: [
    {
      q: "What's the difference between architectural and 3-tab shingles?",
      a: "Architectural (dimensional) shingles are thicker, layered for a shadowed look, and typically carry a longer warranty. 3-tab shingles are flatter and less expensive, but generally have a shorter rated lifespan. We'll price both so you can compare directly.",
    },
    {
      q: "Does the color fade over time?",
      a: "All asphalt shingles fade somewhat with UV exposure over their lifespan, and CertainTeed's StreakFighter technology specifically resists the dark algae streaking common in humid climates. We can show samples of both new and weathered shingle color.",
    },
    {
      q: "How does certification affect my warranty?",
      a: "GAF and CertainTeed extend enhanced warranty coverage — including labor, in some tiers — only when the roof is installed by a certified contractor following their exact specifications. We register every qualifying install so you get that extended coverage automatically.",
    },
    {
      q: "Can you match my existing shingle color for a partial reroof?",
      a: "For a full replacement this isn't a concern, but if you're only replacing one section, we'll do our best to match the closest current color — some variation is normal since shingles fade with age.",
    },
  ],
};

export const METAL_ROOFING_SERVICE: ServiceDetail = {
  slug: "metal-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Metal Roofing",
  metaTitle: "Metal Roofing in Bucks County, PA",
  metaDescription:
    "Standing-seam & metal shingle roofing installation in Bucks County, PA & South Jersey. Built for long-term durability and snow shedding. Get a free estimate.",
  eyebrow: "ROOFING · METAL ROOFING",
  heroDek:
    "Standing-seam and metal shingle systems built for decades of service — better snow shedding, fire resistance, and long-term durability than asphalt.",
  heroImgLabel: "standing-seam metal roof — finished install",
  heroAlt: "Finished standing-seam metal roof installation",
  heroImgSrc: "/roofing/2/1.webp",
  introParagraphs: [
    "Metal roofing covers a range of systems — standing-seam panels with concealed fasteners, and metal shingles designed to mimic the look of slate or shake — all sharing the same core advantages over asphalt: a much longer service life, better performance in heavy snow, and strong resistance to wind, fire, and impact damage.",
    "It costs more upfront than asphalt shingles, which is the main reason more homes in Bucks County and South Jersey don't have it, but the lifespan difference is significant — a properly installed metal roof commonly lasts 40 to 70 years against 20 to 30 for asphalt, and most homeowners never need a second reroof.",
    "Installation quality matters even more with metal than asphalt — panel alignment, fastener spacing, and expansion allowance all affect how the roof performs over decades, not just years. We install standing-seam and metal shingle systems to manufacturer spec with crews trained specifically on metal, not asphalt crews doing metal occasionally.",
  ],
  quickFacts: [
    { label: "Lifespan", value: "40–70 years" },
    { label: "Snow performance", value: "Sheds heavy snow well" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "An asphalt roof nearing the end of its life where you want a longer-term replacement",
    "Recurring ice dam problems that a metal roof's snow-shedding helps prevent",
    "Visible rust, seam separation, or fastener backing out on an existing metal roof",
    "A desire for better fire resistance, especially near wooded property",
    "Frequent hail or severe wind events in your area",
    "Wanting to reduce long-term reroofing costs over a 30+ year horizon",
  ],
  processSteps: [
    {
      num: "01",
      title: "System Selection",
      desc: "Choose between standing-seam panels or metal shingles, plus gauge, finish, and color.",
    },
    {
      num: "02",
      title: "Measurement & Permits",
      desc: "Precise measurement for custom panel fabrication, plus the required township permit.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Full tear-off, decking repair as needed, then underlayment and metal panel or shingle installation.",
    },
    {
      num: "04",
      title: "Detail Work & Walkthrough",
      desc: "Trim, flashing, and snow guards installed as needed, then final walkthrough and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "Standing-Seam Steel & Aluminum Panels",
      desc: "Concealed-fastener panels in a range of gauges and factory finishes, custom-fabricated to your roof's exact dimensions.",
    },
    {
      title: "Metal Shingle Systems",
      desc: "Interlocking metal shingles styled to resemble slate, shake, or tile, with the durability of steel.",
    },
    {
      title: "Snow Retention & Trim Accessories",
      desc: "Snow guards, custom trim, and flashing to control snow shed and keep water moving where it should.",
    },
  ],
  faqs: [
    {
      q: "Is metal roofing noisier in the rain than asphalt?",
      a: "With proper solid-deck installation and underlayment — which is how we install every metal roof — the noise difference from asphalt is minimal. The old 'loud tin roof' reputation mostly comes from metal installed directly over open framing without decking, which we don't do.",
    },
    {
      q: "Will a metal roof void my homeowners insurance discount eligibility?",
      a: "The opposite is usually true — many insurers offer a discount for metal roofing due to its fire and impact resistance. Check with your specific carrier, but it's worth asking about when you switch.",
    },
    {
      q: "How does metal roofing handle heavy snow?",
      a: "Standing-seam panels are especially effective at shedding snow due to their smooth, low-friction surface, which reduces the ice damming and structural load that heavy snow causes on asphalt roofs.",
    },
    {
      q: "Can you install metal roofing over my existing roof?",
      a: "We do a full tear-off on every metal roof install. Installing over an old roof can trap moisture, add weight the structure wasn't designed for, and prevent proper inspection of the decking underneath.",
    },
  ],
};

export const FLAT_LOW_SLOPE_ROOFING_SERVICE: ServiceDetail = {
  slug: "flat-low-slope-roofing",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Flat / Low-Slope Roofing",
  metaTitle: "Flat & Low-Slope Roofing in Bucks County, PA",
  metaDescription:
    "Membrane roofing systems for flat and low-slope roofs in Bucks County, PA & South Jersey — additions, porches, garages. Get a free estimate today.",
  eyebrow: "ROOFING · FLAT / LOW-SLOPE ROOFING",
  heroDek:
    "Membrane roofing systems built specifically for flat and low-slope sections — additions, porch roofs, and garages that standard shingles aren't designed for.",
  heroImgLabel: "flat roof membrane — finished install",
  heroAlt: "Finished flat roof membrane installation on a home addition",
  heroImgSrc: "/43_roof.webp",
  introParagraphs: [
    "Flat and low-slope roofs — generally anything under a 3:12 pitch — need a different roofing system than a standard pitched roof. Asphalt shingles rely on gravity and slope to shed water; on a flat or nearly flat surface, water sits instead of running off, which shingles aren't built to handle over time.",
    "We install membrane systems designed for this: fully adhered or mechanically fastened membranes that create a continuous, seamless waterproof layer rather than overlapping shingles. These are common on home additions, porch roofs, garages, and sections of larger homes with a modern flat-roof design element.",
    "Getting a flat roof right depends heavily on proper drainage design and correct membrane seaming — the most common flat roof failures we see on other contractors' work come down to ponding water and seam separation, both of which we address directly in how we design and install the system.",
  ],
  quickFacts: [
    { label: "Best for", value: "Additions, porches, garages" },
    { label: "Materials", value: "Membrane systems" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Water pooling on a flat or low-slope section more than 48 hours after rain",
    "Visible bubbling, cracking, or seam separation in the membrane",
    "A leak showing up on the ceiling below a flat-roofed addition or porch",
    "An aging built-up or tar roof that's never been replaced with a membrane system",
    "Debris or granule buildup blocking drains on a flat roof",
    "Soft or spongy spots when walking a flat roof section",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Drainage Review",
      desc: "We assess the existing roof, structure, and drainage slope before recommending a membrane system.",
    },
    {
      num: "02",
      title: "System & Permit",
      desc: "Select the right membrane type for the application; we pull the required permit.",
    },
    {
      num: "03",
      title: "Tear-Off & Install",
      desc: "Remove the old roofing down to the deck, then install insulation and the membrane system with properly sealed seams.",
    },
    {
      num: "04",
      title: "Drainage Check & Walkthrough",
      desc: "Water test drainage points, final walkthrough, and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "TPO Membrane",
      desc: "A reflective, heat-welded single-ply membrane offering strong UV and puncture resistance.",
    },
    {
      title: "EPDM Rubber Membrane",
      desc: "A durable synthetic rubber roofing membrane with a long track record on flat residential sections.",
    },
    {
      title: "Modified Bitumen",
      desc: "A torch- or cold-applied asphalt membrane system, well suited to smaller flat sections like porch roofs.",
    },
  ],
  faqs: [
    {
      q: "How long does a membrane roof last compared to shingles?",
      a: "A properly installed TPO or EPDM membrane typically lasts 20 to 30 years, comparable to a mid-grade asphalt shingle roof, provided drainage is correctly designed and seams are properly sealed.",
    },
    {
      q: "Why does my flat roof keep collecting water?",
      a: "Ponding water usually points to a drainage slope problem — either the original roof was built without enough pitch toward the drains, or the structure has settled over time. We assess this during inspection and can address it with tapered insulation as part of the reroof.",
    },
    {
      q: "Can you install a membrane roof on just one section of my house?",
      a: "Yes — this is one of the most common jobs we do, matching a membrane system to a specific flat-roofed addition, porch, or garage while the rest of the home keeps its existing pitched roof.",
    },
    {
      q: "Is a flat roof more prone to leaks than a pitched roof?",
      a: "A well-installed membrane system with correct drainage is not inherently leak-prone, but flat roofs have less margin for installation error than pitched roofs, which is why proper membrane seaming and drainage design matter more here.",
    },
  ],
};

export const ROOF_INSPECTIONS_STORM_DAMAGE_SERVICE: ServiceDetail = {
  slug: "roof-inspections-storm-damage",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Inspections & Storm Damage",
  metaTitle:
    "Roof Inspections & Storm Damage Claims in Bucks County, PA",
  metaDescription:
    "Full roof inspections and insurance-ready storm damage documentation in Bucks County, PA & South Jersey. We work directly with your adjuster. Free estimate.",
  eyebrow: "ROOFING · INSPECTIONS & STORM DAMAGE",
  heroDek:
    "Full inspection reports and insurance-ready storm damage documentation — we work directly with your adjuster from inspection through final sign-off.",
  heroImgLabel: "roof inspection — hail damage documentation",
  heroAlt: "Roof inspector documenting hail damage on residential shingles",
  heroImgSrc: "/43_roof.webp",
  introParagraphs: [
    "A roof inspection is a full assessment of your roof's condition — shingle wear, flashing integrity, ventilation, and any storm damage — documented with photos and a written report. It's the starting point for almost every roofing decision, whether that's a simple repair, an insurance claim, or planning ahead for a future replacement.",
    "After hail or high wind, insurance-related storm damage inspections are their own category. Adjusters need clear, specific documentation to approve a claim, and homeowners without that documentation often get lowball offers or outright denials. We inspect specifically for what an adjuster looks for — hail bruising, granule loss patterns, and wind-lifted or creased shingles — and document it accordingly.",
    "We work directly with your insurance adjuster throughout the claims process across Bucks County, Philadelphia, and South Jersey, from the initial inspection through the final scope agreement, so you're not navigating that process alone.",
  ],
  quickFacts: [
    { label: "Insurance claims", value: "We work with adjusters" },
    { label: "Documentation", value: "Photos + written report" },
    { label: "Cost", value: "Free inspection" },
  ],
  signsList: [
    "A recent hail, wind, or severe storm event in your area",
    "Granules collecting in gutters or downspouts after a storm",
    "Visible dents or bruising on shingles, vents, or gutters",
    "Missing or torn shingles after high wind",
    "Planning to sell your home and want a pre-listing roof condition report",
    "An insurance adjuster requesting an independent roof assessment",
  ],
  processSteps: [
    {
      num: "01",
      title: "Full Roof Walk",
      desc: "We physically walk the roof, not just view it from the ground, checking every slope for damage.",
    },
    {
      num: "02",
      title: "Photo Documentation",
      desc: "Detailed photos of any hail, wind, or wear damage found, organized by location on the roof.",
    },
    {
      num: "03",
      title: "Written Report",
      desc: "A clear report covering condition, damage found, and our recommendation — repair, or file a claim.",
    },
    {
      num: "04",
      title: "Adjuster Coordination",
      desc: "If you file a claim, we meet your adjuster on-site and advocate for a fair, complete scope.",
    },
  ],
  materials: [],
  faqs: [
    {
      q: "Is the inspection really free, even if I don't end up filing a claim?",
      a: "Yes — the inspection and report are free with no obligation. Plenty of inspections turn up minor wear that doesn't need immediate action, and we'll tell you that directly.",
    },
    {
      q: "How do I know if storm damage is significant enough to file a claim?",
      a: "Hail bruising and wind damage aren't always visible from the ground. That's exactly why we do a full roof walk — cosmetic-looking damage can still compromise a shingle's ability to shed water over time, which is what qualifies for most claims.",
    },
    {
      q: "Will you meet with my insurance adjuster in person?",
      a: "Yes, this is standard practice for us on storm damage claims. Having a roofing contractor on-site with the adjuster generally leads to a more accurate and complete scope than a homeowner navigating it alone.",
    },
    {
      q: "What if the insurance company denies my claim or offers too little?",
      a: "We can provide additional documentation to support a reinspection or appeal. We're not a public adjuster and can't file appeals on your behalf, but we'll give you everything needed to make the case yourself or through one.",
    },
  ],
};

export const GUTTERS_GUTTER_GUARDS_SERVICE: ServiceDetail = {
  slug: "gutters-gutter-guards",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Gutters & Gutter Guards",
  metaTitle: "Gutter Installation & Guards in Bucks County, PA",
  metaDescription:
    "Seamless gutter and gutter guard installation in Bucks County, PA & South Jersey, alongside your roofing project or as a standalone job. Free estimate.",
  eyebrow: "ROOFING · GUTTERS & GUTTER GUARDS",
  heroDek:
    "Seamless gutters and gutter guards installed alongside your roofing project — or on their own — to keep water moving away from your home's foundation.",
  heroImgLabel: "seamless gutters — freshly installed",
  heroAlt: "Freshly installed seamless aluminum gutters on a home",
  heroImgSrc: "/43_roof.webp",
  introParagraphs: [
    "Gutters do one job — move roof water away from your siding, foundation, and landscaping — but a lot can go wrong when they're undersized, poorly pitched, or clogged constantly. Seamless gutters, formed on-site to the exact length needed, eliminate the seam joints that are the most common failure point on sectional gutters.",
    "Gutter guards reduce how often gutters need to be cleaned by keeping leaves and debris out while still letting water through, which matters a lot on properties with mature trees — a common feature across Bucks County and South Jersey neighborhoods.",
    "We install gutters as part of a full roofing project or as a standalone job on a home whose gutters are failing independent of the roof itself, in aluminum sizes and colors matched to your home's trim.",
  ],
  quickFacts: [
    { label: "Material", value: "Seamless aluminum" },
    { label: "Add-on", value: "Gutter guards available" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Water overflowing the gutter during moderate rain",
    "Gutters pulling away from the fascia or sagging between hangers",
    "Visible rust, cracks, or seam leaks on sectional gutters",
    "Water pooling near the foundation after rain",
    "Constant leaf and debris buildup requiring frequent cleaning",
    "Ice buildup in gutters contributing to ice dams in winter",
  ],
  processSteps: [
    {
      num: "01",
      title: "Measurement & Sizing",
      desc: "We measure roof area and pitch to size gutters and downspouts correctly for real water volume, not just standard sizing.",
    },
    {
      num: "02",
      title: "Material & Color Selection",
      desc: "Choose aluminum gauge and color to match your home's trim and fascia.",
    },
    {
      num: "03",
      title: "Seamless Fabrication & Install",
      desc: "Gutters are formed on-site to exact length and installed with properly spaced hangers for real snow and debris load.",
    },
    {
      num: "04",
      title: "Guard Install & Walkthrough",
      desc: "Gutter guards installed if selected, then a final walkthrough to confirm proper pitch and drainage.",
    },
  ],
  materials: [
    {
      title: "Seamless Aluminum Gutters",
      desc: "Formed on-site in a range of colors, eliminating the seam leaks common on pre-formed sectional gutters.",
    },
    {
      title: "Micro-Mesh Gutter Guards",
      desc: "Fine-mesh guards that block leaves and debris while allowing full water flow, reducing cleaning frequency.",
    },
    {
      title: "Oversized Downspouts",
      desc: "Upsized downspout options for roofs that see heavy water volume during storms.",
    },
  ],
  faqs: [
    {
      q: "Are gutter guards worth the extra cost?",
      a: "On properties with mature trees nearby, yes — they significantly cut down on cleaning frequency and reduce the risk of clogged gutters overflowing near the foundation. On properties with minimal tree coverage, standard gutters with occasional cleaning may be sufficient.",
    },
    {
      q: "Can you install gutters without doing a full roof replacement?",
      a: "Yes, gutter installation and repair is a standalone service. We install gutters alongside roofing projects often, but plenty of our gutter jobs are independent of any roof work.",
    },
    {
      q: "Why do seamless gutters cost more than sectional gutters from a hardware store?",
      a: "Seamless gutters are custom-formed on-site to your home's exact roofline length, eliminating the seams that are the most common leak point on pre-cut sectional gutters. The material and labor cost more, but the maintenance and leak risk over time drop significantly.",
    },
    {
      q: "How often do gutters need to be replaced?",
      a: "Well-maintained aluminum gutters typically last 20+ years. Replacement is usually driven by physical damage, persistent leaks at seams, or pulling away from the fascia rather than age alone.",
    },
  ],
};

export const CUSTOM_DECK_CONSTRUCTION_SERVICE: ServiceDetail = {
  slug: "custom-deck-construction",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Custom Deck Construction",
  metaTitle: "Custom Deck Building in Bucks County, PA",
  metaDescription:
    "Custom deck design and construction in Bucks County, PA & South Jersey — layout, framing, decking, and railings by one crew. Get a free estimate today.",
  eyebrow: "DECKS · CUSTOM DECK CONSTRUCTION",
  heroDek:
    "Design and build from the ground up — layout, framing, decking, and finishing handled by our own crew, with permits pulled for you.",
  heroImgLabel: "custom composite deck — finished build",
  heroAlt: "Finished custom composite deck build in Bucks County, PA",
  heroImgSrc: "/deck/1 deck/1.webp",
  introParagraphs: [
    "Custom deck construction means the whole project — from initial layout and footing placement through framing, decking, and railings — is designed for your specific yard and how you actually plan to use the space, rather than a stock size and shape.",
    "We handle it as one project with one crew: footings and framing engineered to hold real load, decking material selected to fit your budget and maintenance preference, and railings that match the deck's style. We also pull the required township permit and schedule inspections, which is required in most Bucks County and South Jersey municipalities for any elevated deck.",
    "Whether it's a simple ground-level platform or a multi-level deck with built-in seating, lighting, and a pergola, we design and build it as a single coordinated project rather than handing pieces off to different subcontractors.",
  ],
  quickFacts: [
    { label: "Materials", value: "Composite or wood" },
    { label: "Permits", value: "Pulled for you" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting outdoor living space but starting from a bare yard",
    "An existing deck too small, poorly placed, or beyond repair",
    "Planning a multi-level deck to work with a sloped yard",
    "Wanting built-in features like seating, lighting, or a pergola",
    "Needing a deck engineered for a hot tub or heavy furniture load",
    "A home addition or renovation that includes new outdoor space",
  ],
  processSteps: [
    {
      num: "01",
      title: "Design Consultation",
      desc: "We walk your yard, discuss how you'll use the space, and design a layout and material plan.",
    },
    {
      num: "02",
      title: "Permits & Engineering",
      desc: "We pull the required township permit and, for larger builds, provide engineered footing and framing plans.",
    },
    {
      num: "03",
      title: "Framing & Construction",
      desc: "Footings, framing, decking, and railings built by our own crew from start to finish.",
    },
    {
      num: "04",
      title: "Final Walkthrough & Inspection",
      desc: "Township inspection scheduled and passed, then a final walkthrough with you before we call it done.",
    },
  ],
  materials: [
    {
      title: "Trex & TimberTech Composite",
      desc: "Low-maintenance composite decking in a range of colors and grain patterns, built for PA & NJ weather.",
    },
    {
      title: "Pressure-Treated & Cedar Framing",
      desc: "Structural framing lumber rated for ground contact and long-term outdoor exposure.",
    },
    {
      title: "Cable, Wood & Composite Railings",
      desc: "Railing systems matched to your deck's style and built to current code height and spacing requirements.",
    },
  ],
  faqs: [
    {
      q: "Do I need a permit for a new deck?",
      a: "Most townships in Bucks County and South Jersey require a permit for any deck attached to the house or elevated above a certain height. We pull the permit and schedule required inspections as part of every custom build.",
    },
    {
      q: "How long does a custom deck take to build?",
      a: "A straightforward single-level deck usually takes about a week of on-site work; multi-level or larger decks with built-in features can take two to three weeks, plus permit lead time before we start.",
    },
    {
      q: "Can you design a deck that works with a sloped or uneven yard?",
      a: "Yes — multi-level decks and stepped footings are common solutions for sloped lots, and we design the framing plan specifically around your yard's actual grade rather than assuming flat ground.",
    },
    {
      q: "What's the price difference between composite and wood decking?",
      a: "Composite typically costs more upfront but requires little to no annual maintenance. Pressure-treated wood costs less initially but needs regular staining and sealing. We'll price both so you can compare the total cost over time, not just the install price.",
    },
  ],
};

export const DECK_RESTORATION_REFINISHING_SERVICE: ServiceDetail = {
  slug: "deck-restoration-refinishing",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Deck Restoration & Refinishing",
  metaTitle: "Deck Restoration & Refinishing in Bucks County, PA",
  metaDescription:
    "Deck restoration, board replacement, sanding, staining, and sealing in Bucks County, PA & South Jersey. Bring an aging deck back to life. Free estimate.",
  eyebrow: "DECKS · DECK RESTORATION & REFINISHING",
  heroDek:
    "Board replacement, joist sistering, sanding, staining, and sealing — bringing an aging deck back to life instead of tearing it out and starting over.",
  heroImgLabel: "wood deck restoration — before and after",
  heroAlt: "Wood deck mid-restoration, sanded and ready for staining",
  heroImgSrc: "/deck/4 deck/1.webp",
  introParagraphs: [
    "A deck that's structurally sound but showing its age — graying wood, splintering boards, a worn or peeling finish — is usually a restoration candidate rather than a full rebuild. Restoration replaces damaged boards, sisters weakened joists for extra support, and refinishes the surface to look and perform like new.",
    "We start with a structural check, because refinishing over a deck with hidden rot or a failing ledger board just delays a bigger problem. Once we confirm the frame is sound, we replace individual boards as needed, sand the deck surface, and apply a stain and sealer rated for real outdoor exposure across our Pennsylvania and New Jersey seasons.",
    "Restoration is typically a fraction of the cost of a full rebuild and can add years of life to a deck that's fundamentally solid — it's the right call more often than homeowners expect, and we'll tell you directly if your deck actually needs a rebuild instead.",
  ],
  quickFacts: [
    { label: "Cost vs. rebuild", value: "Usually a fraction" },
    { label: "Includes", value: "Board repair, stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wood that's turned gray and lost its original finish",
    "Splintering, cupping, or cracked boards in isolated spots",
    "A finish that's peeling, flaking, or wearing thin",
    "Loose railings or handrails that move when you push on them",
    "A deck that hasn't been stained or sealed in 3+ years",
    "Minor soft spots that haven't spread across the whole structure",
  ],
  processSteps: [
    {
      num: "01",
      title: "Structural Assessment",
      desc: "We check joists, the ledger board, and footings to confirm the deck's frame is sound before refinishing.",
    },
    {
      num: "02",
      title: "Board & Joist Repair",
      desc: "Replace damaged boards and sister any weakened joists for added structural support.",
    },
    {
      num: "03",
      title: "Sanding",
      desc: "The full deck surface is sanded smooth to remove the old, worn finish and any splintering.",
    },
    {
      num: "04",
      title: "Staining & Sealing",
      desc: "A weather-rated stain and sealer applied to protect the wood through another set of PA & NJ seasons.",
    },
  ],
  materials: [
    {
      title: "Matched Replacement Decking",
      desc: "New boards matched to your deck's existing wood species where individual replacement is needed.",
    },
    {
      title: "Semi-Transparent & Solid Stains",
      desc: "Weather-rated exterior stains in a range of tones, from natural wood grain to solid color coverage.",
    },
    {
      title: "Penetrating Sealers",
      desc: "UV- and water-resistant sealers that protect refinished wood from sun and moisture damage.",
    },
  ],
  faqs: [
    {
      q: "How do I know if my deck needs restoration or a full rebuild?",
      a: "It comes down to the frame. If the joists, ledger board, and footings are structurally sound and the issues are cosmetic or limited to a handful of boards, restoration is the right call. Widespread rot or a failing ledger usually means a rebuild is the more responsible option, and we'll tell you which applies during inspection.",
    },
    {
      q: "How often should a wood deck be restained?",
      a: "Most exterior stains need reapplication every 2 to 3 years depending on sun exposure and foot traffic, though a solid stain can last a bit longer than a semi-transparent one.",
    },
    {
      q: "Can you match the stain color to my existing deck?",
      a: "Yes, we can match or closely approximate an existing stain color, or help you choose a new tone entirely as part of the restoration.",
    },
    {
      q: "Does restoration work on composite decks too?",
      a: "Composite decking doesn't need staining, but boards can crack, fade unevenly, or loosen from fasteners over time — we handle composite board replacement and railing repair as part of restoration work as well.",
    },
  ],
};

export const COMPOSITE_DECKING_SERVICE: ServiceDetail = {
  slug: "composite-decking",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Composite Decking",
  metaTitle: "Composite Decking Installation in Bucks County, PA",
  metaDescription:
    "Trex & TimberTech composite decking installation in Bucks County, PA & South Jersey. Low-maintenance, built for real weather. Get a free estimate today.",
  eyebrow: "DECKS · COMPOSITE DECKING",
  heroDek:
    "Trex, TimberTech, and other low-maintenance composite systems built for Pennsylvania and New Jersey weather — no annual staining or sealing required.",
  heroImgLabel: "composite decking — finished surface detail",
  heroAlt: "Close-up of finished composite decking surface",
  heroImgSrc: "/deck/1 deck/1.webp",
  introParagraphs: [
    "Composite decking is built from a blend of wood fiber and recycled plastic, engineered specifically to resist the rot, splintering, and fading that wood decking is prone to over time. It costs more upfront than pressure-treated lumber, but requires no annual staining or sealing — a meaningful trade-off for homeowners who want a deck without the yearly maintenance cycle.",
    "We install Trex and TimberTech systems, two of the most established composite brands, in a range of colors and grain patterns designed to resemble natural wood without the upkeep. Both offer strong warranties against fading, staining, and structural defects.",
    "Composite decking's performance depends heavily on correct installation — proper spacing for expansion, hidden fastener systems for a clean surface, and framing built to the manufacturer's specifications to keep the warranty valid. We install to manufacturer spec on every job across Bucks County and South Jersey.",
  ],
  quickFacts: [
    { label: "Maintenance", value: "No annual staining" },
    { label: "Materials", value: "Trex & TimberTech" },
    { label: "Warranty", value: "25+ year manufacturer" },
  ],
  signsList: [
    "Wanting a deck without annual staining or sealing upkeep",
    "Replacing a wood deck that's failed faster than expected",
    "Building a new deck and comparing composite vs. wood long-term cost",
    "Wanting a consistent, splinter-free surface for bare feet and kids",
    "Building near a pool or hot tub where wood maintenance is harder",
    "Wanting a longer manufacturer warranty than wood decking offers",
  ],
  processSteps: [
    {
      num: "01",
      title: "Product Selection",
      desc: "Choose between Trex and TimberTech lines, plus color and board profile.",
    },
    {
      num: "02",
      title: "Framing to Spec",
      desc: "Framing built or verified to the manufacturer's exact spacing requirements to keep the warranty valid.",
    },
    {
      num: "03",
      title: "Hidden-Fastener Install",
      desc: "Boards installed with a hidden fastener system for a clean surface with no visible screw heads.",
    },
    {
      num: "04",
      title: "Trim & Warranty Registration",
      desc: "Fascia and edge trim installed, then your composite decking warranty registered with the manufacturer.",
    },
  ],
  materials: [
    {
      title: "Trex Composite Decking",
      desc: "One of the most established composite brands, available in multiple lines from entry-level to premium.",
    },
    {
      title: "TimberTech Composite Decking",
      desc: "Composite and capped-polymer boards with a range of wood-look finishes and a strong fade warranty.",
    },
    {
      title: "Hidden Fastener Systems",
      desc: "Clip-based fastening that leaves no visible screws on the deck surface for a cleaner finished look.",
    },
  ],
  faqs: [
    {
      q: "Is composite decking really maintenance-free?",
      a: "It doesn't need staining or sealing like wood, but it should be periodically cleaned with soap and water to prevent surface mildew, especially in shaded or humid areas. That's a much lighter maintenance load than annual wood staining.",
    },
    {
      q: "How does composite decking handle Pennsylvania winters?",
      a: "Both Trex and TimberTech are engineered for freeze-thaw cycles and won't rot, warp, or splinter the way wood can after repeated winters. Snow and ice should still be cleared with a plastic shovel rather than metal to protect the surface finish.",
    },
    {
      q: "What's the real cost difference between composite and pressure-treated wood?",
      a: "Composite typically costs 20 to 40 percent more upfront than pressure-treated wood, but avoids the recurring cost of annual staining and sealing wood requires — most homeowners find the total cost evens out or favors composite over a 10+ year horizon.",
    },
    {
      q: "Does composite decking get hot in direct sun?",
      a: "Composite can run warmer underfoot than lighter-colored wood in direct summer sun, particularly with darker color boards. Both Trex and TimberTech offer lighter color options and cooler-technology lines if this is a concern.",
    },
  ],
};

export const WOOD_DECKING_SERVICE: ServiceDetail = {
  slug: "wood-decking",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Wood Decking",
  metaTitle: "Wood Decking Installation in Bucks County, PA",
  metaDescription:
    "Cedar, pressure-treated, and hardwood decking installation in Bucks County, PA & South Jersey. Installed and finished to last. Get a free estimate today.",
  eyebrow: "DECKS · WOOD DECKING",
  heroDek:
    "Cedar, pressure-treated pine, and exotic hardwoods like ipe — installed and finished to last, with the natural look composite can't fully replicate.",
  heroImgLabel: "cedar wood decking — finished install",
  heroAlt: "Finished cedar wood decking installation on a home",
  heroImgSrc: "/43_deck.webp",
  introParagraphs: [
    "Wood decking remains a popular choice for homeowners who want the natural grain and warmth composite decking imitates but doesn't fully replace — and it costs less upfront than most composite systems, though it requires more ongoing maintenance.",
    "We install pressure-treated pine, the most common and budget-friendly option; cedar, which naturally resists rot and insects with a warmer tone; and exotic hardwoods like ipe, a dense, extremely durable Brazilian hardwood favored for high-end builds that can last 25+ years with proper care.",
    "Whichever species you choose, correct installation — proper board spacing for drainage and expansion, quality fasteners, and a finish applied at the right time after installation — determines how well the deck actually holds up through Pennsylvania and New Jersey winters and summers.",
  ],
  quickFacts: [
    { label: "Species options", value: "PT pine, cedar, ipe" },
    { label: "Maintenance", value: "Annual stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting the natural grain and look of real wood",
    "Building on a budget where pressure-treated pine fits best",
    "Wanting cedar's natural rot and insect resistance",
    "Considering a premium hardwood like ipe for a high-end build",
    "Replacing composite decking with a wood alternative",
    "Building a deck you plan to stain a custom color",
  ],
  processSteps: [
    {
      num: "01",
      title: "Species Selection",
      desc: "Compare pressure-treated pine, cedar, and hardwood options against your budget and maintenance preference.",
    },
    {
      num: "02",
      title: "Framing & Permits",
      desc: "Structural framing built to code, with the required township permit pulled on your behalf.",
    },
    {
      num: "03",
      title: "Decking Install",
      desc: "Boards installed with correct spacing for drainage and seasonal expansion, using quality fasteners.",
    },
    {
      num: "04",
      title: "Finishing",
      desc: "Stain and sealer applied once the wood has properly cured, protecting it from day one of regular use.",
    },
  ],
  materials: [
    {
      title: "Pressure-Treated Pine",
      desc: "The most budget-friendly decking wood, chemically treated to resist rot and insect damage.",
    },
    {
      title: "Cedar Decking",
      desc: "A naturally rot- and insect-resistant softwood with a warm tone that ages gracefully.",
    },
    {
      title: "Ipe & Exotic Hardwoods",
      desc: "Dense, extremely durable Brazilian hardwoods favored for premium builds, with a 25+ year lifespan when maintained.",
    },
  ],
  faqs: [
    {
      q: "How long before I can stain new wood decking?",
      a: "Pressure-treated wood typically needs 2 to 3 months to dry out before staining, while kiln-dried cedar and hardwoods can often be finished sooner. We'll tell you the right timeline for your specific material during installation.",
    },
    {
      q: "Is ipe worth the extra cost over cedar or pressure-treated pine?",
      a: "Ipe costs significantly more than cedar or pine, but its density and natural durability mean it can outlast both by decades with proper maintenance. It's a premium choice best suited to homeowners planning to stay in the home long-term or prioritizing a high-end look.",
    },
    {
      q: "How much maintenance does wood decking really need?",
      a: "Most wood decking needs restaining and sealing every 1 to 3 years depending on species and sun exposure, plus periodic cleaning to prevent mildew. Cedar and ipe hold their finish somewhat longer than pressure-treated pine.",
    },
    {
      q: "Can wood decking be installed over existing footings and framing?",
      a: "If the existing structure passes inspection and is rated for the new decking's weight, yes. We always assess the frame first rather than assuming it's reusable.",
    },
  ],
};

export const RAILINGS_GUARDRAILS_SERVICE: ServiceDetail = {
  slug: "railings-guardrails",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Railings & Guardrails",
  metaTitle: "Deck Railings & Guardrails in Bucks County, PA",
  metaDescription:
    "Cable, composite, wood & metal deck railing installation in Bucks County, PA & South Jersey, built to code. Get a free estimate today.",
  eyebrow: "DECKS · RAILINGS & GUARDRAILS",
  heroDek:
    "Cable, composite, wood, and metal railing systems built to code and matched to your deck's style — installed as a new build or a standalone upgrade.",
  heroImgLabel: "cable railing system — install detail",
  heroAlt: "Close-up of a cable railing system installed on a deck",
  heroImgSrc: "/deck/3 deck/1.webp",
  introParagraphs: [
    "Railings and guardrails serve a safety-code function first — most townships in Bucks County and South Jersey require guardrails on any deck elevated above 30 inches, with specific requirements for height, baluster spacing, and load rating — but they're also one of the biggest visual elements of a deck's overall look.",
    "We install cable railing systems for an open, modern sightline; composite railings that match low-maintenance decking; traditional wood railings for a classic look; and metal railings for a more industrial or contemporary style. Each system is built to current code requirements, not just aesthetic preference.",
    "This is a common standalone upgrade too — plenty of homeowners replace failing or outdated wood railings on an otherwise sound deck without touching the decking itself, and we handle that as its own project just as often as we do it alongside a full deck build.",
  ],
  quickFacts: [
    { label: "Materials", value: "Cable, wood, composite, metal" },
    { label: "Code compliance", value: "Built to current spec" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Railings that feel loose or wobble when leaned on",
    "Wood railings splintering or rotting at the posts",
    "Baluster spacing wider than current code allows",
    "Wanting a style upgrade — cable or metal instead of wood",
    "A deck railing failing a home inspection during a sale",
    "New deck construction needing code-compliant railings",
  ],
  processSteps: [
    {
      num: "01",
      title: "Style & Material Selection",
      desc: "Choose between cable, composite, wood, or metal railing systems for your deck's look and budget.",
    },
    {
      num: "02",
      title: "Code Review",
      desc: "We confirm height, spacing, and load requirements for your specific township before installing.",
    },
    {
      num: "03",
      title: "Post & Rail Install",
      desc: "Posts set with proper structural attachment, then rails, balusters or cable run installed.",
    },
    {
      num: "04",
      title: "Final Inspection",
      desc: "Confirm every run meets code spacing and load requirements before calling the job complete.",
    },
  ],
  materials: [
    {
      title: "Stainless Cable Railing",
      desc: "A low-profile, modern railing system that preserves an open view while meeting code guardrail requirements.",
    },
    {
      title: "Composite Railing Systems",
      desc: "Low-maintenance railings matched to Trex and TimberTech decking colors and profiles.",
    },
    {
      title: "Wood & Metal Railings",
      desc: "Traditional wood balusters or powder-coated metal railing systems for a classic or industrial look.",
    },
  ],
  faqs: [
    {
      q: "What's the current code requirement for deck railings?",
      a: "Most Bucks County and South Jersey townships require guardrails on any deck surface elevated 30 inches or more above grade, a minimum 36-inch railing height, and baluster spacing no wider than 4 inches. Specific requirements vary by municipality, and we verify the exact code for your township before installing.",
    },
    {
      q: "Can you replace just the railings without touching my deck boards?",
      a: "Yes, this is a common standalone project. We can replace railings on a deck whose boards are still in good condition, matching the new railing style to the existing deck.",
    },
    {
      q: "Is cable railing more expensive than traditional railings?",
      a: "Cable railing typically costs more than standard wood balusters due to the stainless steel cable and specialized hardware, but usually less than premium composite railing systems. We'll price all options for direct comparison.",
    },
    {
      q: "How much weight can a properly installed railing hold?",
      a: "Code-compliant guardrails are engineered to withstand a 200-pound lateral load at any point along the top rail, which is the standard safety requirement we build to on every install.",
    },
  ],
};

export const FENCING_SERVICE: ServiceDetail = {
  slug: "fencing",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Fencing",
  metaTitle: "Fence Installation in Bucks County, PA",
  metaDescription:
    "Wood, vinyl & decorative fence installation in Bucks County, PA & South Jersey — privacy, pet, pool & property-line fencing. Get a free estimate today.",
  eyebrow: "DECKS · FENCING",
  heroDek:
    "Wood, vinyl, and decorative fencing for privacy, pets, pools, and property-line marking — installed by the same crew that handles your deck.",
  heroImgLabel: "privacy fencing — freshly installed",
  heroAlt: "Newly installed wood privacy fencing along a property line",
  heroImgSrc: "/deck/5 deck/1.webp",
  introParagraphs: [
    "Fencing covers a range of needs — full privacy fencing along a property line, a shorter decorative fence around a garden bed, secure fencing for pets or a pool, or a boundary fence marking where your property ends. Each has different height, material, and code considerations.",
    "We install wood fencing for a classic, customizable look; vinyl fencing for a low-maintenance option that won't rot or need repainting; and decorative fencing for smaller accent applications like garden borders. Pool fencing has additional code requirements around height and self-closing gates that we build to exactly.",
    "We handle fence layout, including confirming property lines and any township setback requirements, before installation begins — getting this wrong is one of the most common (and expensive) fencing mistakes homeowners run into with other contractors.",
  ],
  quickFacts: [
    { label: "Materials", value: "Wood, vinyl, decorative" },
    { label: "Layout", value: "Property line verified" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Wanting privacy from neighboring properties",
    "Needing secure fencing for pets or young children",
    "Installing or replacing pool fencing to meet code",
    "Marking an unclear or disputed property line",
    "An existing fence that's leaning, rotting, or damaged",
    "Wanting decorative fencing around a garden or landscaped area",
  ],
  processSteps: [
    {
      num: "01",
      title: "Layout & Property Line Check",
      desc: "We confirm property lines and any township setback requirements before marking the fence layout.",
    },
    {
      num: "02",
      title: "Material & Style Selection",
      desc: "Choose between wood, vinyl, or decorative fencing styles and heights.",
    },
    {
      num: "03",
      title: "Post Setting & Install",
      desc: "Posts set to proper depth for stability, then panels or pickets installed along the confirmed layout.",
    },
    {
      num: "04",
      title: "Gate & Hardware",
      desc: "Gates installed and hung, including self-closing hardware where required for pool fencing.",
    },
  ],
  materials: [
    {
      title: "Wood Privacy & Picket Fencing",
      desc: "Pressure-treated and cedar fencing in privacy, picket, and shadowbox styles.",
    },
    {
      title: "Vinyl Fencing",
      desc: "Low-maintenance vinyl panels that won't rot, warp, or need repainting.",
    },
    {
      title: "Decorative & Pool Fencing",
      desc: "Aluminum and decorative fencing styles, including code-compliant self-closing pool gate hardware.",
    },
  ],
  faqs: [
    {
      q: "Do I need to survey my property line before installing a fence?",
      a: "A formal survey isn't always required, but we do confirm property boundaries and any township setback rules before installing to avoid a fence being built on a neighbor's property or violating local code.",
    },
    {
      q: "What are the code requirements for pool fencing?",
      a: "Most townships require pool fencing at least 4 feet high with self-closing, self-latching gate hardware, and no gaps large enough for a small child to pass through. We build to your specific township's exact requirement.",
    },
    {
      q: "How long does vinyl fencing last compared to wood?",
      a: "Vinyl fencing typically lasts 20 to 30 years with essentially no maintenance, while wood fencing generally needs restaining or repainting every few years and has a somewhat shorter typical lifespan depending on wood species and exposure.",
    },
    {
      q: "Can you match a new fence section to my existing fence?",
      a: "For repairs or extensions to an existing fence, we'll do our best to match material, style, and height, though exact color matching on weathered wood or discontinued vinyl profiles isn't always possible.",
    },
  ],
};

export const DECK_REPAIR_STRUCTURAL_REINFORCEMENT_SERVICE: ServiceDetail = {
  slug: "deck-repair-structural-reinforcement",
  hubHref: "/decks",
  hubLabel: "Decks",
  title: "Deck Repair & Structural Reinforcement",
  metaTitle: "Deck Repair & Structural Reinforcement in Bucks County, PA",
  metaDescription:
    "Rotted board, joist, ledger & footing repair in Bucks County, PA & South Jersey. Real structural deck repairs, not just cosmetic fixes. Free estimate.",
  eyebrow: "DECKS · DECK REPAIR & STRUCTURAL REINFORCEMENT",
  heroDek:
    "Rotted board and joist replacement, ledger reattachment, and footing repair — for decks with real structural issues, not just cosmetic wear.",
  heroImgLabel: "deck structural repair — joist replacement",
  heroAlt: "Deck joist replacement during a structural repair project",
  heroImgSrc: "/deck/2 deck/1.webp",
  introParagraphs: [
    "Structural deck repair addresses problems below the surface — rotted or undersized joists, a ledger board pulling away from the house, failing or heaving footings — that a cosmetic refinish won't fix and that pose a real safety risk if left alone. These are the failures behind most of the deck collapse incidents reported nationally.",
    "The ledger board attachment, where the deck connects to the house, is the single most common point of catastrophic failure on older decks, especially those built before current code required specific flashing and fastener spacing. We inspect this connection closely on every structural repair call.",
    "We assess the full structure — joists, beams, posts, footings, and the ledger connection — before recommending repairs, and we're direct about when a deck's structural problems are extensive enough that a rebuild is the safer and more cost-effective choice.",
  ],
  quickFacts: [
    { label: "Focus", value: "Structural, not cosmetic" },
    { label: "Common fix", value: "Ledger, joist, footings" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "A deck that feels bouncy or springy when walked on",
    "Visible gaps between the ledger board and the house wall",
    "Rotted or soft joists, especially near the ledger connection",
    "A support post that's leaning, cracked, or sitting on a heaved footing",
    "Rusted, missing, or undersized structural fasteners",
    "A deck that's failed a home inspection for structural concerns",
  ],
  processSteps: [
    {
      num: "01",
      title: "Structural Inspection",
      desc: "Full assessment of joists, beams, posts, footings, and the ledger board connection to the house.",
    },
    {
      num: "02",
      title: "Repair Plan",
      desc: "A written scope covering exactly what's structurally compromised and what needs replacement or reinforcement.",
    },
    {
      num: "03",
      title: "Repair & Reinforcement",
      desc: "Joist sistering, ledger reattachment with proper flashing, or footing repair as the inspection requires.",
    },
    {
      num: "04",
      title: "Load Verification",
      desc: "We confirm the repaired structure meets current load requirements before returning the deck to use.",
    },
  ],
  materials: [
    {
      title: "Structural-Grade Lumber",
      desc: "Pressure-treated joists and framing lumber rated for the load and span of your specific deck.",
    },
    {
      title: "Ledger Flashing & Fasteners",
      desc: "Code-compliant flashing and structural fasteners at the house connection, the most common point of failure on older decks.",
    },
    {
      title: "Footing Repair Materials",
      desc: "Concrete and post base hardware to repair or reset footings that have heaved, cracked, or shifted.",
    },
  ],
  faqs: [
    {
      q: "How do I know if my deck's problems are structural or just cosmetic?",
      a: "A bouncy feel underfoot, visible gaps at the ledger board, or leaning posts are structural red flags that go beyond cosmetic wear. If you notice any of these, it's worth a structural inspection before continued regular use.",
    },
    {
      q: "Is a deck with structural problems actually dangerous?",
      a: "Yes, potentially. Ledger board failure is the leading cause of deck collapses, and it can happen suddenly under load — a party, furniture, or a hot tub — rather than gradually. We treat any ledger or joist concern as a priority inspection.",
    },
    {
      q: "Can you repair a deck instead of rebuilding it entirely?",
      a: "Often, yes — if the issue is contained to specific joists, the ledger connection, or a footing, targeted repair is both possible and more cost-effective than a full rebuild. We'll tell you honestly if the damage is too extensive for that to make sense.",
    },
    {
      q: "How much does structural deck repair typically cost compared to a rebuild?",
      a: "Targeted structural repair is almost always significantly less expensive than a full rebuild, since it addresses specific failure points rather than replacing the entire structure. Exact cost depends on what's found during inspection.",
    },
  ],
};

export const SIDING_REPLACEMENT_SERVICE: ServiceDetail = {
  slug: "siding-replacement",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Siding Replacement",
  metaTitle: "Siding Replacement in Bucks County, PA",
  metaDescription:
    "Full tear-off siding replacement in Bucks County, PA & South Jersey. Vinyl, fiber-cement, and wood options. Full sheathing inspection included. Free estimate.",
  eyebrow: "SIDING · SIDING REPLACEMENT",
  heroDek:
    "A full tear-off replacement of old, worn, or storm-damaged siding down to the sheathing — with a full inspection of what's underneath before anything new goes up.",
  heroImgLabel: "full tear-off siding replacement — in progress",
  heroAlt: "Full tear-off siding replacement in progress on a residential home",
  heroImgSrc: "/siding/2 siding/1.webp",
  introParagraphs: [
    "A siding replacement is a full tear-off of your home's existing siding down to the sheathing, followed by inspection and repair of anything found underneath, then installation of a new siding system — vinyl, fiber-cement, insulated, or wood, depending on what you choose.",
    "We do a complete tear-off on every replacement rather than installing new siding over old. This matters because siding failure often hides water damage or rot in the sheathing behind it, and installing over that problem just seals it in rather than fixing it. A tear-off is the only way to actually inspect and address what's there.",
    "We work across Bucks County, Philadelphia, and South Jersey helping homeowners choose the right siding system for their budget, home style, and maintenance preference, then install it as a complete system — not just panels nailed to whatever condition the sheathing happens to be in.",
  ],
  quickFacts: [
    { label: "Includes", value: "Full sheathing inspection" },
    { label: "Materials", value: "Vinyl, Hardie, wood" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Siding that's cracked, warped, or visibly rotting across large sections",
    "Bubbling, peeling paint, or persistent moisture behind the siding",
    "Rising energy bills that point to failing insulation behind old siding",
    "Siding that's 20+ years old and showing widespread wear",
    "Visible mold, mildew, or soft spots on exterior walls",
    "Wanting to change your home's exterior look entirely",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Estimate",
      desc: "We assess the current siding and give a written, fixed-price quote.",
    },
    {
      num: "02",
      title: "Material Selection",
      desc: "Choose your siding system, color, and profile from vinyl, fiber-cement, insulated, or wood options.",
    },
    {
      num: "03",
      title: "Tear-Off & Sheathing Repair",
      desc: "Complete removal of old siding, with any rot or water damage in the sheathing repaired before continuing.",
    },
    {
      num: "04",
      title: "Install & Walkthrough",
      desc: "New siding system installed to manufacturer spec, then a final walkthrough and warranty paperwork.",
    },
  ],
  materials: [
    {
      title: "Vinyl Siding",
      desc: "Budget-friendly, low-maintenance vinyl in a wide range of colors and profiles.",
    },
    {
      title: "James Hardie Fiber-Cement Siding",
      desc: "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems.",
    },
    {
      title: "Insulated Siding",
      desc: "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home.",
    },
  ],
  faqs: [
    {
      q: "Why do a full tear-off instead of installing new siding over the old?",
      a: "Installing over existing siding can trap moisture and hide rot or water damage in the sheathing. A full tear-off lets us inspect and repair the sheathing before anything new goes up, which is the only way to actually catch problems instead of sealing them in.",
    },
    {
      q: "How long does a siding replacement take?",
      a: "Most single-family homes are completed in three to seven days depending on square footage and material, with daily cleanup so the property stays livable throughout the project.",
    },
    {
      q: "Which siding material is the best value?",
      a: "Vinyl offers the lowest upfront cost with minimal maintenance. James Hardie fiber-cement costs more but resists fire, rot, and pests while holding paint longer. We'll walk through the tradeoffs for your specific home and budget.",
    },
    {
      q: "Do you handle insurance claims for storm-damaged siding?",
      a: "Yes — we document storm damage and can work directly with your insurance adjuster on claims involving damaged siding, similar to how we handle roofing storm claims.",
    },
  ],
};

export const VINYL_SIDING_SERVICE: ServiceDetail = {
  slug: "vinyl-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Vinyl Siding",
  metaTitle: "Vinyl Siding Installation in Bucks County, PA",
  metaDescription:
    "Budget-friendly, low-maintenance vinyl siding installation in Bucks County, PA & South Jersey. Wide range of colors and profiles. Free estimate today.",
  eyebrow: "SIDING · VINYL SIDING",
  heroDek:
    "Budget-friendly, low-maintenance vinyl siding in a wide range of colors and profiles — no painting, no rot, and a straightforward install.",
  heroImgLabel: "vinyl siding — finished install",
  heroAlt: "Finished vinyl siding installation on a residential home",
  heroImgSrc: "/43_siding.webp",
  introParagraphs: [
    "Vinyl siding remains the most common siding material for good reason — it's the most budget-friendly option, requires essentially no maintenance beyond occasional washing, never needs painting, and won't rot or attract wood-boring insects the way natural wood siding can.",
    "Modern vinyl siding has come a long way from older, thinner profiles — today's products offer thicker panels, more realistic wood-grain texturing, and a wider range of colors, including deeper tones that resist fading better than older vinyl formulations.",
    "We do a full tear-off before installing vinyl, inspecting and repairing the sheathing underneath, and install with proper nailing technique that allows the panels to expand and contract with temperature changes — a detail that affects how well vinyl performs over Pennsylvania and New Jersey's seasonal temperature swings.",
  ],
  quickFacts: [
    { label: "Maintenance", value: "Minimal — occasional wash" },
    { label: "Cost", value: "Most budget-friendly option" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Wanting the most budget-friendly siding option",
    "Wood siding that needs constant repainting and maintenance",
    "Cracked, faded, or warped existing vinyl siding",
    "Wanting a wide range of color and profile choices",
    "A home that needs siding but has a limited project budget",
    "Preferring an exterior that never needs to be painted",
  ],
  processSteps: [
    {
      num: "01",
      title: "Color & Profile Selection",
      desc: "Choose from a wide range of vinyl colors, textures, and panel profiles.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Check",
      desc: "Full removal of old siding and inspection of the sheathing before installing anything new.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Panels installed with correct nailing technique to allow for proper seasonal expansion and contraction.",
    },
    {
      num: "04",
      title: "Trim & Walkthrough",
      desc: "Corner posts and trim finished out, then a final walkthrough with you.",
    },
  ],
  materials: [
    {
      title: "Double 4 & Double 5 Vinyl Panels",
      desc: "Standard clapboard-style vinyl siding profiles in a range of colors and thicknesses.",
    },
    {
      title: "Wood-Grain Textured Vinyl",
      desc: "Vinyl panels with a deeper wood-grain texture for a more natural look than smooth vinyl.",
    },
    {
      title: "Vinyl Trim & Corner Posts",
      desc: "Matching trim and corner post systems for a clean, finished edge around windows, doors, and corners.",
    },
  ],
  faqs: [
    {
      q: "How long does vinyl siding typically last?",
      a: "Quality vinyl siding, properly installed, typically lasts 20 to 40 years. Lifespan depends on product thickness, sun exposure, and installation quality — improperly nailed vinyl can warp prematurely regardless of product quality.",
    },
    {
      q: "Does vinyl siding fade over time?",
      a: "All vinyl fades somewhat with UV exposure, though darker colors historically fade more than lighter ones. Newer vinyl formulations include better UV-resistant pigments than older products, which we can discuss when selecting color.",
    },
    {
      q: "Can vinyl siding be installed in cold weather?",
      a: "Vinyl becomes more brittle in cold temperatures, so we generally avoid installation below certain temperature thresholds to prevent cracking during handling, and plan installation timing accordingly.",
    },
    {
      q: "Is vinyl siding a good choice for an older or historic home?",
      a: "It can be, especially with wood-grain textured profiles, though some historic districts have specific siding material requirements. We can help you check local guidelines before finalizing material choice.",
    },
  ],
};

export const JAMES_HARDIE_FIBER_CEMENT_SIDING_SERVICE: ServiceDetail = {
  slug: "james-hardie-fiber-cement-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "James Hardie Fiber-Cement Siding",
  metaTitle: "James Hardie Fiber-Cement Siding in Bucks County, PA",
  metaDescription:
    "Certified James Hardie fiber-cement siding installation in Bucks County, PA & South Jersey. Fire-, rot- & pest-resistant. Get a free estimate today.",
  eyebrow: "SIDING · JAMES HARDIE FIBER-CEMENT SIDING",
  heroDek:
    "Certified installs of James Hardie's fire-, rot-, and pest-resistant fiber-cement systems — siding built to outlast vinyl by decades.",
  heroImgLabel: "James Hardie fiber-cement siding — finished install",
  heroAlt: "Finished James Hardie fiber-cement siding install in Bucks County, PA",
  heroImgSrc: "/siding/1 siding/1.webp",
  introParagraphs: [
    "James Hardie fiber-cement siding is made from cement, sand, and cellulose fiber, engineered to resist the fire, rot, pest, and impact damage that both wood and vinyl siding are more vulnerable to. It holds paint significantly longer than wood, and won't warp, crack, or melt the way vinyl can under extreme heat.",
    "As James Hardie certified installers, we install their ColorPlus finished products and primed products to exact manufacturer specification — correct fastener spacing, proper flashing at joints, and specific gapping requirements that keep the product warranty intact. Hardie's warranty can be reduced or voided by incorrect installation, so certification matters here.",
    "It costs more upfront than vinyl, but for homeowners across Bucks County and South Jersey planning to stay in their home long-term, the combination of durability, curb appeal, and reduced repainting frequency makes it one of the strongest long-term value siding options available.",
  ],
  quickFacts: [
    { label: "Certification", value: "James Hardie certified" },
    { label: "Resistance", value: "Fire, rot, pests, impact" },
    { label: "Warranty", value: "30-year limited (ColorPlus)" },
  ],
  signsList: [
    "Wanting maximum durability against fire, rot, and pests",
    "Vinyl siding that's cracked, melted, or warped from heat",
    "Wood siding needing frequent repainting and repair",
    "Wanting a premium, higher-end curb appeal upgrade",
    "Living in an area with elevated wildfire or pest concern",
    "Planning to stay in your home long-term and prioritizing durability",
  ],
  processSteps: [
    {
      num: "01",
      title: "Product & Color Selection",
      desc: "Choose between Hardie's ColorPlus pre-finished panels or primed panels for custom paint.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Inspection",
      desc: "Full removal of old siding and inspection of the sheathing before certified installation begins.",
    },
    {
      num: "03",
      title: "Certified Install",
      desc: "Panels installed to James Hardie's exact spec for fastener spacing, flashing, and gapping to keep the warranty valid.",
    },
    {
      num: "04",
      title: "Warranty Registration",
      desc: "Final walkthrough and registration of your James Hardie product warranty.",
    },
  ],
  materials: [
    {
      title: "HardiePlank Lap Siding",
      desc: "James Hardie's most popular product, a traditional lap siding profile available primed or in ColorPlus finishes.",
    },
    {
      title: "HardieShingle Siding",
      desc: "Fiber-cement shingle-style siding for a classic shake look with fiber-cement durability.",
    },
    {
      title: "HardieTrim Boards",
      desc: "Matching fiber-cement trim for a cohesive, durable finish around windows, doors, and corners.",
    },
  ],
  faqs: [
    {
      q: "Why does certification matter for James Hardie installation?",
      a: "James Hardie's extended warranty coverage is contingent on installation following their exact specifications — fastener type and spacing, flashing details, and panel gapping. Improper installation by a non-certified contractor can void or reduce that warranty even if the product itself is defect-free.",
    },
    {
      q: "How does ColorPlus finish compare to painting primed Hardie board?",
      a: "ColorPlus is a factory-applied, baked-on finish that carries its own extended color warranty and generally outlasts field-applied paint. Primed boards let you choose any paint color but will need repainting sooner than ColorPlus finishes.",
    },
    {
      q: "Is fiber-cement siding heavier than vinyl, and does that matter?",
      a: "Yes, fiber-cement is significantly heavier than vinyl, which is part of why it resists wind and impact damage better. It doesn't affect most homes' structural capacity but does require correct fastening technique, which certified installation ensures.",
    },
    {
      q: "How long does James Hardie siding typically last?",
      a: "James Hardie siding is engineered for a long service life, commonly performing well for 30 to 50 years with proper installation and maintenance, backed by a 30-year limited warranty on ColorPlus products.",
    },
  ],
};

export const INSULATED_SIDING_SERVICE: ServiceDetail = {
  slug: "insulated-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Insulated Siding",
  metaTitle: "Insulated Siding Installation in Bucks County, PA",
  metaDescription:
    "Insulated siding with rigid foam backing installed in Bucks County, PA & South Jersey. Better energy efficiency, quieter home. Get a free estimate today.",
  eyebrow: "SIDING · INSULATED SIDING",
  heroDek:
    "Siding with a continuous rigid foam backing for better energy efficiency and a quieter home — noticeable comfort gains through PA & NJ winters.",
  heroImgLabel: "insulated siding — panel and foam backing detail",
  heroAlt: "Close-up of insulated siding panel with rigid foam backing",
  heroImgSrc: "/siding/4 siding/1.webp",
  introParagraphs: [
    "Insulated siding is a siding panel with a layer of rigid foam permanently laminated to its back, unlike standard siding which is installed with a separate air gap or no insulation at all. That continuous foam layer reduces thermal bridging — the heat loss that happens through wall studs even in a well-insulated home.",
    "For homeowners across Bucks County and South Jersey, this typically translates to a noticeable comfort difference in rooms with exterior walls, especially during winter, along with some reduction in heating and cooling costs. It also adds a modest amount of sound dampening, which matters on homes near busier roads.",
    "We install insulated vinyl and insulated composite systems as either a full replacement or as an upgrade during a standard siding replacement, sized and installed to maintain proper wall assembly moisture management alongside the added insulation value.",
  ],
  quickFacts: [
    { label: "Benefit", value: "Reduced thermal bridging" },
    { label: "Bonus", value: "Some sound dampening" },
    { label: "Warranty", value: "Manufacturer + workmanship" },
  ],
  signsList: [
    "Rooms near exterior walls that feel drafty or cold in winter",
    "Rising heating or cooling bills you'd like to address",
    "Wanting some sound dampening from a nearby road",
    "Planning a siding replacement and want to add insulation value",
    "An older home with minimal existing wall insulation",
    "Wanting a straighter, more even wall appearance vinyl backing can help provide",
  ],
  processSteps: [
    {
      num: "01",
      title: "Assessment & Selection",
      desc: "We review your home's current insulation and wall assembly to confirm insulated siding is a good fit.",
    },
    {
      num: "02",
      title: "Tear-Off & Prep",
      desc: "Full removal of old siding and sheathing inspection before installing the insulated system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Insulated panels installed with correct fastening to maintain the wall assembly's moisture management.",
    },
    {
      num: "04",
      title: "Trim & Walkthrough",
      desc: "Trim finished out, then a final walkthrough covering care and warranty details.",
    },
  ],
  materials: [
    {
      title: "Insulated Vinyl Siding",
      desc: "Vinyl panels with laminated rigid foam backing, combining vinyl's low maintenance with added thermal performance.",
    },
    {
      title: "Rigid Foam Insulation",
      desc: "Continuous foam backing that reduces thermal bridging at wall studs compared to standard siding installation.",
    },
    {
      title: "Moisture Management Wrap",
      desc: "Proper house wrap detailing to maintain correct wall assembly moisture control alongside the added insulation.",
    },
  ],
  faqs: [
    {
      q: "How much will insulated siding actually reduce my energy bills?",
      a: "The reduction varies by home, existing insulation levels, and climate, but most homeowners notice improved comfort more distinctly than a dramatic bill reduction. It's a meaningful upgrade, not a replacement for proper attic and wall insulation.",
    },
    {
      q: "Is insulated siding more expensive than standard siding?",
      a: "Yes, insulated siding typically costs more than standard siding of the same style due to the added foam backing material and manufacturing process. We'll price both so you can weigh the upfront cost against long-term comfort and efficiency gains.",
    },
    {
      q: "Does insulated siding require different installation than regular siding?",
      a: "Yes — proper installation needs to maintain the wall assembly's moisture management despite the added foam layer, which is a detail that matters for long-term performance and is part of why professional installation is worth it here specifically.",
    },
    {
      q: "Can insulated siding be installed over my home's existing insulation?",
      a: "It adds to your home's existing wall insulation rather than replacing it — it doesn't require removing insulation inside the wall cavity, just proper installation of the new exterior siding system.",
    },
  ],
};

export const WOOD_CEDAR_SHAKE_SIDING_SERVICE: ServiceDetail = {
  slug: "wood-cedar-shake-siding",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Wood & Cedar Shake Siding",
  metaTitle: "Wood & Cedar Shake Siding in Bucks County, PA",
  metaDescription:
    "Classic wood & cedar shake siding installation in Bucks County, PA & South Jersey. Historic-style finishes, installed to last. Get a free estimate today.",
  eyebrow: "SIDING · WOOD & CEDAR SHAKE SIDING",
  heroDek:
    "Classic and historic-style wood and cedar shake siding, installed and finished to last outdoors — the look many older Bucks County homes were built with.",
  heroImgLabel: "cedar shake siding — historic-style finish",
  heroAlt: "Cedar shake siding installed in a historic-style finish",
  heroImgSrc: "/siding/6 siding/1.webp",
  introParagraphs: [
    "Wood and cedar shake siding gives a home a natural, textured look that vinyl and fiber-cement products can approximate but not fully replicate — which matters a lot on historic homes in Bucks County and older neighborhoods where matching the original material is often a priority, sometimes a requirement.",
    "Cedar shake in particular is naturally resistant to rot and insects due to the wood's natural oils, and weathers to an attractive silver-gray patina if left unfinished, or holds a stain well if a specific color is preferred. Traditional lap wood siding offers a similar natural look in a more classic clapboard profile.",
    "Wood siding requires more ongoing maintenance than vinyl or fiber-cement — periodic staining or sealing, and closer attention to moisture at joints and corners — but for homeowners restoring a historic property or specifically wanting that natural material, it remains the right choice.",
  ],
  quickFacts: [
    { label: "Best for", value: "Historic & classic-style homes" },
    { label: "Maintenance", value: "Periodic stain & seal" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Restoring or maintaining a historic-style home",
    "Wanting cedar shake's natural rot and insect resistance",
    "A township or HOA requiring a specific historic siding material",
    "Existing wood siding that's aged but you want to keep the material",
    "Wanting a natural, textured look vinyl can't fully replicate",
    "Replacing damaged sections of existing cedar shake",
  ],
  processSteps: [
    {
      num: "01",
      title: "Style & Finish Selection",
      desc: "Choose between traditional lap wood siding and cedar shake, plus stain or natural weathering preference.",
    },
    {
      num: "02",
      title: "Tear-Off & Sheathing Check",
      desc: "Full removal of old siding and inspection of sheathing before installing the new wood system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Panels or shakes installed with proper overlap and fastening for long-term weather resistance.",
    },
    {
      num: "04",
      title: "Finishing",
      desc: "Stain or sealer applied as chosen, or left to weather naturally for cedar shake's signature patina.",
    },
  ],
  materials: [
    {
      title: "Cedar Shake Shingles",
      desc: "Naturally rot- and insect-resistant cedar shakes, ideal for historic-style and classic New England-look homes.",
    },
    {
      title: "Traditional Lap Wood Siding",
      desc: "Classic clapboard-profile wood siding in a range of species and widths.",
    },
    {
      title: "Exterior Stains & Sealers",
      desc: "Weather-rated stains and sealers to protect wood siding through Pennsylvania and New Jersey seasons.",
    },
  ],
  faqs: [
    {
      q: "Does cedar shake need to be stained, or can it weather naturally?",
      a: "Both are valid — unstained cedar shake weathers to an attractive silver-gray patina over time, while staining preserves a specific color longer. We can install for either approach depending on your preference.",
    },
    {
      q: "Is wood siding required for historic homes in Bucks County?",
      a: "Requirements vary by township and whether a home is in a designated historic district. Some districts do mandate specific materials for street-facing elevations. We can help you check local requirements before finalizing material choice.",
    },
    {
      q: "How often does wood siding need to be restained?",
      a: "Most exterior wood siding needs restaining every 3 to 5 years depending on sun exposure and finish type, with closer attention needed at joints and corners where moisture exposure is highest.",
    },
    {
      q: "How does cedar shake siding compare in cost to vinyl or fiber-cement?",
      a: "Cedar shake typically costs more than vinyl and can be comparable to or more than premium fiber-cement, reflecting both material cost and more labor-intensive installation. We'll price it directly against other options for your project.",
    },
  ],
};

export const SIDING_REPAIR_SERVICE: ServiceDetail = {
  slug: "siding-repair",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Siding Repair",
  metaTitle: "Siding Repair in Bucks County, PA",
  metaDescription:
    "Fast siding repair for cracked, loose & storm-damaged panels in Bucks County, PA & South Jersey. No full replacement needed. Get a free estimate today.",
  eyebrow: "SIDING · SIDING REPAIR",
  heroDek:
    "Targeted repair of cracked, loose, or storm-damaged panels — without a full replacement, when the rest of your siding is still doing its job.",
  heroImgLabel: "storm-damaged siding repair — panel replacement",
  heroAlt: "Repair of storm-damaged siding panels on a home exterior",
  heroImgSrc: "/siding/7 siding/1.webp",
  introParagraphs: [
    "Siding repair addresses specific damage — a section cracked by hail, panels loosened by wind, a spot damaged by a falling branch — without requiring a full replacement of siding that's otherwise still performing well.",
    "Most repair calls we get across Bucks County and South Jersey are storm-related: high wind loosening or tearing off panels, or hail cracking and denting vinyl and aluminum siding. We match replacement panels to your existing siding as closely as possible, though some color variation is normal on older siding due to sun fading.",
    "If a repair inspection reveals damage more extensive than what's visible — water intrusion behind the siding, widespread cracking across multiple elevations — we'll tell you directly and explain whether a full replacement makes more sense than continuing to patch sections.",
  ],
  quickFacts: [
    { label: "Scope", value: "Written before work starts" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Cracked or dented siding panels after a hail event",
    "Panels loosened, bent, or torn off after high wind",
    "A section of siding damaged by a falling branch or debris",
    "Gaps or loose seams letting water behind the siding",
    "Isolated rot or damage on an otherwise sound siding system",
    "Damage discovered during a home inspection or insurance review",
  ],
  processSteps: [
    {
      num: "01",
      title: "Damage Assessment",
      desc: "We inspect the damaged area and check for hidden water intrusion behind the visible damage.",
    },
    {
      num: "02",
      title: "Written Scope & Price",
      desc: "A fixed price for the specific repair needed, before any work begins.",
    },
    {
      num: "03",
      title: "Repair",
      desc: "Damaged panels replaced and matched to existing siding as closely as possible.",
    },
    {
      num: "04",
      title: "Final Check",
      desc: "We confirm the repair is properly sealed and weathertight before calling the job complete.",
    },
  ],
  materials: [
    {
      title: "Matched Panel Replacement",
      desc: "We source replacement vinyl, fiber-cement, or wood panels matched as closely as possible to your existing siding.",
    },
    {
      title: "Flashing & Sealant",
      desc: "Proper flashing and sealant at repaired joints to keep water out of the wall assembly.",
    },
    {
      title: "Fastener Hardware",
      desc: "Correct fastener type and spacing for the repaired section to hold up under wind load.",
    },
  ],
  faqs: [
    {
      q: "Can you match the repair to my existing siding color exactly?",
      a: "We source the closest available match, but some color variation is normal since siding fades with sun exposure over time — a repaired section on older siding may be slightly more vibrant than the surrounding weathered panels.",
    },
    {
      q: "How do I know if I need a repair or a full replacement?",
      a: "If damage is contained to a specific area and the rest of your siding is in good condition, repair is the right call. If we find widespread wear or hidden water damage during inspection, we'll recommend replacement and explain exactly why.",
    },
    {
      q: "Do you work with insurance on storm-damaged siding claims?",
      a: "Yes — we document storm damage and can work directly with your insurance adjuster on siding claims, similar to how we handle roofing storm damage claims.",
    },
    {
      q: "How fast can you repair storm-damaged siding?",
      a: "We prioritize storm damage and work to get a crew out as quickly as possible across Bucks County and South Jersey, especially after major storm events.",
    },
  ],
};

export const SOFFIT_FASCIA_TRIM_SERVICE: ServiceDetail = {
  slug: "soffit-fascia-trim",
  hubHref: "/siding",
  hubLabel: "Siding",
  title: "Soffit, Fascia & Trim",
  metaTitle: "Soffit, Fascia & Trim Installation in Bucks County, PA",
  metaDescription:
    "Soffit, fascia & trim replacement in Bucks County, PA & South Jersey, alongside your siding project or as a standalone job. Get a free estimate today.",
  eyebrow: "SIDING · SOFFIT, FASCIA & TRIM",
  heroDek:
    "Soffit and fascia replacement and trim work, usually completed alongside your siding project — the finishing details that keep water and pests out of the roofline.",
  heroImgLabel: "soffit and fascia — finished install",
  heroAlt: "Freshly installed soffit and fascia along a home's roofline",
  heroImgSrc: "/siding/10 siding/1.webp",
  introParagraphs: [
    "Soffit and fascia are the finishing pieces at your roofline — soffit covers the underside of the roof overhang and provides attic ventilation, while fascia is the vertical trim board that gutters attach to and that caps the roof edge. Both take direct weather exposure and are common points of rot and pest entry when damaged.",
    "We replace soffit and fascia most often as part of a siding project, since they're visually and functionally connected to the rest of the exterior, but it's also a common standalone repair when damage or wear is isolated to the roofline rather than the wall siding itself.",
    "Proper soffit ventilation actually matters beyond curb appeal — it's part of how your attic breathes, which affects moisture control and can extend your roof's lifespan by preventing trapped heat and humidity. We install vented soffit designed to work with your home's existing attic ventilation system.",
  ],
  quickFacts: [
    { label: "Often paired with", value: "Siding or roofing projects" },
    { label: "Function", value: "Attic ventilation + trim" },
    { label: "Warranty", value: "Workmanship guaranteed" },
  ],
  signsList: [
    "Rotted, sagging, or missing sections of soffit or fascia",
    "Visible daylight or gaps at the roofline from inside the attic",
    "Pests or birds entering through damaged soffit",
    "Gutters pulling away due to failing fascia board",
    "Peeling paint or water staining along the roof edge",
    "Planning a siding or roofing project and want to finish the roofline too",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection",
      desc: "We check soffit, fascia, and attic ventilation together, since they function as one system.",
    },
    {
      num: "02",
      title: "Material Selection",
      desc: "Choose vinyl, aluminum, or wood trim to match your siding and gutter system.",
    },
    {
      num: "03",
      title: "Install",
      desc: "Damaged soffit and fascia removed and replaced, maintaining or improving attic ventilation.",
    },
    {
      num: "04",
      title: "Gutter Reattachment",
      desc: "Gutters reattached to new fascia, then a final walkthrough of the completed roofline.",
    },
  ],
  materials: [
    {
      title: "Vented Vinyl Soffit",
      desc: "Low-maintenance vented soffit panels that support proper attic airflow.",
    },
    {
      title: "Aluminum Fascia Wrap",
      desc: "Durable aluminum fascia covering, resistant to the rot that affects exposed wood trim.",
    },
    {
      title: "Matching Trim Systems",
      desc: "Trim coordinated with your siding and gutter color for a cohesive finished roofline.",
    },
  ],
  faqs: [
    {
      q: "Do I need to replace soffit and fascia at the same time as my siding?",
      a: "It's not required, but since they're visually connected and often show wear at similar ages, many homeowners choose to do both together. We can also handle soffit and fascia as a completely standalone project.",
    },
    {
      q: "Why does soffit ventilation matter?",
      a: "Vented soffit is part of your attic's intake airflow system, working with ridge or gable vents to move air through the attic space. Proper ventilation helps prevent trapped heat and moisture, which can shorten roof lifespan and contribute to ice damming in winter.",
    },
    {
      q: "What causes fascia to rot?",
      a: "Fascia takes direct water exposure from the roof edge and is where gutters attach, so any gutter overflow or leak accelerates rot. Aluminum fascia wrap eliminates this vulnerability compared to exposed painted wood.",
    },
    {
      q: "Can you repair just a small damaged section of soffit or fascia?",
      a: "Yes, this is a common standalone repair. We can address a specific damaged section without requiring a full roofline replacement, provided the surrounding material is still in good condition.",
    },
  ],
};

