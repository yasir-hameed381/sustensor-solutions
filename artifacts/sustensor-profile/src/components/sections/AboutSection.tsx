import { Compass, Target } from 'lucide-react';

import { about } from '@/content/about';
import { SECTION_IDS } from '@/content/sections';

import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

export function AboutSection({ number }: { number: string }) {
  const statements = [
    { icon: Target, ...about.mission },
    { icon: Compass, ...about.vision },
  ];

  return (
    <Section id={SECTION_IDS.about} labelledBy="about-heading" tone="paper" className="border-b border-line">
      <SectionHeader id="about-heading" eyebrow={`${number} / About`} title={about.heading} />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="reveal-on-scroll" data-reveal>
          <p className="display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] text-copy-strong">{about.intro}</p>
          <ul className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {about.principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="mono text-[9px] font-bold text-emerald">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-copy">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-on-scroll reveal-delay-1 grid content-start gap-4" data-reveal>
          {statements.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border border-line-green bg-mist-3 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-forest text-mint">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="display text-2xl font-semibold text-forest">{title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-7 text-copy-strong">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
