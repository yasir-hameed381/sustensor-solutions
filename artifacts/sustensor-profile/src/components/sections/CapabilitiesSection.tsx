import { Leaf, Minus, Plus } from 'lucide-react';

import { disciplines } from '@/content/disciplines';
import { SECTION_IDS } from '@/content/sections';

import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

interface CapabilitiesSectionProps {
  number: string;
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}

export function CapabilitiesSection({ number, openId, onOpenChange }: CapabilitiesSectionProps) {
  return (
    <Section id={SECTION_IDS.capabilities} labelledBy="capabilities-heading" tone="mist">
      <SectionHeader
        id="capabilities-heading"
        eyebrow={`${number} / Capabilities`}
        title="The Integrated Sustensor Architecture"
        aside="Four connected disciplines. One operating view."
      />

      <div className="mt-16 border-t border-line-green">
        {disciplines.map((discipline) => {
          const isOpen = openId === discipline.id;
          const panelId = `discipline-panel-${discipline.id}`;
          return (
            <article key={discipline.id} className="border-b border-line-green">
              <h3>
                <button
                  type="button"
                  onClick={() => onOpenChange(isOpen ? null : discipline.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group grid w-full grid-cols-[40px_1fr_32px] items-center gap-4 py-6 text-left sm:grid-cols-[76px_1fr_32px] sm:gap-6 sm:py-8"
                >
                  <span className="mono text-[11px] text-emerald">{discipline.number}</span>
                  <span className="display text-[clamp(1.35rem,2.7vw,2.45rem)] font-medium leading-[1.1] text-forest transition-colors group-hover:text-emerald">
                    {discipline.title}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center border border-line-green text-emerald transition-colors group-hover:border-emerald group-hover:bg-emerald group-hover:text-cream">
                    {isOpen ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
                  </span>
                </button>
              </h3>

              <div id={panelId} hidden={!isOpen} className="pb-8 pl-14 pr-2 sm:pl-[100px] sm:pr-20">
                <div className="grid gap-6 sm:grid-cols-[0.72fr_1.28fr] sm:gap-12">
                  <div>
                    <h4 className="mono text-[9px] text-emerald">The logic</h4>
                    <p className="mt-3 text-sm leading-7 text-copy">{discipline.logic}</p>
                  </div>
                  <div>
                    <h4 className="mono text-[9px] text-emerald">The solution</h4>
                    <p className="mt-3 text-sm font-medium leading-7 text-copy-strong">{discipline.solution}</p>
                  </div>
                </div>
                <h4 className="mono mt-8 text-[9px] text-emerald">Capabilities</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {discipline.capabilities.map((capability) => (
                    <li key={capability} className="border border-line-green bg-cream px-3 py-1.5 text-xs font-medium text-forest">
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mono mt-12 flex items-center gap-3 text-[9px] text-copy-muted">
        <Leaf aria-hidden="true" className="h-4 w-4 text-emerald" />
        One architecture / no silos
      </p>
    </Section>
  );
}
