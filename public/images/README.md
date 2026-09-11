# Plates

Every photograph on the site goes through `<Plate src="/images/<category>/<name>" />`,
which serves AVIF first and WebP second and paints a blurred placeholder while
the real file is in flight. Paths carry **no extension** — `Plate` adds them.

## Adding images

1. Drop the source into `images-src/<category>/<name>.png` (jpg, webp, tiff also fine).
2. `npm run images`

That grades the image to the house target, writes AVIF + WebP into
`public/images/<category>/`, regenerates `src/data/lqip.js`, and consumes the
source file. Then reference it from `src/data/building.js`.

Do not add files to `public/images/` by hand — an ungraded plate is visibly a
different photo shoot from the rest, and it will have no placeholder.

## The grade, and why it is not optional

Generated images arrive with wildly different exposure, colour temperature and
saturation. Measured across the first batch of eleven: brightness 63–146,
warmth (R−B) −2 to +45, saturation 18–50%. One plate was 2.3× brighter than
another, and a garden at +45 warmth sat directly above a loft at +9. That
mismatch is the single clearest reason a page reads cheap.

The pipeline normalises **colour temperature and saturation fully**, because
those are the grade. **Exposure only moves 65% of the way** to the target,
because a night lounge should stay darker than a midday garden — forcing every
scene to one brightness flattens the set. Then one shared curve across
everything: a gentle S with the black point lifted off zero, so nothing
crushes. `plans/` is pulled only 40%, since a blueprint may stay cool and
technical.

Result on the first batch: brightness spread 83 → 29, warmth 47 → 4,
saturation 31 → 5.

## Categories

Named for what a plate **depicts**, not where it is used — a plate reused in
four places still shows one thing.

| folder | holds |
|---|---|
| `building/` | the tower, exterior, arrival, lobby |
| `rooms/` | interior room plates, reusable across suites |
| `amenities/` | pool, gym, lounge, spa, chef's table |
| `people/` | hosts, staff, portraits |
| `plans/` | floor plans and diagrams |

Filenames are lowercase and hyphenated, `<subject>[-<variant>]`:
`rooms/loft`, `rooms/loft-kitchen`, `plans/loft`.

## What to shoot next

Twelve plates currently cover **49 references**, so several are doing work they
do not depict. In rough order of how wrong it looks:

- **`rooms/kitchen` is used 9 times** — as the Executive Corner's own plate, as
  "the loft kitchen", as "the kitchen" in the Urbanite, and as "the
  kitchenette" in the Studio. The same marble island is four different
  kitchens. One kitchen per suite would fix the most visible repeat.
- **`plans/floorplan` is used 6 times** — every suite shows the same plan,
  including a studio and a three-bed penthouse.
- **No bathroom exists at all.** The suite page's bathrooms section is written
  fittings only, with no image. Six would complete it: `rooms/<suite>-bath`.
- **`rooms/garden` stands in for the Sanctuary Spa** — it is a tropical garden
  room, not a spa. `amenities/spa` is the gap.
- **`amenities/lounge` is the Chef's Table too.** `amenities/chef` is the gap.
- **`building/hero` stands in for the 24/7 Concierge.** A lobby desk would do
  it: `building/lobby`.
- **Host portraits.** `HostCard` draws monogram avatars because there are no
  faces. Four in `people/` would replace them.

## Known defect in the current set

`building/hero` has other brands legible on the podium signage — "AETHEL",
"LUMA", "THE TERRACE" — and `people/founder`'s blueprint reads "AURORA TOWER".
Both need regenerating with no text in frame. The footer crops `object-top`
specifically to keep that signage out of shot.
