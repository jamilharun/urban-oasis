import { useBooking } from '../context/booking';
import { todayISO } from '../lib/format';

/**
 * The three booking inputs as a row of panels. Used by the /suites index and
 * the reservation page; the hero keeps its own bespoke bar, which is a
 * different visual moment rather than the same control repeated.
 */
export default function SearchFields() {
  const { checkIn, checkOut, guests, setField } = useBooking();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer">
        <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">Check in</span>
        <input
          type="date"
          value={checkIn}
          min={todayISO}
          onChange={(e) => setField('checkIn', e.target.value)}
          className="w-full bg-transparent text-white cursor-pointer [color-scheme:dark]"
        />
      </label>

      <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer">
        <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">Check out</span>
        <input
          type="date"
          value={checkOut}
          min={checkIn || todayISO}
          onChange={(e) => setField('checkOut', e.target.value)}
          className="w-full bg-transparent text-white cursor-pointer [color-scheme:dark]"
        />
      </label>

      <label className="rounded-card border border-white/10 bg-white/5 px-5 py-4 cursor-pointer relative">
        <span className="block text-xs uppercase tracking-widest text-condo-accent mb-2">Guests</span>
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
        <span aria-hidden className="pointer-events-none absolute right-5 bottom-5 text-condo-accent text-xs">▾</span>
      </label>
    </div>
  );
}
