import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { privilegesByFloor } from '../data/building';
import Plate from './Plate';

/**
 * Atmospheric on the home page: six tiles, names and floors, nothing else.
 *
 * This section used to repeat every field — description, hours, capacity,
 * price — that the reserve page's step 2 and the suite showcase already carry.
 * A price with no stay to attach it to means nothing, so the numbers live on
 * the reserve page now and this is purely the look of the thing. Ordered top
 * of the building down, so it reads as the same stack as the section below.
 */
export default function Privileges() {
  return (
    <section
      id="privileges"
      className="section-bloom relative overflow-hidden py-32 text-white border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-measure">
            <p className="text-condo-accent eyebrow mb-4">
              The privileges
            </p>
            <h2 className="text-display-sm md:text-display-md font-display font-light mb-4">Six floors of it</h2>
            <p className="text-gray-400 font-light">
              Three come with any suite. Three you attach when you reserve one. None of them are a
              day pass, a resort fee, or a phone number in another city.
            </p>
          </div>

          <Link
            to="/#suites"
            className="shrink-0 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-condo-accent hover:text-white transition-colors"
          >
            Pick a suite to attach them <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {privilegesByFloor.map((p) => (
            <li key={p.id} className="reveal frame-warm group relative rounded-card overflow-hidden border border-white/10">
              <div className="aspect-[4/5]">
                <Plate
                  src={p.image}
                  alt={p.name}
                  className="plate-hover w-full h-full object-cover"
                />
              </div>

              {/* Scrim, so the label holds at any brightness underneath. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-condo-dark via-condo-dark/25 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-condo-accent mb-1.5">
                  Floor {p.floorLabel ?? p.floor}
                </p>
                <p className="text-2xl font-display font-light">{p.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
