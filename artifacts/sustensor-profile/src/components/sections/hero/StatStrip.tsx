import type { CSSProperties, ReactNode } from 'react';
import { Boxes, Building2, Flag, Network, type LucideIcon } from 'lucide-react';

import { disciplines } from '@/content/disciplines';
import { sectors } from '@/content/sectors';
import { solutions } from '@/content/solutions';
import { useSeenOnce } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import { CountUp } from '../../ui/CountUp';
import { disciplineIcons } from '../CapabilitiesSection';
import { solutionIcons } from '../SolutionsSection';

/*
 * Stat strip under the hero. Each figure is a count of what the site itself presents, and gets a small visual that
 * plays once when the strip scrolls into view (idea from compliverse.ai): solution icons pop in, sector icons slide
 * in, the three disciplines link up, and a bar fills toward 2030.
 */

const VISION_START = 2016; // Saudi Vision 2030 was launched in April 2016.
const VISION_END = 2030;
const visionProgress = Math.min(1, Math.max(0, (new Date().getFullYear() - VISION_START) / (VISION_END - VISION_START)));

const Chip = ({ icon: Icon, index, effect, className }: { icon: LucideIcon; index: number; effect: 'stat-pop' | 'stat-slide'; className?: string }) => (
  <span
    style={{ '--i': index } as CSSProperties}
    className={cn('flex size-6 shrink-0 items-center justify-center rounded-md border border-accent-100 bg-accent-50 text-accent-700', effect, className)}
  >
    <Icon className="size-3.5" strokeWidth={1.75} />
  </span>
);

const stats: { value: number | string; label: string; icon: LucideIcon; visual: ReactNode }[] = [
  {
    value: solutions.length,
    label: 'Enterprise solutions',
    icon: Boxes,
    visual: (
      <span className="flex gap-1.5">
        {solutions.map((solution, index) => (
          <Chip key={solution.id} icon={solutionIcons[solution.id]?.icon ?? Boxes} index={index} effect="stat-pop" />
        ))}
      </span>
    ),
  },
  {
    value: sectors.length,
    label: 'Sectors served',
    icon: Building2,
    visual: (
      <span className="flex flex-wrap gap-1">
        {sectors.map((sector, index) => (
          <Chip key={sector.id} icon={sector.icon} index={index} effect="stat-slide" />
        ))}
      </span>
    ),
  },
  {
    value: disciplines.length,
    label: 'Integrated disciplines',
    icon: Network,
    visual: (
      // Icons joined by lines that draw in: the disciplines are connected, not separate.
      <span className="flex items-center">
        {disciplines.map((discipline, index) => (
          <span key={discipline.id} className="flex items-center">
            {index > 0 && <span style={{ '--i': index } as CSSProperties} className="stat-fill block h-px w-4 bg-accent-500 sm:w-6" />}
            <Chip icon={disciplineIcons[discipline.id] ?? Network} index={index * 2} effect="stat-pop" />
          </span>
        ))}
      </span>
    ),
  },
  {
    value: '2030',
    label: 'Calibrated for Saudi Vision',
    icon: Flag,
    visual: (
      <span className="flex w-full max-w-48 items-center gap-2 text-micro tabular-nums text-fg-subtle">
        {VISION_START}
        <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-tint">
          <span className="stat-fill absolute inset-y-0 left-0 rounded-full bg-accent-500" style={{ width: `${visionProgress * 100}%` }} />
        </span>
        {VISION_END}
      </span>
    ),
  },
];

export function StatStrip() {
  const [ref, seen] = useSeenOnce<HTMLDListElement>();
  return (
    <dl ref={ref} className={cn('grid grid-cols-2 lg:grid-cols-4', seen && 'is-seen')}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={
            'flex flex-col gap-1 border-hairline py-6 sm:py-8 ' +
            // Two columns on phones/tablets, four from lg; hairlines between cells.
            [
              'pr-4 sm:pr-8 lg:pr-8',
              'border-l pl-5 sm:pl-8',
              'border-t pr-4 sm:pr-8 lg:border-l lg:border-t-0 lg:pl-8',
              'border-l border-t pl-5 sm:pl-8 lg:border-t-0',
            ][index]
          }
        >
          <dt className="flex flex-col gap-3 text-small text-fg-muted">
            <span className="flex items-center gap-2">
              <stat.icon aria-hidden="true" className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} />
              {stat.label}
            </span>
            <span aria-hidden="true" className="flex min-h-6 items-center">
              {stat.visual}
            </span>
          </dt>
          <dd className="order-first text-h2 tabular-nums text-fg">
            {typeof stat.value === 'number' ? <CountUp value={stat.value} duration={900} /> : stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
