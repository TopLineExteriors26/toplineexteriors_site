export const BUSINESS_NAME = "TopLine Exteriors";
export const BUSINESS_LEGAL_NAME = "TopLine Exteriors LLC";
export const PHONE_DISPLAY = "(267) 555-0198";
export const PHONE_DIGITS = "2675550198";
export const EMAIL = "info@toplineexteriorsllc.com";
export const HIC_LICENSE = "PA HIC #PA000000 (placeholder)";
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
  { label: "About", href: "/" },
  { label: "Contact", href: "/#estimate" },
];

export const ROOFING_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/roofing#estimate" },
];

export const DECKS_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/decks#estimate" },
];

export const SIDING_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roofing", href: "/roofing" },
  { label: "Decks", href: "/decks" },
  { label: "Siding", href: "/siding" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/siding#estimate" },
];

export type WhyItem = {
  title: string;
  desc: string;
};

export const HOME_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured in Pennsylvania and New Jersey — verified before any crew steps on your property.",
  },
  {
    title: "Workmanship Warranty",
    desc: "Every install is backed by our own workmanship warranty, on top of manufacturer coverage.",
  },
  {
    title: "Trusted Brand Materials",
    desc: "GAF and CertainTeed roofing systems, James Hardie fiber-cement siding.",
  },
  {
    title: "Honest, Fixed-Price Estimates",
    desc: "One clear quote before work starts — no change orders, no surprise line items.",
  },
];

export const ROOFING_WHY_ITEMS: WhyItem[] = [
  {
    title: "Licensed & Insured",
    desc: "Fully licensed and insured across PA and NJ.",
  },
  {
    title: "GAF & CertainTeed Certified",
    desc: "Manufacturer-certified installs that keep warranties intact.",
  },
  {
    title: "Lifetime Workmanship Warranty",
    desc: "Our own crews, backed by a warranty on the labor itself.",
  },
  {
    title: "Storm & Insurance Claims",
    desc: "We work directly with your adjuster from inspection to sign-off.",
  },
];

export type ServiceCard = {
  num: string;
  title: string;
  href: string;
  imgLabel: string;
  desc: string;
  bullets: string[];
};

