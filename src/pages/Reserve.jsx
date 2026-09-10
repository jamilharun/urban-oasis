import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Check, Plus, Calendar, Users, CalendarX2, Moon, Sparkles, ShieldCheck,
} from 'lucide-react';
import {
  suites, currency, formatDate, todayISO, standingPrivileges, addablePrivileges, suiteStatus,
} from '../data/building';
import { useBooking } from '../context/useBooking';
import HostCard from '../components/HostCard';

const STATUS_ICON = { capacity: Users, booked: CalendarX2, minstay: Moon };

export default function Reserve() {
  const { id } = useParams();
  const { checkIn, checkOut, guests, nights, setField } = useBooking();
  // Local to this reservation: a privilege can never follow you to another suite.
  const [privilegeIds, setPrivilegeIds] = useState([]);

  const suite = suites.find((s) => s.id === id);

  if (!suite) {
    return (
      <main id="main" className="pt-32 pb-24 min-h-screen text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-light mb-4">No such suite</h1>
          <Link
            to="/#suites"
            className="inline-flex items-center gap-2 text-condo-accent hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the six suites
          </Link>
        </div>
      </main>
    );
  }

  // The grid disables unbookable suites, but a URL bypasses the grid — so this
  // page re-runs the same check rather than trusting how you arrived.
  const status = suiteStatus(suite, { checkIn, checkOut, guests });
  const StatusIcon = STATUS_ICON[status.code];
  const bookable = status.ok && nights > 0;

  const chosen = addablePrivileges.filter((p) => privilegeIds.includes(p.id));
  const roomTotal = suite.price * nights;
  const privilegeTotal = chosen.reduce((sum, p) => sum + (p.price ?? 0), 0);
  const grandTotal = roomTotal + privilegeTotal;

  const toggle = (pid) =>
    setPrivilegeIds((prev) => (prev.includes(pid) ? prev.filter((x) => x !== pid) : [...prev, pid]));

  return (
    <main id="main" className="pb-24 pt-28 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/suite/${suite.id}`}
          className="inline-flex items-center gap-2 text-condo-accent hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {suite.name}
        </Link>

        <header className="mb-12">
          <p className="text-condo-accent text-sm tracking-widest uppercase mb-3">Reserve</p>
          <h1 className="text-4xl md:text-5xl font-display font-light">{suite.name}</h1>
          <p className="text-gray-400 font-light mt-3">
            Floor {suite.floor} · {suite.type} · hosted by {suite.host.name}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* ---- Step 1: dates, editable here ------------------------ */}
            <section>
              <h2 className="text-2xl font-display font-light mb-6 border-b border-white/10 pb-4">
                1 · Your dates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer">
                  <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">
                    Check in
                  </span>
                  <input
                    type="date"
                    value={checkIn}
                    min={todayISO}
                    onChange={(e) => setField('checkIn', e.target.value)}
                    className="w-full bg-transparent text-white cursor-pointer"
                  />
                </label>
                <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer">
                  <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">
                    Check out
                  </span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || todayISO}
                    onChange={(e) => setField('checkOut', e.target.value)}
                    className="w-full bg-transparent text-white cursor-pointer"
                  />
                </label>
                <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer relative">
                  <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">
                    Guests
                  </span>
                  <select
                    value={guests}
                    onChange={(e) => setField('guests', Number(e.target.value))}
                    className="w-full bg-transparent text-white cursor-pointer appearance-none pr-6"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-condo-dark">
                        {n} {n === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                  <span aria-hidden className="pointer-events-none absolute right-5 bottom-5 text-condo-accent text-xs">
                    ▾
                  </span>
                </label>
              </div>

              {!status.ok && (
                <p className="flex items-start gap-2.5 mt-4 rounded-control border border-condo-accent/40 bg-condo-accent/10 p-4 text-sm text-gray-100">
                  {StatusIcon && <StatusIcon className="w-4 h-4 shrink-0 mt-0.5 text-condo-accent" />}
                  <span>
                    <strong className="font-medium text-white">{status.label}.</strong>{' '}
                    {status.code === 'capacity'
                      ? `This suite sleeps ${suite.sleeps}. Lower the guest count or pick a larger suite.`
                      : status.code === 'minstay'
                        ? `${suite.name} takes a minimum of ${suite.minNights} nights. Extend your check-out above.`
                        : 'Change your dates above — the fields are live, so you can fix it here.'}
                  </span>
                </p>
              )}
              {status.ok && nights === 0 && (
                <p className="mt-4 text-sm text-gray-400">
                  Pick a check-out date at least one night after check-in.
                </p>
              )}
            </section>

            {/* ---- Step 2: the privileges ----------------------------- */}
            <section>
              <h2 className="text-2xl font-display font-light mb-2 border-b border-white/10 pb-4">
                2 · Attach privileges
              </h2>
              <p className="text-sm text-gray-400 font-light mb-6 mt-4">
                Held before you land and billed with the suite — not sold back to you at the door.
                The pool, the gym and the concierge are already included.
              </p>
              <ul className="space-y-3">
                {addablePrivileges.map((p) => {
                  const added = privilegeIds.includes(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => toggle(p.id)}
                        aria-pressed={added}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-card border transition-colors ${
                          added
                            ? 'border-condo-accent bg-condo-accent/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border ${
                            added
                              ? 'bg-condo-accent border-condo-accent text-condo-dark'
                              : 'border-condo-accent/50 text-condo-accent'
                          }`}
                        >
                          {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-white">{p.name}</span>
                          <span className="block text-xs text-gray-400 mt-0.5">
                            Floor {p.floor} · {p.hours} · {p.capacity}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block text-white">
                            {p.price ? currency(p.price) : 'No charge'}
                          </span>
                          {p.unit && <span className="block text-[0.7rem] text-gray-500">{p.unit}</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* ---- Step 3: who meets you ------------------------------ */}
            <section>
              <h2 className="text-2xl font-display font-light mb-6 border-b border-white/10 pb-4">
                3 · Who meets you
              </h2>
              <HostCard host={suite.host} suiteFloor={suite.floor} variant="full" />
            </section>
          </div>

          {/* ---- Summary. Opaque: it carries prices. ------------------ */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-card border border-white/15 bg-condo-panel p-7 shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
              <img
                src={suite.image}
                alt={suite.name}
                className="w-full h-32 object-cover rounded-control mb-5"
              />
              <h2 className="text-lg font-display font-light mb-5 border-b border-white/10 pb-4">
                Reservation summary
              </h2>

              <dl className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <dt className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-condo-accent" /> Dates
                  </dt>
                  <dd>
                    {formatDate(checkIn)} → {formatDate(checkOut)}
                  </dd>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <dt className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-condo-accent" /> Guests
                  </dt>
                  <dd>
                    {guests} of {suite.sleeps}
                  </dd>
                </div>
              </dl>

              <ul className="space-y-3 border-t border-white/10 pt-5 text-sm">
                <li className="flex justify-between gap-3 text-gray-300">
                  <span>
                    {currency(suite.price)} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="text-white">{currency(roomTotal)}</span>
                </li>
                {chosen.map((p) => (
                  <li key={p.id} className="flex justify-between gap-3 text-gray-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-condo-accent shrink-0" />
                      <span className="truncate">{p.name}</span>
                    </span>
                    <span className="text-white shrink-0">{p.price ? currency(p.price) : '—'}</span>
                  </li>
                ))}
                {standingPrivileges.length > 0 && (
                  <li className="flex justify-between gap-3 text-gray-500">
                    <span>Pool, gym, concierge</span>
                    <span>Included</span>
                  </li>
                )}
              </ul>

              <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-white/10">
                <span className="text-white font-medium">Total</span>
                <span className="text-2xl text-white font-display">{currency(grandTotal)}</span>
              </div>
              {privilegeTotal > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {currency(roomTotal)} suite + {currency(privilegeTotal)} privileges
                </p>
              )}

              <button
                disabled={!bookable}
                className={`w-full mt-6 py-4 font-semibold tracking-widest uppercase rounded-control transition-colors ${
                  bookable
                    ? 'bg-condo-accent text-condo-dark hover:bg-[#d4b878]'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                {bookable ? 'Confirm booking' : status.ok ? 'Choose your dates' : status.label}
              </button>

              <p className="flex items-start gap-2 text-xs text-gray-500 mt-4">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-condo-accent" />
                Free cancellation up to 72 hours before check-in. A concept — no payment is taken.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
