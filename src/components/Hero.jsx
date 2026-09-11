import { Search } from 'lucide-react';
import { useBooking } from '../context/booking';
import { todayISO } from '../lib/format';
import Plate from './Plate';

export default function Hero() {
  const { checkIn, checkOut, guests, nights, results, availableCount, setField } = useBooking();

  const goToSuites = () => {
    document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="scroll-mt-24 relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Plate
          src="/images/building/hero"
          alt="The Urban Oasis tower at dusk"
          loading="eager"
          className="hero-plate w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-ground/85 via-dark-ground/65 to-dark-ground"></div>
      </div>

      <div className="relative z-10 w-full px-4 max-w-5xl mx-auto mt-20">
        <div className="text-center mb-12">
          <p data-intro className="text-accent-fill eyebrow mb-4">
            One building · Thirty-two floors
          </p>
          <h1 data-intro className="text-balance text-display-sm md:text-display-xl font-light text-white mb-8 md:mb-10">
            Book the building,<br /> not just the room
          </h1>
          <p data-intro className="text-lg md:text-xl text-gray-300 max-w-measure mx-auto font-light">
            Resident-hosted suites with the spa, the pool, the chef and a 24/7 concierge
            attached to your stay — not sold back to you as extras.
          </p>
        </div>

        <div data-intro className="bg-panel/95 backdrop-blur-md rounded-card p-4 md:p-2 border border-line shadow-2xl relative z-20">
          <div className="flex flex-col md:flex-row gap-4 md:items-stretch">
            <label className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-line cursor-pointer">
              <span className="block text-xs uppercase tracking-widest text-accent mb-1">Check In</span>
              <input
                type="date"
                value={checkIn}
                min={todayISO}
                onChange={(e) => setField('checkIn', e.target.value)}
                className="w-full bg-transparent text-ink cursor-pointer"
              />
            </label>

            <label className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-line cursor-pointer">
              <span className="block text-xs uppercase tracking-widest text-accent mb-1">Check Out</span>
              <input
                type="date"
                value={checkOut}
                min={checkIn || todayISO}
                onChange={(e) => setField('checkOut', e.target.value)}
                className="w-full bg-transparent text-ink cursor-pointer"
              />
            </label>

            <label className="flex-1 px-4 py-2 relative cursor-pointer">
              <span className="block text-xs uppercase tracking-widest text-accent mb-1">Guests</span>
              <select
                value={guests}
                onChange={(e) => setField('guests', Number(e.target.value))}
                className="w-full bg-transparent text-ink cursor-pointer appearance-none pr-6"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-dark-ground">
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              {/* appearance-none removed the chevron; without one the select read as static text */}
              <span aria-hidden className="pointer-events-none absolute right-4 bottom-3 text-accent text-xs">▾</span>
            </label>

            <button
              onClick={goToSuites}
              className="flex items-center justify-center gap-2 bg-cta text-white px-8 py-4 rounded-control font-bold tracking-widest uppercase hover:bg-cta-hover transition-colors"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        <p data-intro className="text-center text-sm text-gray-400 mt-6 font-light">
          {nights > 0 ? (
            <>
              <span className="text-white font-medium">{availableCount}</span> of {results.length} suites free for{' '}
              <span className="text-white font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
              {' · '}every one includes the pool, the gym and the concierge
            </>
          ) : (
            <>Choose a check-out date to see what’s free</>
          )}
        </p>
      </div>
    </section>
  );
}
