import { hosts } from '../data/building';
import HostCard from './HostCard';
import Plate from './Plate';

export default function Hosts() {
  return (
    <section
      id="hosts"
      className="scroll-mt-24 relative isolate overflow-hidden py-32 text-white border-t border-white/5"
    >
      {/* The sky lounge: the one plate with people in it, and the floor where
          residents actually gather — which is the claim this section makes.
          founder.png would have been wrong; that portrait is the architect, and
          reusing it here would read as him being one of the hosts.
          The gradient runs left to right, so the room stays visible behind the
          heading and darkens under the cards, which are translucent. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Plate
          src="/images/lounge"
          alt=""
          className="w-full h-full object-cover object-center scale-105 blur-[2px] brightness-[0.75] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-condo-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-condo-dark/35 via-condo-dark/70 to-condo-dark/90" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="reveal lg:w-1/3">
            <p className="text-condo-accent eyebrow mb-4">
              Resident-hosted
            </p>
            <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-6">
              Your host lives here
            </h2>
            <p className="text-pretty text-gray-400 font-light leading-relaxed">
              Not a management company, not a key-safe in a lobby. Four households in this building
              host the suites they own — which is why the concierge knows your name before you
              arrive, and why someone is standing at the lift when you do.
            </p>
          </div>

          <div className="reveal-group lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(hosts).map((host) => (
              <HostCard key={host.name} host={host} variant="full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
