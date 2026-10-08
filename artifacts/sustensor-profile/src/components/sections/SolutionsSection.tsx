import {
  ArrowUpRight,
  CalendarRange,
  FileCheck2,
  Handshake,
  Layers,
  Receipt,
  Rows3,
  ShieldCheck,
  SquareStack,
  type LucideIcon,
} from 'lucide-react';

import { SECTION_IDS } from '@/content/sections';
import { solutions } from '@/content/solutions';
import type { Deliverable, Solution } from '@/content/types';
import { cn } from '@/lib/utils';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { IconTile } from '../ui/IconTile';
import { DataTable, type Column } from '../ui/DataTable';
import { GlanceCard } from '../ui/GlanceCard';
import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';
import { TabList, TabPanel } from '../ui/Tabs';
import { SolutionFlow } from './solutions/SolutionFlow';

const ID_PREFIX = 'solution';

// Tab icons. Sustainability-led solutions use the brand green.
export const solutionIcons: Record<string, { icon: LucideIcon; tone: 'accent' | 'brand' }> = {
  'vendor-management': { icon: Handshake, tone: 'accent' },
  'contract-sustainability': { icon: FileCheck2, tone: 'brand' },
  'procure-to-pay': { icon: Receipt, tone: 'accent' },
  'annual-procurement-planning': { icon: CalendarRange, tone: 'accent' },
};

const deliverableColumns: Column<Deliverable>[] = [
  { key: 'area', header: 'Area', render: (row) => row.area, className: 'md:w-[22%]' },
  { key: 'scope', header: 'Key deliverables', render: (row) => <span className="text-body text-fg-muted">{row.scope}</span> },
  {
    key: 'impact',
    header: 'Business impact',
    className: 'md:w-[34%]',
    render: (row) => (
      <span className="flex gap-2 text-body font-medium text-accent-700">
        <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0" />
        {row.impact}
      </span>
    ),
  },
];

interface SolutionsSectionProps {
  activeId: string;
  showAll: boolean;
  onSelect: (id: string) => void;
  onShowAllChange: (showAll: boolean) => void;
}

