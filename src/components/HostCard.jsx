import { BadgeCheck, MessageCircle } from 'lucide-react';
import Plate from './Plate';

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
        <Avatar host={host} size="sm" />
        <div className="min-w-0">
          <p className="text-sm text-ink truncate flex items-center gap-1.5">
            {host.name}
            <BadgeCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-label="Verified resident" />
          </p>
          <p className="text-xs text-ink-soft">
            Floor {host.floor} · {distance}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-panel backdrop-blur-sm border border-line rounded-card p-6 flex gap-5">
      <Avatar host={host} size="lg" />
      <div className="space-y-2">
        <div>
          <p className="text-lg text-ink flex items-center gap-2 font-display">
            {host.name}
            <BadgeCheck className="w-4 h-4 text-accent" aria-label="Verified resident" />
          </p>
          <p className="text-xs uppercase tracking-widest text-accent mt-1">
            Resident since {host.residentSince} · Floor {host.floor}
          </p>
        </div>
        <p className="text-sm text-ink-soft font-light leading-relaxed">{host.blurb}</p>
        <p className="text-xs text-ink-faint flex items-center gap-1.5 pt-1">
          <MessageCircle className="w-3.5 h-3.5" />
          Replies {host.responds}
        </p>
      </div>
    </div>
  );
}

/**
 * A portrait where one exists, the monogram otherwise — a host added without a
 * photograph still renders rather than leaving a hole.
 *
 * The image is decorative: the host's name sits beside it in text, so alt=""
 * stops a screen reader announcing the same person twice.
 */
function Avatar({ host, size }) {
  const dims = size === 'lg' ? 'w-16 h-16 text-lg' : 'w-9 h-9 text-xs';
  const ring = 'shrink-0 rounded-full border border-accent/40 overflow-hidden';

  if (host.photo) {
    return (
      <span className={`${dims} ${ring} block`}>
        <Plate src={host.photo} alt="" className="w-full h-full object-cover" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={`${dims} ${ring} bg-accent-fill/20 text-accent font-display tracking-wider flex items-center justify-center`}
    >
      {host.initials}
    </span>
  );
}
