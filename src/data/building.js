// One building, one product. Everything the booking flow needs lives here so the
// suites, the privileges and the floor stack can never drift out of sync.

const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = iso(new Date());

/** ISO date `n` days from today, in local time. */
export function offsetDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(d);
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(`${checkOut}T00:00`) - new Date(`${checkIn}T00:00`);
  return Math.max(0, Math.round(ms / 86400000));
}

export function formatDate(value) {
  if (!value) return '—';
  return new Date(`${value}T00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

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
    image: '/images/penthouse.png',
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
    image: '/images/loft.png',
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
    image: '/images/kitchen.png',
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
    image: '/images/1bed.png',
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
    image: '/images/studio.png',
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
    image: '/images/garden.png',
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
    access: 'included',
    hours: 'Always on',
    capacity: 'Desk in the lobby, or message from anywhere',
    image: '/images/founder.png',
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
    image: '/images/pool.png',
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
    image: '/images/fitness.png',
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
    image: '/images/garden.png',
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
    image: '/images/kitchen.png',
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
    image: '/images/lounge.png',
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
    image: '/images/lounge.png',
    note: 'The top plate is given back to guests instead of being sold as two more suites.',
    links: ['lounge', 'chef'],
  },
  {
    key: 'crown',
    floors: '31',
    label: 'The Crown Penthouse',
    kind: 'suite',
    image: '/images/penthouse.png',
    note: 'One suite on its own floor, double height, hosted by the founding household.',
    suiteIds: ['ph3'],
  },
  {
    key: 'upper',
    floors: '24 – 30',
    label: 'Executive & Loft Suites',
    kind: 'suite',
    image: '/images/loft.png',
    note: 'Corner and double-height plans. Every host on these floors lives here year-round.',
    suiteIds: ['loft-1', 'exec-1'],
  },
  {
    key: 'spa',
    floors: '18',
    label: 'The Sanctuary Spa',
    kind: 'privilege',
    image: '/images/garden.png',
    note: 'Placed mid-stack so it is a lift ride from any suite, not a trip across town.',
    links: ['spa'],
  },
  {
    key: 'mid',
    floors: '9 – 17',
    label: 'Urbanite & Studio Suites',
    kind: 'suite',
    image: '/images/1bed.png',
    note: 'The working floors of the building — most of the resident hosts are here.',
    suiteIds: ['1405', '802'],
  },
  {
    key: 'pool',
    floors: '8',
    label: 'Infinity Pool & Sun Deck',
    kind: 'privilege',
    image: '/images/pool.png',
    note: 'The whole floor is water and deck. Included, uncapped, no day-pass.',
    links: ['pool'],
  },
  {
    key: 'wellness',
    floors: '7',
    label: 'Wellness & Fitness',
    kind: 'privilege',
    image: '/images/fitness.png',
    note: 'Open around the clock, because guests arrive on every timezone.',
    links: ['fitness'],
  },
  {
    key: 'garden',
    floors: '2 – 6',
    label: 'Garden Suites & Winter Garden',
    kind: 'suite',
    image: '/images/garden.png',
    note: 'Terraces onto the planted podium — the only floors with private outdoor space.',
    suiteIds: ['garden-1'],
  },
  {
    key: 'arrival',
    floors: 'G',
    label: 'Arrival, Lobby & Concierge Desk',
    kind: 'arrival',
    image: '/images/hero.png',
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
