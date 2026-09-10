import { hosts } from '../data/building';
import HostCard from './HostCard';

export default function Hosts() {
  return (
    <section id="hosts" className="relative py-32 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <p className="text-condo-accent eyebrow mb-4">
              Resident-hosted
            </p>
            <h2 className="text-display-sm md:text-display-md font-display font-light mb-6">
              Your host lives here
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Not a management company, not a key-safe in a lobby. Four households in this building
              host the suites they own — which is why the concierge knows your name before you
              arrive, and why someone is standing at the lift when you do.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(hosts).map((host) => (
              <HostCard key={host.name} host={host} variant="full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
