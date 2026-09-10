import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '../context/booking';
import { formatDate } from '../lib/format';
import SuiteCard from './SuiteCard';

/**
 * A preview on the home page, not the index.
 *
 * This used to render all six cards, which made /suites a duplicate of it.
 * Home shows three and hands off; the index carries the sort, the filter and
 * the live search. Same SuiteCard in both, so they cannot drift.
 */
export default function AvailableSuites() {
  const { results, nights, checkIn, checkOut, guests, availableCount } = useBooking();
  // Bookable first — a teaser led by something you cannot have is a bad teaser.
  const preview = results.slice(0, 3);

  return (
    <section id="suites" className="scroll-mt-24 pt-24 pb-32 text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-condo-accent/35 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-measure">
            <p className="text-condo-accent eyebrow mb-4">Step one</p>
            <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-4">
              Pick your suite
            </h2>
            <p className="text-pretty text-gray-400 font-light">
              Six suites, each hosted by someone who lives in the building. Pick one, then attach
              the privileges you want — the stay is assembled, not listed.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-card px-5 py-4 shrink-0">
            <p className="text-xs uppercase tracking-widest text-condo-accent mb-1">Your search</p>
            <p className="text-sm text-white">
              {formatDate(checkIn)} → {formatDate(checkOut)} · {nights}{' '}
              {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {availableCount} available · {results.length - availableCount} unavailable
            </p>
          </div>
        </div>

        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preview.map(({ suite, status }) => (
            <SuiteCard key={suite.id} suite={suite} status={status} nights={nights} />
          ))}
        </div>

        <div className="reveal mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-card border border-white/10 bg-white/5 px-7 py-6">
          <p className="text-pretty text-gray-300 font-light">
            Three of six shown. The full list sorts by floor, nightly rate or how many it sleeps.
          </p>
          <Link
            to="/suites"
            className="shrink-0 inline-flex items-center gap-2 bg-condo-accent text-condo-dark px-6 py-3 rounded-control font-semibold tracking-widest uppercase text-sm hover:bg-[#d4b878] transition-colors"
          >
            See all six suites <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
