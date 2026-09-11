import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Absolute, route-prefixed targets: bare hashes were inert on /suite/:id,
// where none of these ids exist.
const links = [
  { to: '/suites', label: 'Suites' },
  { to: '/#privileges', label: 'Privileges' },
  { to: '/#building', label: 'The Building' },
  { to: '/#hosts', label: 'Hosts' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Only the home route has a hero to sit over. Everywhere else the bar keeps
  // its ground from the first pixel.
  // The bar is solid at every scroll position now. On the dark theme it could
  // start transparent over the hero and find its ground on scroll, because
  // white links held against the photograph. Ink links do not — a translucent
  // cream bar over a sunset reads as washed-out grey — so the transparency and
  // the tween that drove it are both gone.

  return (
    <nav
      className="fixed w-full z-50 bg-surface/95 backdrop-blur-md border-b border-line"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-display font-bold tracking-widest uppercase text-ink">
            Urban Oasis
          </Link>

          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm uppercase tracking-wider text-ink-soft hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden text-ink hover:text-accent transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-line bg-surface/95 backdrop-blur-md"
      >
        <ul className="px-4 py-4 space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm uppercase tracking-wider text-ink-soft hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
