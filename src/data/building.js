// One building, one product. The suites, the privileges and the floor stack all
// live here so they can never drift out of sync. Formatting lives in lib/format.
import { offsetDays, nightsBetween } from '../lib/format';

// ---------------------------------------------------------------------------
// The residents who host. This is the claim the copy makes three times over —
// so it needs a face, a floor and a tenure, not just an adjective.
// ---------------------------------------------------------------------------

export const hosts = {
  mara: {
    name: 'Mara Villaluz',
    initials: 'MV',
    floor: 27,
    residentSince: 2016,
    blurb: 'Teaches architecture two nights a week. Leaves the espresso machine stocked.',
    responds: 'within an hour',
  },
  tobias: {
    name: 'Tobias Renner',
    initials: 'TR',
    floor: 14,
    residentSince: 2019,
    blurb: 'Runs the building’s residents’ committee. Will book your spa slot before you land.',
    responds: 'within 2 hours',
  },
  ines: {
    name: 'Inés Okonkwo',
    initials: 'IO',
    floor: 9,
    residentSince: 2021,
    blurb: 'Lives one floor down. Meets every guest at the lift on arrival.',
    responds: 'within 30 minutes',
  },
  sterling: {
    name: 'The Sterling Trust',
    initials: 'ST',
    floor: 31,
    residentSince: 1998,
    blurb: 'The founding household. Hosts the penthouse only a few weeks a year.',
    responds: 'within a day',
  },
};

// ---------------------------------------------------------------------------
// Suites. `sleeps` drives the guest filter, `blocked` drives the date filter,
// `minNights` drives the min-stay state.
// ---------------------------------------------------------------------------

