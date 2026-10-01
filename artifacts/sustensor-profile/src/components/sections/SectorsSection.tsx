import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { SECTION_IDS, sectorAnchorId } from '@/content/sections';
import { sectors } from '@/content/sectors';

import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';

export function SectorsSection() {
  return (
    <Section id={SECTION_IDS.sectors} labelledBy="sectors-heading" variant="tint">
      <SectionHeading
        id="sectors-heading"
        eyebrow="Sectors"
        title={
          <>
            Sectors <Accent>We Serve</Accent>
          </>
        }
        lead="Sustainability, procurement, and technology expertise applied to the realities of each industry."
      />

      {/* One panel divided by hairlines: compact rows on phones, a 3×3 grid from lg. */}
      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline shadow-xs sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {sectors.map(({ id, name, icon: Icon, description }, index) => (
          <li
            key={id}
            id={sectorAnchorId(id)}
            data-reveal
            style={{ '--reveal-index': index % 3 } as CSSProperties}
            className="spotlight group relative flex gap-4 bg-surface p-5 transition-colors duration-(--duration-base) ease-out-soft hover:bg-canvas target:bg-accent-50 sm:flex-col sm:last:odd:col-span-2 lg:last:odd:col-span-1 sm:gap-0 sm:p-7 lg:p-8"
          >
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-md border border-accent-100 bg-accent-50 text-accent-700 transition-colors duration-(--duration-base) group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-white"
            >
              <Icon className="size-5 transition-transform duration-(--duration-base) ease-out-soft group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.75} />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="absolute right-5 top-5 hidden size-5 -translate-x-1 translate-y-1 text-accent-600 opacity-0 transition-[opacity,transform] duration-(--duration-base) ease-out-soft group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:block sm:right-7 sm:top-7"
            />
            <div className="sm:mt-6">
              <h3 className="text-h4 text-fg">{name}</h3>
              <p className="mt-1.5 text-small text-fg-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
