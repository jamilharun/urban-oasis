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
          ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-condo-accent/45'
          : 'border-white/5 bg-white/[0.02]'
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
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs tracking-widest uppercase text-gray-200">
          Floor {suite.floor}
        </div>
        {status.ok ? (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
            <span className="font-sans tabular-nums font-semibold text-white">{currency(suite.price)}</span>
            <span className="text-gray-300 text-xs font-light"> / night</span>
          </div>
        ) : (
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-2 rounded-control border border-white/10">
            {StatusIcon && <StatusIcon className="w-4 h-4 text-gray-300 shrink-0" />}
            <span className="text-xs text-gray-200">{status.label}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-condo-accent text-xs tracking-widest uppercase mb-2">{suite.type}</p>
        <h3 className="text-balance text-2xl font-display font-light mb-4">{suite.name}</h3>

        <div className="mb-5 pb-5 border-b border-white/10">
          <HostCard host={suite.host} suiteFloor={suite.floor} />
        </div>

        <div className="flex items-baseline justify-between mb-5 mt-auto">
          <span className="text-sm text-gray-400">
            {nights} {nights === 1 ? 'night' : 'nights'} · sleeps {suite.sleeps}
          </span>
          <span className="font-sans tabular-nums text-lg text-white font-medium">
            {status.ok ? currency(stayTotal) : '—'}
          </span>
        </div>

        <button
          onClick={() => navigate(`/suite/${suite.id}`)}
          disabled={!status.ok}
          className={`w-full py-3 rounded-control font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-colors ${
            status.ok
              ? 'bg-condo-accent text-condo-dark hover:bg-[#d4b878]'
              : 'bg-white/5 text-gray-500 cursor-not-allowed'
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
