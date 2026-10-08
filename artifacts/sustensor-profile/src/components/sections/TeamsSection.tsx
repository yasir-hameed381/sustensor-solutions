import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';

import { SECTION_IDS } from '@/content/sections';
import { teams } from '@/content/teams';
import { cn } from '@/lib/utils';

import { Accent, SectionHeading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';

/**
 * "Built for every team": one card per stakeholder, each opening with the question that team asks (procure-verse's
 * stakeholder fit) in compliverse-style cards: a coloured top edge that brightens and glows on hover.
 */
export function TeamsSection() {
  return (
    <Section id={SECTION_IDS.teams} labelledBy="teams-heading" variant="surface">
      <SectionHeading
        id="teams-heading"
        eyebrow="Built for every team"
        title={
          <>
            Every team sees <Accent>its risk addressed.</Accent>
          </>
        }
        lead="Procurement, finance, sustainability and IT each judge a platform by a different question. Here is how we answer each one."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {teams.map((team, index) => (
          <li key={team.team} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
            <article className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas p-6 transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-out-soft hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg">
              {/* Coloured top edge: thin at rest, brighter with a soft glow on hover. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-0 top-0 h-1 bg-linear-to-r opacity-70 transition-opacity duration-(--duration-base) group-hover:opacity-100',
                  team.tone === 'brand' ? 'from-brand-500 to-brand-300' : 'from-accent-600 to-accent-300',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-6 -top-6 h-10 rounded-full opacity-0 blur-2xl transition-opacity duration-(--duration-base) group-hover:opacity-60',
                  team.tone === 'brand' ? 'bg-brand-300' : 'bg-accent-300',
                )}
              />
              <div className="flex items-center gap-3">
                <span className="icon-wiggle inline-flex" style={{ '--i': index } as CSSProperties}>
                <IconTile icon={team.icon} size="sm" tone={team.tone} />
              </span>
                <p className={cn('text-eyebrow uppercase', team.tone === 'brand' ? 'text-brand-700' : 'text-accent-700')}>{team.team}</p>
              </div>
              <h3 className="mt-5 text-h4 text-fg">{team.question}</h3>
              <p className="mb-5 mt-2 text-small text-fg-muted">{team.answer}</p>
              <p
                className={cn(
                  'mt-auto flex gap-2 border-l-2 pl-3 text-small font-medium text-fg',
                  team.tone === 'brand' ? 'border-brand-500' : 'border-accent-500',
                )}
              >
                <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600 transition-transform duration-(--duration-base) group-hover:translate-x-0.5" />
                {team.outcome}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
