# Handoff: TopLine Exteriors — Marketing Site (Landing + Roofing Service Page)

## Overview
Marketing website for TopLine Exteriors, a roofing/decks/siding contractor serving Bucks County PA, Philadelphia, and South Jersey. Two pages are designed so far:
1. **Home / Landing page** — full company overview, all three services (Roofing, Decks, Siding).
2. **Roofing service hub** — a dedicated landing page for the Roofing trade specifically (the pattern to repeat for Decks and Siding hub pages later).

Goal of the real build: a fast, SEO-strong, lead-generating site (the estimate form is the primary conversion goal on every page).

## About the Design Files
The files in `reference/` (`TopLine Landing.dc.html`, `TopLine Roofing Hub.dc.html`) are **design references built in an internal HTML prototyping tool** — they show the exact intended look, copy, spacing, and interactions. They are **not production code** — don't copy the markup as-is (it uses a proprietary templating syntax `{{ }}` and custom tags like `<sc-for>` that only work in that tool). Your job is to **recreate this design pixel-for-pixel in a real, production framework**.

**Recommended stack** (choose based on your team's preference, no existing codebase to match yet):
- **Next.js (React) + TypeScript**, static-generated (SSG) pages — best fit here because of the strong SEO requirement (see below), fast page loads, and easy per-service-page templating (Roofing/Decks/Siding hubs share one layout).
- Tailwind CSS or plain CSS Modules for styling — either works; just carry over the exact design tokens below.
- Deploy target: Vercel, Netlify, or any static host — this site has no backend requirements besides the lead form submission (see Forms section).

## Fidelity
**High-fidelity.** Treat colors, type, spacing, and copy as final unless the user tells you otherwise. Recreate pixel-perfectly, then the user will iterate from there.

## SEO Requirements (important — this is a local-service lead-gen site)
This is the top priority alongside visual fidelity. Implement all of the following:

1. **Per-page metadata**: unique `<title>` and `<meta name="description">` per page. Suggested:
   - Landing: `TopLine Exteriors | Roofing, Decks & Siding — Bucks County, PA & South Jersey` — description mentioning licensed/insured, 15+ years, service area.
   - Roofing hub: `Roof Replacement & Repair in Bucks County, PA | TopLine Exteriors` — description mentioning GAF/CertainTeed, storm damage claims, service area.
2. **One `<h1>` per page** — currently the hero headline. Do not duplicate `<h1>` elsewhere; section titles ("Why TopLine", "Our Services", etc.) should be `<h2>`, sub-service/step/FAQ titles `<h3>`.
3. **Semantic HTML**: use `<nav>`, `<header>`, `<main>`, `<section>` per content block, `<footer>`, real `<button>`/`<a>` elements (the prototype uses generic divs in places for the templating tool's constraints — don't carry that over).
4. **Local SEO / structured data (JSON-LD)**:
   - `LocalBusiness` / `RoofingContractor` schema on every page (name, address area served, phone, priceRange, aggregateRating if using real review counts).
   - `FAQPage` schema wrapping each page's FAQ section (both pages have one) — this is a big win for rich snippets.
   - `BreadcrumbList` schema on the Roofing hub (it already has a visual breadcrumb: Home / Roofing).
5. **Service-area landing pages**: the `cities` list (Levittown, Bristol, Newtown, Yardley, Doylestown, Langhorne, Philadelphia, Cherry Hill, Trenton, Camden) is a strong signal the client wants to rank in each town. Consider dynamic `/service-area/[city]` pages later — flag this to the user as a follow-up, don't build speculatively.
6. **Image SEO**: every placeholder image slot (see Assets section) needs descriptive `alt` text once real photos are dropped in (e.g. `alt="Completed asphalt shingle roof replacement in Yardley, PA"`), not generic `alt="hero image"`.
7. **Performance**: this is a marketing site — prioritize Core Web Vitals. Use `next/image` (or equivalent) once real photos replace placeholders, lazy-load below-the-fold sections, keep the Google Fonts request minimal (see Fonts below), avoid layout shift on the review carousel.
8. **Canonical URLs + sitemap.xml + robots.txt** — standard but easy to forget; include them.
9. **NAP consistency** (Name/Address/Phone): phone number and business name must be byte-identical across header, footer, and JSON-LD on every page.

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--ink` / `--text` | `#1B2A45` (dark navy) | Body text, headings, dark section backgrounds (stats bar, footer) |
| `--accent` | `#E2661B` (burnt orange) | CTAs, links, numerals, icons, active states — the ONE brand accent color |
| `--paper` | `#FFFFFF` | Primary background / card background |
| `--paper2` | `#F7F4EF` (warm off-white) | Secondary surface (e.g. "why" icon circle bg, hero image placeholder bg) |
| `--altBg` | `linear-gradient(180deg, rgba(226,102,27,.07), rgba(226,102,27,.03))` | Alternating section background — a very subtle orange-tinted wash, NOT a strong gradient. Used to break up all-white sections without introducing a second solid color. |
| `--line` | `rgba(27,42,69,.13)` | All borders and dividers |
| `--muted` | `rgba(27,42,69,.6)` | Secondary/supporting text |
| Radius | `14px` | All cards, images, inputs (`calc(14px / 2)` = 7px on inputs specifically) |
| Pill radius | `999px` | All buttons and chip/tag elements |
| Shadow | `0 10px 28px rgba(27,42,69,.09)` | All elevated cards (subtle, don't push it darker) |
| CTA shadow | `0 10px 22px rgba(226,102,27,.28)` | Primary accent CTA buttons only |

**Background rhythm**: sections alternate `paper` (white) → `altBg` (tinted wash) → `ink` (dark, stats bar only) → `paper` → `altBg` → `paper`, and so on. **`altBg` must never appear on two consecutive sections** — that reads as "everything is orange" (this was an explicit fix already made once). White is the dominant background; the gradient wash is only an occasional accent between white sections.

### Typography
- **Headings font**: `Barlow Condensed`, weights 600/700, uppercase applied via CSS on section eyebrows/titles (NOT on the main `<h1>` hero headline — that stays sentence case).
- **Body font**: `Barlow`, weights 400/500/600.
- Load via Google Fonts: `family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600`.
- Type scale actually used: 52px (h1) / 40px (stat figures) / 34px (section h2) / 32px (section h2, roofing hub — slightly smaller because that page's container/content is a touch denser) / 28px (accent numeral in review star) / 24px (logo) / 22px/18px/17px/16px (card titles) / 15px/14px/13px/12px (body/labels) / 11px (mono placeholder labels).
- Eyebrow labels (e.g. "WHY TOPLINE EXTERIORS", "OUR SERVICES") are always: 12–13px, bold, accent color, `letter-spacing: .12em–.14em`, uppercase.

### Buttons
- Primary: accent-filled pill, white text, bold 15px, `16px 28px` padding, orange-tinted shadow.
- Secondary: transparent pill, 1px `--line` border, text color, same padding/weight.
- Both share identical padding/radius/font-weight — only fill + border differ.

## Screens / Views

### 1. Landing Page (Home)
**Purpose**: company-wide overview; primary SEO target for brand + "roofing decks siding [region]" queries; routes visitors to the estimate form or to a specific service hub.

Section-by-section (in order), each `max-width: 1240px`, centered, `32px` side padding unless noted:

1. **Sticky Nav** — logo ("TopLine" navy + "Exteriors" accent, tracked-out uppercase) left; 6 text links center (Home, Roofing→roofing hub, Decks→#services, Siding→#services, About, Contact→#estimate); phone number + "Free Estimate" pill button right. White bg, bottom border.
2. **Hero** — 2-col grid (1.1fr/1fr). Left: eyebrow ("BUCKS COUNTY, PA · SOUTH JERSEY · GREATER PHILADELPHIA"), h1 (52px, sentence case), supporting paragraph (18px, muted, max 500px), two CTA buttons. Right: 4:3 image placeholder card + an overlapping floating rating badge card (bottom-left, offset -20px/-20px, "4.9★ / 180+ Google Reviews").
3. **Trust badges row** — 3-col grid of white cards (checkmark icon in accent circle + bold stat + muted label): rating, years in business, licensed & insured. Sits directly under hero, still on white bg.
4. **Why TopLine** — centered eyebrow + h2 statement (max 640px), then 4-col grid of centered cards: icon circle (paper2 bg, small accent square inside) + bold title + muted description.
5. **Services (3 cards)** — id="services". Eyebrow + h2 ("Three trades. One crew..."). 3-col grid: each card = 4px accent top bar, 16:10 image placeholder, then padding block with numeral (01/02/03), title, description, 3 bullet lines (each with top border + em-dash), "Explore [X] →" link.
6. **How It Works** — altBg background. Eyebrow + h2. 4-col grid of simple white cards: numeral (accent, 13px) → title → description. (No connecting line/circles — keep this flat and simple.)
7. **Stats bar** — full-bleed dark `--ink` background, white text, 4-col grid, centered: big accent numeral (40px) + label.
8. **Recent Projects** — id="projects". Eyebrow + h2. Asymmetric photo-grid gallery (masonry-style via `grid-column`/`grid-row` spans) — 6 placeholder tiles of varying sizes with a caption chip in the bottom-left corner of each.
9. **Reviews carousel** — altBg background. Eyebrow + h2. Sliding carousel, one review card visible per "page" at 3-per-view (33.33% width each), prev/next circular arrow buttons on either side, dot indicators below. Cards: star row (accent), quote, name (bold), meta (muted).
10. **Service Area** — 2-col grid: left = eyebrow, h2, paragraph, wrapped pill-tag list of served cities; right = map placeholder (4:3).
11. **FAQ** — altBg background, narrower `max-width: 1000px` container. Eyebrow + h2, centered. 2-column grid of white accordion cards (border+shadow), each with question + circular +/− toggle button (accent outline → accent fill when open), answer revealed below a divider when open. If the FAQ count is odd, the last item spans both columns full-width.
12. **Estimate form** — id="estimate", `max-width: 900px`. Eyebrow + h2, centered. White bordered card: service-type toggle chips (Roofing/Decks/Siding — pill buttons, active = accent fill), 2-col grid of 4 text inputs (name/phone/email/address), full-width textarea, full-width accent submit pill button.
13. **Footer** — dark `--ink` background. 4-col grid: brand + phone/email/service-area blurb; Services list; Service Area (top 5 cities) list; Company links (About/Contact/Privacy). Bottom bar: copyright + HIC license placeholder text, and a "Draft — Stage 1" tag (**remove this "Draft" tag before/at launch** — it's a prototype-stage marker only).

### 2. Roofing Service Hub
**Purpose**: SEO-targeted landing page for the Roofing trade specifically (template to duplicate for `/decks` and `/siding` later). Same visual system as the landing page, adapted content.

Differences from the Landing page (everything else — nav, footer structure, stats, tokens — is identical, reuse the same components):
1. **Nav**: logo is a link back home; the "Roofing" nav item is highlighted in accent color (active-page indicator) instead of navy — replicate this active-state pattern once real routing exists.
2. **Breadcrumb** bar under nav: "Home / Roofing" (Home links out, current page plain text). Use real `BreadcrumbList` schema here.
3. **Hero**: no eyebrow region/badges row below it (goes straight from hero into Why); h1 is roofing-specific, sentence case (no uppercase — matches Landing's h1 casing, this was a bug fixed once, don't reintroduce uppercase transform on hero h1).
4. **Why section**: same 4-card layout as Landing, roofing-specific copy (Licensed & Insured / GAF & CertainTeed Certified / Lifetime Workmanship Warranty / Storm & Insurance Claims).
5. **Sub-services list** (replaces the Landing's 3-card Services grid) — id="subservices". A denser single-column list of all 7 roofing sub-services (Roof Replacement, Roof Repair, Asphalt Shingle Roofing, Metal Roofing, Flat/Low-Slope Roofing, Roof Inspections & Storm Damage, Gutters & Gutter Guards). Each row: large faded numeral (32px accent, 30% opacity) + title + description + "Learn more →" link, rows separated by 1px hairlines (achieved via a background-color gap trick — in real code just use `border-bottom`).
6. **How It Works / Stats**: identical to Landing (same 4-step process content, same numbers) — reuse verbatim, don't fork this content per service page.
7. **Reviews**: 6 roofing-specific reviews, paginated 3-per-page (2 pages) rather than Landing's continuous 3-of-N slide — same card styling, same arrow/dot controls. Auto-advances every 6s (Landing's carousel does not auto-advance — user-controlled only). **This section sits on a plain white background** (not altBg) because the section immediately before it (How It Works) is already altBg — keep the alternation rule (see Design Tokens) when you add Decks/Siding hubs.
8. **FAQ**: same accordion card design as Landing, roofing-specific Q&A, same odd-count-spans-full-width rule.
9. **Estimate form**: same card design as Landing but **no service-type toggle chips** (this page is roofing-specific already) and narrower container (`max-width: 800px` vs Landing's 900px) — 4 inputs + textarea + submit, copy says "roofing estimate"/"roofing issue".
10. **Footer**: 3 columns instead of Landing's 4 (no separate Service Area column here — merge that info into the brand blurb instead, as shown) — lists the 7 roofing sub-services instead of the 3 top-level trades.

## Interactions & Behavior
- **Review carousels**: horizontal slide via CSS transform `translateX`, `transition: transform .4s ease` (Landing) or `.5s cubic-bezier(.65,0,.35,1)` (Roofing hub) — either easing is acceptable, just keep it smooth. Dots are clickable (jump to index); Roofing hub adds prev/next arrow buttons and a 6-second auto-advance timer (pause-on-hover / pause-on-interaction is a nice enhancement to add, not in the current prototype).
- **FAQ accordions**: single-open-at-a-time (opening one closes any other), toggle icon flips between `+` and `–`, icon button fills solid accent when open.
- **Estimate form service chips** (Landing only): single-select pill toggle, purely visual state for now — no real logic wired up in the prototype. Wire this to actually pre-fill/tag the lead submission with the selected service.
- **Nav "active page" state** (Roofing hub): the current section's nav link renders in accent color instead of muted navy — implement as a real active-route check once routing exists.
- No hover states are explicitly specified in the prototype beyond default browser link behavior — use your framework's standard interactive states (slight opacity/brightness shift on buttons, underline or color shift on text links) consistent with the accent color.

## Forms
Both pages have a lead-gen form (name, phone, email, property address, project description, plus a service-type selector on the Landing page only). **No backend is implemented in the prototype.** Wire this to whatever the client uses (a CRM webhook, email service, Zapier, etc.) — ask the user which one before building, this determines the form submission implementation.

## Assets
Every image in both pages is currently a **placeholder** — a diagonal-striped gray pattern (`repeating-linear-gradient(135deg, rgba(0,0,0,.05) 0 10-12px, rgba(0,0,0,.02) 10-12px 20-24px)`) with a monospace caption describing what real photo belongs there. Full list of image slots to fill with real photography before launch:
- Landing hero: "finished roof + home exterior"
- Landing services grid (×3): "roof replacement — in progress", "composite deck build", "fiber-cement siding install"
- Landing recent projects gallery (×6): captions describe specific completed jobs by town (see file for exact list)
- Landing service-area map: a real map graphic/embed
- Roofing hub hero: "finished roof replacement"

The floating "4.9★ / 180+ Google Reviews" badge and all review content/star counts are **placeholder — replace with real Google review data** before launch (both files literally say "Placeholder reviews — swap in real ones before launch" in the copy).

The checkmark icon (trust badges) is a simple inline SVG checkmark path — trivial to recreate directly in code, no asset needed.

## Files
- `reference/TopLine Landing.dc.html` — full source for the Landing page design (proprietary template syntax — read for exact copy/measurements, do not execute or copy markup directly).
- `reference/TopLine Roofing Hub.dc.html` — full source for the Roofing hub design, same caveat.
