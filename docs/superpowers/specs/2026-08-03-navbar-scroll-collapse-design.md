# Navbar scroll-collapse design

## Goal

On desktop (`xl:` breakpoint and up), when the user scrolls down, the sticky
header shrinks into a smaller, pill-shaped ("floating island") bar with
margin on all sides, instead of staying a full-width bar flush with the top
of the viewport. Scrolling back to the top restores the normal full-width
header.

Mobile/tablet (`<xl`) header is unaffected — it keeps its current look at
all scroll positions.

## Behavior

- **Trigger threshold**: `window.scrollY > 24` triggers the compact state.
  Triggers early/immediately at the start of scrolling.
- **Shrink amount**: noticeable — roughly 30-40% reduction in vertical
  padding/height, not just a subtle nudge.
- **Width**: capsule shrinks to fit its content (logo + nav + phone + CTA),
  centered, rather than staying full content-width with side margins.
- **Content**: logo, nav links, phone number, and the Free Estimate button
  all remain visible and unchanged in the compact state — nothing gets
  hidden or replaced with an icon-only version.
- **Scope**: `xl:` breakpoint and above only. Below `xl`, the header (and
  its existing mobile hamburger menu) is untouched by this feature.
- **Transition**: animated with a CSS transition (300ms ease-out), matching
  the existing transition timing used elsewhere in the header (hover pill,
  active underline).

## Implementation approach

### Scroll state

Add `isScrolled` boolean state to `Header.tsx`:

```ts
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  let ticking = false;
  const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 24);
      ticking = false;
    });
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // set initial state (e.g. on reload mid-scroll)
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

rAF-throttled to avoid firing state updates on every scroll event.

### Markup / styling changes

Current structure:

```tsx
<header className="sticky top-0 z-40 bg-paper">
  <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:px-10">
    ...
  </div>
  ...
</header>
```

New structure — outer `<header>` gets the "floating" margin, inner `<div>`
becomes the pill:

```tsx
<header
  className={cn(
    "sticky top-0 z-40 transition-[padding] duration-300 ease-out",
    isScrolled ? "xl:px-4 xl:pt-3" : ""
  )}
>
  <div
    className={cn(
      "mx-auto flex items-center justify-between gap-4 bg-paper transition-all duration-300 ease-out",
      isScrolled
        ? "xl:w-fit xl:rounded-full xl:px-6 xl:py-1.5 xl:shadow-card"
        : "w-full max-w-[1440px] px-5 py-2 sm:px-8 lg:px-10"
    )}
  >
    ...
  </div>
  ...
</header>
```

Key points:
- Below `xl`, none of the `isScrolled`-driven classes apply (all gated with
  the `xl:` prefix), so mobile/tablet rendering is identical to today.
- `w-fit` + `mx-auto` on the inner div makes the capsule shrink to hug its
  content once scrolled, matching the "wraps the content" requirement.
- `rounded-full` gives the oval/pill shape.
- `shadow-card` (existing shadow token used elsewhere, e.g. dropdown panel)
  gives the floating capsule visual separation from page content behind it.
- Padding values (`px-6 py-1.5` compact vs `px-5/8/10 py-2` normal) reduce
  vertical size by roughly a third, per the "noticeable" shrink requirement.
- `bg-paper` moves from the `<header>` to the inner `<div>` so the outer
  header's margin area (visible once padded on scroll) doesn't paint a
  background — only the pill itself does.

### Known CSS limitation

Animating between `width: 100%` (well, `max-w-[1440px] w-full`) and
`width: fit-content` is not smoothly interpolable by CSS transitions —
the width itself will snap rather than tween. Padding, border-radius, and
box-shadow will transition smoothly, which is sufficient to read as an
intentional "shrink" animation even though the outer width snaps. This is
an accepted trade-off, not a bug to fix.

### Nav hover/active indicator

No changes needed. The hover pill and active underline in the `<nav>` are
positioned via `getBoundingClientRect()` relative to `navRef` (see prior
fix), which stays correct regardless of the outer capsule's padding/width
changes, since it re-measures on every hover/route change.

## Out of scope

- Mobile/tablet (`<xl`) header — no changes.
- Changing logo size, nav font size, or hiding any header content while
  scrolled.
- Debouncing/IntersectionObserver — a single rAF-throttled scroll listener
  is sufficient for one threshold check.
