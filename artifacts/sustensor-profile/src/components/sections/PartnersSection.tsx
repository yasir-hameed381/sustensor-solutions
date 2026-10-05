import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { backers, type Backer } from '@/content/partners';
import { SECTION_IDS } from '@/content/sections';
import { cn } from '@/lib/utils';

import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';

/** "Backed by": the technology partner, cloud platform, and in-house team behind Sustensor's delivery. */
export function PartnersSection() {
  return (
    <Section
      id={SECTION_IDS.partners}
      labelledBy="partners-heading"
      variant="ink"
      backdrop={
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid-inverse absolute inset-0 opacity-40 mask-fade-radial-l" />
          <div className="absolute -right-32 -top-24 size-128 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 size-96 rounded-full bg-brand-500/10 blur-3xl" />
        </div>
      }
    >
      <SectionHeading
        id="partners-heading"
        eyebrow="Backed by"
        title={
          <>
            The Sustensor <Accent>advantage.</Accent>
          </>
        }
        lead="Delivery strength from a dedicated technology partner, enterprise-grade cloud hosting, and our own procurement and ESG specialists."
      />

      <ul className={cn('mt-12 grid gap-4 lg:mt-14 lg:gap-5', backers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
        {backers.map((backer, index) => (
          <li key={backer.label} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
            <BackerCard backer={backer} number={index + 1} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function BackerCard({ backer, number }: { backer: Backer; number: number }) {
  const Icon = backer.icon;
  const content = (
    <>
      <p className="flex items-baseline gap-2.5 text-small text-fg-inverse-muted">
        <span className="font-semibold tabular-nums text-accent-300">{String(number).padStart(2, '0')}</span>
        {backer.label}
      </p>
      <div className="flex flex-1 items-center justify-center py-10">
        {backer.logo ? (
          <img src={backer.logo} alt={backer.name} width={455} height={140} className="h-10 w-auto sm:h-11" />
        ) : (
          <span className="flex flex-col items-center gap-3 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-hairline-inverse bg-white/6 text-accent-300">
              <Icon aria-hidden="true" className="size-7" strokeWidth={1.5} />
            </span>
            <span className="text-h4 text-fg-inverse">{backer.name}</span>
          </span>
        )}
      </div>
      {backer.url && (
        <span className="flex items-center justify-end gap-1 text-caption font-semibold text-accent-300">
          Visit website
          <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-(--duration-fast) group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      )}
    </>
  );

  const className =
    'spotlight spotlight-inverse group flex h-full min-h-64 flex-col rounded-2xl border border-hairline-inverse bg-white/4 p-6 transition-colors duration-(--duration-base) sm:p-7';
  return backer.url ? (
    <a href={backer.url} target="_blank" rel="noreferrer" className={`${className} hover:border-hairline-inverse-strong hover:bg-white/6`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
