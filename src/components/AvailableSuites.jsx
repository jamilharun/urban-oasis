import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '../context/booking';
import SuiteCard from './SuiteCard';

/**
 * A preview on the home page, not the index.
 *
 * This used to render all six cards, which made /suites a duplicate of it.
 * Home shows three and hands off; the index carries the sort, the filter and
 * the live search. Same SuiteCard in both, so they cannot drift.
 */
export default function AvailableSuites() {
  const { results, nights, availableCount } = useBooking();
  // Bookable first — a teaser led by something you cannot have is a bad teaser.
  const preview = results.slice(0, 3);

  return (
    <section id="suites" className="scroll-mt-24 pt-24 pb-32 text-ink relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-measure">
            <p className="text-accent eyebrow mb-4">Step one</p>
            <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-4">
              Pick your suite
            </h2>
            <p className="text-pretty text-ink-soft font-light">
              Six suites, each hosted by someone who lives in the building. Pick one, then attach
              the privileges you want — the stay is assembled, not listed.
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="text-xs text-ink-soft mb-3">
              {preview.length} of {results.length} shown · {availableCount} free for your dates
            </p>
            <Link
              to="/suites"
              className="inline-flex items-center gap-2 bg-accent-fill text-ink px-6 py-3 rounded-control font-semibold tracking-widest uppercase text-sm hover:bg-accent-fill/85 transition-colors"
            >
              See all suites <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preview.map(({ suite, status }) => (
            <SuiteCard key={suite.id} suite={suite} status={status} nights={nights} />
          ))}
        </div>

      </div>
    </section>
  );
}
