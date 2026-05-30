// components/EarthenHomes/subcomponents/Footer.tsx
import React from 'react';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Earth Building Techniques', href: '/earth-building-techniques' },
      { label: 'Earth-Sheltered Homes', href: '/earth-sheltered-homes' },
      { label: 'Earthships & Off-Grid', href: '/earthships-off-grid-living' },
      { label: 'Affordable Homes', href: '/affordable-earthen-homes' },
      { label: 'Benefits', href: '/benefits-of-earthen-homes' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Beginner\'s Guide', href: '/beginners-guide' },
      { label: 'Cost Calculator', href: '/cost-calculator' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Builder Directory', href: '/builders' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="bg-earth-brown text-white/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-white" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 4L4 16H8V32H16V22H24V32H32V16H36L20 4Z" fill="currentColor" opacity="0.3" />
              <path d="M20 8L8 17H12V30H18V20H22V30H28V17H32L20 8Z" fill="currentColor" />
            </svg>
            <span className="text-xl font-semibold text-white">The Earthen Homes</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Ancient material. Timeless wisdom. Modern living.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">{group.title}</h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
        <p>© 2026 The Earthen Homes. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);