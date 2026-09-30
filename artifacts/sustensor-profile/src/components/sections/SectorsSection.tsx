import { SECTION_IDS, sectorAnchorId } from '@/content/sections';
import { sectors } from '@/content/sectors';

import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

export function SectorsSection({ number }: { number: string }) {
  return (
    <Section id={SECTION_IDS.sectors} labelledBy="sectors-heading" tone="paper" className="border-b border-line">
      <SectionHeader
        id="sectors-heading"
        eyebrow={`${number} / Sector`}
        title={
          <>
            Sectors <span className="text-emerald">We Serve</span>
          </>
        }
        aside="Sustainability, procurement, and technology expertise applied to the realities of each industry."
      />

      <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map(({ id, name, icon: Icon, description }) => (
          <li key={id} id={sectorAnchorId(id)} className="group bg-paper p-6 transition-colors hover:bg-mist-3 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-mist text-emerald transition-colors group-hover:bg-forest group-hover:text-mint">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="display text-xl font-medium text-forest">{name}</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-copy">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
