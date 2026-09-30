import { Check } from 'lucide-react';

import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Eyebrow } from '../shared/Eyebrow';
import { Section } from '../shared/Section';

export function VerdictSection({ number }: { number: string }) {
  const { verdict } = copy;

  return (
    <Section id={SECTION_IDS.verdict} labelledBy="verdict-heading" tone="sage">
      <div className="reveal-on-scroll" data-reveal>
        <Eyebrow>{`${number} / The verdict`}</Eyebrow>
        <h2 id="verdict-heading" className="display mt-6 max-w-[1000px] text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.92] text-forest">
          {verdict.heading} <span className="text-emerald">{verdict.headingAccent}</span> {verdict.headingEnd}
        </h2>
      </div>

      <div className="reveal-on-scroll reveal-delay-1 mt-12 grid gap-10 border-t border-line-green pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20" data-reveal>
        <p className="max-w-[680px] border-l-2 border-emerald pl-6 text-lg leading-8 text-copy-strong sm:text-xl sm:leading-9">
          {verdict.body}
        </p>
        <ul className="flex flex-col gap-4 lg:pt-1">
          {verdict.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-base font-semibold text-forest">
              <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
