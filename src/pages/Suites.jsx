import { useMemo, useState } from 'react';
import { ArrowDownUp, Check } from 'lucide-react';
import { useBooking } from '../context/booking';
import { formatDate, currency } from '../lib/format';
import { suites } from '../data/building';
import SearchFields from '../components/SearchFields';
import SuiteCard from '../components/SuiteCard';

// Floor-descending is the default because it reads as the building, top down.
const SORTS = [
  { id: 'floor', label: 'Floor, top down', compare: (a, b) => b.suite.floor - a.suite.floor },
  { id: 'price-asc', label: 'Nightly, low to high', compare: (a, b) => a.suite.price - b.suite.price },
  { id: 'price-desc', label: 'Nightly, high to low', compare: (a, b) => b.suite.price - a.suite.price },
  { id: 'sleeps', label: 'Sleeps most', compare: (a, b) => b.suite.sleeps - a.suite.sleeps },
];

const cheapest = Math.min(...suites.map((s) => s.price));
const dearest = Math.max(...suites.map((s) => s.price));

export default function Suites() {
  const { results, nights, checkIn, checkOut, guests, availableCount } = useBooking();
  // View preferences, not booking facts, so they stay local to the page.
  const [sortId, setSortId] = useState('floor');
  const [availableOnly, setAvailableOnly] = useState(false);

  const shown = useMemo(() => {
    const sort = SORTS.find((s) => s.id === sortId) ?? SORTS[0];
    return results
      .filter((r) => (availableOnly ? r.status.ok : true))
      // Unbookable suites always sink, whatever the sort — an empty state is
      // more useful than a grid led by things you cannot have.
      .sort((a, b) => Number(b.status.ok) - Number(a.status.ok) || sort.compare(a, b));
  }, [results, sortId, availableOnly]);

  const hidden = results.length - shown.length;

  return (
    <main id="main" className="scroll-mt-24 pb-24 pt-28 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-measure">
          <p className="text-accent eyebrow mb-4">The building</p>
          <h1 className="text-balance text-display-sm md:text-display-lg font-display font-light mb-5">
            Every suite
          </h1>
          <p className="text-pretty text-ink-soft font-light">
            The whole building, {currency(cheapest)} to {currency(dearest)} a night. Change your
            dates here and the list answers — every suite shows what it would cost for your stay,
            and the ones that cannot take it say why.
          </p>
        </header>

        {/* Search is live on this page, so an unavailable result is fixable here. */}
        <section aria-label="Your dates" className="mb-6">
          <SearchFields />
        </section>

        {/* Controls: sort, and whether to show what you cannot book. */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10 pb-6 border-b border-line">
          <p className="text-sm text-ink-soft">
            <span className="text-ink font-medium">{availableCount}</span> of {results.length} free
            for{' '}
            <span className="text-ink font-medium">
              {formatDate(checkIn)} → {formatDate(checkOut)}
            </span>{' '}
            · {nights} {nights === 1 ? 'night' : 'nights'} · {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'}
            {hidden > 0 && <span className="text-ink-faint"> · {hidden} hidden</span>}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAvailableOnly((v) => !v)}
              aria-pressed={availableOnly}
              className={`inline-flex items-center gap-2 rounded-control border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                availableOnly
                  ? 'border-accent bg-accent-fill/25 text-accent'
                  : 'border-line text-ink-soft hover:text-ink hover:border-white/30'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${availableOnly ? '' : 'opacity-30'}`} />
              Available only
            </button>

            <label className="relative inline-flex items-center gap-2 rounded-control border border-line pl-4 pr-8 py-2">
              <ArrowDownUp className="w-3.5 h-3.5 text-accent" />
              <span className="sr-only">Sort by</span>
              <select
                value={sortId}
                onChange={(e) => setSortId(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-widest text-ink-soft appearance-none cursor-pointer focus-visible:text-ink"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface tracking-normal">
                    {s.label}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-3 text-accent text-xs">▾</span>
            </label>
          </div>
        </div>

        {shown.length > 0 ? (
          <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shown.map(({ suite, status }) => (
              <SuiteCard key={suite.id} suite={suite} status={status} nights={nights} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-line bg-panel p-10 text-center">
            <p className="text-xl font-display font-light mb-2">Nothing free for these dates</p>
            <p className="text-pretty text-ink-soft font-light mb-6 max-w-measure mx-auto">
              {formatDate(checkIn)} → {formatDate(checkOut)} at {guests}{' '}
              {guests === 1 ? 'guest' : 'guests'} leaves nothing bookable. Shift your dates above,
              or turn off the filter to see what the building holds.
            </p>
            {availableOnly && (
              <button
                onClick={() => setAvailableOnly(false)}
                className="eyebrow text-accent hover:text-ink transition-colors"
              >
                Show them all anyway →
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
