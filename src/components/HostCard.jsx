import { BadgeCheck, MessageCircle } from 'lucide-react';

/**
 * The differentiator in one component: the host is not a management company,
 * they live upstairs. `variant="inline"` sits inside a suite card; "full" is
 * the standalone block.
 */
export default function HostCard({ host, suiteFloor, variant = 'inline' }) {
  const gap = suiteFloor == null ? 0 : host.floor - suiteFloor;
  const distance = gap === 0
    ? 'Hosts this suite in person'
    : `Lives ${Math.abs(gap)} ${Math.abs(gap) === 1 ? 'floor' : 'floors'} ${gap > 0 ? 'up' : 'down'}`;

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3">
        <Monogram initials={host.initials} size="sm" />
        <div className="min-w-0">
          <p className="text-sm text-white truncate flex items-center gap-1.5">
            {host.name}
            <BadgeCheck className="w-3.5 h-3.5 text-condo-accent shrink-0" aria-label="Verified resident" />
          </p>
          <p className="text-xs text-gray-400">
            Floor {host.floor} · {distance}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-card p-6 flex gap-5">
      <Monogram initials={host.initials} size="lg" />
      <div className="space-y-2">
        <div>
          <p className="text-lg text-white flex items-center gap-2 font-display">
            {host.name}
            <BadgeCheck className="w-4 h-4 text-condo-accent" aria-label="Verified resident" />
          </p>
          <p className="text-xs uppercase tracking-widest text-condo-accent mt-1">
            Resident since {host.residentSince} · Floor {host.floor}
          </p>
        </div>
        <p className="text-sm text-gray-400 font-light leading-relaxed">{host.blurb}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
          <MessageCircle className="w-3.5 h-3.5" />
          Replies {host.responds}
        </p>
      </div>
    </div>
  );
}

function Monogram({ initials, size }) {
  const dims = size === 'lg' ? 'w-16 h-16 text-lg' : 'w-9 h-9 text-xs';
  return (
    <span
      aria-hidden
      className={`${dims} shrink-0 rounded-full border border-condo-accent/50 bg-condo-accent/10 text-condo-accent font-display tracking-wider flex items-center justify-center`}
    >
      {initials}
    </span>
  );
}
