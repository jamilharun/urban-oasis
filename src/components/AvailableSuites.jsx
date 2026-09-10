import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/booking';
import { currency, formatDate } from '../lib/format';
import HostCard from './HostCard';
import { STATUS_ICON } from './statusIcons';
import Plate from './Plate';

export default function AvailableSuites() {
  const navigate = useNavigate();
  const { results, nights, checkIn, checkOut, guests, availableCount } = useBooking();

  return (
    <section id="suites" className="scroll-mt-24 pt-24 pb-32 text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-condo-accent/35 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-measure">
            <p className="text-condo-accent eyebrow mb-4">Step one</p>
            <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-4">Pick your suite</h2>
            <p className="text-pretty text-gray-400 font-light">
              Six suites, each hosted by someone who lives in the building. Pick one, then attach
              the privileges you want — the stay is assembled, not listed.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-card px-5 py-4 shrink-0">
            <p className="text-xs uppercase tracking-widest text-condo-accent mb-1">Your search</p>
            <p className="text-sm text-white">
              {formatDate(checkIn)} → {formatDate(checkOut)} · {nights} {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'}
            </p>
            <p className="text-xs text-gray-400 mt-1">{availableCount} available · {6 - availableCount} unavailable</p>
          </div>
        </div>

        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(({ suite, status }) => {
            const StatusIcon = STATUS_ICON[status.code];
            const stayTotal = suite.price * nights;

            return (
              <article
                key={suite.id}
                className={`reveal group rounded-card overflow-hidden flex flex-col border transition-colors ${
                  status.ok
                    ? 'group-hover:border-condo-accent/45 border-white/10 bg-white/5 hover:bg-white/10'
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
                      <span className="font-sans tabular-font-sans tabular-nums font-semibold text-white">{currency(suite.price)}</span>
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
                    <span className="font-sans tabular-font-sans tabular-nums text-lg text-white font-medium">
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
                        View Suite Details <ArrowUpRight className="w-4 h-4" />
                      </>
                    ) : (
                      status.label
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {availableCount === 0 && (
          <p className="text-center text-gray-400 font-light mt-12">
            Nothing is free for {formatDate(checkIn)} → {formatDate(checkOut)} at {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'}. Try shifting your dates — or ask the concierge to
            open a suite.
          </p>
        )}
      </div>
    </section>
  );
}
