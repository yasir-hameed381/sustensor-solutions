import { useState, type CSSProperties } from 'react';
import { CircleCheck, Cloud, Cpu, Layers, ShoppingCart, type LucideIcon } from 'lucide-react';

import { disciplines } from '@/content/disciplines';
import { disciplineAnchorId, SECTION_IDS } from '@/content/sections';
import type { Discipline } from '@/content/types';
import { cn } from '@/lib/utils';

import { SectionHeading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { ToneContext } from '../ui/tone';
import { ArchitectureLinks } from './capabilities/ArchitectureLinks';
import { DisciplinePreview } from './capabilities/DisciplinePreview';

export const disciplineIcons: Record<string, LucideIcon> = {
  procurement: ShoppingCart,
  'saas-solutions': Cloud,
  technology: Cpu,
};

// Procurement (the longest copy) is the dark feature tile. SaaS uses the brand green.
const FEATURED_ID = 'procurement';
const BRAND_ID = 'saas-solutions';

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];

export function CapabilitiesSection() {
  return (
    <Section id={SECTION_IDS.capabilities} labelledBy="capabilities-heading" variant="canvas">
      <SectionHeading
        id="capabilities-heading"
        eyebrow="Capabilities"
        title="The Integrated Sustensor Architecture"
        lead={`${COUNT_WORDS[disciplines.length] ?? disciplines.length} connected disciplines. One operating view.`}
        align="center"
      />

      <ArchitectureLinks />

      {/* One row of three from lg. Each tile spans five shared rows (subgrid), so the capability lists start level across tiles. */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-0">
        {disciplines.map((discipline, index) => (
          <DisciplineTile key={discipline.id} discipline={discipline} index={index} />
        ))}
      </div>
    </Section>
  );
}

// Solution copy longer than this is shortened (with "Read more") so the three tiles stay balanced.
const LONG_SOLUTION = 320;

function DisciplineTile({ discipline, index }: { discipline: Discipline; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const inverse = discipline.id === FEATURED_ID;
  const Icon = disciplineIcons[discipline.id] ?? Layers;
  const label = inverse ? 'text-accent-300' : 'text-accent-700';
  const muted = inverse ? 'text-fg-inverse-muted' : 'text-fg-muted';
  const long = discipline.solution.length > LONG_SOLUTION;
  const solutionId = `${disciplineAnchorId(discipline.id)}-solution`;

  return (
    <ToneContext.Provider value={inverse ? 'inverse' : 'light'}>
      <article
        id={disciplineAnchorId(discipline.id)}
        aria-labelledby={`${disciplineAnchorId(discipline.id)}-title`}
        data-reveal
        style={{ '--reveal-index': index % 3 } as CSSProperties}
        className={cn(
          'flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-(--duration-base) target:shadow-glow sm:p-8 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-y-0',
          inverse ? 'border-ink-800 bg-ink-900 text-fg-inverse' : 'border-hairline bg-surface shadow-xs',
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <IconTile icon={Icon} size="lg" tone={discipline.id === BRAND_ID ? 'brand' : 'accent'} />
          <span className={cn('text-caption font-semibold tabular-nums', inverse ? 'text-fg-inverse-subtle' : 'text-fg-subtle')}>
            {discipline.number} / {String(disciplines.length).padStart(2, '0')}
          </span>
        </div>
        <h3 id={`${disciplineAnchorId(discipline.id)}-title`} className={cn('mt-6 text-h3', inverse ? 'text-fg-inverse' : 'text-fg')}>
          {discipline.title}
        </h3>
        <DisciplinePreview id={discipline.id} inverse={inverse} />

        <dl className="mt-6 grid gap-5">
          <div>
            <dt className={cn('text-eyebrow uppercase', label)}>The logic</dt>
            <dd className={cn('mt-2 text-body', muted)}>{discipline.logic}</dd>
          </div>
          <div>
            <dt className={cn('text-eyebrow uppercase', label)}>The solution</dt>
            <dd className="mt-2">
              <p id={solutionId} className={cn('text-body font-medium', inverse ? 'text-fg-inverse' : 'text-fg', long && !expanded && 'line-clamp-7')}>
                {discipline.solution}
              </p>
              {long && (
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={solutionId}
                  onClick={() => setExpanded(!expanded)}
                  className={cn('-my-1.5 mt-0.5 py-2.5 text-small font-semibold hover:underline', inverse ? 'text-accent-300' : 'text-accent-700')}
                >
                  {expanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </dd>
          </div>
        </dl>

        {/* Capabilities: the last subgrid row, so the lists start level across tiles; pinned to the bottom when tiles stack. */}
        <div className={cn('mt-8 border-t pt-6', inverse ? 'border-hairline-inverse' : 'border-hairline')}>
          <h4 className={cn('text-eyebrow uppercase', label)}>Capabilities</h4>
          <ul className="mt-3 grid gap-2">
            {discipline.capabilities.map((capability) => (
              <li key={capability} className={cn('flex items-start gap-2 text-caption font-medium', inverse ? 'text-fg-inverse-muted' : 'text-fg-muted')}>
                <CircleCheck aria-hidden="true" className={cn('mt-px size-3.5 shrink-0', inverse ? 'text-accent-300' : 'text-accent-600')} />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </ToneContext.Provider>
  );
}
