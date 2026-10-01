import { ArrowUp, Mail, MapPin, MessageCircle } from 'lucide-react';

import { company } from '@/content/company';
import type { NavLink } from '@/content/navigation';
import { SECTION_IDS, sectorAnchorId } from '@/content/sections';
import { sectors } from '@/content/sectors';
import { solutions } from '@/content/solutions';

import { BrandMark } from '../shared/BrandMark';
import { Container } from '../ui/Container';

const solutionLinks: NavLink[] = solutions.map((solution) => ({
  label: solution.title,
  href: `#${SECTION_IDS.solutions}`,
  action: { type: 'solution', id: solution.id },
}));

const sectorLinks: NavLink[] = sectors.map((sector) => ({ label: sector.name, href: `#${sectorAnchorId(sector.id)}` }));

const companyLinks: NavLink[] = [
  { label: 'Who we are', href: `#${SECTION_IDS.about}` },
  { label: 'The reality check', href: `#${SECTION_IDS.realityCheck}` },
  { label: 'Integrated architecture', href: `#${SECTION_IDS.capabilities}` },
  { label: 'Regional vision', href: `#${SECTION_IDS.region}` },
  { label: 'Our team', href: `#${SECTION_IDS.team}` },
];

export function SiteFooter({ onNavigate }: { onNavigate: (link: NavLink) => void }) {
  const year = new Date().getFullYear();

  const columns = [
    { title: 'Solutions', links: solutionLinks },
    { title: 'Company', links: companyLinks },
    { title: 'Sectors', links: sectorLinks },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-fg-inverse-muted">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 size-160 -translate-x-1/2 rounded-full bg-accent-600/10 blur-3xl" />
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <BrandMark />
          <p className="mt-5 max-w-xs text-small">{company.focus}</p>
          <ul className="mt-6 space-y-3 text-small">
            <li>
              <a href={company.emailUrl} className="inline-flex items-center gap-2.5 hover:text-fg-inverse">
                <Mail aria-hidden="true" className="size-4 text-accent-300" />
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 hover:text-fg-inverse">
                <MessageCircle aria-hidden="true" className="size-4 text-accent-300" />
                {company.phone}
                <span className="sr-only">(WhatsApp, opens in a new tab)</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin aria-hidden="true" className="size-4 text-accent-300" />
              {company.locationLong}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
          {columns.map((column) => (
            // Phones: Solutions and Company side by side, Sectors full width in two columns.
            <div key={column.title} className={column.title === 'Sectors' ? 'col-span-2 sm:col-span-1' : undefined}>
              <h2 className="text-eyebrow uppercase text-fg-inverse">{column.title}</h2>
              <ul className={column.title === 'Sectors' ? 'mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1' : 'mt-4 space-y-2.5'}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => onNavigate(link)}
                      className="text-small transition-colors duration-(--duration-fast) hover:text-fg-inverse"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      {/* Oversized gradient wordmark. */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none bg-linear-to-b from-white/12 to-transparent bg-clip-text px-4 text-center text-wordmark text-transparent"
      >
        {company.shortName}
      </p>

      <div className="border-t border-hairline-inverse">
        <Container className="flex flex-col gap-4 py-6 text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved. · {company.location}
          </p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-hairline-inverse-strong px-4 py-1.5 text-fg-inverse transition-colors duration-(--duration-fast) hover:bg-white/5 sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
