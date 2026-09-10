import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const overHero = useLocation().pathname === '/';
  // Grounded is the nav's base state, so under prefers-reduced-motion — where
  // the GSAP tween never runs — the bar stays legible instead of being
  // permanently transparent. The tween supplies the transparent start.

  return (
    <nav
      className="fixed w-full z-50 bg-condo-dark/70 backdrop-blur-md border-b border-white/10"
      {...(overHero ? { 'data-nav-over-hero': '' } : {})}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-display font-bold tracking-widest uppercase text-white">
            Urban Oasis
          </Link>

          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-condo-accent transition-colors"
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
            className="md:hidden text-white hover:text-condo-accent transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-white/10 bg-condo-dark/95 backdrop-blur-md"
      >
        <ul className="px-4 py-4 space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm uppercase tracking-wider text-gray-300 hover:text-condo-accent transition-colors"
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
