import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currency } from '../lib/format';
import HostCard from './HostCard';
import { STATUS_ICON } from './statusIcons';
import Plate from './Plate';

/**
 * One suite in a grid. Shared by the home preview and the /suites index so the
 * two can never drift — the card was previously inline in AvailableSuites.
 */
export default function SuiteCard({ suite, status, nights }) {
  const navigate = useNavigate();
  const StatusIcon = STATUS_ICON[status.code];
  const stayTotal = suite.price * nights;

  return (
    <article
      className={`group rounded-card overflow-hidden flex flex-col border transition-colors ${
        status.ok
          ? 'border-line bg-panel hover:bg-panel hover:border-accent/45'
          : 'border-line bg-surface-sunk'
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <Plate
          src={suite.image}
          alt={suite.name}
          className={`transition duration-500 group-hover:brightness-105 group-hover:saturate-[1.04] w-full h-full object-cover ${
            status.ok ? '' : 'grayscale opacity-40'
          }`}
        />
        <div className="absolute top-4 left-4 bg-panel/90 backdrop-blur-md px-3 py-1 rounded-full border border-line text-xs tracking-widest uppercase text-ink">
          Floor {suite.floor}
        </div>
        {status.ok ? (
          <div className="absolute top-4 right-4 bg-panel/90 backdrop-blur-md px-3 py-1 rounded-full border border-line shadow-lg">
            <span className="font-sans tabular-nums font-semibold text-ink">{currency(suite.price)}</span>
            <span className="text-ink-soft text-xs font-light"> / night</span>
          </div>
        ) : (
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 bg-panel/95 backdrop-blur-md px-3 py-2 rounded-control border border-line">
            {StatusIcon && <StatusIcon className="w-4 h-4 text-ink-soft shrink-0" />}
            <span className="text-xs text-ink">{status.label}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-accent text-xs tracking-widest uppercase mb-2">{suite.type}</p>
        <h3 className="text-balance text-2xl font-display font-light mb-4">{suite.name}</h3>

        <div className="mb-5 pb-5 border-b border-line">
          <HostCard host={suite.host} suiteFloor={suite.floor} />
        </div>

        <div className="flex items-baseline justify-between mb-5 mt-auto">
          <span className="text-sm text-ink-soft">
            {nights} {nights === 1 ? 'night' : 'nights'} · sleeps {suite.sleeps}
          </span>
          <span className="font-sans tabular-nums text-lg text-ink font-medium">
            {status.ok ? currency(stayTotal) : '—'}
          </span>
        </div>

        <button
          onClick={() => navigate(`/suite/${suite.id}`)}
          disabled={!status.ok}
          className={`w-full py-3 rounded-control font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-colors ${
            status.ok
              ? 'bg-accent-fill text-ink hover:bg-accent-fill/85'
              : 'bg-panel text-ink-faint cursor-not-allowed'
          }`}
        >
          {status.ok ? (
            <>
              View suite <ArrowUpRight className="w-4 h-4" />
            </>
          ) : (
            status.label
          )}
        </button>
      </div>
    </article>
  );
}