export const SERVICES: ServiceCard[] = [
  {
    num: "01",
    title: "Roofing",
    href: "/roofing",
    imgLabel: "roof replacement — in progress",
    desc: "Roof replacement, repair, and inspections built around real Pennsylvania winters.",
    bullets: [
      "GAF & CertainTeed certified systems",
      "Storm damage & insurance claims",
      "Lifetime workmanship warranty",
    ],
  },
  {
    num: "02",
    title: "Decks",
    href: "/decks",
    imgLabel: "composite deck build",
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
    desc: "A walkthrough and a written quote, usually within 48 hours.",
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
  { value: "15+", label: "Years serving the region" },
  { value: "500+", label: "Roofs, decks & siding jobs" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export const ROOFING_STATS: Stat[] = [
  { value: "15+", label: "Years serving the region" },
  { value: "500+", label: "Roofs completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export type TrustBadge = {
  value: string;
  label: string;
};

export const TRUST_BADGES: TrustBadge[] = [
  { value: "4.9★ / 180+ Reviews", label: "Average Google rating" },
  { value: "15+ Years", label: "Serving Bucks County & South Jersey" },
  { value: "Licensed & Insured", label: "PA & NJ compliant, every job" },
];

export type Project = {
  label: string;
  colSpan: number;
  rowSpan: number;
  slug?: string;
};

export const PROJECTS: Project[] = [
  { label: "Roof replacement — Yardley, PA", colSpan: 2, rowSpan: 2 },
  { label: "Composite deck — Newtown, PA", colSpan: 2, rowSpan: 1 },
  { label: "Siding replacement — Cherry Hill, NJ", colSpan: 2, rowSpan: 1 },
  {
    label: "Storm damage repair — Bristol, PA",
    colSpan: 1,
    rowSpan: 1,
    slug: "storm-damage-repair-bristol-pa",
  },
  { label: "Deck staining — Levittown, PA", colSpan: 1, rowSpan: 1 },
  { label: "Fiber-cement siding — Doylestown, PA", colSpan: 2, rowSpan: 1 },
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
    text: "Our old vinyl was falling apart. TopLine tore it off and put up James Hardie siding — the house looks brand new.",
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
    text: "Hail damage claim handled start to finish — they dealt with the adjuster directly and the new roof looks great.",
  },
  {
    name: "Tom P.",
    meta: "Roof Repair — Doylestown, PA",
    stars: "★★★★★",
    text: "Found and fixed a leak two other companies missed. Fair price, clear explanation of what was actually wrong.",
  },
  {
    name: "Karen W.",
    meta: "Roof Replacement — Trenton, NJ",
    stars: "★★★★★",
    text: "On budget and ahead of schedule. They walked us through every material choice before ordering anything.",
  },
  {
    name: "Rob D.",
    meta: "Gutter Install — Newtown, PA",
    stars: "★★★★★",
    text: "Added gutter guards after our roof job — seamless coordination, one crew, one invoice.",
  },
  {
    name: "Lisa M.",
    meta: "Storm Damage — Cherry Hill, NJ",
    stars: "★★★★★",
    text: "Insurance claim was a breeze once TopLine got involved. Roof looks better than before the storm.",
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
    a: "Most single-family roof replacements are completed in one to three days, weather permitting, with cleanup the same day.",
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
    a: "Most single-family roof replacements are completed in one to three days, weather permitting, with cleanup the same day.",
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
};

export const ROOFING_GALLERY: GalleryImage[] = [
  {
    label: "full tear-off roof replacement — Bucks County, PA",
    alt: "Full tear-off roof replacement in progress in Bucks County, PA",
  },
  {
    label: "new GAF architectural shingles — ridge detail",
    alt: "Close-up of new GAF architectural shingles along the roof ridge",
  },
  {
    label: "chimney flashing replacement",
    alt: "New step and counter-flashing installed around a chimney",
  },
  {
    label: "standing-seam metal roof install",
    alt: "Standing-seam metal roofing panels installed on a residential home",
  },
  {
    label: "storm damage repair — before and after",
    alt: "Before and after photos of a storm-damaged roof repair",
  },
  {
    label: "seamless gutters — fresh install",
    alt: "Newly installed seamless gutters along a roofline",
  },
  {
    label: "completed roof replacement — finished exterior",
    alt: "Completed roof replacement on a home in Bucks County, PA",
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
  },
  {
    title: "Permits Handled For You",
    desc: "We pull the required permits and schedule inspections, so your deck is built to code from day one.",
  },
  {
    title: "Composite & Premium Wood",
    desc: "Trex, TimberTech, cedar, pressure-treated, and exotic hardwoods — we build in the material you want.",
  },
  {
    title: "Built to Hold Structural Weight",
    desc: "Framing, footings, and ledger attachment engineered for real load — hot tubs, furniture, and crowds included.",
  },
];

export const DECKS_STATS: Stat[] = [
  { value: "15+", label: "Years serving the region" },
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
  {
    name: "Vince A.",
    meta: "Custom Deck & Railing — Yardley, PA",
    stars: "★★★★★",
    text: "Designed around our pool and built a cable railing system that looks incredible. Crew was meticulous.",
  },
  {
    name: "Monica R.",
    meta: "Deck Repair — Bristol, PA",
    stars: "★★★★★",
    text: "Found rotted joists our home inspector missed and fixed them properly instead of just patching boards.",
  },
  {
    name: "Ed K.",
    meta: "Wood Fence — Cherry Hill, NJ",
    stars: "★★★★★",
    text: "Fair quote, showed up when they said they would, and the fence line is razor straight along our whole property.",
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
  },
  {
    label: "deck framing — structural build in progress",
    alt: "Deck framing and joist structure during construction",
  },
  {
    label: "cable railing system — install detail",
    alt: "Close-up of a cable railing system installed on a deck",
  },
  {
    label: "wood deck restoration — before and after",
    alt: "Before and after photos of a wood deck restoration",
  },
  {
    label: "privacy fencing — freshly installed",
    alt: "Newly installed wood privacy fencing along a property line",
  },
  {
    label: "ipe hardwood decking — finished surface",
    alt: "Finished ipe hardwood decking surface detail",
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
  },
  {
    title: "James Hardie Certified",
    desc: "Manufacturer-certified fiber-cement installs that keep the product warranty intact from day one.",
  },
  {
    title: "Full Tear-Off, Not Overlay",
    desc: "We remove old siding down to the sheathing to check for rot and water damage before anything new goes up.",
  },
  {
    title: "Honest, Fixed-Price Estimates",
    desc: "One clear quote before work starts — no change orders once your crew is on-site.",
  },
];

export const SIDING_STATS: Stat[] = [
  { value: "15+", label: "Years serving the region" },
  { value: "400+", label: "Siding projects completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "10+", label: "Communities served" },
];

export const SIDING_REVIEWS: Review[] = [
  {
    name: "Carlos M.",
    meta: "Fiber-Cement Siding — Cherry Hill, NJ",
    stars: "★★★★★",
    text: "Our old vinyl was falling apart. TopLine tore it off and put up James Hardie siding — the house looks brand new.",
  },
  {
    name: "Renee P.",
    meta: "Vinyl Siding Replacement — Levittown, PA",
    stars: "★★★★★",
    text: "Found soft sheathing behind our old siding during tear-off and fixed it before wrapping — glad they checked.",
  },
  {
    name: "Anthony D.",
    meta: "Insulated Siding — Newtown, PA",
    stars: "★★★★★",
    text: "Noticeable difference in the upstairs bedrooms this winter. Install was clean and fast, crew was respectful of the property.",
  },
  {
    name: "Barbara S.",
    meta: "Cedar Shake Siding — Doylestown, PA",
    stars: "★★★★★",
    text: "Wanted a historic look for our older home and they matched it perfectly. Compliments from neighbors constantly.",
  },
  {
    name: "Jim F.",
    meta: "Siding Repair — Trenton, NJ",
    stars: "★★★★★",
    text: "Storm knocked loose a whole section and they patched it to match seamlessly within a week of calling.",
  },
  {
    name: "Wendy C.",
    meta: "Soffit & Fascia — Bristol, PA",
    stars: "★★★★★",
    text: "Did our full soffit and fascia alongside the siding job — one invoice, one crew, no coordination headaches.",
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
  },
  {
    label: "full tear-off siding replacement — in progress",
    alt: "Full tear-off siding replacement in progress on a residential home",
  },
  {
    label: "insulated siding — panel and foam backing detail",
    alt: "Close-up of insulated siding panel with rigid foam backing",
  },
  {
    label: "cedar shake siding — historic-style finish",
    alt: "Cedar shake siding installed in a historic-style finish",
  },
  {
    label: "storm-damaged siding repair — panel replacement",
    alt: "Repair of storm-damaged siding panels on a home exterior",
  },
  {
    label: "soffit and fascia — fresh trim work",
    alt: "Newly installed soffit and fascia trim along a roofline",
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

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  serviceLabel: string;
  serviceHref: string;
  location: string;
  heroImgLabel: string;
  heroAlt: string;
  facts: ProjectFact[];
  summary: string;
  bodyParagraphs: string[];
  galleryImages: { label: string; alt: string }[];
  review: Review;
};

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    slug: "storm-damage-repair-bristol-pa",
    title: "Storm Damage Roof Repair in Bristol, PA",
    metaTitle: "Storm Damage Roof Repair — Bristol, PA | TopLine Exteriors",
    metaDescription:
      "See how TopLine Exteriors repaired hail and wind damage on an asphalt shingle roof in Bristol, PA — full inspection, insurance claim support, and same-week repair.",
    serviceLabel: "Roof Inspections & Storm Damage",
    serviceHref: "/roofing#subservices",
    location: "Bristol, PA",
    heroImgLabel: "storm-damaged roof before repair — Bristol, PA",
    heroAlt: "Storm-damaged asphalt shingle roof before repair in Bristol, PA",
    facts: [
      { label: "Service", value: "Storm Damage Repair" },
      { label: "Location", value: "Bristol, PA" },
      { label: "Roof Type", value: "Asphalt Shingle" },
      { label: "Timeline", value: "5 days, start to finish" },
      { label: "Insurance Claim", value: "Yes — full adjuster coordination" },
    ],
    summary:
      "After a spring hailstorm tore through Bucks County, this Bristol homeowner found dozens of cracked and missing shingles along with a soft spot near the chimney flashing. We handled the full inspection, documented the damage for their insurance adjuster, and completed the repair within a week of the initial call.",
    bodyParagraphs: [
      "The homeowner called us within a day of the storm after noticing granules collecting in their gutters and a stain forming on their living room ceiling. Our first step was a full roof inspection — walking the entire surface, checking every slope, and photographing every point of impact damage, not just the obvious ones near the leak.",
      "We documented over 40 individual hail strikes across the south-facing slope, plus wind-lifted shingles along the ridge line and compromised flashing around the chimney — the actual source of the interior leak. That full photo report went directly to the homeowner's insurance adjuster, which is often the difference between a claim getting approved in full versus partially denied.",
      "Once the claim was approved, we replaced the damaged shingles with matching GAF architectural shingles, re-flashed the chimney with new step flashing and counter-flashing, and sealed every penetration point. The whole repair — from first inspection to final walkthrough — was completed in five days, well ahead of the next forecasted rain.",
      "This is the same process we run for every storm-damage call: full inspection first, complete documentation for the adjuster, then a repair that actually fixes the root cause instead of just patching the visible symptoms.",
    ],
    galleryImages: [
      {
        label: "hail impact damage — close-up, south slope",
        alt: "Close-up of hail impact damage on asphalt shingles in Bristol, PA",
      },
      {
        label: "chimney flashing before repair",
        alt: "Deteriorated chimney flashing before repair in Bristol, PA",
      },
      {
        label: "shingle replacement in progress",
        alt: "Crew replacing storm-damaged shingles in Bristol, PA",
      },
      {
        label: "completed repair — south slope",
        alt: "Completed storm damage roof repair in Bristol, PA",
      },
    ],
    review: {
      name: "Sandra K.",
      meta: "Storm Damage — Bristol, PA",
      stars: "★★★★★",
      text: "Hail damage claim handled start to finish — they dealt with the adjuster directly and the new roof looks great.",
    },
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
  introParagraphs: string[];
  signsList: string[];
  processSteps: ProcessStep[];
  materials: { title: string; desc: string }[];
  faqs: Faq[];
  relatedServices: SubService[];
};

export const ROOF_REPLACEMENT_SERVICE: ServiceDetail = {
  slug: "roof-replacement",
  hubHref: "/roofing",
  hubLabel: "Roofing",
  title: "Roof Replacement",
  metaTitle: "Roof Replacement in Bucks County, PA | TopLine Exteriors",
  metaDescription:
    "Full tear-off roof replacement with GAF & CertainTeed systems in Bucks County, PA & South Jersey. Lifetime workmanship warranty. Get a free estimate today.",
  eyebrow: "ROOFING · ROOF REPLACEMENT",
  heroDek:
    "A full tear-off and replacement, built for real Pennsylvania and New Jersey winters — installed by our own crews, backed by a lifetime workmanship warranty.",
  heroImgLabel: "completed roof replacement — full tear-off",
  heroAlt: "Completed full tear-off roof replacement in Bucks County, PA",
  introParagraphs: [
    "A roof replacement is a full tear-off of your existing roofing system down to the decking, followed by a new installation from the ground up — new underlayment, flashing, and shingles or metal panels, installed to current code and manufacturer specification.",
    "It's a different job from a repair. A repair fixes a specific leak or damaged section; a replacement addresses the whole roof at once, which makes sense once a roof is past its expected lifespan, has widespread wear across multiple slopes, or has been damaged badly enough that patchwork repairs would only buy a year or two.",
    "We install GAF and CertainTeed shingle systems as manufacturer-certified installers, which means the material warranty stays fully intact — something that isn't guaranteed if a roof is installed by a non-certified contractor. Every replacement is also backed by our own workmanship warranty on top of that manufacturer coverage.",
  ],
  signsList: [
    "Shingles curling, cracking, or losing granules across large sections of the roof",
    "A roof that's 20+ years old (25+ for architectural shingles) and showing its age",
    "Daylight visible through the roof deck from inside the attic",
    "Multiple past repairs that haven't resolved recurring leaks",
    "Sagging rooflines or soft spots when walked on",
  ],
  processSteps: [
    {
      num: "01",
      title: "Inspection & Estimate",
      desc: "We inspect the full roof and decking, then provide a written, fixed-price quote — usually within 48 hours.",
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
      a: "Most single-family roof replacements are completed in one to three days, weather permitting, with full cleanup the same day work finishes.",
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
  relatedServices: [
    {
      num: "02",
      title: "Roof Repair",
      desc: "Leaks, flashing, and damaged shingles fixed fast, with a clear written scope.",
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
  ],
};
