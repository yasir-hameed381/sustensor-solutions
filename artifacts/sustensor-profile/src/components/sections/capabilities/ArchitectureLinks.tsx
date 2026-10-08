import { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';

import { disciplineLinks, disciplines } from '@/content/disciplines';
import { disciplineAnchorId } from '@/content/sections';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import { disciplineIcons } from '../CapabilitiesSection';

/*
 * "Integrated architecture" linkage diagram (idea from compliverse.ai's 360° linkage model).
 * The three disciplines sit on a triangle around one operating view. Each link has a reason; the active link lights
 * up with flowing dashes and its reason is shown in the list. Links cycle on their own while on screen, and pause
 * while the visitor hovers or chooses one.
 */

const LINK_MS = 1800;

/** Node centres in % of the diagram box. */
const POSITIONS: Record<string, { x: number; y: number }> = {
  procurement: { x: 50, y: 14 },
  'saas-solutions': { x: 84, y: 82 },
  technology: { x: 16, y: 82 },
};
const HUB = { x: 50, y: 60 };

export function ArchitectureLinks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ref, inView] = useInView<HTMLElement>();
  useEffect(() => setReduced(prefersReducedMotion()), []);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % disciplineLinks.length), LINK_MS);
    return () => window.clearTimeout(timer);
  }, [active, inView, paused, reduced]);

  const link = disciplineLinks[active];
  const isLit = (id: string) => id === link.from || id === link.to;
  const title = (id: string) => disciplines.find((discipline) => discipline.id === id)?.title ?? id;

  return (
    <figure
      ref={ref}
      data-reveal
      className="mx-auto mt-12 grid max-w-5xl items-center gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Diagram */}
      <div className="relative mx-auto aspect-[5/4] w-full max-w-md">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {/* Spokes to the operating view */}
          {disciplines.map((discipline) => {
            const p = POSITIONS[discipline.id];
            return (
              <line
                key={discipline.id}
                x1={p.x}
                y1={p.y}
                x2={HUB.x}
                y2={HUB.y}
                stroke="var(--color-hairline-strong)"
                strokeWidth="1"
                strokeDasharray="2 4"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {/* Links between disciplines */}
          {disciplineLinks.map((item, index) => {
            const a = POSITIONS[item.from];
            const b = POSITIONS[item.to];
            const on = index === active;
            return (
              <line
                key={`${item.from}-${item.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={on ? 'var(--color-accent-500)' : 'var(--color-hairline-strong)'}
                strokeWidth={on ? 2.5 : 1.5}
                vectorEffect="non-scaling-stroke"
                className={cn('transition-[stroke,stroke-width] duration-500', on && 'animate-dash')}
              />
            );
          })}
        </svg>

        {/* Operating view hub */}
        <span
          className="absolute flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink-950 text-center text-fg-inverse shadow-lg ring-4 ring-accent-500/15 sm:size-24"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <Layers aria-hidden="true" className="size-4 text-accent-300" />
          {/* Three short lines so the label fits inside the circle at every size. */}
          <span className="mt-1 text-micro font-semibold leading-tight">
            One
            <br />
            operating
            <br />
            view
          </span>
        </span>

        {/* Discipline nodes: link to their cards below */}
        {disciplines.map((discipline) => {
          const p = POSITIONS[discipline.id];
          const Icon = disciplineIcons[discipline.id] ?? Layers;
          const lit = isLit(discipline.id);
          return (
            <a
              key={discipline.id}
              href={`#${disciplineAnchorId(discipline.id)}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={cn(
                'absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl border bg-surface px-2 py-2.5 text-center shadow-xs transition-[border-color,box-shadow,transform] duration-500 sm:w-28',
                lit ? 'scale-105 border-accent-500 shadow-glow' : 'border-hairline hover:border-accent-300',
              )}
            >
              <Icon aria-hidden="true" className={cn('size-5 transition-colors duration-500', lit ? 'text-accent-600' : 'text-fg-subtle')} strokeWidth={1.75} />
              <span className="text-caption font-semibold leading-tight text-fg">{discipline.title}</span>
            </a>
          );
        })}
      </div>

      {/* Why they connect */}
      <figcaption>
        <p className="text-eyebrow uppercase text-fg-subtle">Why they connect</p>
        <ul className="mt-4 grid gap-2.5" role="group" aria-label="Links between disciplines">
          {disciplineLinks.map((item, index) => {
            const on = index === active;
            return (
              <li key={`${item.from}-${item.to}`}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(index)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left transition-[border-color,background-color,box-shadow] duration-(--duration-base)',
                    on ? 'border-accent-300 bg-accent-50 shadow-sm' : 'border-hairline bg-surface hover:border-hairline-strong',
                  )}
                >
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small font-semibold text-fg">
                    {title(item.from)}
                    <span className={cn('rounded-full px-2 py-0.5 text-micro uppercase tracking-wide', on ? 'bg-accent-600 text-white' : 'bg-tint text-accent-700')}>
                      {item.verb}
                    </span>
                    {title(item.to)}
                  </span>
                  {/* The reason expands only for the active link; it stays in the accessibility tree either way. */}
                  <span
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-(--duration-base) ease-out-soft',
                      on ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <span className="overflow-hidden text-small text-fg-muted">{item.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-ink-950 px-4 py-3 text-small font-semibold text-fg-inverse">
          <Layers aria-hidden="true" className="size-4 shrink-0 text-accent-300" />
          One architecture · no silos
        </p>
      </figcaption>
    </figure>
  );
}
