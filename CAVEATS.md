# Known caveats & follow-ups

Running list of fidelity gaps and polish items to revisit. Add to this as new issues come up.

## Typography

- **Awesome Serif fallback** → currently rendering all serif headings ("Hello! I'm Katherine", "Experience", "Snapshots of my life", project case-study heads) in **Instrument Serif**. Awesome Serif is a paid foundry typeface not on Google Fonts. To use the real face, drop a `.woff2` into `public/fonts/` and wire via `next/font/local`.

## Home page (`/`)

- **Collage positioning** uses fixed pixel offsets matching Figma's 1440 frame inside `overflow-hidden`. Pixel-perfect at ≥1440px viewport; crops on the right below that. Switch to percentages or grid-based layout for proper responsiveness.
- **Polaroid positions** are derived from Figma's flex-center wrappers — close but not pixel-exact. Visual fidelity is approximate.
- **Polaroid 0 image crop** is hand-tuned (`width: 180%, height: 180%, left: -3%, top: -25%`) because Figma exported garbled negative-percentage values for that one image. If the source photo changes, the crop will need re-tuning.
- **Polaroid hover groups** — each polaroid + its decorative stickers are wrapped together in a `PolaroidGroup` (the wrapper sits at the Figma group's bbox). The whole group's contents share one scaling div (`group-hover:scale-[1.15]`) so the polaroid and stickers scale **together** on hover (paperclip + sticker-13 scale with polaroid-4, sale-sticker + sticker-17 + sticker-12 scale with polaroid-1, sticker-near-5 with polaroid-5, sticker-16 with polaroid-3). The tooltip is a sibling of the scaling div, so it stays at fixed size and only fades in. Backdrop-blur is `20px` (Figma uses `50px` + `mix-blend-soft-light`; the blend mode was dropped because it disappears against a white page background — flag if you want it restored).
- **Tooltip offsets per polaroid** (pixels from each wrapper's top-left): Foodie `(208, 190)`, Painting `(185, 228)`, Matcha `(165, 190)`, Fred Again `(-271, 263)`, El Lissitzky `(-300, 218)`. Negative left values put the tooltip to the left of the polaroid (used for the two rightmost polaroids so the tooltip doesn't run off-screen).
- **Polaroid → tooltip mapping** is by image content (verified by viewing each PNG), not by file-name ordinal: `polaroid-1=Foodie 🍛`, `polaroid-0=Painting 🎨`, `polaroid-3=Matcha 🍵`, `polaroid-4=Fred Again 🎤`, `polaroid-5=El Lissitzky 🔻`.
- **Polaroid layering** in DOM order matches Figma's Group 27 stacking (back → front): `polaroid-0` (Painting), `polaroid-5` + sticker-near-5, `polaroid-4` + paperclip + sticker-13, `polaroid-1` + sale-sticker + sticker-17 + sticker-12, `polaroid-3` + sticker-16. So Matcha sits in front and Painting is at the back. Don't reorder these — adjacent polaroid wrappers overlap and the order is load-bearing.
- **Title leading** set to `leading-none` to push letters up so polaroids occlude them; Figma uses `leading-normal`. Trade-off accepted for the visual overlap effect.
- **Next.js Image warnings** on collage stickers — `paperclip`, `sticker-12`, `sticker-13`, `sticker-16`, `sticker-near-5`, `sale-sticker`. Width/height props don't match rendered size. Fix by adding `style={{ width: 'auto', height: 'auto' }}` to each.

## About page (`/about`)

- **Food Card 1** simplified: Figma displays a portrait photo rotated -90° inside a landscape frame; I use `object-cover` instead. Different crop behavior — center strip vs. designer's rotated crop.
- **Butterfly transforms** approximate. Figma uses `scaleY(-1) rotate(174deg)` / similar multi-axis combos; I substituted simpler `scaleX(-1)` flips. Same visual orientation, off by a few degrees.

## Layout

- **Header in normal flow** — nav sits on white above page content. The original home design had nav floating absolutely over a dark hero; "Home - Final" doesn't have a dark hero so this is currently fine. Revisit if a future page brings back the dark hero.

## Unbuilt case-study routes

- `/cinecircle`, `/apprenta` — home-page cards link to these but the route files don't exist yet, so clicks 404. Build the case studies under `app/<slug>/page.tsx` (mirror the structure of `app/selfserve/page.tsx` or `app/bcg/page.tsx`). Once built, no other wiring needed — links are already in place.

## Playground page (`/playground`)

- **Full-viewport canvas overlays the nav** — the infinite canvas uses `fixed inset-0` so it covers the layout's nav and footer while the user is on the page. This is intentional (matches infinite-canvas UX like Figma/Miro). If you want the nav visible, either give the nav a higher z-index in `app/layout.tsx` (affects all routes) or convert `/playground` from `fixed inset-0` to a scoped-height container.
- **Tile size = 1440×2753 (Figma frame size)** — elements are positioned at their Figma "Playground - Final" coords verbatim. The canvas renders a `ceil(viewport / tile) + 1` grid of tiles and applies `translate3d(-(offset mod tile), -(offset mod tile))` so the pattern wraps seamlessly in any direction. Because the tile is taller than typical viewports, sparser regions (especially mid-tile and the bottom-right) will look emptier — that's Figma's intended composition. If density needs to come back, shrink `TILE_HEIGHT` and re-pack elements (previous version did 1100×900 / 3-row grid; see git history).
- **Scroll feel uses a target/current lerp + drag inertia** — wheel and drag write to `targetRef`; an rAF loop lerps `currentRef` toward target with factor `0.12` (≈30 frames to converge ≈ 500ms) so input feels fluid rather than 1:1. After a drag release, the captured velocity continues to push `target` with `0.93` friction per frame, so the canvas glides past the cursor's stopping point. Adjust `LERP` for more/less lag, `FRICTION` for fling length.
- **Element images are pre-rendered Figma screenshots** — composites like the Generate-Merch hoodies and the Judgment-Labs branding block were captured as single PNGs rather than re-built from vectors/text. If a design changes in Figma, re-export the affected node and overwrite the file in `public/images/playground/`.
- **Element (6) "Acrylic Painting" caption position was hand-tuned** — Figma reports the caption y at 1346 (inside the image) which looked broken. Moved to y=1540 so the caption sits below the image. Other captions use Figma's reported positions verbatim.

## BCG page (`/bcg`)

- **Image gallery overflow** — Figma's right column is 501px wide but holds three images (badge 436 + team1 676 + team2 674) with `overflow-clip`, so only the badge and a slim vertical strip of team-1 are visible. I matched this behavior (intentional designer choice). Switch to a horizontal scroll/carousel if you want the team photos reachable.
- **BCG logo image** — Figma renders the asset with negative top + horizontal stretch (`top: -57px; width: 193.53%; height: 260.65%`) so only a cropped portion of the imported asset is visible. I replicated those values literally; if you swap in a clean BCG logo asset, drop the negative offsets in `TitleAndHero`.
- **Hero pan** — Figma uses a 1251×1668 image cropped to 1250×612 viewport with `top: -445px`. I use `object-cover` which crops differently. Crop point will likely differ from Figma — fine since the building fills the frame either way, but flag if the framing matters.

## SelfServe page (`/selfserve`)

- **Satoshi fallback** → the title "SelfServe" uses Satoshi Bold in Figma (83px, paid foundry typeface, not on Google Fonts). I'm rendering with `font-sans font-bold` (Instrument Sans 700). Drop a `.woff2` in `public/fonts/` and wire via `next/font/local` to match Figma exactly.
- **4 video placeholders** await mp4s: hero (1260×678), Feature 1 / 2 / 3 (each 707×500). Pass `src` props to the `VideoPlaceholder` calls in `app/selfserve/page.tsx` and drop files into `public/videos/`.
- **Tools cluster + AI flowchart** use pixel positions matching Figma's 1076-wide left-panel column. Pixel-faithful at 1440 viewport; crops below.
- **Case-study color palette inlined** — `#0e361e` (title), `#eafbe1` (mint), `#009516` (emerald), `#e6ded6` (beige before), `#5d5a54` (beige border), `#e5f2db` (green after), `#27452e` (green border), `#fafafa` (tools bg). Lives in a local `COLORS` const in `app/selfserve/page.tsx`. If these recur across other case studies, promote to `globals.css` tokens.
- **Lessons timeline line offset** — the connecting line uses `top: 15px; bottom: -47px` to bridge the gap-10 (40px) between rows. Works as long as the lessons section uses `gap-10`; if you change the gap, retune the `-bottom` offset to `-(gap + 7)`.

## Mobile responsive

- **Breakpoint**: `md` = 768px in Tailwind v4. Below that, mobile styles apply via `max-md:` prefix; above, desktop styles run unchanged.
- **Mobile components**: `MobileNav` (floating pill, sticky `bottom-[120px]`, `md:hidden`) and `MobileFooter` (`md:hidden`). Desktop `Nav` and `Footer` get `max-md:hidden`.
- **`viewport` export in `layout.tsx`** is required for proper mobile rendering. Without it, mobile browsers (and headless Chrome) treat the viewport as ~980px and zoom out — producing very small text and broken layouts.
- **Body `overflow-x-hidden`** masks any horizontal overflow at narrow widths (e.g. the desktop Hero's `min-w-[1440px]` Collage is `max-md:hidden` but `overflow-x-hidden` is belt-and-suspenders).
- **Mobile bottom padding**: `main` has `max-md:pb-[200px]` to prevent the last content from being covered by the floating nav.
- **Polaroid carousel on home (mobile)** uses `ImageCarousel`. Each polaroid renders without its decorative stickers — stickers are desktop-only.
- **Snapshot carousels on about (mobile)** use `ImageCarousel` and a unified `MobileSnapshot` wrapper with `SnapshotCard`. The desktop absolute-positioned arrangements (`GenerateSnapshots`, `FoodSnapshots`) are `max-md:hidden`.
- **Headless Chrome rendering quirk**: at `--window-size=393,800`, some browser-driven layout edge cases (notably text positioning in flex containers) don't reflect what real mobile devices show. Always test on a real phone via the Vercel URL, not via headless screenshots.

## Components

- **VideoPlaceholder** awaits real `src` props. Currently passing none in `page.tsx` for BCG / SelfServe / CineCircle cards on the home grid, the SelfServe hero, and the 3 feature-row videos on SelfServe. mp4 files go in `public/videos/`.
