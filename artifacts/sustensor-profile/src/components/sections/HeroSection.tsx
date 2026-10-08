import type { CSSProperties } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { copy } from '@/content/copy';
import { frameworks } from '@/content/frameworks';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';
import { SECTION_IDS } from '@/content/sections';

import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { Accent } from '../ui/Heading';
import { HeroDashboard } from './hero/HeroDashboard';
import { StatStrip } from './hero/StatStrip';

const enter = (index: number) => ({ '--reveal-index': index }) as CSSProperties;

export function HeroSection() {
  const tiltRef = useTilt<HTMLDivElement>(5);
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-canvas">
      {/* Backdrop: a faint grid fading out, with soft green and teal light. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0" />
        <div className="absolute -top-48 right-[-8%] size-176 animate-glow-pulse rounded-full bg-accent-100/80 blur-3xl" />
        <div className="absolute left-[-12%] top-1/3 size-120 rounded-full bg-brand-50 blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 pb-16 pt-[calc(var(--spacing-header)+3rem)] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-[calc(var(--spacing-header)+4.5rem)]">
        <div className="lg:col-span-6">
          <h1 id="hero-heading" className="hero-enter text-display text-fg" style={enter(1)}>
            Make the case for a better,{' '}
            {/* A soft highlight sweeps in under the key word after the headline enters (compliverse). */}
            <em className="relative isolate inline-block italic">
              <Accent>sustainable</Accent>
              <span aria-hidden="true" className="highlight-sweep absolute inset-x-0 bottom-[0.12em] -z-10 h-[0.22em] rounded-full bg-accent-100" />
            </em>{' '}
            future.
          </h1>
          <p className="hero-enter mt-6 max-w-xl text-lead text-fg-muted" style={enter(2)}>
            {copy.hero.lead}
          </p>
          <div className="hero-enter mt-9 flex flex-wrap gap-3" style={enter(3)}>
            <ButtonLink href={`#${SECTION_IDS.solutions}`} variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore solutions
            </ButtonLink>
          </div>
          {/* The operating brief in short: lens first, then focus. */}
          <dl className="hero-enter mt-10 space-y-4" style={enter(4)}>
            {[
              { label: 'Lens', items: copy.hero.brief.lens },
              { label: 'Focus', items: copy.hero.brief.focus },
            ].map(({ label, items }) => (
              <div key={label}>
                <dt className="text-eyebrow uppercase text-fg-subtle">{label}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-fg-muted">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 aria-hidden="true" className="size-4 text-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* From lg the dashboard is pinned near the heading rather than centred, so its height can change without it drifting. */}
        <div className="hero-enter lg:col-span-6 lg:mt-18 lg:self-start lg:pl-4" style={enter(3)}>
          <div ref={tiltRef} className="tilt">
            <HeroDashboard className="mx-auto max-w-xl lg:max-w-none" />
          </div>
        </div>
      </Container>

      {/* Stat strip */}
      <div className="border-t border-hairline bg-surface">
        <Container>
          <StatStrip />

          {/* Trust layer: frameworks and standards, as text badges (no logos). */}
          <div className="flex flex-col gap-4 border-t border-hairline py-6 lg:flex-row lg:items-center lg:gap-8">
            <p id="frameworks-label" className="shrink-0 text-eyebrow uppercase text-fg-subtle">
              Frameworks &amp; standards we work with
            </p>
            {/* Ticker: the list is rendered twice and the track slides by half. Pauses on hover/focus. */}
            <div className="marquee mask-fade-x min-w-0 flex-1 overflow-hidden">
              <div className="marquee-track flex w-max">
                {[false, true].map((duplicate) => (
                  <ul
                    key={String(duplicate)}
                    aria-labelledby={duplicate ? undefined : 'frameworks-label'}
                    aria-hidden={duplicate || undefined}
                    className={cn('flex shrink-0 gap-2 pr-2', duplicate && 'marquee-duplicate')}
                  >
                    {frameworks.map((framework) => (
                      <li key={framework.label}>
                        <span
                          title={framework.title}
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline bg-canvas px-3 py-1.5 text-caption font-semibold text-fg-muted"
                        >
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" />
                          {framework.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
