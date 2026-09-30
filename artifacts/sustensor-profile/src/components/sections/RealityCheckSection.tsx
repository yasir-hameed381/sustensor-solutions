import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Eyebrow } from '../shared/Eyebrow';
import { Section } from '../shared/Section';

export function RealityCheckSection({ number }: { number: string }) {
  const { realityCheck } = copy;
  const notes = [
    { label: 'Who we serve', text: realityCheck.whoWeServe },
    { label: 'The bottom line', text: realityCheck.bottomLine },
  ];

  return (
    <Section id={SECTION_IDS.realityCheck} labelledBy="reality-heading" className="border-b border-line">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div className="reveal-on-scroll" data-reveal>
          <Eyebrow>{`${number} / The signal`}</Eyebrow>
          <h2 id="reality-heading" className="display mt-6 max-w-[380px] text-[clamp(2.8rem,5vw,5.25rem)] font-semibold leading-[0.94]">
            {realityCheck.heading}
          </h2>
        </div>

        <div className="reveal-on-scroll reveal-delay-1 max-w-[700px] lg:pt-14" data-reveal>
          <p className="display text-[clamp(1.8rem,3.2vw,3.2rem)] leading-[1.08] text-copy-strong">{realityCheck.lead}</p>
          <p className="mt-8 max-w-[590px] text-[15px] leading-8 text-copy">{realityCheck.problem}</p>
          <p className="mt-12 border-l-2 border-gold pl-6 text-[17px] font-semibold leading-8 text-forest sm:text-xl">
            {realityCheck.answer}
          </p>
          <div className="mt-12 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
            {notes.map((note) => (
              <div key={note.label}>
                <h3 className="mono text-[9px] text-emerald">{note.label}</h3>
                <p className="mt-3 text-sm leading-7 text-copy">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
