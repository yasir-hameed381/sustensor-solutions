import type { CSSProperties } from 'react';
import { BriefcaseBusiness, Compass, FileCheck2, MapPinned, Target } from 'lucide-react';

import { about } from '@/content/about';
import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Card } from '../ui/Card';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { ToneContext } from '../ui/tone';

const principleIcons = [BriefcaseBusiness, FileCheck2, MapPinned];

export function AboutSection() {
  const statements = [
    { icon: Target, ...about.mission },
    { icon: Compass, ...about.vision },
  ];
  const brief = [
    { label: 'Focus', items: copy.hero.brief.focus },
    { label: 'Lens', items: copy.hero.brief.lens },
  ];

  return (
    <Section id={SECTION_IDS.about} labelledBy="about-heading" variant="canvas">
      {/* Heading left, intro as a statement right. */}
      <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow>About</Eyebrow>
          <Heading id="about-heading" className="mt-4">
            {about.heading}
          </Heading>
        </div>
        <p className="text-h3 font-medium text-fg lg:col-span-8 lg:pt-9">{about.intro}</p>
      </div>

      {/* Principles: spotlight cards with a large watermark number. */}
      <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
        {about.principles.map((principle, index) => (
          <li key={principle.title} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
            <Card interactive padding="lg" className="h-full overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 -z-10 select-none text-watermark text-tint"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <IconTile icon={principleIcons[index]} size="lg" tone={index === 2 ? 'brand' : 'accent'} />
              <h3 className="mt-8 text-h4 text-fg">{principle.title}</h3>
              <p className="mt-2 text-body text-fg-muted">{principle.text}</p>
            </Card>
          </li>
        ))}
      </ul>

      {/* Mission & vision */}
      <ToneContext.Provider value="inverse">
        <div data-reveal className="relative isolate mt-6 grid overflow-hidden rounded-2xl bg-ink-900 text-fg-inverse md:grid-cols-2 lg:mt-8">
          {/* Slow aurora behind the statements. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-aurora absolute -left-1/4 -top-1/2 h-[140%] w-3/4 rounded-full bg-accent-600/25 blur-3xl" />
            <div className="animate-aurora absolute -bottom-1/2 -right-1/4 h-[140%] w-3/4 rounded-full bg-brand-500/20 blur-3xl [animation-delay:-8s]" />
            <div className="bg-grid-inverse absolute inset-0 opacity-40 mask-fade-l" />
          </div>
          {statements.map(({ icon, title, text }, index) => (
            <article
              key={title}
              className={
                'relative p-8 sm:p-10 lg:p-12 ' + (index === 1 ? 'border-t border-hairline-inverse md:border-l md:border-t-0' : '')
              }
            >
              <div className="flex items-center gap-3">
                <IconTile icon={icon} size="sm" />
                <h3 className="text-eyebrow uppercase text-accent-300">{title}</h3>
              </div>
              <p className="mt-6 text-h3 text-fg-inverse">{text}</p>
            </article>
          ))}
        </div>
      </ToneContext.Provider>

      {/* The operating brief */}
      <div data-reveal className="mt-4 grid gap-10 rounded-2xl border border-hairline bg-surface p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <figure className="lg:col-span-7">
          <figcaption className="text-eyebrow uppercase text-accent-700">The operating brief</figcaption>
          <blockquote className="mt-5 border-l-2 border-accent-500 pl-6 text-h2 font-medium text-fg">
            {copy.hero.briefQuote}
          </blockquote>
        </figure>
        <dl className="grid grid-cols-2 gap-6 border-t border-hairline pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          {brief.map(({ label, items }) => (
            <div key={label}>
              <dt className="text-eyebrow uppercase text-fg-subtle">{label}</dt>
              <dd className="mt-4">
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-body font-medium text-fg">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
