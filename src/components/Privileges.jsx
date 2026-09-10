import { Check, Plus, Clock, Users, Building2 } from 'lucide-react';
import { useBooking } from '../context/useBooking';
import { addablePrivileges, standingPrivileges, currency } from '../data/building';

export default function Privileges() {
  const { privilegeIds, togglePrivilege, suite } = useBooking();

  return (
    <section id="privileges" className="section-bloom relative overflow-hidden py-24 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-xl">
          <p className="text-condo-accent uppercase tracking-[0.2em] text-sm font-semibold mb-4">Step two</p>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">Attach your privileges</h2>
          <p className="text-gray-400 font-light">
            This is the part a listing platform has no way to sell you. Three privileges come with
            every suite. Three more are yours to add — held before you land, billed with the stay.
          </p>
        </div>

        {/* Standing entitlements — no booking, so they are stated, not offered. */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Included with every suite
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {standingPrivileges.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-card p-5"
              >
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-condo-accent/15 border border-condo-accent/40 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-condo-accent" />
                </span>
                <div>
                  <p className="text-white">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.hours} · Floor {p.floor}</p>
                  <p className="text-sm text-gray-400 font-light mt-2 leading-relaxed">{p.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The add-to-stay line items. */}
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Add to your stay</p>
        <div className="space-y-6">
          {addablePrivileges.map((p) => {
            const added = privilegeIds.includes(p.id);
            return (
              <article
                key={p.id}
                className={`flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-card border overflow-hidden transition-colors ${
                  added ? 'border-condo-accent bg-condo-accent/[0.08]' : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="lg:w-80 shrink-0 h-56 lg:h-auto">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6 lg:py-8 lg:pr-8 flex flex-col lg:flex-row gap-6 lg:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-display font-light">{p.name}</h3>
                      {p.access === 'reservation' && (
                        <span className="text-[0.65rem] uppercase tracking-widest text-condo-accent border border-condo-accent/40 rounded-full px-2 py-0.5">
                          Free · reserve a slot
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">{p.description}</p>

                    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-condo-accent" />
                        <dt className="sr-only">Floor</dt>
                        <dd>Floor {p.floor}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-condo-accent" />
                        <dt className="sr-only">Hours</dt>
                        <dd>{p.hours}</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-condo-accent" />
                        <dt className="sr-only">Access</dt>
                        <dd>{p.capacity}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="lg:w-52 shrink-0 lg:text-right">
                    <p className="mb-3">
                      <span className="text-2xl font-display text-white">
                        {p.price ? currency(p.price) : 'No charge'}
                      </span>
                      {p.unit && <span className="block text-xs text-gray-400 mt-1">{p.unit}</span>}
                    </p>
                    <button
                      onClick={() => togglePrivilege(p.id)}
                      aria-pressed={added}
                      className={`w-full py-3 px-4 rounded-control text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                        added
                          ? 'bg-white text-condo-dark'
                          : 'border border-condo-accent text-condo-accent hover:bg-condo-accent hover:text-condo-dark'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add
                        </>
                      )}
                    </button>
                    {!suite && (
                      <p className="text-[0.7rem] text-gray-500 mt-2 leading-snug">
                        Attaches to your suite
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