export const suites = [
  {
    id: 'ph3',
    name: 'The Crown Penthouse',
    floor: 31,
    type: '3 Bed · 3 Bath · Skyline View',
    price: 1250,
    sleeps: 6,
    minNights: 3,
    image: '/images/rooms/penthouse',
    gallery: [
      { src: '/images/amenities/lounge', alt: 'The penthouse entertaining level' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 31' },
    ],
    specs: {
      size: '3,180 sq ft',
      ceiling: '6.2 m at the window wall',
      baths: '3 — two en suite',
      aspect: 'North-west · river and skyline',
    },
    rooms: [
      {
        name: 'The entertaining floor',
        image: '/images/rooms/penthouse',
        copy: 'A single room the depth of the building, opened to a double-height window wall. The dining table and the seating group sit on one plane so nothing blocks the view from the lift landing.',
        features: ['Double-height bronze-framed glazing', 'Book-matched Calacatta fireplace', 'Seats fourteen at the table'],
      },
      {
        name: 'The upper lounge',
        image: '/images/amenities/lounge',
        copy: 'Up the stair, a smaller and darker room for after dinner — walnut panelling, a stocked bar, and the only west-facing window in the suite.',
        features: ['Walnut-panelled bar', 'Record library and turntable', 'Private lift landing'],
      },
    ],
    furnishings: [
      'Minotti Alexander modular sofa in bouclé',
      'Cassina LC6 dining table, ten places',
      'Flos Arco floor lamp',
      'Hand-knotted wool rug, 4 × 6 m',
      'Bang & Olufsen Beolab 50, pair',
    ],
    bath: {
      copy: 'Three bathrooms, two of them en suite. The principal is a room in its own right, with the bath set against the window.',
      fittings: [
        'Freestanding bath cast from Carrara',
        'Vola brushed-brass tapware',
        'Steam shower with rain and body jets',
        'Heated travertine floor',
        'Double vanity in honed marble',
      ],
    },
    reviews: [
      { name: 'Adaeze N.', stay: '6 nights in March', rating: 5, text: 'We used the upper lounge every evening and never once went out. The lift opens straight into the suite, which sounds like a small thing until you arrive with luggage.' },
      { name: 'Henrik & Sofia L.', stay: '4 nights in January', rating: 5, text: 'The window wall is not exaggerated in the photographs. We ate every meal at that table watching the river go dark.' },
      { name: 'M. Farouk', stay: '3 nights in November', rating: 4, text: 'Faultless service. The stair up to the lounge is steep though — worth knowing if anyone in your party would rather avoid it.' },
    ],
    host: hosts.sterling,
    blocked: [[offsetDays(2), offsetDays(9)]],
  },
  {
    id: 'loft-1',
    name: 'The Industrial Loft',
    floor: 26,
    type: '2 Bed · 2 Bath · Double Height',
    price: 550,
    sleeps: 4,
    minNights: 2,
    image: '/images/rooms/loft',
    gallery: [
      { src: '/images/rooms/kitchen', alt: 'The loft kitchen' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 26' },
    ],
    specs: {
      size: '1,640 sq ft',
      ceiling: '4.8 m to the exposed slab',
      baths: '2 — one en suite',
      aspect: 'South-east · harbour',
    },
    rooms: [
      {
        name: 'The double-height living room',
        image: '/images/rooms/loft',
        copy: 'The original 1998 window frames were kept, blackened and reglazed. Nothing has been added at ceiling height, so the slab and the ductwork are still the ceiling.',
        features: ['Original blackened-steel glazing', 'Mezzanine study above', 'Exposed slab and services'],
      },
      {
        name: 'The galley kitchen',
        image: '/images/rooms/kitchen',
        copy: 'A working kitchen rather than a display one — full-depth counters down one wall, everything within a pace of the sink.',
        features: ['Marble counter run, 4.2 m', 'Gaggenau oven and induction', 'Seats four at the counter'],
      },
    ],
    furnishings: [
      'Vitra Grand Sofa in charcoal',
      'Reclaimed oak dining table, seats eight',
      'Carl Hansen CH24 counter stools, four',
      'Anglepoise Type 75, pair',
      'Open steel shelving, full height',
    ],
    bath: {
      copy: 'Two bathrooms, both wet rooms. Poured concrete throughout, in keeping with the shell.',
      fittings: [
        'Wet room in poured concrete',
        'Vola matte-black tapware',
        'Walk-in rain shower',
        'Wall-hung oak vanity',
        'Underfloor heating',
      ],
    },
    reviews: [
      { name: 'Priya R.', stay: '5 nights in April', rating: 5, text: 'The original window frames make the room. Mara left a note and the espresso machine ready, and answered a question about the mezzanine desk within minutes.' },
      { name: 'Tom B.', stay: '2 nights in February', rating: 4, text: 'Wonderful space. The exposed slab does carry sound, so the mezzanine is not a private study while someone is cooking.' },
    ],
    host: hosts.mara,
    blocked: [],
  },
  {
    id: 'exec-1',
    name: 'The Executive Corner',
    floor: 24,
    type: '2 Bed · 2 Bath · Panoramic View',
    price: 680,
    sleeps: 4,
    minNights: 2,
    image: '/images/rooms/executive',
    gallery: [
      { src: '/images/rooms/kitchen', alt: 'The marble kitchen' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 24' },
    ],
    specs: {
      size: '1,420 sq ft',
      ceiling: '3.1 m',
      baths: '2 — one en suite',
      aspect: 'Dual aspect · east and south',
    },
    rooms: [
      {
        name: 'The marble kitchen',
        image: '/images/rooms/kitchen',
        copy: 'Calacatta Viola run as a waterfall island and carried up the splashback in one book-matched sheet. The appliance wall is concealed behind dark oak.',
        features: ['Calacatta Viola waterfall island', 'Full Gaggenau suite', 'Brass Vola pot filler'],
      },
      {
        name: 'The corner living room',
        image: '/images/rooms/executive',
        copy: 'The corner itself is left empty — the seating pulls back from the glass so the two aspects read as one continuous view.',
        features: ['Glazing on two elevations', 'Concealed blinds throughout', 'Desk built into the return'],
      },
    ],
    furnishings: [
      'B&B Italia Charles sofa',
      'Carl Hansen CH327 dining table, six places',
      'Gubi Bestlite BL3 pair',
      'Wool bouclé lounge chairs, pair',
      'Silk-blend rug, 3 × 4 m',
    ],
    bath: {
      copy: 'Both bathrooms are marble-lined, with the en suite taking the east light.',
      fittings: [
        'Marble-lined walls and floor',
        'Wall-hung Duravit basins, pair',
        'Frameless glass shower',
        'Backlit mirror with demist',
        'Heated towel rail',
      ],
    },
    reviews: [
      { name: 'Céline D.', stay: '4 nights in May', rating: 5, text: 'I cooked in that kitchen twice and would fly back for it. The corner really is left empty as described, and it works.' },
      { name: 'J. Okada', stay: '3 nights in September', rating: 5, text: 'Dual aspect means it is bright from breakfast to sunset. Tobias had booked our spa slots before we landed.' },
    ],
    host: hosts.tobias,
    blocked: [[offsetDays(20), offsetDays(28)]],
  },
  {
    id: '1405',
    name: 'The Urbanite Suite',
    floor: 14,
    type: '1 Bed · 1 Bath · City View',
    price: 350,
    sleeps: 2,
    minNights: 1,
    image: '/images/rooms/1bed',
    gallery: [
      { src: '/images/rooms/kitchen', alt: 'The kitchen' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 14' },
    ],
    specs: {
      size: '780 sq ft',
      ceiling: '2.9 m',
      baths: '1.5',
      aspect: 'West · park and city',
    },
    rooms: [
      {
        name: 'The living room',
        image: '/images/rooms/1bed',
        copy: 'Distinct from the bedroom, which is the whole point of the plan — you can close a door on the day.',
        features: ['Oak parquet in herringbone', 'Blackout linen curtains', 'Sofa converts for a third guest'],
      },
      {
        name: 'The kitchen',
        image: '/images/rooms/kitchen',
        copy: 'Small, fully equipped, and stocked to your list by the concierge before you arrive.',
        features: ['Induction hob and combi oven', 'Full-height fridge', 'Breakfast counter for two'],
      },
    ],
    furnishings: [
      'Muuto Outline two-seat sofa',
      'Fritz Hansen Series 7 chairs, four',
      'Oak parquet in herringbone',
      'Marshall Stanmore III',
      'Linen bedding, changed midweek',
    ],
    bath: {
      copy: 'One full bathroom plus a cloakroom off the hall.',
      fittings: [
        'Full bath with overhead shower',
        'Terrazzo floor and skirting',
        'Brushed-nickel tapware',
        'Mirrored cabinet with charging point',
        'Heated towel rail',
      ],
    },
    reviews: [
      { name: 'Rosa M.', stay: '4 nights in June', rating: 5, text: 'Being able to shut the bedroom door is the whole reason I booked this over a studio. Worth the difference.' },
      { name: 'Daniel A.', stay: '7 nights in August', rating: 5, text: 'The concierge stocked the fridge to my list before arrival. After a long flight that was worth more than any hotel turndown.' },
      { name: 'Kemi O.', stay: '2 nights in December', rating: 4, text: 'Lovely and quiet. West-facing gets warm in the afternoon — the blinds handle it, but you will want them drawn.' },
    ],
    host: hosts.tobias,
    blocked: [],
  },
  {
    id: '802',
    name: 'The Minimalist Studio',
    floor: 9,
    type: 'Studio · 1 Bath · Park View',
    price: 220,
    sleeps: 2,
    minNights: 1,
    image: '/images/rooms/studio',
    gallery: [
      { src: '/images/rooms/kitchen', alt: 'The kitchenette' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 9' },
    ],
    specs: {
      size: '505 sq ft',
      ceiling: '2.9 m',
      baths: '1',
      aspect: 'East · park',
    },
    rooms: [
      {
        name: 'The studio',
        image: '/images/rooms/studio',
        copy: 'One room that changes through the day. The bed folds into the storage wall and is made up by housekeeping each morning, so the room is a living room by nine.',
        features: ['Wall bed in white oak', 'Full-height storage wall', 'Desk that folds flat'],
      },
      {
        name: 'The kitchenette',
        image: '/images/rooms/kitchen',
        copy: 'Compact but not token — two zones, a real oven, and a dishwasher behind the cabinetry.',
        features: ['Two-zone induction', 'Concealed dishwasher', 'Fold-away table for four'],
      },
    ],
    furnishings: [
      'Wall bed in white oak, made up daily',
      'Hay Mags two-seater',
      'Fold-away dining table, four places',
      'Integrated storage wall',
      'Sonos Era 100',
    ],
    bath: {
      copy: 'A single bathroom, shower only — the trade for the park aspect at this rate.',
      fittings: [
        'Walk-in shower, no bath',
        'Micro-cement walls',
        'Chrome tapware',
        'Recessed shelving',
        'Heated towel rail',
      ],
    },
    reviews: [
      { name: 'Sven H.', stay: '3 nights in July', rating: 5, text: 'The wall bed is genuinely made up every morning, so the room is a living room by nine. That alone makes the square footage irrelevant.' },
      { name: 'Ana-Lucía P.', stay: '5 nights in October', rating: 4, text: 'Excellent value for the pool and gym access alone. Shower only, which is stated clearly and did not bother me.' },
    ],
    host: hosts.ines,
    blocked: [],
  },
  {
    id: 'garden-1',
    name: 'The Garden Oasis',
    floor: 3,
    type: '1 Bed · 1 Bath · Private Terrace',
    price: 420,
    sleeps: 3,
    minNights: 2,
    image: '/images/rooms/garden',
    gallery: [
      { src: '/images/rooms/studio', alt: 'The bedroom' },
      { src: '/images/plans/floorplan', alt: 'Floor plan, level 3' },
    ],
    specs: {
      size: '910 sq ft, plus a 340 sq ft terrace',
      ceiling: '3.4 m',
      baths: '1',
      aspect: 'South · onto the planted podium',
    },
    rooms: [
      {
        name: 'The terrace room',
        image: '/images/rooms/garden',
        copy: 'The glass wall slides fully open, so in warm weather the room and the terrace are one space. This is the only suite in the building with private outdoor ground.',
        features: ['Sliding glass wall, 5 m', 'Teak lounge seating for six', 'Outdoor shower on the terrace'],
      },
      {
        name: 'The bedroom',
        image: '/images/rooms/studio',
        copy: 'Set back from the terrace and planted out on two sides, which makes it the quietest bedroom in the building.',
        features: ['Planting on two elevations', 'Blackout and sheer layers', 'Sleeps a third on the daybed'],
      },
    ],
    furnishings: [
      'Teak outdoor lounge set, seats six',
      'Rattan lounge chairs, pair',
      'Woven jute rug',
      'Daybed in the bedroom bay',
      'Outdoor dining table for six',
    ],
    bath: {
      copy: 'One bathroom, with the bath itself looking out onto the planting.',
      fittings: [
        'Bath with terrace outlook',
        'Travertine surround',
        'Brushed-brass tapware',
        'Twin rain shower',
        'Heated stone floor',
      ],
    },
    reviews: [
      { name: 'The Adeyemi family', stay: '6 nights in April', rating: 5, text: 'Our children were on the terrace from breakfast until dark. Inés met us at the lift and walked them round the planting.' },
      { name: 'Georg W.', stay: '3 nights in March', rating: 5, text: 'Sliding the whole glass wall back is the moment you understand what you paid for. Quietest room I have slept in inside a city.' },
    ],
    host: hosts.ines,
    blocked: [],
  },
];

// ---------------------------------------------------------------------------
// Privileges — the actual product. `access` decides whether a privilege is a
// standing entitlement or a line item you attach to the stay.
//   included    → comes with any suite, nothing to book
//   reservation → free, but needs a slot
//   paid        → charged, per stay or per night
// ---------------------------------------------------------------------------

export const privileges = [
  {
    id: 'concierge',
    name: '24/7 Concierge',
    floor: 1,
    floorLabel: 'G',
    access: 'included',
    hours: 'Always on',
    capacity: 'Desk in the lobby, or message from anywhere',
    // The arrival, not founder.png — that portrait is the architect, and using
    // the same face for the concierge read as a different person each time.
    image: '/images/building/hero',
    tagline: 'The service layer a rental can’t have',
    description:
      'Cars, reservations, groceries pre-stocked before you arrive, a late checkout arranged while you sleep. One thread, answered by a human on site.',
  },
  {
    id: 'pool',
    name: 'The Infinity Pool',
    floor: 8,
    access: 'included',
    hours: '06:00 – 22:00',
    capacity: 'Walk-in · 24 loungers',
    image: '/images/amenities/pool',
    tagline: 'Temperature-controlled, infinity edge',
    description:
      'Float above the city. Towel service and poolside cabanas are complimentary for every booked guest — no day-pass, no resort fee.',
  },
  {
    id: 'fitness',
    name: 'Wellness & Fitness',
    floor: 7,
    access: 'included',
    hours: '24 hours',
    capacity: 'Walk-in · 2 yoga studios',
    image: '/images/amenities/fitness',
    tagline: 'Technogym floor and studios',
    description:
      'Keep your routine. Full equipment floor, two studios, and towels and water at the door, open the whole time you’re in the building.',
  },
  {
    id: 'spa',
    name: 'The Sanctuary Spa',
    floor: 18,
    access: 'paid',
    price: 180,
    unit: 'per treatment',
    hours: '09:00 – 21:00',
    capacity: 'By appointment · 4 rooms',
    image: '/images/rooms/garden',
    tagline: '90-minute treatment, in-building',
    description:
      'Hammam, cold plunge and four treatment rooms on eighteen. Book a slot with your stay and it is held before you land.',
  },
  {
    id: 'chef',
    name: 'The Chef’s Table',
    floor: 32,
    access: 'paid',
    price: 240,
    unit: 'per dinner, for two',
    hours: 'Seatings at 19:00 & 21:00',
    capacity: 'By appointment · 8 seats',
    image: '/images/rooms/kitchen',
    tagline: 'A private chef, in your suite or on 32',
    description:
      'A five-course seating at the counter on thirty-two, or the same menu cooked in your own kitchen. This is the line an Airbnb cannot offer you.',
  },
  {
    id: 'lounge',
    name: 'The Sky Lounge',
    floor: 32,
    access: 'reservation',
    hours: '07:00 – 01:00',
    capacity: 'Reserve for evenings · 40 seats',
    image: '/images/amenities/lounge',
    tagline: 'Workspace by day, cocktails by night',
    description:
      'Barista service from seven, cocktails from six, panoramic views the whole time. Free for guests — evenings need a table.',
  },
];


/** Privileges you can attach to a stay (the included ones need no booking). */
export const addablePrivileges = privileges.filter((p) => p.access !== 'included');
export const standingPrivileges = privileges.filter((p) => p.access === 'included');

// ---------------------------------------------------------------------------
// The building itself. For a single-address product, "location" is the stack,
// not a map — this is what replaces the geographic section.
// ---------------------------------------------------------------------------

export const floorStack = [
  {
    key: 'sky',
    floors: '32',
    label: 'Sky Lounge & Chef’s Table',
    kind: 'privilege',
    image: '/images/amenities/lounge',
    note: 'The top plate is given back to guests instead of being sold as two more suites.',
    links: ['lounge', 'chef'],
  },
  {
    key: 'crown',
    floors: '31',
    label: 'The Crown Penthouse',
    kind: 'suite',
    image: '/images/rooms/penthouse',
    note: 'One suite on its own floor, double height, hosted by the founding household.',
    suiteIds: ['ph3'],
  },
  {
    key: 'upper',
    floors: '24 – 30',
    label: 'Executive & Loft Suites',
    kind: 'suite',
    image: '/images/rooms/loft',
    note: 'Corner and double-height plans. Every host on these floors lives here year-round.',
    suiteIds: ['loft-1', 'exec-1'],
  },
  {
    key: 'spa',
    floors: '18',
    label: 'The Sanctuary Spa',
    kind: 'privilege',
    image: '/images/rooms/garden',
    note: 'Placed mid-stack so it is a lift ride from any suite, not a trip across town.',
    links: ['spa'],
  },
  {
    key: 'mid',
    floors: '9 – 17',
    label: 'Urbanite & Studio Suites',
    kind: 'suite',
    image: '/images/rooms/1bed',
    note: 'The working floors of the building — most of the resident hosts are here.',
    suiteIds: ['1405', '802'],
  },
  {
    key: 'pool',
    floors: '8',
    label: 'Infinity Pool & Sun Deck',
    kind: 'privilege',
    image: '/images/amenities/pool',
    note: 'The whole floor is water and deck. Included, uncapped, no day-pass.',
    links: ['pool'],
  },
  {
    key: 'wellness',
    floors: '7',
    label: 'Wellness & Fitness',
    kind: 'privilege',
    image: '/images/amenities/fitness',
    note: 'Open around the clock, because guests arrive on every timezone.',
    links: ['fitness'],
  },
  {
    key: 'garden',
    floors: '2 – 6',
    label: 'Garden Suites & Winter Garden',
    kind: 'suite',
    image: '/images/rooms/garden',
    note: 'Terraces onto the planted podium — the only floors with private outdoor space.',
    suiteIds: ['garden-1'],
  },
  {
    key: 'arrival',
    floors: 'G',
    label: 'Arrival, Lobby & Concierge Desk',
    kind: 'arrival',
    image: '/images/building/hero',
    note: 'Your host meets you at the lift. The desk behind them never closes.',
    links: ['concierge'],
  },
];

/** Is a suite free for the whole requested range? */
export function isAvailable(suite, checkIn, checkOut) {
  if (!checkIn || !checkOut) return true;
  return !suite.blocked.some(([from, to]) => checkIn < to && checkOut > from);
}

/** Every reason a suite cannot be booked for the current search, in priority order. */
export function suiteStatus(suite, { checkIn, checkOut, guests }) {
  const nights = nightsBetween(checkIn, checkOut);
  if (guests > suite.sleeps) {
    return { ok: false, code: 'capacity', label: `Sleeps ${suite.sleeps}` };
  }
  if (!isAvailable(suite, checkIn, checkOut)) {
    return { ok: false, code: 'booked', label: 'Booked for your dates' };
  }
  if (nights > 0 && nights < suite.minNights) {
    return { ok: false, code: 'minstay', label: `${suite.minNights}-night minimum` };
  }
  return { ok: true, code: 'available', label: 'Available' };
}

/** Average rating and count for a suite's own reviews. */
export function reviewSummary(suite) {
  const list = suite.reviews ?? [];
  if (list.length === 0) return { count: 0, average: null };
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return { count: list.length, average: Math.round((total / list.length) * 10) / 10 };
}

/** All privileges, ordered top of the building down — echoes the floor stack. */
export const privilegesByFloor = [...privileges].sort((a, b) => b.floor - a.floor);
