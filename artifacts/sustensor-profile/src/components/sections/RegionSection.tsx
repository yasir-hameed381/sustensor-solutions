import type { CSSProperties } from 'react';
import { Landmark, Rocket, ShieldCheck } from 'lucide-react';

import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Eyebrow } from '../ui/Eyebrow';
import { Accent, Heading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { RegionRadar } from './region/RegionRadar';

// Same order as copy.region.pillars: scaling, local content, ESG compliance.
const pillarIcons = [Rocket, Landmark, ShieldCheck];

export function RegionSection() {
  const { region } = copy;
  const [before, after = ''] = region.body.split(region.bodyEmphasis);

  return (
    <Section
      id={SECTION_IDS.region}
      labelledBy="region-heading"
      variant="ink"
      backdrop={
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid-inverse absolute inset-0 opacity-40 mask-fade-radial-l" />
          <div className="absolute -left-40 top-10 size-128 rounded-full bg-accent-500/10 blur-3xl" />
        </div>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-6">
          <Eyebrow>The regional lens</Eyebrow>
          <Heading id="region-heading" size="h1" className="mt-4">
            {region.heading} <Accent tone="brand">{region.headingAccent}</Accent>
          </Heading>
          <p className="mt-8 text-lead text-fg-inverse-muted">
            {before}
            <strong className="font-semibold text-fg-inverse">{region.bodyEmphasis}</strong>
            {after}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline-inverse pt-6">
            <div>
              <dt className="text-eyebrow uppercase text-fg-inverse-subtle">Calibrated for</dt>
              <dd className="mt-2 text-h4 text-fg-inverse">{region.calibratedFor}</dd>
            </div>
            <div>
              <dt className="text-eyebrow uppercase text-fg-inverse-subtle">Aligned with</dt>
              <dd className="mt-2 text-h4 text-fg-inverse">{region.alignedWith}</dd>
            </div>
          </dl>
        </div>

        <div className="grid content-center gap-4 lg:col-span-6">
          <div data-reveal>
            <RegionRadar />
          </div>
        <ul className="grid gap-4">
          {region.pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              data-reveal
              style={{ '--reveal-index': index } as CSSProperties}
              className="spotlight spotlight-inverse group flex gap-5 rounded-xl border border-hairline-inverse bg-white/4 p-5 transition-colors duration-(--duration-base) hover:bg-white/6 sm:p-6"
            >
              <span className="icon-wiggle inline-flex" style={{ '--i': index } as CSSProperties}>
                <IconTile icon={pillarIcons[index]} size="lg" />
              </span>
              <div>
                <h3 className="text-h4 text-fg-inverse">{pillar.title}</h3>
                <p className="mt-2 text-body text-fg-inverse-muted">{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Section>
  );
}
