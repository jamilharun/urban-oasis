import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#suites', label: 'Suites' },
  { href: '#privileges', label: 'Privileges' },
  { href: '#building', label: 'The Building' },
  { href: '#hosts', label: 'Hosts' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-condo-dark/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="text-2xl font-display font-bold tracking-widest uppercase text-white">
            Urban Oasis
          </a>

          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-condo-accent transition-colors"
              >
                {link.label}
              </a>
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
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm uppercase tracking-wider text-gray-300 hover:text-condo-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