export function SolutionsSection({ activeId, showAll, onSelect, onShowAllChange }: SolutionsSectionProps) {
  return (
    <Section id={SECTION_IDS.solutions} labelledBy="solutions-heading" variant="surface">
      <SectionHeading
        id="solutions-heading"
        eyebrow="Solutions"
        title={
          <>
            Enterprise <Accent>Solutions</Accent>
          </>
        }
        lead="Intelligent vendor lifecycle management, procure-to-pay automation, contract sustainability tracking, and annual procurement planning."
        aside={
          <GlanceCard
            title="Solutions at a glance"
            items={[
              { value: solutions.length, label: 'Solutions', icon: Layers },
              { value: solutions.reduce((sum, s) => sum + s.pillars.length, 0), label: 'Value pillars', icon: ShieldCheck, tone: 'brand' },
            ]}
          />
        }
      />

      {/* Short wording on phones keeps the label and the button on one line. */}
      <div className="mt-12 flex items-center justify-between gap-4 lg:mt-16">
        <p className="min-w-0 truncate text-small text-fg-subtle">
          {showAll ? (
            <>
              <span className="sm:hidden">All {solutions.length} solutions</span>
              <span className="max-sm:hidden">Showing all {solutions.length} solutions</span>
            </>
          ) : (
            'Select a solution'
          )}
        </p>
        <Button
          variant="ghost"
          size="sm"
          icon={showAll ? SquareStack : Rows3}
          iconPosition="leading"
          aria-pressed={showAll}
          onClick={() => onShowAllChange(!showAll)}
        >
          {showAll ? (
            <>
              <span className="sm:hidden">One at a time</span>
              <span className="max-sm:hidden">Show one at a time</span>
            </>
          ) : (
            `Show all ${solutions.length}`
          )}
        </Button>
      </div>

      <TabList
        label="Enterprise solutions"
        idPrefix={ID_PREFIX}
        items={solutions.map((solution) => ({ id: solution.id, label: solution.title }))}
        activeId={showAll ? null : activeId}
        onChange={onSelect}
        className="scrollbar-none mask-fade-r -mx-4 mt-4 flex snap-x scroll-px-4 gap-2 sm:scroll-px-6 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-3 lg:overflow-visible lg:px-0"
        tabClassName={(isActive) =>
          cn(
            'spotlight group relative flex min-w-56 shrink-0 snap-start flex-col items-start gap-2 rounded-lg border p-4 text-left transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-out-soft lg:min-w-0',
            isActive
              ? 'border-accent-500 bg-surface shadow-md'
              : 'border-hairline bg-canvas hover:border-hairline-strong hover:bg-surface',
          )
        }
        renderTab={(item, isActive) => {
          const solution = solutions.find((entry) => entry.id === item.id)!;
          return (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-4 top-0 h-0.5 rounded-full transition-colors duration-(--duration-base)',
                  isActive ? 'bg-accent-500' : 'bg-transparent',
                )}
              />
              <span className="flex w-full items-center justify-between">
                <IconTile
                  icon={solutionIcons[solution.id]?.icon ?? Handshake}
                  tone={solutionIcons[solution.id]?.tone}
                  size="sm"
                  emphasis={isActive ? 'solid' : 'soft'}
                />
                <span className={cn('text-caption font-semibold tabular-nums', isActive ? 'text-accent-700' : 'text-fg-subtle')}>
                  {solution.number}
                </span>
              </span>
              <span className={cn('text-small font-semibold leading-snug', isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg')}>
                {item.label}
              </span>
            </>
          );
        }}
      />

      <div className="mt-8 space-y-16 lg:mt-10">
        {solutions.map((solution) => (
          <TabPanel key={solution.id} idPrefix={ID_PREFIX} id={solution.id} hidden={!showAll && solution.id !== activeId}>
            <SolutionDetail solution={solution} />
          </TabPanel>
        ))}
      </div>
    </Section>
  );
}

function SolutionDetail({ solution }: { solution: Solution }) {
  return (
    <article className="panel-in space-y-10 lg:space-y-12">
      <header className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-caption font-semibold text-accent-700">Solution {solution.number}</span>
            <Badge tone="neutral">{solution.badge}</Badge>
          </div>
          <h3 className="mt-4 text-h2 text-fg">{solution.title}</h3>
          <p className="mt-3 text-body font-medium text-fg-subtle">{solution.subtitle}</p>
        </div>
        <p className="text-lead text-fg-muted lg:col-span-7 lg:pt-9">{solution.summary}</p>
      </header>

      <div>
        <SubHeading title="How it works" meta={`${solution.process.length} steps`} />
        <SolutionFlow steps={solution.process} outputs={solution.outputs} />
      </div>

      <div>
        <SubHeading title="Deliverables & business impact" />
        <DataTable
          caption={`${solution.title}: deliverables and business impact`}
          columns={deliverableColumns}
          rows={solution.deliverables}
          rowKey={(row) => row.area}
        />
      </div>

      <div>
        <SubHeading title="Why it works" />
        <ul className="grid gap-4 md:grid-cols-3">
          {solution.pillars.map((pillar) => (
            <li
              key={pillar.label}
              className="spotlight group rounded-xl border border-accent-100 bg-linear-to-br from-accent-50 to-surface p-6 transition-shadow duration-(--duration-base) hover:shadow-md"
            >
              <IconTile icon={ShieldCheck} />
              <p className="mt-5 text-h4 text-fg">{pillar.label}</p>
              <p className="mt-3 text-body text-fg-muted">{pillar.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function SubHeading({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <h4 className="text-eyebrow uppercase text-fg">{title}</h4>
      {meta && <span className="text-caption text-fg-subtle">{meta}</span>}
      <span aria-hidden="true" className="h-px flex-1 self-center bg-hairline" />
    </div>
  );
}
