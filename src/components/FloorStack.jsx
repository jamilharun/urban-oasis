import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { floorStack, privileges, suites } from '../data/building';
import Plate from './Plate';

const KIND_LABEL = {
  privilege: 'Guest privilege',
  suite: 'Suites',
  arrival: 'Arrival',
};

/**
 * For a single-address product, "location" is not geography — it is the stack.
 * This replaces the map: what is on which floor, and how far your lift ride is.
 */
export default function FloorStack() {
  const [activeKey, setActiveKey] = useState('sky');
  const active = floorStack.find((f) => f.key === activeKey) ?? floorStack[0];

  const linkedPrivileges = (active.links ?? []).map((id) => privileges.find((p) => p.id === id));
  const linkedSuites = (active.suiteIds ?? []).map((id) => suites.find((s) => s.id === id));

  return (
    <section id="building" className="scroll-mt-24 section-bloom relative overflow-hidden py-28 text-ink border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-measure">
          <p className="text-accent eyebrow mb-4">
            One address
          </p>
          <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-4">
            Everything is a lift ride
          </h2>
          <p className="text-pretty text-ink-soft font-light">
            There is no map here, because there is nowhere to go. Thirty-two floors, four of them
            given back to guests. Pick a floor to see what is on it.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* The stack */}
          <ol className="lg:w-[46%] shrink-0">
            {floorStack.map((floor) => {
              const isActive = floor.key === activeKey;
              return (
                <li key={floor.key}>
                  <button
                    onClick={() => setActiveKey(floor.key)}
                    aria-current={isActive}
                    className={`w-full text-left flex items-center gap-4 px-5 py-4 border-l-2 transition-colors ${
                      isActive
                        ? 'border-accent bg-accent-fill/20'
                        : floor.kind === 'privilege'
                          ? 'border-accent/30 bg-panel/[0.03] hover:bg-panel/[0.07]'
                          : 'border-line hover:bg-panel/[0.05]'
                    }`}
                  >
                    <span
                      className={`w-16 shrink-0 font-display text-sm tabular-nums ${
                        isActive ? 'text-accent' : 'text-ink-faint'
                      }`}
                    >
                      {floor.floors}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate ${isActive ? 'text-ink' : 'text-ink-soft'}`}>
                        {floor.label}
                      </span>
                      <span
                        className={`block text-[0.7rem] uppercase tracking-widest mt-0.5 ${
                          floor.kind === 'privilege' ? 'text-accent' : 'text-ink-faint'
                        }`}
                      >
                        {KIND_LABEL[floor.kind]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="flex items-center gap-2 px-5 pt-5 text-xs text-ink-faint">
              <ArrowDown className="w-3.5 h-3.5" />
              Street level · the city starts here
            </li>
          </ol>

          {/* The floor */}
          <div className="flex-1 min-w-0">
            <div className="rounded-card overflow-hidden border border-line bg-panel">
              <Plate
                key={active.image}
                src={active.image}
                alt={active.label}
                className="plate-drift w-full h-72 md:h-96 object-cover"
              />
              <div className="p-7 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent mb-2">
                    Floor {active.floors} · {KIND_LABEL[active.kind]}
                  </p>
                  <h3 className="text-balance text-3xl font-display font-light">{active.label}</h3>
                </div>
                <p className="text-pretty text-ink-soft font-light leading-relaxed">{active.note}</p>

                {linkedPrivileges.length > 0 && (
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {linkedPrivileges.map((p) => (
                      <li
                        key={p.id}
                        className="text-xs text-ink-soft border border-line rounded-full px-3 py-1"
                      >
                        {p.name} · {p.access === 'included' ? 'included' : p.access === 'paid' ? `$${p.price}` : 'reserve'}
                      </li>
                    ))}
                  </ul>
                )}

                {linkedSuites.length > 0 && (
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {linkedSuites.map((s) => (
                      <li
                        key={s.id}
                        className="text-xs text-ink-soft border border-line rounded-full px-3 py-1"
                      >
                        {s.name} · <span className="font-sans tabular-nums">${s.price}</span>/night
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={active.kind === 'privilege' ? '#privileges' : '#suites'}
                  className="inline-block text-xs uppercase tracking-widest text-accent hover:text-ink transition-colors pt-2"
                >
                  {active.kind === 'privilege' ? 'Add this to your stay →' : 'See these suites →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
