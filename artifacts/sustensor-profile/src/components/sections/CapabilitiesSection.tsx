import type { CSSProperties } from 'react';
import { Cloud, Cpu, Layers, ShoppingCart, type LucideIcon } from 'lucide-react';

import { disciplines } from '@/content/disciplines';
import { disciplineAnchorId, SECTION_IDS } from '@/content/sections';
import type { Discipline } from '@/content/types';
import { cn } from '@/lib/utils';

import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { ToneContext } from '../ui/tone';

const icons: Record<string, LucideIcon> = {
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

      <ArchitectureDiagram />

      {/* One row of three from lg; cards stretch to a shared height. */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {disciplines.map((discipline, index) => (
          <DisciplineTile key={discipline.id} discipline={discipline} index={index} />
        ))}
      </div>
    </Section>
  );
}

/** The disciplines feeding a single operating layer. */
function ArchitectureDiagram() {
  return (
    <figure data-reveal className="mx-auto mt-12 max-w-4xl lg:mt-16">
      <ol className="grid grid-cols-3 gap-3">
        {disciplines.map((discipline, index) => {
          const Icon = icons[discipline.id] ?? Layers;
          return (
            <li key={discipline.id} className="group relative flex flex-col items-center">
              <a
                href={`#${disciplineAnchorId(discipline.id)}`}
                className="flex w-full flex-col items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-4 text-center shadow-xs transition-[border-color,box-shadow,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
              >
                <Icon
                  aria-hidden="true"
                  className={cn('size-5', discipline.id === BRAND_ID ? 'text-brand-600' : 'text-accent-700')}
                  strokeWidth={1.75}
                />
                <span className="text-small font-semibold text-fg">{discipline.title}</span>
              </a>
              {/* Connector with a pulse of "data" flowing down into the operating layer. */}
              <span aria-hidden="true" className="relative h-6 w-px bg-linear-to-b from-accent-300 to-accent-500">
                <span
                  className={cn(
                    'animate-flow absolute -left-[2.5px] top-0 size-1.5 rounded-full',
                    discipline.id === BRAND_ID ? 'bg-brand-500' : 'bg-accent-500',
                  )}
                  style={{ '--i': index } as CSSProperties}
                />
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="relative flex items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-ink-950 px-5 py-4 text-small font-semibold text-fg-inverse shadow-md">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/4 w-1/2 bg-accent-500/20 blur-2xl" />
        <Layers aria-hidden="true" className="relative size-4 text-accent-300" />
        <span className="relative">One architecture · no silos</span>
      </figcaption>
    </figure>
  );
}

function DisciplineTile({ discipline, index }: { discipline: Discipline; index: number }) {
  const inverse = discipline.id === FEATURED_ID;
  const Icon = icons[discipline.id] ?? Layers;
  const label = inverse ? 'text-accent-300' : 'text-accent-700';
  const muted = inverse ? 'text-fg-inverse-muted' : 'text-fg-muted';

  return (
    <ToneContext.Provider value={inverse ? 'inverse' : 'light'}>
      <article
        id={disciplineAnchorId(discipline.id)}
        aria-labelledby={`${disciplineAnchorId(discipline.id)}-title`}
        data-reveal
        style={{ '--reveal-index': index % 3 } as CSSProperties}
        className={cn(
          'flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-(--duration-base) target:shadow-glow sm:p-8 lg:p-10',
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

        <dl className="mb-8 mt-6 grid gap-5">
          <div>
            <dt className={cn('text-eyebrow uppercase', label)}>The logic</dt>
            <dd className={cn('mt-2 text-body', muted)}>{discipline.logic}</dd>
          </div>
          <div>
            <dt className={cn('text-eyebrow uppercase', label)}>The solution</dt>
            <dd className={cn('mt-2 text-body font-medium', inverse ? 'text-fg-inverse' : 'text-fg')}>{discipline.solution}</dd>
          </div>
        </dl>

        {/* mt-auto pins the capabilities to the bottom of the card. */}
        <div className={cn('mt-auto border-t pt-6', inverse ? 'border-hairline-inverse' : 'border-hairline')}>
          <h4 className={cn('text-eyebrow uppercase', label)}>Capabilities</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {discipline.capabilities.map((capability) => (
              <li key={capability}>
                <Badge tone="neutral">{capability}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </ToneContext.Provider>
  );
}
