import { useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

import { SECTION_IDS } from '@/content/sections';
import { solutions } from '@/content/solutions';
import type { Solution } from '@/content/types';
import { cn } from '@/lib/utils';

import { ProcessFlow } from '../shared/ProcessFlow';
import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

interface SolutionsSectionProps {
  number: string;
  activeId: string;
  onActiveChange: (id: string) => void;
}

export function SolutionsSection({ number, activeId, onActiveChange }: SolutionsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const selectTab = (id: string) => {
    setShowAll(false);
    onActiveChange(id);
  };

  return (
    <Section id={SECTION_IDS.solutions} labelledBy="solutions-heading" className="border-b border-line">
      <SectionHeader
        id="solutions-heading"
        eyebrow={`${number} / Solutions`}
        title={
          <>
            Enterprise <span className="text-emerald">Solutions</span>
          </>
        }
        aside="Intelligent vendor lifecycle management, contract sustainability tracking, audit-grade ESG reporting, procure-to-pay automation, and annual procurement planning."
      />

      <div
        role="tablist"
        aria-label="Solutions"
        className="-mx-5 mt-12 flex items-center gap-2 overflow-x-auto border-b border-line-green px-5 pb-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {solutions.map((solution) => {
          const isActive = !showAll && solution.id === activeId;
          return (
            <button
              key={solution.id}
              type="button"
              role="tab"
              id={`solution-tab-${solution.id}`}
              aria-selected={isActive}
              aria-controls={`solution-panel-${solution.id}`}
              onClick={() => selectTab(solution.id)}
              className={cn(
                'flex shrink-0 items-center gap-2.5 whitespace-nowrap px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors',
                isActive ? 'bg-forest text-mint' : 'border border-line-green bg-mist text-forest hover:bg-mist-2',
              )}
            >
              <span className={cn('mono text-[9px]', isActive ? 'text-gold' : 'text-emerald')}>{solution.number}</span>
              {solution.title}
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={showAll}
          onClick={() => setShowAll((value) => !value)}
          className={cn(
            'ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors',
            showAll ? 'bg-emerald text-cream' : 'border border-line-green text-emerald hover:bg-emerald hover:text-cream',
          )}
        >
          {showAll ? 'Show one at a time' : `Show all ${solutions.length}`}
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-12 space-y-16">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} hidden={!showAll && solution.id !== activeId} />
        ))}
      </div>
    </Section>
  );
}

function SolutionCard({ solution, hidden }: { solution: Solution; hidden: boolean }) {
  return (
    <article
      id={`solution-panel-${solution.id}`}
      role="tabpanel"
      aria-labelledby={`solution-tab-${solution.id}`}
      hidden={hidden}
      className="border border-line bg-paper p-6 sm:p-10 lg:p-12"
    >
      <header className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="flex flex-wrap items-center gap-3">
            <span className="mono text-[11px] font-bold text-emerald">Solution {solution.number}</span>
            <span className="mono text-[9px] text-copy-muted">{solution.badge}</span>
          </p>
          <h3 className="display mt-3 text-[1.75rem] font-semibold leading-[1.1] text-forest sm:text-[2.1rem]">{solution.title}</h3>
          <p className="mt-2 text-sm text-copy-muted">{solution.subtitle}</p>
        </div>
        <p className="text-[15px] leading-7 text-copy-strong lg:pt-1">{solution.summary}</p>
      </header>

      <ProcessFlow number={solution.number} title={solution.title} steps={solution.process} outputs={solution.outputs} />

      <table className="mt-10 w-full border-t border-forest text-left">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-line">
            <th scope="col" className="mono w-[180px] py-3 pr-8 text-[9px] font-normal text-copy-muted">Area</th>
            <th scope="col" className="mono py-3 pr-8 text-[9px] font-normal text-copy-muted">Key deliverables</th>
            <th scope="col" className="mono py-3 text-[9px] font-normal text-copy-muted">Business impact</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {solution.deliverables.map((row) => (
            <tr key={row.area} className="flex flex-col gap-2 py-5 md:table-row">
              <th scope="row" className="align-top text-[15px] font-semibold leading-snug text-forest md:py-6 md:pr-8">
                {row.area}
              </th>
              <td className="align-top text-sm leading-relaxed text-copy md:py-6 md:pr-8">{row.scope}</td>
              <td className="align-top text-sm font-medium leading-relaxed text-emerald-deep md:py-6">
                <span className="flex gap-2">
                  <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {row.impact}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-10 grid gap-6 bg-mist-3 p-6 sm:grid-cols-3 sm:gap-8 sm:p-8">
        {solution.pillars.map((pillar) => (
          <li key={pillar.label}>
            <p className="flex items-center gap-2 text-sm font-semibold text-forest">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald" />
              {pillar.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-copy">{pillar.detail}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
