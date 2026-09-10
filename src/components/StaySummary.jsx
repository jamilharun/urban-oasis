import { useState } from 'react';
import { ChevronUp, X, Sparkles } from 'lucide-react';
import { useBooking } from '../context/useBooking';
import { currency, formatDate } from '../data/building';

/**
 * "Guests aren't just booking a room; they are booking access." The dock is
 * where that sentence becomes visible: one basket holding a suite and the
 * privileges attached to it, priced together.
 */
export default function StaySummary() {
  const [open, setOpen] = useState(false);
  const {
    suite, nights, checkIn, checkOut, guests,
    chosenPrivileges, togglePrivilege, roomTotal, privilegeTotal, grandTotal, clearStay,
  } = useBooking();

  const itemCount = (suite ? 1 : 0) + chosenPrivileges.length;
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-rise">
      <div className="mx-auto max-w-5xl px-4 pb-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))]">
        {/* Opaque, not glass: this panel carries prices, so it must never let
            page content read through it — and backdrop-filter is not guaranteed. */}
        <div className="rounded-card border border-white/15 bg-condo-panel shadow-[0_-8px_48px_rgba(0,0,0,0.65)] overflow-hidden">
          {open && (
            <div className="p-5 border-b border-white/10 space-y-3 max-h-[55vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-condo-accent">Your stay</p>
                  <p className="text-sm text-gray-300 mt-1">
                    {formatDate(checkIn)} → {formatDate(checkOut)} · {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <button
                  onClick={clearStay}
                  className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>

              <ul className="divide-y divide-white/5">
                {suite && (
                  <li className="flex items-center justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="block text-white truncate">{suite.name}</span>
                      <span className="block text-xs text-gray-400">
                        Floor {suite.floor} · {currency(suite.price)} × {nights}{' '}
                        {nights === 1 ? 'night' : 'nights'} · hosted by {suite.host.name}
                      </span>
                    </span>
                    <span className="text-white shrink-0">{currency(roomTotal)}</span>
                  </li>
                )}

                {chosenPrivileges.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <span className="min-w-0 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-condo-accent shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-white truncate">{p.name}</span>
                        <span className="block text-xs text-gray-400">
                          Floor {p.floor} · {p.price ? p.unit : 'reserved, no charge'}
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-white">{p.price ? currency(p.price) : '—'}</span>
                      <button
                        onClick={() => togglePrivilege(p.id)}
                        aria-label={`Remove ${p.name} from your stay`}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {privilegeTotal > 0 && (
                <p className="text-xs text-gray-400 pt-1">
                  {currency(roomTotal)} suite + {currency(privilegeTotal)} privileges
                </p>
              )}
              {!suite && (
                <p className="text-xs text-condo-accent pt-1">
                  Privileges are held against a suite — pick one to complete the stay.
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex items-center gap-2 text-left min-w-0 sm:flex-1"
            >
              <ChevronUp
                className={`w-5 h-5 text-condo-accent shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
              />
              <span className="min-w-0">
                <span className="block text-white text-sm truncate">
                  {suite ? suite.name : 'No suite yet'}
                  {chosenPrivileges.length > 0 && ` + ${chosenPrivileges.length} privilege${chosenPrivileges.length === 1 ? '' : 's'}`}
                </span>
                <span className="block text-xs text-gray-400 whitespace-nowrap">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} · tap to {open ? 'hide' : 'review'}
                </span>
              </span>
            </button>

            <div className="flex items-center justify-between gap-4 sm:contents">
              <div className="sm:text-right shrink-0">
                <p className="text-xs uppercase tracking-widest text-condo-accent">Total</p>
                <p className="text-xl text-white font-display">{currency(grandTotal)}</p>
              </div>

              <button
              disabled={!suite}
              className={`shrink-0 px-6 py-3 rounded-control text-sm font-semibold tracking-widest uppercase transition-colors ${
                suite
                  ? 'bg-condo-accent text-condo-dark hover:bg-[#d4b878]'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
