import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Eyebrow } from '../shared/Eyebrow';
import { Section } from '../shared/Section';

export function RegionSection({ number }: { number: string }) {
  const { region } = copy;

  return (
    <Section id={SECTION_IDS.region} labelledBy="region-heading" tone="forest" className="overflow-hidden">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="reveal-on-scroll relative" data-reveal>
          <div
            aria-hidden="true"
            className="absolute -left-12 -top-14 h-[300px] w-[300px] rounded-full border border-teal/35 sm:h-[480px] sm:w-[480px]"
          />
          <div className="relative">
            <Eyebrow onDark>{`${number} / The regional lens`}</Eyebrow>
            <h2 id="region-heading" className="display mt-7 max-w-[600px] text-[clamp(2.8rem,5.5vw,6rem)] font-semibold leading-[0.9]">
              {region.heading} <span className="text-mint">{region.headingAccent}</span>
            </h2>
            <p className="mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="h-[5px] w-20 bg-gold" />
              <span className="mono text-[9px] text-sage">{region.markets}</span>
            </p>
          </div>
        </div>

        <div className="reveal-on-scroll reveal-delay-1 flex flex-col justify-end lg:pb-3" data-reveal>
          <p className="max-w-[650px] text-[17px] leading-8 text-on-dark sm:text-xl sm:leading-9">{region.body}</p>
          <dl className="mt-12 grid grid-cols-2 border-t border-teal/50 pt-5">
            <div>
              <dt className="mono text-[9px] text-sage">Calibrated for</dt>
              <dd className="mt-3 text-sm text-ivory">{region.calibratedFor}</dd>
            </div>
            <div>
              <dt className="mono text-[9px] text-sage">Aligned with</dt>
              <dd className="mt-3 text-sm text-ivory">{region.alignedWith}</dd>
            </div>
          </dl>
        </div>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {region.pillars.map((pillar) => (
          <li key={pillar.title} className="border border-teal/40 p-6">
            <h3 className="mono text-[10px] font-bold text-mint">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-6 text-on-dark">{pillar.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
